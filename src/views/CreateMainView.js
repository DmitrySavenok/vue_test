import Home from './HomeView.vue';


export function createMainView (type) {
	return {
		name: `${type}-main-view`,
		beforeMount() {
			this.$store.dispatch('FETCH_USER', { id:123 });
			return this.$store.dispatch('FETCH_MAIN_BLOCKS_DATA', { type })
		},
		render (h) {
			return h(Home, { props: { type }} )
		}
	}
}