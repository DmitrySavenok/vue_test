'use strict';

import Vue from 'vue';
import Vuex from 'vuex';	
import { 
	fetchUser, 
	fetchNotifications, fetchNews, 
	fetchGoals, fetchGoalTasks, 
	fetchCourses, fetchCourseSectionDescription, 
	fetchResources
} from './api';

import {
	patchTaskPercentage,
	patchTaskDescription,
	createEmptyGoal,
	clearGoals
} from './api';

Vue.use(Vuex);



if (!Array.prototype.includes) {
  Array.prototype.includes = function(searchElement /*, fromIndex*/) {
    'use strict';
    if (this == null) {
      throw new TypeError('Array.prototype.includes called on null or undefined');
    }

    var O = Object(this);
    var len = parseInt(O.length, 10) || 0;
    if (len === 0) {
      return false;
    }
    var n = parseInt(arguments[1], 10) || 0;
    var k;
    if (n >= 0) {
      k = n;
    } else {
      k = len + n;
      if (k < 0) {k = 0;}
    }
    var currentElement;
    while (k < len) {
      currentElement = O[k];
      if (searchElement === currentElement ||
         (searchElement !== searchElement && currentElement !== currentElement)) { // NaN !== NaN
        return true;
      }
      k++;
    }
    return false;
  };
}

function msieversion() {

    var ua = window.navigator.userAgent;
    var msie = ua.indexOf("MSIE ");

    if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./))  // If Internet Explorer, return version number
    {
        return true;
    }
    else  // If another browser, return 0
    {
    	return false;
    }

}


