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



export function fetchCourses( userId ) {
	return fetch('courses')
}

/*
 * Get goals for specific user
 * TODO: similar functions for courses/tests etc.
 * + get just user pin? (not whole object)
 * @param {Object} user
 * @return {Promise}
 */
export function fetchGoals( userId ) {
	return fetch(`goals?user_id=${userId}`)
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