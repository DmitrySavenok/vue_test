<template>

	<div v-if="goal" @click="showGoal" class="goal-item" :class="'goal-item-' + goalIndex">

		<!-- Existing goal here -->
		<h4>Goal {{goalIndex}}</h4>
		<span>285 B.C - 476 A.D</span>

		<div class="goal-graph-wrapper">

			<div class="percentage">{{overallPercentage(goalIndex)}}%</div>

			<template v-for="(task, index) in goalTasks">
				<GoalTaskPart v-if="task.task_goal_id === goalIndex"
					:index="index"
					:goalIndex="goalIndex"
					:task="task">
				</GoalTaskPart>
			</template>
			
		</div>

	</div>


	<div v-else class="goal-item">
		
		<!-- Empty goal here -->

		<h4>Goal {{goalIndex}}</h4>
		Empty

		<div class="goal-graph-wrapper">

			<div class="percentage"> 0% </div>

			<div @mouseover="mouseOver" @mouseleave="mouseLeave" v-bind:class="'goal-bg-' + goalIndex" class="graph-part graph-part-1 empty-goal"></div>
			<div @mouseover="mouseOver" @mouseleave="mouseLeave" v-bind:class="'goal-bg-' + goalIndex" class="graph-part graph-part-2 empty-goal"></div>
			<div @mouseover="mouseOver" @mouseleave="mouseLeave" v-bind:class="'goal-bg-' + goalIndex" class="graph-part graph-part-3 empty-goal"></div>
			<div @mouseover="mouseOver" @mouseleave="mouseLeave" v-bind:class="'goal-bg-' + goalIndex" class="graph-part graph-part-4 empty-goal"></div>	

		</div>

	</div>


</template>

<script>

import GoalTaskPart from './GoalTaskPart.vue';

function setGoalToDisplay( store, goalId ) {
	return store.dispatch('SET_GOAL_TO_DISPLAY', { goalId });
}

export default {

	name: 'GoalComponent',
	data: function() {
		return {
			counter: 0
		}
	},
	props: ['goal', 'goalIndex'],
	components: {
		GoalTaskPart
	},

	mounted () {
		console.log('here');
		console.log(this.$options.propsData);
		setGoalToDisplay(this.$store, 1);
	},

	computed: {

		goalTasks() {
			return this.$store.state.goalTasks;
		}
		
	},

	methods: {

		overallPercentage( goalId ) {

			let allTasks = this.$store.state.goalTasks
			let totalScore = 0;

			for ( let task in allTasks ) {
				if ( allTasks.hasOwnProperty(task)) {
					if ( allTasks[task].task_goal_id === goalId ) {
						totalScore+= Math.floor(+allTasks[task].task_complete);
					}
				}
			}

			// 4 tasks (parts) => One goal (100%) 
			totalScore = totalScore / 400 * 100;

			return Math.floor(totalScore);

		},

		// showTaskPercentage() {

		// 	[].forEach.call(goalTasks, (goalTask) => {
		// 		let completionPercentage = goalTask.getAttribute('data-completion');
		// 		if ( completionPercentage !== 'empty' ) {
		// 			let convertedPercentage = 30 + ( 45 * ( +completionPercentage / 100 ) );
		// 			// this.$data['goal' + goalIndex]['part' + index].height = convertedPercentage;
		// 			// this.$data['goal' + goalIndex]['part' + index].width = convertedPercentage;
		// 			index++;
		// 		}
		// 	});

		// },
		showGoal() {

			setGoalToDisplay(this.$store, this.goal.goal_id);

		},
		mouseOver(e) {
			e.target.classList.add('bigger')
		},
		mouseLeave(e) {
			e.target.classList.remove('bigger')
		}
	},
	updated: function() {

		// this.showTaskPercentage();
	}
}

</script>

<style lang="stylus">

@import '../../styles/variables.styl';

// borders(n, a, b, c, d)
// 	border-top n solid a
// 	border-right n solid b
// 	border-bottom n solid c
// 	border-left n solid d


.goal-item
	height 100%
	width 100%
	cursor pointer
	
	p
		margin 0px
	
	h4
		font-family 'Neris'
		font-size 21px
		font-weight 400
		margin 10px 0px 0px 0px
		padding-left 60px
		color rimiGrey
	
	span
		padding-left 60px
		color rimiGrey

	.goal-graph-wrapper
		position relative
		height 250px
		width 250px
		left 0px
		right 0px
		margin auto
		transform rotate(-45deg)
		
		.percentage
			height 60px
			width 60px
			position absolute
			left 0px
			top 0px
			right 0px
			bottom 0px
			margin auto
			z-index 2
			background #FFF
			border-radius 50%
			text-align center
			font-size 21px
			font-family 'Neris', OpenSans, Arial, sans-serif
			line-height 58px
			transform rotate(45deg)

		.graph-part
			height 75px
			width 75px
			position absolute
			transition all 0.3s ease-out
			background green


		.graph-part-1
		.graph-part-5
		.graph-part-9
			height 40px
			width 40px
			
			border-radius 0px 100px 0px 0px
			left 125px
			bottom 125px
			
			&.goal-bg-1
				background rgb(204, 51, 102)
			&.goal-bg-2
				background rgb(255, 204, 0)
			&.goal-bg-3
				background rgb(255, 102, 0)
				
		.graph-part-2
		.graph-part-6
		.graph-part-10
			border-radius 0px 0px 100px 0px
			left 125px
			top 125px
			
			height 45px
			width 45px
			
			&.goal-bg-1
				background rgb(255, 102, 153)
			&.goal-bg-2
				background rgb(255, 204, 102)
			&.goal-bg-3
				background rgb(255, 153, 51)
				
		.graph-part-3
		.graph-part-7
		.graph-part-11
			border-radius 0px 0px 0px 100px
			right 125px
			top 125px
			
			height 60px
			width 60px
			
			&.goal-bg-1
				background rgb(204, 51, 102)
			&.goal-bg-2
				background rgb(255, 204, 0)
			&.goal-bg-3
				background rgb(255, 102, 0)
				
		.graph-part-4
		.graph-part-8
		.graph-part-12
			border-radius 100px 0px 0px 0px
			right 125px
			bottom 125px
			
			&.goal-bg-1
				background rgb(153, 51, 102)
			&.goal-bg-2
				background rgb(204, 153, 0)
			&.goal-bg-3
				background rgb(204, 102, 0)
					
		.empty-goal
			height 40px
			width 40px
				
		.bigger
			height 100px
			width 100px

</style>