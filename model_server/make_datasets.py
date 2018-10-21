from google_images_download import google_images_download
import os

def make_dataset(subject, classes):
    for category in classes: 
        response = google_images_download.googleimagesdownload()   #class instantiation
        arguments = {"output_directory":"datasets/"+subject, "keywords":category, "limit":100, "print_urls":True, "format":"jpg"}   #creating list of arguments
        paths = response.download(arguments)   #passing the arguments to the function
        print(paths)


datasets = dict(
        # category=["T-shift", "pants", "hats", "bag"],
        color=["red clothes", "blue clothes", "green clothes", "white clothes", "black clothes"],
        brand=["adidas", "nike"]
        )

for subject in datasets:
    make_dataset(subject, datasets[subject])

