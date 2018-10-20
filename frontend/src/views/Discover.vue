<template>
	<div class="discover">
		<div class="search-filters">
			<gmap-autocomplete
				class="input search-filter"
				@place_changed="updateLocation">
			</gmap-autocomplete>
			<b-input class="search-filter" v-model="search" placeholder="Search"></b-input>
		</div>
		<div class="products-container">
			<div class="card product" v-for="product in filteredProducts" @click="openItem(product.id)">
				<div class="card-image">
					<figure class="image">
						<img :src="product.image">
					</figure>
				</div>
				<div class="card-content">
					<div class="content">
						{{product.title}}
					</div>
				</div>
				<footer class="card-footer">
					<b-icon
						class="distance-icon"
						icon="map-marker-distance"
						size="is-small">
					</b-icon>
					<span>{{product.distance}}</span>
				</footer>
			</div>
		</div>
	</div>
</template>

<script>
import api from "@/api";

export default {
  name: "Discover",
	data() {
		return {
			products: [],
			search: null,
		}
	},
  mounted() {
		this.updateItems()
  },
	computed: {
		filteredProducts() {
			if (!this.search) return this.products
			return this.products.filter(product => {
				return product.title.toLowerCase()
									.includes(this.search.toLowerCase())
			})
		}	
	},
	methods: {
		openItem(itemId) {
			this.$router.push({name: 'itemDetail', params: {itemId}})
		},
		updateLocation(location) {
			let coordinates = {
				latitude: location.geometry.location.lat(),
				longitude: location.geometry.location.lng()
			}
			this.updateItems(coordinates)
		},
		async updateItems(location) {
			let response = await api.get('/items', {params: location})
			this.products = response.data
		}
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
.search-filter {
	width: 300px;
}
.search-filters {
	margin: 50px;
	display:flex;
	justify-content: space-around;
}
</style>
