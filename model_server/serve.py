import predict
import numpy as np

from flask import Flask
app = Flask(__name__)
graph, model  = predict.get_resNet50_graph_model()

@app.route("/")
def hello():

    img_path = 'elephant.jpg'    
    predict.make_inference(graph, model, img_path)

    return "Hello World!"
     
if __name__ == "__main__":
    app.run()

