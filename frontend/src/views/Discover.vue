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
				<footer class="card-footer">
					<b-icon
						class="distance-icon"
						icon="map-marker-distance"
						size="is-small">
					</b-icon>
					<span>10km</span>
				</footer>
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
.card-content {
	padding: 10px;
}
.card-footer {
	padding: 5px;
	display: flex;
	align-items: center;
}
.distance-icon {
	margin: 0 10px;
}
</style>