const store = new Vuex.Store({

	state: {
		loggedIn: false,
		renderStage: 0,
		users:   {/*  */},
		goals:   {/*  */},

		mainBlockState: 'home',
		goalTutorialPhase: {
			0: 'que'
		},
		isIe: msieversion(),

		showSection: 1,
		goalToShow: {
			0: 'Goal1'
		},
		goalTasks: {},

		// Position matrix (?)
		// Instead of providing list on positions for every course we can specify which courses will be shown to each position
		// FIRST VERSION - OFFICE (no positions, only departments)
		positionCourses: {

			first_row: [ { "id": 1, courseName: "Sales" }, { "id": 99, "courseName": "sales" }, { "id": 3, "courseName": "Sanitary Minimum" } ],
			second_row: [ { "id": 100, "courseName": "game" }, { "id": 2, "courseName": "Defence Against the Dark Arts" }, { "id": 101, "courseName": "somethingelse" } ]

		},
		lists: {
			news: {},
			notifications: {},
			courseSections: {},
			resources: {},
			courseDescriptions: {},
			currentUserGoals:   {
				Goal1: 'Kappa',
				Goal3: 'Keepo'
			},
			// howToSections: [
			// 	{
			// 		"SectionName": "Learn from colleagues",
			// 		"SectionDescription": "'Learn from colleagues' section description here, interpolation could be needed for markup"
			// 	}
			// ]
			// Will split currentUserCourses[] in 2 (Mandatory / Optional)
			// Or merge with currentUserTests[] and split in 3
			currentUserCourses: {
			},
			currentUserTests:   []
		}
	},

	actions: {
		// STUFF TO FETCH:
		// 	 * Courses ( + tests )
		// 	 * Goals
		// 	 * User data
		// 	 * Fetch news/notifications


		SET_LANG: ({ commit, state }, { lang }) => {

			commit('SET_LANG', { lang });

		},


		FETCH_MAIN_BLOCKS_DATA: ({ commit, state }, { type }) => {
			console.log('FETCH_MAIN_BLOCKS_DATA');
			console.log(type);

			commit('SET_MAIN_BLOCK_STATE', { type });
			commit('SET_DEFAULT_SECTION', { type });


			// Additinal Field
			switch(type) {
				case 'home':
					fetchNotifications( state.users.currentUser.id, state.users.currentUser.hash ).then(notifications => {
						// some filtering logic here

						notifications = notifications.filter( notification => !state.lists.notifications[notification.id] );
						if ( notifications.length ) {
							// console.log('setting notifications');
							commit('SET_NOTIFICATIONS', { notifications });
							// console.log(notifications);
						}
					});
					fetchNews().then(news => {
						news = news.filter( article => !state.lists.news[article.id] )
						if ( news.length ) {
							// console.log('setting news');
							commit('SET_NEWS', { news });
						}
					});
					break;
				case 'goals':
					console.log('fetch goals data');

					let userId = 123

					if ( state.users.currentUser ) {
						let userId = state.users.currentUser.id 
					}
					
					if ( userId ) {
						fetchGoals(userId).then(goals => { goals[0] != undefined ? commit('SET_GOALS', { goals: goals[0].user_goals }) : console.log('no goals ;('); } )
					} else {
						console.log('no user id specified');
					}
					

					break;
				case 'goals-how-to':
					console.log('goals how to');

					break;
				case 'courses':
					// console.log('fetch courses data');

					fetchCourseSectionDescription( 'mandatory' ).then( mandatoryCourses => {
						commit('SET_COURSE_SECTION_DESC', { courseDesc: mandatoryCourses });
						fetchCourseSectionDescription( 'optional' ).then( optionalCourses => {
							commit('SET_COURSE_SECTION_DESC', { courseDesc: optionalCourses });
						});
					}
					);

					let userPosition = 'first_row';

					if ( state.users.currentUser ) {
						userPosition = state.users.currentUser.position;
					}

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
									console.log(posCoursesNames);
									posCoursesNames.includes(course.course_name) ? showCourses.push(course) : '';
								});
								commit('SET_COURSES', { courses: showCourses }) 
							}
						})
					}
					break;
				case 'resources':
					// console.log('fetch resources data');

					fetchResources().then(resources => {
						// console.log(resources);

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
								// console.log(notifications);
							});
							fetchNews().then(news => {
								// console.log(news);
								commit('SET_NEWS', { news });
							});
				}

		},
		HANDLE_MAIN_FIELD: ({ commit, state }, { page }) => {
			// do nothing
		},

		HIDE_NOTIFICATION: ({ commit, state }, { notificationId }) => {

			commit('HIDE_NOTIFICATION', { notificationId })

		},


		// handle conditional rendering
		HANDLE_RENDERING: ({ commit, state }, { renderStage, additionalBlockState = '' }) => {

			commit('CHANGE_PATH', { path: renderStage })

			// detect what we're changing (render stage - whole page update? - additional block? )

		},

		// ids - course unique IDS
		FETCH_COURSES: ({ commit, state }, { userPosition }) => {

			// MOVING THIS TO FETCH_MAIN_BLOCK_DATA

			// let positionCourses = state.positionCourses[userPosition];

			// positionCourses = positionCourses.filter( course => !state.lists.currentUserCourses[course.id]);

			// // Maybe will be possible to fetch only those courses we need (not all and then sort out here)

			// if ( positionCourses.length ) {
			// 	return fetchCourses(positionCourses).then(courses => { 
						
			// 		let posCoursesNames = [],
			// 			showCourses = [];

			// 		positionCourses.forEach(posCourse => posCoursesNames.push(posCourse.courseName));


			// 		// Filter out courses that we alredy have in our list
			// 		// courses = courses.filter( course => !state.lists.currentUserCourses[course.courseId] );
			// 		if ( courses.length ) {

			// 			courses.forEach(course => {
			// 				posCoursesNames.includes(course.courseName) ? showCourses.push(course) : '';
			// 			});

			// 			commit('SET_COURSES', { courses: showCourses }) 

			// 		}
			// 	})

			// }
		},
		// ids - goal unique IDS
		FETCH_GOALS: ({ commit, state }, { id }) => {

			// console.log(id);

			// ids = ids.filter(id => !state.goals[id])


			// if ( id ) {
			// 	return fetchGoals(id).then(goals => { console.log(goals); commit('SET_GOALS', { goals: goals[0].user_goals }); } )
			// } else {
			// 	return Promise.resolve()
			// }
		},
		// Will need to add FETCH_NEWS aswell (?)

		// The can't be a user in our state alredy
		// TODO: remake with that in mind (state.users[id] check is irrelevant)
		FETCH_USER: ({ commit, state }, { id }) => {

			if ( id ) {

				// TEMP
				// Clear courses/goals
				commit('CLEAR_SOME_DATA');


				// console.log('FETCH_USER dispatched, id: ' + id);
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
		},


		SET_GOAL_TO_DISPLAY: ({ commit, state }, { goalId }) => {
			if ( goalId ) {

				// Could check if tasks are alredy in the state obj. and return resolved promise

				return fetchGoalTasks(goalId).then( tasks => {
					// tasks = tasks.filter( task => task.task_goal_id === goalId );
					commit('SET_GOAL_TO_DISPLAY', { goalId, goalTasks: tasks });
				});
			}
		},
		SET_GOAL_PHASE: ({ commit, state }, { phaseNum }) => {
			commit('SET_GOAL_PHASE', { phaseNum });
		},
		CREATE_EMPTY_GOAL: ({ commit, state }, { userId }) => {
			// console.log(createEmptyGoal(userId));
			createEmptyGoal(userId).then( answer => {
				console.log('the answer: ');
				console.log(answer);
				
				if ( userId ) {
					fetchGoals(userId).then(goals => { goals[0] != undefined ? (commit('SET_GOALS', { goals: goals[0].user_goals }), commit('SET_GOAL_PHASE', { phaseNum: 3 })) : console.log('no goals ;('); } )
				} else {
					console.log('no user id specified');
				}

			}).catch( (e) => {
				console.log('the error: ');
				console.log(e);
			});
		},
		CLEAR_GOALS: ({ commit, state }, { userId }) => {
			clearGoals(userId).then( answer => {
				commit('CLEAR_GOALS');
				fetchGoals(123).then(goals => { goals[0] != undefined ? commit('SET_GOALS', { goals: goals[0].user_goals }) : console.log('no goals ;('); } )
			});
		},

		UPDATE_TASK_COMPLETION_STATUS: ({ commit, state }, { taskId, percentage }) => {

			if ( taskId && percentage ) {
				return patchTaskPercentage(taskId, percentage).then( updatedTask => {
					// console.log(answer);
					commit('UPDATE_TASK_COMPLETION_STATUS', { updatedTask });
				});
			}

		},

		UPDATE_TASK_DESCRIPTION: ({ commit, state }, { taskId, taskDescription }) => {

			if ( taskId && taskDescription ) {
				return patchTaskDescription(taskId, taskDescription).then( updatedTask => {
					// console.log(answer);
					commit('UPDATE_TASK_DESCRIPTION', { updatedTask });
				});
			}

		},

		UPDATE_GOAL_NAME: ({ commit, state }, { goalId, goalName }) => {

			//TODO: NOT READY

			// if ( goalId && goalName ) {

			// 	return patchGoalName(goalId, goalName).then( updatedGoal => {
			// 		commit('UPDATE_GOAL_NAME', { updatedGoal });
			// 	});

			// }

		}

	},

	mutations: {


		SET_LANG: (state, { lang }) => {

			if ( Vue.config.lang !== lang ) {
				console.log('Setting new language: ' + lang);
				Vue.config.lang = lang;
			}

		},

		//TEMP
		CLEAR_SOME_DATA: (state) => {
			store.state.goals = {};
			// store.state.lists.currentUserCourses = {};
		},

		SET_GOAL_TO_DISPLAY: (state, { goalId, goalTasks }) => {
			// console.log('Goal id: ' + goalId);
			// console.log('Tasks: ');
			// console.log(goalTasks);
			Vue.set(state.goalToShow, 0, 'Goal' + goalId);
			state.goalTasks = {};
			goalTasks.forEach( goalTask => {
				Vue.set(state.goalTasks, goalTask.id, goalTask );
			});
		},
		UPDATE_TASK_COMPLETION_STATUS: (state, { updatedTask }) => {
			//Updating task completion percentage right away ( bind it to task compeiton graph )

			Vue.set(state.goalTasks, updatedTask.id, updatedTask);

		},
		UPDATE_TASK_DESCRIPTION: (state, { updatedTask }) => {
			Vue.set(state.goalTasks, updatedTask.id, updatedTask);
		},

		CHANGE_PATH: (state, { path } ) => {
			store.state.route = path;
		},
		SET_MAIN_BLOCK_STATE: (state, { type }) => {
			store.state.mainBlockState = type;
		},
		SET_DEFAULT_SECTION: (state, { type }) => {
			switch(type) {
				case 'courses':
					store.state.showSection = 'mandatory';
					break;
				case 'resources':
					store.state.showSection = 1;
					break;
				default:
					store.state.showSection = 1;
					console.log('default SET_DEFAULT_SECTION action');
			}
		},
		SET_NOTIFICATIONS: (state, { notifications }) => {
			notifications.forEach( notification => {
				Vue.set(state.lists.notifications, notification.id, notification)
			});
		},
		HIDE_NOTIFICATION: (state, { notificationId }) => {
			Vue.set(state.lists.notifications, notificationId, "seen");
		},
		SET_NEWS: (state, { news }) => {
			news.forEach( article => {
				Vue.set(state.lists.news, article.id, article)
			});
		},
		SET_COURSES: (state, { courses } ) => {
			courses.forEach( course => {
				if ( course ) {
					Vue.set(state.lists.currentUserCourses, course.id, course)
				}
				// if ( course && course.course_mandatory ) {
				// 	Vue.set(state.lists.currentUserCourses.mandatory, course.id, course)
				// } else if ( course && !course.course_mandatory ) {
				// 	Vue.set(state.lists.currentUserCourses.optional, course.id, course)
				// }
			});
			state.renderStage = 2;
		},
		SET_COURSE_SECTION_DESC: (state, { courseDesc }) => {

			Vue.set(state.lists.courseSections, courseDesc.category_handle, courseDesc)

		},
		SET_GOALS: (state, { goals }) => {
			goals.forEach( goal => {
				if ( goal ) {
					Vue.set(state.goals, 'Goal' + goal.goal_id, goal)
				}
			})
		},
		SET_GOAL_PHASE: (state, { phaseNum }) => {
			Vue.set(state.goalTutorialPhase, 0, 'phase-' + phaseNum);
		},
		CLEAR_GOALS: (state) => {
			state.goals = {};
		},
		SET_RESOURCES: (state, { resources }) => {
			resources.forEach( resource => {
				Vue.set(state.lists.resources, resource.id, resource);
			})
		},
		SET_USER: (state, { user }) => {
			// console.log(user);
			// console.log('SET_USER mutation called');
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