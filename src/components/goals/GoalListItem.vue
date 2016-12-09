<template>

	<div class="goal-item">
		
		<!-- {{goalToShow}} -->

		<h2 class="goal-heading">Goal {{goalToShow.goal_id}}</h2>
		<p class="goal-date">Date here</p>
		<!-- <pre>{{goalTasks}}</pre> -->

		<template>

			<div class="task-wrapper" v-for="(task, index) in goalTasks">
				<template v-if="task.task_goal_id === goalToShow.goal_id">
					<h4 class="task-heading">{{task.task_name}}</h4>
					<p class="task-description">{{task.task_description}}</p>
					<div class="task-slider">
						<span>{{index}}</span>

						<input type="range" v-model="goalTasks[index].task_complete" min="0" max="100">
						<input type="submit" name="submit" @click="saveGoalProgress(task.id)">
					</div>
					<span>%: {{goalTasks[index].task_complete}}</span>
	<!-- 				<div>{{rangeNum}}</div>
					<div>{{rangeNum[index]}}</div> -->

					<!-- {{task}} -->
				</template>
			</div>			

		</template>


	</div>

</template>

<script>

function updateTaskCompletionStatus( store, taskId, percentage ) {
	console.log(store, taskId, percentage);
	return store.dispatch('UPDATE_TASK_COMPLETION_STATUS', { taskId, percentage });
}


export default {

	name: 'GoalListItem',
	data: function() {
		return {
			rangeNum: {
				0: 0,
				1: 0,
				2: 0,
				3: 0
			},
			bindTask: ''
		}
	},
	props: ['goalToShow'],

	computed: {

		goalTasks() {
			return this.$store.state.goalTasks;
		}

	},


	// This part right here is redundant
	// Won't need it if we'll bind 'v-model' to task_complete field directly
	mounted: function() {
		console.log(this.$options.propsData);
		// for ( let i = 0; i < this.$options.propsData.goalToShow.goal_tasks.length; i++ ) {
			// this.$data.rangeNum[i] = this.$options.propsData.goalToShow.goal_tasks[i].task_complete;
		// }
		console.log('ayy mounted');
	},
	updated: function() {
		console.log('data updated');
	},
	methods: {
		saveGoalProgress: function( taskId ) {

			// POST CURL:
			// curl -H "Accept: application/json" -H "Content-Type: application/json" -X POST (or PATCH?) '{"our": "data_here"}' http://our_url:here
			//e.g. curl -H "Accept: application/json" -H "Content-Type: application/json" -X PATCH -d '{"department: "New department"}' http://localhost:3000/users/1337

			let taksCompletion = this.$store.state.goalTasks[taskId].task_complete;
			console.log(taskId);
			console.log(this.$store.state.goalTasks[taskId]);

			updateTaskCompletionStatus( this.$store, taskId, taksCompletion );

			console.log('ayy save them progress changes');
		}
	}
}

</script>

<style lang="stylus" scoped>

.goal-heading
.goal-date
.task-heading
	margin 0px
	padding 0px


</style>