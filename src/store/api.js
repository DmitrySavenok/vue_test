// API functions
// fetching data etc.


import axios from 'axios';




export function fetch ( child ) {

	// tbf we need only to fetch user data
	// or fetch course list too?

	console.log('fetch function called');

	return new Promise((resolve, reject) => {
		axios.get(`http://localhost:3000/${child}`).then( (res) => {
			resolve(res.data);
		})
		.catch( (err) => {
			reject(err);
		});
	})

}

export function patchData ( child, data ) {

	// tbf we need only to fetch user data
	// or fetch course list too?

	console.log(child);
	console.log(data);

	console.log('patch function called');

	return new Promise((resolve, reject) => {
		axios.patch(`http://localhost:3000/${child}`, data).then( (res) => {
			resolve(res.data);
		})
		.catch( (err) => {
			reject(err);
		});
	})

}


export function fetchCourses( userId ) {
	console.log('fetch courses + ')
	console.log(userId);
	// Separation for mandatory/optional courses

	// Mandatory:
	return fetch('courses/?course_mandatory=true')
}

/*
 * Get goals for specific user
 * TODO: similar functions for courses/tests etc.
 * + get just user pin? (not whole object)
 * @param {Object} user
 * @return {Promise}
 */
export function fetchGoals( userId ) {
	return fetch(`goals?userId=${userId}`)
}

export function fetchGoalTasks( goalId ) {
	return fetch(`goal_tasks?goal_task_id=${goalId}`)
}


// Will change ID to pin (?)
export function fetchUser (id) {
	console.log('fetchUser function called, id: ' + id);
	// return fetch('manager')
	return fetch(`users/${id}`)
}

// Should add limit (?)
// Called from HANDLE_ADDITIONAL_FIELD
export function fetchNotifications() {
	console.log('fetching notifications');
	return fetch('notifications');
}

export function fetchNews() {
	console.log('fetching news');
	return fetch('news');
}

export function fetchResources() {
	console.log('fetching resources');
	return fetch('resources');
}

export function fetchCourseSectionDescription( type ) {
	return fetch(`${type}_courses`);
}


// PATCH functions

export function patchTaskPercentage( taskId, percentage ) {
	console.log('patchTaskPercentage');
	return patchData(`goal_tasks/${taskId}`, { "task_complete": percentage } )
}