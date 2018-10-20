from keras.applications.resnet50 import ResNet50
from keras.preprocessing import image
from keras.applications.resnet50 import preprocess_input, decode_predictions
import tensorflow as tf
import numpy as np

def get_resNet50_graph_model():
    graph = tf.get_default_graph()
    return graph, ResNet50(weights='imagenet')

def make_inference(graph, model, img_path):
    img = image.load_img(img_path, target_size=(224, 224))
    x = image.img_to_array(img)
    x = np.expand_dims(x, axis=0)
    x = preprocess_input(x)
    with graph.as_default():
        preds = model.predict(x)
    
    print('Predicted:', decode_predictions(preds, top=3)[0])

if __name__ == "__main__": 
    model = get_resNet50_model()
    img_path = 'elephant.jpg'

    make_inference(model, img_path)

