import Vue from "vue"
import App from "./App.vue"
import router from "./router"
import store from "./store"
import "./registerServiceWorker"
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'
import '@mdi/font/css/materialdesignicons.css'
import * as VueGoogleMaps from 'vue2-google-maps'
import moment from 'moment'
import './sync'

Vue.use(VueGoogleMaps, {
	load: {
		key: process.env.VUE_APP_GOOGLE_MAPS_KEY,
		libraries: 'places',
	}
})

Vue.filter('dateFormat', function(value) {
	if (value) {
		return moment(value).format('MM/DD/YYYY hh:mm')
	}
})

Vue.use(Buefy)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app")
