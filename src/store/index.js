import Vue from 'vue';
import Vuex from 'vuex';
import { fetchGoals, fetchUser, fetchCourses } from './api';

Vue.use(Vuex);

const store = new Vuex.Store({

	state: {
		loggedIn: false,
		renderStage: 0,
		users:   {/*  */},
		goals:   {/*  */},
		courses: {

			first_row: [ "Astronomy", "sales", "Dark Arts" ],
			second_row: [ "game", "text", "somethingelse" ]

		},
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

		// ids - course unique IDS
		FETCH_COURSES: ({ commit, state }, { userPosition }) => {

			let userCourses = state.courses[userPosition];
			// let ids = state.coruses.filter(id => !state.courses[id])
			if ( userCourses.length ) {
				return fetchCourses(userCourses).then(courses => {

					let wat = {
						"something": "here",
						"somethingElse": "here2"
					}
					courses.forEach(course => {
						console.log(course);
						userCourses.includes(course.courseName) ? courses[course.courseId] = Array(course) : '';
					});
					console.log(courses);
					commit('SET_COURSES'), { wat }
				})
			}
			// else {
				// return Promise.resolve()
			// }
		},
		// ids - GOAL UNIQUE IDS
		FETCH_GOALS: ({ commit, state }, { ids }) => {
			ids = ids.filter(id => !state.goals[id])
			if ( ids.length ) {
				return fetchGoals(ids).then(goals => commit('SET_GOALS'), { goals })
			} else {
				return Promise.resolve()
			}
		},

		// The can't be a user in our state alredy
		// TODO: remake with that in mind (state.users[id] check is irrelevant)
		FETCH_USER: ({ commit, state }, { id }) => {
			console.log('FETCH_USER dispatched, id: ' + id);
			// console.log(state.users[id]);
			return state.users[id]
				? Promise.resolve(state.users[id])
				: fetchUser(id).then(user => { console.log(user); commit('SET_USER', { user })})
		}

	},

	mutations: {
		SET_COURSES: (state, { wat } ) => {
			console.log(wat);
			courses.data.forEach( course => {
				if ( course ) {
					Vue.set(state.lists.currentUserCourses, course.id, course)
				}
			})
		},
		SET_GOALS: (state, { goals }) => {
			goals.forEach( goal => {
				if ( goal ) {
					Vue.set(state.goals, goal.id, goal)
				}
			})
		},
		SET_USER: (state, { user }) => {
			console.log(user);
			console.log('SET_USER mutation called');
			Vue.set(state.users, 'currentUser', user)
			state.renderStage = 1;
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
 * ? Should change in the future
 */

store.changePath = (path, { router }) => {
	console.log('Changing path to: ' + path);
	router.push(path);
	// router.push(path);
}



export default store;