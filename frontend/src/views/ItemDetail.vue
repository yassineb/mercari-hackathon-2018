<template>
	<div>
		<div class="columns">
			<div class="column is-three-fifths centered is-offset-one-fifth">
				<div class="images-horizontal">
					<div 
						:style="{ backgroundImage: 'url(' + item.images[0] + ')' }"
						class="item-image"/>
					<div class="images-vertical">
						<div 
							v-if="item.images.length > 1"
							:style="{ backgroundImage: 'url(' + item.images[1] + ')' }"
							class="item-image"/>
						<div 
							v-if="item.images.length > 2"
							:style="{ backgroundImage: 'url(' + item.images[2] + ')' }"
							class="item-image"/>
					</div>
				</div>
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
					<a @click="borrowing = true" class="button is-primary">Borrow</a>
				</div>
				<b-modal :active.sync="borrowing" has-modal-card>
					<div class="modal-card" style="width: auto">
						<header class="modal-card-head">
							<p class="modal-card-title">Select the dates</p>
						</header>
						<section class="modal-card-body">
							<div
								class="date"
								@click="selectDate(date)"
								:class="{selected: isDateInRange(date)}"
								v-for="date in item.availableDates">
									{{ date | dateFormat}}
							</div>
						</section>
						<footer class="modal-card-foot">
							<button class="button" type="button" @click="borrowing=false">Close</button>
							<button class="button is-primary" @click="borrow" :disabled="!selectedDates.to">Borrow</button>
						</footer>
					</div>
				</b-modal>
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
			item: {},
			selectedDates: {
				from: null,
				to: null
			},
			borrowing: false
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
	methods: {
		async borrow() {
			this.borrowing = false
			await api.post("/borrow", {
				start: this.selectedDates.from,
				end: this.selectedDates.to,
				item_id: this.itemId
			})
			this.$router.push({name: 'Discover'})
		},
		selectDate(date) {
			if (this.selectedDates.from) {
				if (this.selectedDates.to) {
					this.selectedDates.to = null
					this.selectedDates.from = null
				} else {
					this.selectedDates.to = date
				}
			} else {
				this.selectedDates.from = date
			}
		},
		isDateInRange(date) {
			if (this.selectedDates.from) {
				if (this.selectedDates.to) {
					return date >= this.selectedDates.from && date <= this.selectedDates.to
				} else {
					return date === this.selectedDates.from
				}
			} else {
				return false
			}
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
.date {
	padding: 10px;
	margin: 5px;
	background: #eeeeee;
	cursor: pointer;
	&:hover {
		background: #cccccc;
	}
	&.selected {
		background: #7957d5;
	}
}
.item-image {
	flex-grow: 1;
	background-repeat: no-repeat;
	background-position: center;
	background-size: cover;
}
.images-horizontal {
	display: flex;
	height: 300px;
}
.images-vertical {
	display: flex;
	flex-grow: 1;
	flex-direction: column;
}
</style>
