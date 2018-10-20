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
          <div class="add-item_form_category">
            <div class="add-item_form_category_label">
              Select item category :
            </div>
            <div class="control">
              <div class="select">
                <select class="add-item_form_category_selector input" v-model="itemData.category">
                  <option value="" v-for="category in categories">{{category}}</option>
                </select>
              </div>
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
      categories: []
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
      console.log(this.itemData)
      this.itemData['userId'] = 1;
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
      this.images = [];
    },
    imageUploaded: function () {
      for(var i = 0; i < this.images.length; i++) {
        this.uploadImageCloudinary(this.images[0])
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
      })
    }
  }
};
</script>

<style lang="scss" scoped>
  .label {
    text-align: left;
  }
  .add-item_form_category .select {
    width: 100%;
  }
</style>
