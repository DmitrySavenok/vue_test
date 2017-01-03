import 'es6-promise';

// var autoprefixer = require('autoprefixer');

import Vue from 'vue';
import VueI18n from 'vue-i18n';
import App from './App.vue';
import store from './store';
import router from './router';
import { sync } from 'vuex-router-sync';


// Export to separate module?

const locales = {
	eng: {
		message: {
			header: "RIMI LMS 3.0 (ENG)"
		},
		popups: {
			goalQm: 'Goal QM popup text here ENG',
			goalInfo: 'Goal Info popup text here ENG'
		}
	},
	ee: {
		message: {
			header: "RIMI LMS 3.0 (EE)"
		},
		popups: {
			goalQm: 'Goal QM popup text here EE',
			goalInfo: 'Goal Info popup text here EE'
		}
	},
	lv: {
		message: {
			header: "RIMI LMS 3.0 (LV)"
		},
		popups: {
			goalQm: 'Goal QM popup text here LV',
			goalInfo: 'Goal Info popup text here LV'
		}
	},
	lt: {
		message: {
			header: "RIMI LMS 3.0 (LT)"
		},
		popups: {
			goalQm: 'Goal QM popup text here LT',
			goalInfo: 'Goal Info popup text here LT'
		}
	},
	es: {
		message: {
			header: "El Custom Header"
		},
		popups: {
			goalQm: 'Goal QM popup text here ESPANOL',
			goalInfo: 'Goal Info popup text here ESPANOL'
		}
	}
}

Vue.use(VueI18n);
Vue.config.lang = 'eng';

Object.keys(locales).forEach(function(lang) {
	Vue.locale(lang, locales[lang])
});


// var info = autoprefixer().info();
// console.log(info);


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