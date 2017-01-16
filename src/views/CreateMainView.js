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
					this.$store.dispatch('FETCH_USER', { id: +userId, hash: userHash }).then( ans => {
						console.log('FETCH USER ANSWER: ');
						console.log(ans);
						return this.$store.dispatch('FETCH_MAIN_BLOCKS_DATA', { type })
					}).catch( err => {
						console.log('error while trying to fetch user data');
					});
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