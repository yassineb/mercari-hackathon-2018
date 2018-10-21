from google_images_download import google_images_download
import os

def make_dataset(subject, classes):
    for category in classes: 
        response = google_images_download.googleimagesdownload()   #class instantiation
        arguments = {"output_directory":"datasets/"+subject, "keywords":category, "limit":100, "print_urls":True, "format":"jpg"}   #creating list of arguments
        paths = response.download(arguments)   #passing the arguments to the function
        print(paths)

def clean_files(dir_name):
    for root, subdirs, files in os.walk(dir_name):
        for f in files:
            r = f.replace(" ","")
            if( r != f):
                os.rename(root+"/"+f,root+"/"+r)
                print (f)

datasets = dict(category=["T-shift", "pants", "hats", "bag"])

for subject in datasets:
    make_dataset(subject, datasets[subject])
    clean_files("./datasets/"+subject)

