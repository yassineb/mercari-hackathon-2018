import mqtt from 'mqtt'
import store from '@/store.js'

var client = mqtt.connect(process.env.VUE_APP_MQTT_HOST)

client.on('connect', function () {
    client.subscribe('mercari', function () {})
})
 
client.on('message', function (topic, message) {
    store.dispatch('refreshItems')
})

