import Vue from 'vue';
import VueI18n from 'vue-i18n';
import App from './App.vue';
import store from './store';
import router from './router';
import { sync } from 'vuex-router-sync';


// Export to separate module?

const locales = {
	en: {
		message: {
			header: "Custom header (Visible on all pages)"
		}
	},
	es: {
		message: {
			header: "El Custom Header"
		}
	}
}

Vue.use(VueI18n);
Vue.config.lang = 'es';

Object.keys(locales).forEach(function(lang) {
	Vue.locale(lang, locales[lang])
});





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