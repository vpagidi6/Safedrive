import requests
from time import sleep

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

for i in range(0, 8):
    path = f"/Users/vamshipagidi/Development/Safedrive/demo/driver_images/driver_image({i}).png"
    send_image(path)
    sleep(5)