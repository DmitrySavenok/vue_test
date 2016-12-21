<template>

	<div 
		:data-completed="convertedPrc(task.task_complete)" 
		:class="'goal-bg-' + goalIndex + ' graph-part-' + index" 
		:style="{ height: convertedPrc(task.task_complete) + 'px', width: convertedPrc(task.task_complete) + 'px' }"
		class="graph-part">
		<!-- {{index}} -->
		<!-- {{task.task_complete}} -->
	</div>

</template>

<script>


export default {

	name: 'GoalTaskPart',
	data: function() {
		return {

		}
	},
	props: ['index', 'goalIndex', 'task'],

	computed: {

		goalTasks() {
			return this.$store.state.goalTasks;
		}
		
	},
	methods: {
		convertedPrc(prc) {
			return ( 40 + ( 55 * (+prc / 100) ) );
		}
	}
}

</script>

<style lang="stylus" scoped>

</style>