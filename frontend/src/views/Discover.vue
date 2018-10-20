<template>
	<div class="discover">
		<div class="products-container">
			<div class="card product" v-for="product in products">
				<div class="card-image">
					<figure class="image">
						<img :src="product.image">
					</figure>
				</div>
				<div class="card-content">
					<div class="content">
						{{product.name}}
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import axios from "axios";

export default {
  name: "Discover",
	data() {
		return {
			products: []
		}
	},
  async mounted() {
		let response = await axios.get("http://localhost:3000/items")
		this.products = response.data
  }
};
</script>

<style lang="scss" scoped>
.products-container {
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
}
.product {
	margin: 10px;
}
</style>
