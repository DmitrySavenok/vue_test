import Vue from 'vue';
import VueRouter from 'vue-router';

import { createMainView } from '../views/CreateMainView';
import Login from '../components/Login.vue';
import Home from '../views/HomeView.vue';


Vue.use(VueRouter);

export default new VueRouter({
	scrollBehavior: () => ({ y: 0 }),
	routes: [
		{ path: '/',          component: Login },
		{ path: '/home',      component: createMainView('home') },
		{ path: '/goals',     component: createMainView('goals') },
		{ path: '/courses',   component: createMainView('courses') },
		{ path: '/resources', component: createMainView('resources') },
		{ path: '*',     redirect: '/' }
	]
});