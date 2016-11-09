import Vue from 'vue';
import Vuex from 'vuex';
import { fetchGoals, fetchUser } from './api';

Vue.use(Vuex);

const store = new Vuex.Store({

	state: {
		loggedIn: false,
		users: {/*  */},
		goals: {/*  */},
		lists: {
			currentUserGoals:   [],
			// Will split currentUserCourses[] in 2 (Mandatory / Optional)
			// Or merge with currentUserTests[] and split in 3
			currentUserCourses: [],
			currentUserTests:   []
		}
	},

	actions: {
		// STUFF TO FETCH:
		//   * Courses ( + tests )
		//   * Goals
		//   * User data
		//   *

		FETCH_GOALS: ({ commit, state }, { user }) => {
			ids = ids.filter(id => !state.goals[id])
			if ( ids.length ) {
				return fetchGoals(ids).then(goals => commit('SET_GOALS'), { goals })
			} else {
				return Promise.resolve()
			}
		},

		FETCH_USER: ({ commit, state }, { id }) => {
			console.log('FETCH_USER dispatched, id: ' + id);
			console.log(state.users[id]);
			return state.users[id]
				? Promise.resolve(state.users[id])
				: fetchUser(id).then(user => commit('SET_USER', { user }))
		}

	},

	mutations: {
		SET_GOALS: (state, { goals }) => {
			goals.forEach( goal => {
				if ( goal ) {
					Vue.set(state.goals, goal.id, goal)
				}
			})
		},
		SET_USER: (state, { user }) => {
			console.log('SET_USER mutation called');
			console.log(user);
			console.log(user.data.id);
			Vue.set(state.users, 'currentUser', user.data)
		}
	},

	getters: {
		// ids of courses that should be displayed

		activeIds ( state ) {
			if ( 0 ) {
				// logic
			} else {
				return []
			}
		},

		// items (course name/descriptions/status etc.)
		activeItems ( state, getters ) {
			return getters.activeIds.map(id => state.items[id].filter(_ => _))
		}

	}


});


/**
 * Path handling
 */

store.changePath = (path, { router }) => {
	console.log('Changing path to: ' + path);
	router.push(path);
	// router.push(path);
}



export default store;