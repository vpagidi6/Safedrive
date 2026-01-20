import flask
import cv2
from tensorflow import keras
import numpy as np
import json
from firebase_admin import credentials, firestore, initialize_app, storage
from datetime import datetime
import os

app = flask.Flask(__name__)

# EC2 Update
# cred = credentials.Certificate('key.json')

FIREBASE_KEY_PATH = os.getenv('FIREBASE_KEY_PATH', 'key.json')
cred = credentials.Certificate(FIREBASE_KEY_PATH)

default_app = initialize_app(cred, {'storageBucket': 'safedrive-12f49.appspot.com'})
db = firestore.client()
classifications = db.collection('classifications')

# EC2 Update - Create necessary directories and initialize files
os.makedirs('driver_images', exist_ok=True)

# EC2 Update - Initialize num.txt if it doesn't exist
if not os.path.exists('num.txt'):
    with open('num.txt', 'w') as f:
        f.write('0')

# EC2 Update - Use environment variable for model path
# model = keras.models.load_model('distractedDrivingModel')
MODEL_PATH = os.getenv('MODEL_PATH', 'distractedDrivingModel')
model = keras.models.load_model(MODEL_PATH)

category_map = {'c0': 'Safe driving', 
                'c1': 'Texting - right', 
                'c2': 'Talking on the phone - right', 
                'c3': 'Texting - left', 
                'c4': 'Talking on the phone - left', 
                'c5': 'Operating the radio', 
                'c6': 'Drinking', 
                'c7': 'Reaching behind', 
                'c8': 'Hair and makeup', 
                'c9': 'Talking to passenger'}

@app.route("/")
def home():
    return "safedrive home page"

@app.route("/health")
def health():
    """Health check endpoint for load balancers and monitoring."""
    return json.dumps({"status": "healthy", "service": "safedrive-api"}), 200

# EC2 Update - Health check endpoint for load balancer monitoring
@app.route("/health", methods=["GET"])
def health():
    """Health check endpoint for load balancer"""
    return json.dumps({
        "status": "healthy",
        "model_loaded": model is not None
    })

@app.route("/classify-image", methods=["POST"])
def classifyImage():
    # EC2 Update - Add error handling for production
    try:
        image = flask.request.files['image']
        image_bytes = image.read()

        # cv2.imdecode expects a numpy array of bytes
        nparr = np.frombuffer(image_bytes, np.uint8)
        
        # Decode image from buffer
        image = cv2.imdecode(nparr, cv2.IMREAD_GRAYSCALE)
        
        # Check if image was decoded successfully
        if image is None:
            return json.dumps({"error": "Failed to decode image. Invalid image format."}), 400

        # EC2 Update - Use proper context manager for file operations
        # num = open("num.txt", "r").read()
        with open("num.txt", "r") as f:
            num = f.read().strip()
        num_int = int(num) if num else 0
        
        # EC2 Update - Use num_int instead of num string
        # cv2.imwrite(f"driver_images/driver_image({num}).png", image)
        cv2.imwrite(f"driver_images/driver_image({num_int}).png", image)


        # EC2 Update - Use num_int instead of num string
        # fileName = f"driver_images/driver_image({num}).png"
        fileName = f"driver_images/driver_image({num_int}).png"
        bucket = storage.bucket()
        blob = bucket.blob(fileName)
        blob.upload_from_filename(fileName)
        blob.make_public()


        image_shaped = cv2.resize(image,(64, 64))

        new_img = image_shaped.reshape(-1, 64, 64, 1)

        # EC2 Update - Set verbose=0 for production (less logging noise)
        # y_prediction = model.predict(new_img, batch_size=40, verbose=1)
        y_prediction = model.predict(new_img, batch_size=40, verbose=0)

        prediction = category_map.get('c{}'.format(np.argmax(y_prediction)))


        the_date = datetime.now().strftime("%m/%d/%Y") 
        the_time = datetime.now().strftime("%H:%M:%S")

        data = {
            "date" : the_date,
            "time" : the_time,
            "image" : blob.public_url,
            "classification" : prediction,
        }

        # EC2 Update - Use num_int + 1 for incrementing
        # with open("num.txt",'w') as file:
        #     file.write(f"{int(num) + 1}")
        with open("num.txt",'w') as f:
            f.write(f"{num_int + 1}")

        classifications.add(data)

        return json.dumps(data)
    
    # EC2 Update - Return proper error response
    except Exception as e:
        return json.dumps({"error": str(e)}), 500



if __name__ == '__main__':
    # EC2 Update - Listen on all interfaces (0.0.0.0) instead of local IP, disable debug for production
    # app.run(host="192.168.1.38", port=8000)
    # For development only - use gunicorn in production
    app.run(host="0.0.0.0", port=8000, debug=False)