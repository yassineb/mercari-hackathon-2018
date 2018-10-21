from predictor import Predictor
import urllib.request

from flask import Flask, request, jsonify
app = Flask(__name__)
# graph, model  = predict.get_resNet50_graph_model()

predictor = Predictor()

@app.route("/")
def hello():

    img_path = 'elephant.jpg'    
    print(predict.make_inference(graph, model, img_path))

    return "Hello World!"

@app.route("/predict", methods=['POST'])
def predict_category():
    filename = download_file_and_get_filename()
    prediction = predictor.predict(filename)
    return jsonify(prediction)


def download_file_and_get_filename():
    image = request.get_json()['image']
    filename = "tmp/"+image.split("/")[-1]
    print(filename)    
    urllib.request.urlretrieve(image, filename)
    return filename

if __name__ == "__main__":
    app.run(host = '0.0.0.0')

