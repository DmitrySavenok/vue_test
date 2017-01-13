import Home from './HomeView.vue';
import docCookies from '../scripts/cookies.js';


export function createMainView (type) {
	return {
		name: `${type}-main-view`,
		beforeMount() {

			let activeUser = this.$store.state.users;


			// console.log(activeUser['currentUser']);
			// console.log('COOKIES: ');
			// console.log(docCookies.getItem('userId'));

			let userId = docCookies.getItem('userId');
			let userHash = docCookies.getItem('userHash');


			if ( !activeUser['currentUser'] ) {
				if ( userId ) {
					this.$store.dispatch('FETCH_USER', { id: +userId, hash: userHash });
					return this.$store.dispatch('FETCH_MAIN_BLOCKS_DATA', { type })
				} else {
					this.$store.changePath('/', { router: this.$router });
					return;
				}
			}

			return this.$store.dispatch('FETCH_MAIN_BLOCKS_DATA', { type })
			// this.$store.dispatch('FETCH_USER', { id:123 });
		},
		render (h) {
			return h(Home, { props: { type }} )
		}
	}
}