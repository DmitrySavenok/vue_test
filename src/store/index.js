'use strict';

import Vue from 'vue';
import Vuex from 'vuex';	
import { fetchGoals, fetchUser, fetchCourses, fetchNotifications, fetchNews, fetchResources } from './api';

Vue.use(Vuex);

const store = new Vuex.Store({

	state: {
		loggedIn: false,
		renderStage: 0,
		users:   {/*  */},
		goals:   {/*  */},

		mainBlockState: 'home',

		showSection: '',

		// Position matrix (?)
		// Instead of providing list on positions for every course we can specify which courses will be shown to each position
		// FIRST VERSION - OFFICE (no positions, only departments)
		positionCourses: {

			first_row: [ { "id": 1, courseName: "Astronomy" }, { "id": 99, "courseName": "sales" }, { "id": 3, "courseName": "Dark Arts" } ],
			second_row: [ { "id": 100, "courseName": "game" }, { "id": 2, "courseName": "Defence Against the Dark Arts" }, { "id": 101, "courseName": "somethingelse" } ]

		},
		lists: {
			news: {},
			notifications: {},
			resources: {},
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
		// 	 * Fetch news/notifications


		FETCH_MAIN_BLOCKS_DATA: ({ commit, state }, { type }) => {
			console.log('FETCH_MAIN_BLOCKS_DATA');
			console.log(type);

			commit('SET_MAIN_BLOCK_STATE', { type });

			// Additinal Field
			switch(type) {
				case 'home':
					fetchNotifications().then(notifications => {
						// some filtering logic here

						notifications = notifications.filter( notification => !state.lists.notifications[notification.id] );
						if ( notifications.length ) {
							console.log('setting notifications');
							commit('SET_NOTIFICATIONS', { notifications });
							console.log(notifications);
						}
					});
					fetchNews().then(news => {
						news = news.filter( article => !state.lists.news[article.id] )
						if ( news.length ) {
							console.log('setting news');
							commit('SET_NEWS', { news });
						}
					});
					break;
				case 'goals':
					console.log('fetch goals data');
					break;
				case 'courses':
					console.log('fetch courses data');
					break;
				case 'resources':
					console.log('fetch resources data');

					fetchResources().then(resources => {
						console.log(resources);

						resources = resources.filter( resoucre => !state.lists.resources[resoucre.id] );

						if ( resources.length ) {
							commit('SET_RESOURCES', { resources });
						}
					});
					break;
				default:
					console.log('fetch main block data default');
			}
		},

		HANDLE_ADDITIONAL_FIELD: ({ commit, state }, { page }) => {

				switch(page) {
					case 'home':
							fetchNotifications().then(notifications => {
								// some filtering logic here
								// filter out just the latest notifications (can you disable them at all?)
								commit('SET_NOTIFICATIONS', { notifications });
								console.log(notifications);
							});
							fetchNews().then(news => {
								console.log(news);
								commit('SET_NEWS', { news });
							});
				}

		},
		HANDLE_MAIN_FIELD: ({ commit, state }, { page }) => {
				// do nothing
		},


		// handle conditional rendering
		HANDLE_RENDERING: ({ commit, state }, { renderStage, additionalBlockState = '' }) => {

			commit('CHANGE_PATH', { path: renderStage })

			// detect what we're changing (render stage - whole page update? - additional block? )

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

			if ( id ) {

				// TEMP
				// Clear courses/goals
				commit('CLEAR_SOME_DATA');


				console.log('FETCH_USER dispatched, id: ' + id);
				// console.log(state.users[id]);
				// debugger;
				return ( state.users['currentUser'] && state.users['currentUser'].id === id )
					? Promise.resolve(state.users['currentUser'])
					: fetchUser(id).then(user => { console.log(user); commit('SET_USER', { user })})
					.catch( (err) => {
						fetchUser(123).then(user => { console.log(user); commit('SET_USER', { user })})
						console.log('fetch failed, changing path to / ');
						// commit('CHANGE_PATH', { path: '/' });
					});
			}
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
		SET_MAIN_BLOCK_STATE: (state, { type }) => {
			store.state.mainBlockState = type;
		},
		SET_NOTIFICATIONS: (state, { notifications }) => {
			notifications.forEach( notification => {
				Vue.set(state.lists.notifications, notification.id, notification)
			});
		},
		SET_NEWS: (state, { news }) => {
			news.forEach( article => {
				Vue.set(state.lists.news, article.id, article)
			});
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
			goals.forEach( goal => {
				if ( goal ) {
					Vue.set(state.goals, goal.goal_id, goal)
				}
			})
		},
		SET_RESOURCES: (state, { resources }) => {
			resources.forEach( resource => {
				Vue.set(state.lists.resources, resource.id, resource);
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