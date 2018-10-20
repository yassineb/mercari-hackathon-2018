import predict
import numpy as np
import urllib.request

from flask import Flask, request, jsonify
app = Flask(__name__)
graph, model  = predict.get_resNet50_graph_model()

@app.route("/")
def hello():

    img_path = 'elephant.jpg'    
    print(predict.make_inference(graph, model, img_path))

    return "Hello World!"

@app.route("/predict_things", methods=['GET', 'POST'])
def predict_things():
    
    image = request.get_json()['image']
    filename = image.split("/")[-1]
    print(filename)
    
    urllib.request.urlretrieve(image, filename)
    prediction = predict.make_inference(graph, model, filename)

    top_choice = prediction[0][0][1]
    top_probability = float(prediction[0][0][2])
    print(top_choice, top_probability)
    return jsonify(top_choice, top_probability)

if __name__ == "__main__":
    app.run()

