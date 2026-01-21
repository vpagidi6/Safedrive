import requests
from datetime import datetime
from time import sleep

def send_image(img):
    url = "http://50.19.22.145:8000/classify-image"

    image_file = open(img, "rb")

    files = {
        'image': image_file
    }

    the_date = datetime.now().strftime("%m/%d/%Y")
    the_time = datetime.now().strftime("%H:%M:%S")

    data = {
        'date': the_date,
        'time': the_time
    }

    response = requests.post(
        url,
        files=files,
        data=data,
        timeout=10
    )

    if response.status_code == 200:
        print(f'Successfully sent {img}')
    else:
        print('Error in POST request')

    image_file.close()

for i in range(0, 8):
    path = f"/Users/vamshipagidi/Development/Safedrive/demo/driver_images/driver_image({i}).png"
    send_image(path)
    sleep(5)