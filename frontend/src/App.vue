<template>
  <div id="app">
		<div id="nav">
			<img class="logo" src="./assets/wardrobe-icon.png" @click="discover">
			<div id="actions">
				<div class="action" @click="addItem">Add Item</div>
			</div>
		</div>
    <router-view/>
  </div>
</template>
<script>
import api from "@/api";

export default {
  name: "App",
	methods: {
		discover() {
			this.$router.push({name:"Discover"})
		},
		addItem() {
			this.$router.push({name:"AddItem"})
		}
	}
}
</script>

<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
	height: 50px;
	padding: 0 20px;
	border-bottom: 1px solid #cccccc;
	display: flex;
	align-items: center;
	justify-content: space-between;
}
#actions {
	display: flex;
	cursor: pointer;
}
.action {
	line-height: 50px;
	padding: 0 20px;
	&:hover {
		background: #eeeeee;
	}
}
.logo {
	height: 20px;
	cursor: pointer;
}
</style>
