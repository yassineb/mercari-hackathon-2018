from google_images_download import google_images_download

for category in ["T-shift", "pants", "hats", "bag"]: 
    response = google_images_download.googleimagesdownload()   #class instantiation
    arguments = {"keywords":category, "limit":100, "print_urls":True}   #creating list of arguments
    paths = response.download(arguments)   #passing the arguments to the function
    print(paths)
