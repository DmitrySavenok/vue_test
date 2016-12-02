<template>

	<div class="goal-item">
		
		<!-- {{goalToShow}} -->

		<h2 class="goal-heading">Goal {{goalToShow.goal_id}}</h2>
		<p class="goal-date">Date here</p>

		<template>

			<div class="task-wrapper" v-for="(task, index) in goalToShow.goal_tasks">
				<h4 class="task-heading">{{task.task_name}}</h4>
				<p class="task-description">{{task.task_description}}</p>
				<div class="task-slider">
					<span>{{index}}</span>

					<!-- Can bind straight to the TASK_COMPLETE field we've got from DB -->
					<!-- Need to save on some button click though -->

					<input type="range" v-model="goalToShow.goal_tasks[index].task_complete" min="0" max="100">
					<input type="submit" name="submit" @click="saveGoalProgress">
				</div>
				<span>%: {{goalToShow.goal_tasks[index].task_complete}}</span>
				<div>{{rangeNum}}</div>
				<div>{{rangeNum[index]}}</div>

				<!-- {{task}} -->
			</div>			

		</template>


	</div>

</template>

<script>


export default {

	name: 'GoalListItem',
	data: function() {
		return {
			rangeNum: {
				0: 0,
				1: 0,
				2: 0,
				3: 0
			}
		}
	},
	props: ['goalToShow'],


	// This part right here is redundant
	// Won't need it if we'll bind 'v-model' to task_complete field directly
	mounted: function() {
		console.log(this.$options.propsData);
		for ( let i = 0; i < this.$options.propsData.goalToShow.goal_tasks.length; i++ ) {
			this.$data.rangeNum[i] = this.$options.propsData.goalToShow.goal_tasks[i].task_complete;
		}
		console.log('ayy mounted');
	},
	updated: function() {
		console.log('data updated');
	},
	methods: {
		saveGoalProgress: function() {

			// POST CURL:
			// curl -H "Accept: application/json" -H "Content-Type: application/json" -X POST (or PATCH?) '{"our": "data_here"}' http://our_url:here
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