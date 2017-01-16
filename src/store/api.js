// API functions
// fetching data etc.


import axios from 'axios';



function apiPostCall( child, data ) {


	console.log('API POST call called');

	console.log(data);

	return new Promise((resolve, reject) => {
		axios({
			method: 'post',
			url: `http://localhost/server/test.php?r=${child}`,
			data: data
		}).then( (res) => {
			console.log('DATA: ');
			console.log(res);
			resolve(res.data);
		})
		.catch( (err) => {
			reject(err);
		});
	});

}

function apiGetCall( child ) {

	return new Promise((resolve, reject) => {
		axios({
			method: 'get',
			url: `http://localhost/server/test.php?r=${child}`
		}).then( (res) => {
			console.log('DATA: ');
			console.log(res);
			resolve(res.data);
		})
		.catch( (err) => {
			reject(err);
		});
	});

}


export function fetchPHP( child ) {


	console.log('fetch PHP function called');

	return new Promise((resolve, reject) => {
		axios.get(`http://localhost/server/api_v0.php?r=${child}`).then( (res) => {
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


export function fetchCourses( userId, userHash ) {

	console.log('fetch courses for userId: ' + userId + ' hash: ' + userHash);

	// Separation for mandatory/optional courses

	// Mandatory:
	return apiGetCall(`courses&userId=${userId}&userHash=${userHash}`)
	// return fetch('courses/?course_mandatory=true')

}

/*
 * Get goals for specific user
 * TODO: similar functions for courses/tests etc.
 * + get just user pin? (not whole object)
 * @param {Object} user
 * @return {Promise}
 */
export function fetchGoals( id, hash ) {
	// return fetch(`goals?userId=${userId}`)


	return apiGetCall(`goals&userId=${id}&userHash=${hash}`)
}

export function fetchGoalTasks( goalId, id, hash ) {
	// return fetch(`goal_tasks?goal_task_id=${goalId}`)

	// console.log('ayy');
	// return false;
	return apiGetCall(`goal_tasks&goalId=${goalId}&userId=${id}&userHash=${hash}`)
}


// Will change ID to pin (?)
export function fetchUser(id, hash) {
	console.log('fetchUser function called, id: ' + id + ' hash: ' + hash);
	// return fetch('manager')
	return apiGetCall(`users&userId=${id}&userHash=${hash}`)
}

// Should add limit (?)
// Called from HANDLE_ADDITIONAL_FIELD
export function fetchNotifications( userId, userHash ) {
	console.log('fetching notifications PHP');
	return apiGetCall(`notifications&userId=${userId}&userHash=${userHash}`);
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

export function patchTaskPercentage( taskId, percentage, userId, userHash ) {
	console.log('patchTaskPercentage');
	// return patchData(`goal_tasks/${taskId}`, { "task_complete": percentage } )
	return apiPostCall(`set_task_percentage`, { "task_id": taskId, "task_percentage": percentage, "userId": userId, "userHash": userHash });
}
export function patchTaskDescription( taskId, taskDescription, userId, userHash ) {
	console.log('patchTaskDescription');
	// return patchData(`goal_tasks/${taskId}`, { "task_description": taskDescription } )
	return apiPostCall(`set_task_description`, { "task_id": taskId, "task_description": taskDescription, "userId": userId, "userHash": userHash });
}
export function patchGoalName( goalId, goalName, userId, userHash ) {
	console.log('patchGoalName');
	// TODO: NEED TO CHECK USER ID TOO
	// return patchData(`goals/1`)
	return apiPostCall(`set_goal_name`, { "goal_id": goalId, "goal_name": goalName, "userId": userId, "userHash": userHash });
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