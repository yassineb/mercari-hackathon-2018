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
            <b-upload v-model="itemData.images"
              multiple
              drag-drop>
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
                  <option disabled>Please select one</option>
                  <option value="" v-for="category in categories">{{category}}</option>
                </select>
              </div>
            </div>
          </div>
          <div class="add-item_form_brand field">
            <div class="add-item_form_brand_label label">
              Select item brand :
            </div>
            <div class="control">
              <input class="input" type="text" v-model="itemData.brand" placeholder="Brand of the item">
            </div>
          </div>
          <div class="add-item_action field is-grouped">
            <div class="add-item_action_save control">
              <button type="button" class="button is-primary" name="button">Save</button>
            </div>
            <div class="control">
              <button type="button" class="button is-text" name="button">Reset</button>
            </div>
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

<style lang="scss" scoped>
  .label {
    text-align: left;
  }
  .add-item_form_category .select {
    width: 100%;
  }
</style>
