import os

from keras import applications
from keras.preprocessing.image import ImageDataGenerator
from keras import optimizers
from keras.models import Sequential
from keras.layers import Dropout, Flatten, Dense
from keras import Model

from keras.applications.resnet50 import ResNet50

def clean_filenames(dir_name):
    for root, subdirs, files in os.walk(dir_name):
        for f in files:
            r = f.replace(" ","")
            if( r != f):
                os.rename(root+"/"+f,root+"/"+r)
                print (f)

# path to the model weights files.
weights_path = '../keras/examples/vgg16_weights.h5'
top_model_weights_path = 'fc_model.h5'
# dimensions of our images.
img_width, img_height = 150, 150
batch_size = 16

train_data_dir = 'datasets/category'
clean_filenames(train_data_dir)

train_datagen = ImageDataGenerator(
    rescale=1. / 255,
    shear_range=0.2,
    zoom_range=0.2,
    horizontal_flip=True)

test_datagen = ImageDataGenerator(rescale=1. / 255)

error = True
print("cleaning image files: ")
while error == True:
    error = False
    train_generator = train_datagen.flow_from_directory(
        train_data_dir,
        target_size=(img_height, img_width),
        batch_size=batch_size,
        class_mode='categorical')
    nb_train_samples = len(train_generator.filenames)
    try:
        i = 0
        for batch in iter(train_generator):
            print(".", end="")
            if i > len(train_generator.filenames)/batch_size + 2:
                break
            i+=1
    except Exception as e:
        filename = str(e).split("'")[1]
        print (f"removing {filename}")
        os.remove(filename)
        error = True

epochs = 1

# Generate a model with all layers (with top)
vgg16 = applications.VGG16(weights='imagenet', include_top=False, input_shape = (img_width, img_height,3))

#Add a layer where input is the output of the  second last layer 
x = Flatten()(vgg16.layers[-1].output)
x = Dense(train_generator.num_classes, activation='softmax', name='predictions')(x)

#Then create the corresponding model 
model = Model(inputs=vgg16.input, outputs=x)
# set the first 25 layers (up to the last conv block)
# to non-trainable (weights will not be updated)
for layer in model.layers[:18]:
    layer.trainable = False

# compile the model with a SGD/momentum optimizer
# and a very slow learning rate.
model.compile(loss='categorical_crossentropy',
              optimizer=optimizers.SGD(lr=1e-4, momentum=0.9),
              metrics=['accuracy'])

# prepare data augmentation configuration

model.fit_generator(
    train_generator,
    samples_per_epoch=nb_train_samples,
    epochs=epochs,
    )

index_to_class_name = {v:k for k,v in train_generator.class_indices.items()}

model.save("category.model")
import pickle
with open ("category.class_indices", "wb") as f:
    pickle.dump(index_to_class_name, f)