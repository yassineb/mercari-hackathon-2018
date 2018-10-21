<template>
  <div class="add-item-section">
    <div class="add-item-container">
      <div class="add-item section">
        <div class="add-item_top">
          <div class="add-item_top_title">
            <span class="add-item_top_title-text">
              Add item details
            </span>
          </div>
        </div>

        <div class="add-item_form container">
          <b-field clas="add-item_form_images">
            <b-upload v-model="images"
              multiple
              drag-drop
              @input="imageUploaded">
              <section class="section">
                <div class="content has-text-centered">
                  <p>
                    <b-icon
                    icon="upload"
                    size="is-large">
                    </b-icon>
                  </p>
                  <p>Drop your files here or click to upload</p>
                </div>
              </section>
            </b-upload>
          </b-field>
          <div class="uploaded-images">
            <div class="image tpopup" v-for="(image, index) in itemData.images">
              <img v-bind:src="image">
              <div id="tclose" @click="removeImage(index)">X</div>
            </div>
          </div>
          <div class="add-item_form_title field">
            <div class="add-item_form_title_label label">
              Item title :
            </div>
            <div class="control">
              <input class="input" type="text" v-model="itemData.title">
            </div>
          </div>
          <div class="add-item_form_description field">
            <div class="add-item_form_description_label label">
              Item description :
            </div>
            <div class="control">
              <textarea class="textarea" v-model="itemData.description" placeholder="Add item description">
              </textarea>
            </div>
          </div>
          <div class="add-item_form_category field">
            <div class="add-item_form_brand_label label">
              Item Category :
            </div>
            <div class="control">
              <input class="input" type="text" v-model="itemData.category" placeholder="Category of the item">
            </div>
          </div>
          <div class="add-item_form_brand field">
            <div class="add-item_form_brand_label label">
              Item brand :
            </div>
            <div class="control">
              <input class="input" type="text" v-model="itemData.brand" placeholder="Brand of the item">
            </div>
          </div>
          <div class="add-item_form_location field">
            <div class="add-item_form_location_label label">
              Pickup location :
            </div>
            <div class="control">
              <gmap-autocomplete
                class="input pickup-location"
                @place_changed="updateLocation">
              </gmap-autocomplete>
            </div>
          </div>
          <div class="add-item_form_color field">
            <div class="add-item_form_brand_color label">
              Item color :
            </div>
            <div class="control">
              <input class="input" type="text" v-model="itemData.color" placeholder="Color of the item">
            </div>
          </div>
          <div class="add-item_action field is-grouped">
            <div class="add-item_action_save control">
              <button
              type="button"
              class="button is-primary"
              @click="addItem()">Save</button>
            </div>
            <div class="control">
              <button type="button" class="button is-text" name="button" @click="reset">Reset</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import cloudinary from "cloudinary-core";

export default {
  name: "AddItem",
  data() {
    return {
      itemData: {
        images: [],
        title: null,
        description: null,
        category: null,
        brand: null,
        color: null
      },
      images: [],
      categories: [],
      coordinates: null
    }
  },
  mounted() {
    this.getCategories()
  },
  methods: {
    itemImageUpload: function() {
      //TODO handleFileChange(e) {
      // Whenever the file changes, emit the 'input' event with the file data.
      //this.$emit('input', e.target.files[0])
    //}
    },
    getCategories: function() {
      this.categories = [
        "Shirt",
        "T-Shirt",
        "Trousers",
        "Jeans",
        "Clothing Accessory",
        "Shoes"
      ]
    },
    addItem: function() {
      console.log('add item function called')
      this.itemData['userId'] = 1;
      if (this.coordinates !== null) {
        this.itemData['latitude'] = this.coordinates.latitude
        this.itemData['longitude'] = this.coordinates.longitude
      }
      console.log(this.itemData)
      axios.post("http://172.16.230.84:3000/items", this.itemData)
        .then((response) => {
          console.log("success")
          this.reset()
        })
    },
    reset: function() {
      this.itemData= {
        images: [],
        title: null,
        description: null,
        category: null,
        brand: null,
        color: null
      }
      this.images = []
      this.coordinates = []
    },
    imageUploaded: function () {
      for(var i = 0; i < this.images.length; i++) {
        this.uploadImageCloudinary(this.images[i])
      }
    },
    updateLocation(location) {
			this.coordinates = {
				latitude: location.geometry.location.lat(),
				longitude: location.geometry.location.lng()
			}
		},
    uploadImageCloudinary: function (file) {
      console.log('upload image cloudinary called')
      var url = 'https://api.cloudinary.com/v1_1/' + 'yassineb' + '/upload'

      var formData = new FormData()
      formData.append('file', file)
      formData.append('upload_preset', 'qmbgf2vz')
      axios.post(url, formData, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then((response) => {
        this.itemData.images.push(response.data.url)
				this.predict(response.data.url)
        this.images=[]
      })
    },
		async predict(image) {
      let prediction = await axios.post(process.env.VUE_APP_ML_URL+"/predict", {image})
			this.itemData.color = prediction.data.color[0].split(' ')[0]
			this.itemData.category = prediction.data.category[0]
			this.itemData.brand = prediction.data.brand[0]
		},
    removeImage: function (index) {
      this.itemData.images.splice(index, 1)
    }
  }
};
</script>

<style lang="scss" scoped>
  .label {
    text-align: left;
  }
  .add-item_form {
    &_category .select {
      width: 100%;
    }
    &_title {
      margin-top: 15px;
    }
  }
  .uploaded-images {
    display: table;
    .image {
      display: table-cell;
      vertical-align: bottom;
      padding-right: 20px;
      img {
        height: 100px;
        width: auto;
        border-radius: 5px;
      }
    }
  }

  #thover{
  position:fixed;
  background:#000;
  width:100%;
  height:100%;
  opacity: .6
}

#tpopup{
  position:absolute;
  width:600px;
  height:180px;
  background:#fff;
  left:50%;
  top:50%;
  border-radius:5px;
  padding:60px 0;
  margin-left:-320px; /* width/2 + padding-left */
  margin-top:-150px; /* height/2 + padding-top */
  text-align:center;
  box-shadow:0 0 10px 0 #000;
}
#tclose{
  position:absolute;
  background: black;
  color: white;
  right: 15px;
  top: -3px;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  line-height: 19px;
  text-align: center;
  font-size: 8px;
  font-weight: bold;
  font-family:'Arial Black', Arial, sans-serif;
  cursor:pointer;
  box-shadow:0 0 10px 0 #000;
}
</style>
