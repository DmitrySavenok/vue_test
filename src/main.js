import Vue from 'vue';
import App from './App.vue';
import store from './store';
import router from './router';
import { sync } from 'vuex-router-sync';

sync(store, router)

// const app = new Vue({
// 	el: '#app',
// 	router,
// 	render: h => h(App)
// })

const app = new Vue({
	router,
	store,
	...App
}).$mount('#app')

export { app, router, store }