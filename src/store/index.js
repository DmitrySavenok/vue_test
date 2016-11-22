'use strict';

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
		additionalBlockState: 'ayy',
		mainBlockTemplate: 'none',

		// Position matrix (?)
		// Instead of providing list on positions for every course we can specify which courses will be shown to each position
		// FIRST VERSION - OFFICE (no positions, only departments)
		positionCourses: {

			first_row: [ { "id": 1, courseName: "Astronomy" }, { "id": 99, "courseName": "sales" }, { "id": 3, "courseName": "Dark Arts" } ],
			second_row: [ { "id": 100, "courseName": "game" }, { "id": 2, "courseName": "Defence Against the Dark Arts" }, { "id": 101, "courseName": "somethingelse" } ]

		},
		lists: {
			currentUserGoals:   [],
			// Will split currentUserCourses[] in 2 (Mandatory / Optional)
			// Or merge with currentUserTests[] and split in 3
			currentUserCourses: {},
			currentUserTests:   []
		}
	},

	actions: {
		// STUFF TO FETCH:
		// 	 * Courses ( + tests )
		// 	 * Goals
		// 	 * User data
		// 	 * Fetch news


		// handle conditional rendering
		HANDLE_RENDERING: ({ commit, state }, { renderStage, additionalBlockState = '' }) => {

			// detect what we're chainging (render stage - whole page update? - additional block? )

		},

		// ids - course unique IDS
		FETCH_COURSES: ({ commit, state }, { userPosition }) => {

			let positionCourses = state.positionCourses[userPosition];

			positionCourses = positionCourses.filter( course => !state.lists.currentUserCourses[course.id]);

			// Maybe will be possible to fetch only those courses we need (not all and then sort out here)

			if ( positionCourses.length ) {
				return fetchCourses(positionCourses).then(courses => { 
						
					let posCoursesNames = [],
						showCourses = [];

					positionCourses.forEach(posCourse => posCoursesNames.push(posCourse.courseName));


					// Filter out courses that we alredy have in our list
					// courses = courses.filter( course => !state.lists.currentUserCourses[course.courseId] );
					if ( courses.length ) {

						courses.forEach(course => {
							posCoursesNames.includes(course.courseName) ? showCourses.push(course) : '';
						});

						commit('SET_COURSES', { courses: showCourses }) 

					}
				})

			}
		},
		// ids - goal unique IDS
		FETCH_GOALS: ({ commit, state }, { id }) => {

			console.log(id);

			// ids = ids.filter(id => !state.goals[id])
			if ( id ) {
				return fetchGoals(id).then(goals => { console.log(goals); commit('SET_GOALS', { goals: goals[0].user_goals }); } )
			} else {
				return Promise.resolve()
			}
		},
		// Will need to add FETCH_NEWS aswell (?)

		// The can't be a user in our state alredy
		// TODO: remake with that in mind (state.users[id] check is irrelevant)
		FETCH_USER: ({ commit, state }, { id }) => {


			// TEMP
			// Clear courses/goals
			commit('CLEAR_SOME_DATA');


			console.log('FETCH_USER dispatched, id: ' + id);
			// console.log(state.users[id]);
			return state.users[id]
				? Promise.resolve(state.users[id])
				: fetchUser(id).then(user => { console.log(user); commit('SET_USER', { user })})
				.catch( (err) => {
					console.log('fetch failed, changing path to / ');
					// commit('CHANGE_PATH', { path: '/' });
				});
		}

	},

	mutations: {

		//TEMP
		CLEAR_SOME_DATA: (state) => {
			store.state.goals = {};
			store.state.lists.currentUserCourses = {};
		},


		CHANGE_PATH: (state, { path } ) => {
			store.state.route = path;
		},
		SET_COURSES: (state, { courses } ) => {
			courses.forEach( course => {
				if ( course ) {
					Vue.set(state.lists.currentUserCourses, course.courseId, course)
				}
			});
			state.renderStage = 2;
		},
		SET_GOALS: (state, { goals }) => {
			state.mainBlockTemplate = 'goalsView';
			goals.forEach( goal => {
				if ( goal ) {
					Vue.set(state.goals, goal.goal_id, goal)
				}
			})
		},
		SET_USER: (state, { user }) => {
			state.mainBlockTemplate = 'none';
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