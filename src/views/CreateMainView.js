import Home from './HomeView.vue';


export function createMainView (type) {
	return {
		name: `${type}-main-view`,
		beforeMount() {
			return this.$store.dispatch('FETCH_MAIN_BLOCKS_DATA', { type })
		},
		render (h) {
			return h(Home, { props: { type }} )
		}
	}
}