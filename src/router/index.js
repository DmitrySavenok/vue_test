import Vue from 'vue';
import VueRouter from 'vue-router';

import Login from '../components/Login.vue';
import Home from '../components/Home.vue';


Vue.use(VueRouter);

export default new VueRouter({
	scrollBehavior: () => ({ y: 0 }),
	routes: [
		{ path: '/',     component: Login },
		{ path: '/home', component: Home },
		{ path: '*',     redirect: '/' }
	]
});