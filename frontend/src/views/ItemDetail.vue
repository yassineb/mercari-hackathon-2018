<template>
	<div>
		<div class="columns">
			<div class="column is-three-fifths centered is-offset-one-fifth">
				<img class="item-image" :src="item.images[0]"/>
				<div class="item-header">
					<h1>{{item.title}}</h1>
					<div>{{item.owner}}</div>
				</div>
				<div class="item-body">
					<div class="reviews">
						<div class="review-title">Reviews</div>
						<div class="review" v-for="review in item.reviews">
							<div class="comment">
								{{review.comment}}
							</div>
							<b-icon
								v-if="review.rating"
								class="distance-icon"
								icon="thumb-up"
								size="is-small">
							</b-icon>
							<b-icon
								v-else
								class="distance-icon"
								icon="thumb-down"
								size="is-small">
							</b-icon>
						</div>
					</div>
					<a class="button is-primary">Borrow</a>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import api from "@/api"
import Slick from 'vue-slick'

export default {
  name: "ItemDetail",
	data() {
		return {
			item: {}
		}
	},
  async mounted() {
		let response = await api.get(`items/${this.itemId}`)
		this.item = response.data
  },
	computed: {
		itemId() {
			return this.$route.params.itemId
		}
	},
	components: {
		Slick
	}
};
</script>

<style lang="scss" scoped>
.header {
	height: 300px;	
}
.item-layout {
	display: flex;
}
h1 {
	font-weight: bold;
	font-size: 24px;
}
.item-info {
	flex-grow: 0.3;
}
.item-image {
	width: 100%;
	height: 300px;
}
.item-header { 
	display: flex;
	justify-content: space-between;
	align-items: center;
}
.reviews {
	text-align: left;
	width: 400px;
}
.review-title {
	font-size: 18px;
}
.review {
	display: flex;
	padding: 10px;
	justify-content: space-between;
	border-top: 1px solid #cccccc;
}
.item-body {
	display: flex;
	margin-top: 40px;
	justify-content: space-between;
}
</style>
