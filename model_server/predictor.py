from keras.applications.resnet50 import ResNet50
from keras.preprocessing import image
from keras.applications.resnet50 import preprocess_input, decode_predictions
import tensorflow as tf
import numpy as np
import pickle
import keras

def make_inference(graph, models, img_path, target_size):
    img = image.load_img(img_path, target_size=target_size)
    x = image.img_to_array(img)
    x = np.expand_dims(x, axis=0)
    x = preprocess_input(x)
    preds = []
    with graph.as_default():
        for model in models:
            preds.append(model.predict(x))
    return preds

class Predictor:
    def __init__(self):
        self.graph = tf.get_default_graph()
        # self.resNet50 = ResNet50(weights='imagenet')
        self.category_model = keras.models.load_model("category.model")
        self.category_indices = pickle.load(open("category.class_indices","rb"))
        self.color_model = keras.models.load_model("color.model")
        self.color_indices = pickle.load(open("color.class_indices","rb"))
        self.brand_model = keras.models.load_model("brand.model")
        self.brand_indices = pickle.load(open("brand.class_indices","rb"))


    def predict_stuff(self, img_path):
        preds = make_inference(self.graph, [self.resNet50], img_path, target_size=(224, 224))[0]
        prediction = decode_predictions(preds, top=3)
        top_choice = prediction[0][0][1]
        top_probability = float(prediction[0][0][2])
        return (top_choice, top_probability)

    def predict_category(self, img_path):
        prediction = make_inference(self.graph, [self.category_model], img_path, target_size=(150, 150))[0]
        max_idx = np.argmax(prediction)
        return (self.category_indices[max_idx], float(prediction.flatten()[max_idx]))


    def predict(self, img_path):
        predictions = make_inference(
            self.graph,
            [self.category_model, self.color_model, self.brand_model],
            img_path,
            target_size=(150, 150)
        )
        result = {}
        for name, prediction, indices in zip(
                ["category","color","brand"],
                predictions,
                [self.category_indices, self.color_indices, self.brand_indices]
                ):
            max_idx = np.argmax(prediction)
            result[name]= (indices[max_idx], float(prediction.flatten()[max_idx]))
        return result


if __name__ == "__main__": 
    model = get_resNet50_model()
    img_path = 'elephant.jpg'

    make_inference(model, img_path)

