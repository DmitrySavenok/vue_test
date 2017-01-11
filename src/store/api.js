// API functions
// fetching data etc.


import axios from 'axios';



export function fetchPHP( child ) {


	console.log('fetch PHP function called');

	return new Promise((resolve, reject) => {
		axios.get(`http://localhost:8080/server/api_v0.php?r=${child}`).then( (res) => {
			console.log('DATA: ');
			console.log(res);
			resolve(res.data);
		})
		.catch( (err) => {
			reject(err);
		});
	})


}


export function fetch( child ) {

	// tbf we need only to fetch user data
	// or fetch course list too?

	console.log('fetch function called');

	return new Promise((resolve, reject) => {
		axios.get(`http://localhost:3000/${child}`).then( (res) => {
		// axios.get(`http://lms-test-json-server.herokuapp.com/${child}`).then( (res) => {
			resolve(res.data);
		})
		.catch( (err) => {
			reject(err);
		});
	})

}

export function patchData( child, data ) {

	console.log('patch function called ( child / data )');

	console.log(child);
	console.log(data);


	return new Promise((resolve, reject) => {
		axios.patch(`http://localhost:3000/${child}`, data).then( (res) => {
		// axios.patch(`http://lms-test-json-server.herokuapp.com/${child}`, data).then( (res) => {
			resolve(res.data);
		})
		.catch( (err) => {
			reject(err);
		});
	})

}

export function postData( child, data ) {

	return new Promise((resolve, reject) => {
		axios.post(`http://localhost:3000/${child}`, data).then( (res) => {
		// axios.patch(`http://lms-test-json-server.herokuapp.com/${child}`, data).then( (res) => {
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
export function fetchUser(id) {
	console.log('fetchUser function called, id: ' + id);
	// return fetch('manager')
	return fetch(`users/${id}`)
}

// Should add limit (?)
// Called from HANDLE_ADDITIONAL_FIELD
export function fetchNotifications() {
	console.log('fetching notifications PHP');
	return fetchPHP('notifications');
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
export function patchTaskDescription( taskId, taskDescription ) {
	console.log('patchTaskDescription');
	return patchData(`goal_tasks/${taskId}`, { "task_description": taskDescription } )
}
export function patchGoalName( goalId, goalName ) {
	console.log('patchGoalName');
	// TODO: NEED TO CHECK USER ID TOO
	// return patchData(`goals/1`)
}


export function createEmptyGoal( userId ) {
	// console.log('creating empty goal for user: ' + userId);
	// console.log(fetch(`goals?userId=${userId}`));

	return new Promise( (resolve, reject) => {
		fetch(`goals?userId=${userId}`).then( (res) => {
			console.log('we here');
			console.log(res);
			let userGoalId = res[0].id;
			resolve(patchData(`goals/${userGoalId}`, { "user_goals": [ { goal_id: 1, goal_name: "Goal 1", goal_description: "", "goal_quarter": 1 },
																		{ goal_id: 2, goal_name: "Goal 2", goal_description: "", "goal_quarter": 1 },
																		{ goal_id: 3, goal_name: "Goal 3", goal_description: "", "goal_quarter": 1 } ] })
			)
		}).catch( (err) => {
			console.log('error here: (creating new user with empty goals?)');
			console.log(err);
			reject(err);
		});
	})

}
export function clearGoals( userId ) {
	// return patchData(`goals/${userId}`, { "user_goals": [] })

	return new Promise( (resolve, reject) => {
		fetch(`goals?userId=${userId}`).then( (res) => {
			console.log('we here');
			console.log(res);
			let userGoalId = res[0].id;
			for ( let i = 1; i < 13; i++ ) {
				patchData(`goal_tasks/${i}`, { "task_name": "", "task_description": "", "task_complete": "0" });
			}
			// Oh my
			resolve(patchData(`goals/${userGoalId}`, { "user_goals": [] })
			)
		}).catch( (err) => {
			console.log('error here: ');
			console.log(err);
			reject(err);
		});
	})
}