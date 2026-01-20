import requests

def send_image(img):
    url = "http://50.19.22.145:8000/classify-image"

    image_file = open(img, "rb")
    data = {
        'image': image_file
    }

    response = requests.post(
        url,
        files=data,
        timeout=10
    )

    if response.status_code == 200:
        print(f'Successfully sent {img}')
    else:
        print('Error in POST request')

    image_file.close()

send_image("/Users/vamshipagidi/Development/Safedrive/demo/driver_images/driver_image(2).png")