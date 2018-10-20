<template>
	<div class="discover">
		<div class="search-filters">
			<gmap-autocomplete
				class="input search-filter"
				@place_changed="updateLocation">
			</gmap-autocomplete>
			<b-input class="search-filter" v-model="search" placeholder="Search"></b-input>
		</div>
		<div class="items-browser">
			<div class="items-container">
				<div class="card item" v-for="item in filteredItems" @click="openItem(item.id)">
					<div class="card-image">
						<figure class="image">
							<div 
								:style="{ backgroundImage: 'url(' + item.image + ')' }"
								class="item-image"/>
						</figure>
					</div>
					<div class="card-content">
						<div class="content">
							{{item.title}}
						</div>
					</div>
					<footer class="card-footer">
						<b-icon
							class="distance-icon"
							icon="map-marker-distance"
							size="is-small">
						</b-icon>
						<span>{{item.distance}}</span>
					</footer>
				</div>
			</div>
			<div class="items-map">
				<gmap-map
					:center="center"
					:zoom="13"
					style="width: 500px; height: 500px">
					<gmap-marker
						:key="index"
						v-for="(m, index) in filteredItems"
						:position="m.location"
						:clickable="true"
						@click="openItem(item.id)"/>
				</gmap-map>
			</div>
		</div>
	</div>
</template>

<script>
import api from "@/api"
import { mapState, mapActions } from "vuex"

export default {
  name: "Discover",
	data() {
		return {
			search: "",
		}
	},
  mounted() {
		this.refreshItems()
  },
	computed: {
		...mapState(['items']),
		filteredItems() {
			return this.items.filter(item => {
					return item.title.toLowerCase()
									.includes(this.search.toLowerCase())
				})
				.map(item => ({
					...item,
					location: {lat: item.latitude, lng: item.longitude},
					distance: Math.round(item.distance*100)/100 + " km"
					})
				)
		},
		center() {
			if (this.items.length === 0) return {lat: 52.2322584, lng: 20.9842694}
			let latitudes = this.filteredItems.map(item => item.latitude)
			let longitudes = this.filteredItems.map(item => item.longitude)
			let minLat = Math.min(...latitudes)
			let minLng = Math.min(...longitudes)
			let maxLat = Math.max(...latitudes)
			let maxLng = Math.max(...longitudes)
			
			console.log({
				lat: minLat + (maxLat-minLat)/2,
				lng: minLng + (maxLng-minLng)/2
			})
			return {
				lat: minLat + (maxLat-minLat)/2,
				lng: minLng + (maxLng-minLng)/2
			}
		}
	},
	methods: {
		...mapActions(['refreshItems']),
		openItem(itemId) {
			this.$router.push({name: 'itemDetail', params: {itemId}})
		},
		updateLocation(location) {
			let coordinates = {
				latitude: location.geometry.location.lat(),
				longitude: location.geometry.location.lng()
			}
			this.refreshItems(coordinates)
		}
	}
};
</script>

<style lang="scss" scoped>
.items-container {
	display: flex;
	flex-wrap: wrap;
	justify-content: left;
	margin-left: 40px;
	flex-grow: 1;
}
.item {
	margin: 10px;
	height: fit-content;
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
.item-image {
	height: 200px;
	width: 200px;
	background-repeat: no-repeat;
	background-position: center;
	background-size: cover;
}
.items-browser {
	display: flex;
}
.items-map {
	margin-right: 40px;
}
</style>
