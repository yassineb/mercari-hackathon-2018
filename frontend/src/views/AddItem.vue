<template>
  <div class="add-item-section">
    <div class="add-item-container">
      <div class="add-item">
        <div class="add-item_top">
          <div class="add-item_top_title">
            <span class="add-item_top_title-text">
              Add item screen
            </span>
          </div>
        </div>

        <div class="add-item_form">
          <div class="add-item_form_image">
            <div class="add-item_form_image_selector">
              Select or drop image for the product
              <input type="file"
              @change="itemImageUpload()">
            </div>
          </div>
          <div class="add-item_form_title">
            <div class="add-item_form_title_label">
              Item title :
            </div>
            <input type="text" v-model="itemData.title">
          </div>
          <div class="add-item_form_description">
            <div class="add-item_form_description_label">
              Item description :
            </div>
            <textarea v-model="itemData.description" placeholder="Add item description">
            </textarea>
          </div>
          <div class="add-item_form_category">
            <div class="add-item_form_category_label">
              Select item category :
            </div>
            <select class="add-item_form_category_selector" v-model="itemData.category">
              <option disabled>Please select one</option>
              <option value="" v-for="category in categories">{{category}}</option>
            </select>
          </div>
          <div class="add-item_form_brand">
            <div class="add-item_form_brand_label">
              Select item brand :
            </div>
            <input type="text" v-model="itemData.brand" placeholder="Brand of the item">
          </div>
        </div>
        <div class="add-item_action">
          <div class="add-item_action_save">
            <button type="button" name="button">Save</button>
            <button type="button" name="button">Reset</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
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
    }
  }
};
</script>
