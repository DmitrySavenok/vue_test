<template>

	<div class="wrapper">
		<div v-if="goal" @click="showGoal" class="goal-item" :class="'goal-item-' + goalIndex">

			<!-- Existing goal here -->
			<h4>{{goal.goal_name}}</h4>

			<div class="goal-graph-wrapper">

				<div class="percentage">{{overallPercentage(goalIndex)}}%</div>

				<template v-for="(task, index) in goalTasks">
					<GoalTaskPart v-if="+task.task_goal_id === goalIndex"
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
			<span>{{notSelectedDate}}</span>
			<!-- <span>285 B.C - 476 A.D</span> -->

			<div class="goal-graph-wrapper">
				<!-- Remade just for one tooltip (for now) -->
				<div class="tooltip-wrapper" v-if="goalIndex === 1">
					<div @click="createEmptyGoal" class="tooltip" :class="'tooltip-' + goalIndex"></div>
					<div class="tooltip-text" :class="'tooltip-text-' + goalIndex">{{goalIndex === 1 ? tooltip : ''}}</div>
				</div>

				<div class="percentage"> 0% </div>

				<div @mouseover="mouseOver" @mouseleave="mouseLeave" v-bind:class="'goal-bg-' + goalIndex" class="graph-part graph-part-1 empty-goal"></div>
				<div @mouseover="mouseOver" @mouseleave="mouseLeave" v-bind:class="'goal-bg-' + goalIndex" class="graph-part graph-part-2 empty-goal"></div>
				<div @mouseover="mouseOver" @mouseleave="mouseLeave" v-bind:class="'goal-bg-' + goalIndex" class="graph-part graph-part-3 empty-goal"></div>
				<div @mouseover="mouseOver" @mouseleave="mouseLeave" v-bind:class="'goal-bg-' + goalIndex" class="graph-part graph-part-4 empty-goal"></div>

			</div>

		</div>
	</div>



</template>

<script>

import GoalTaskPart from './GoalTaskPart.vue';

function setGoalToDisplay( store, goalId ) {
	return store.dispatch('SET_GOAL_TO_DISPLAY', { goalId });
}
function setEmptyGoal(store, userId) {
	store.dispatch('CREATE_EMPTY_GOAL', { userId });
}


export default {

	name: 'GoalComponent',
	data: function() {
		return {
			counter: 0,
			tooltip: 'Izvēlies kādu no trīs mērķiem un sāc plānot savu izaugsmi! Katrs mērķis satur četrus uzdevumus.'
		}
	},
	props: ['goal', 'goalIndex', 'goalTutorialPhase'],
	components: {
		GoalTaskPart
	},

	mounted () {
		// Make it once
		console.log('here');
		console.log(this.$options.propsData);
		setGoalToDisplay(this.$store, 1);
	},

	computed: {

		notSelectedDate() {
			let date = new Date();
			return date.getDate() + '.' + (+date.getMonth() + 1) + '.' + date.getFullYear() + ' -  _______'
		},

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
					if ( +allTasks[task].task_goal_id === +goalId ) {
						totalScore+= Math.floor(+allTasks[task].task_complete);
					}
				}
			}

			// 4 tasks (parts) => One goal (100%) 
			totalScore = totalScore / 400 * 100;

			return Math.floor(totalScore);

		},
		createEmptyGoal: function() {

			let userId = this.$store.state.users['currentUser'].id;

			setEmptyGoal( this.$store, userId );

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


.wrapper
	width 100%
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
		padding-left 75px
		color rimiGrey
	
	span
		padding-left 75px
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


			&:nth-last-of-type(4)
				height 40px
				width 40px
				
				border-radius 0px 100px 0px 0px
				left 125px
				bottom 125px
				&.goal-bg-1
					background rgb(227, 36, 112)
				&.goal-bg-2
					background rgb(199, 159, 0)
				&.goal-bg-3
					background rgb(230, 109, 3)
					
			&:nth-last-of-type(3)
				border-radius 0px 0px 100px 0px
				left 125px
				top 125px
				
				height 45px
				width 45px
				
				&.goal-bg-1
					background rgb(255, 102, 154)
				&.goal-bg-2
					background rgb(255, 204, 0)
				&.goal-bg-3
					background rgb(190, 93, 7)
					
			&:nth-last-of-type(2)
				border-radius 0px 0px 0px 100px
				right 125px
				top 125px
				
				height 60px
				width 60px
				
				&.goal-bg-1
					background rgb(226, 73, 125)
				&.goal-bg-2
					background rgb(254, 228, 126)
				&.goal-bg-3
					background rgb(250, 120, 5)
					
			&:nth-last-of-type(1)
				border-radius 100px 0px 0px 0px
				right 125px
				bottom 125px
				
				&.goal-bg-1
					background rgb(161, 41, 113)
				&.goal-bg-2
					background rgb(233, 190, 20)
				&.goal-bg-3
					background rgb(255, 159, 74)
					
		.empty-goal
			height 40px
			width 40px
				
		.bigger
			height 100px
			width 100px

.tooltip-wrapper
	transform rotate(45deg)
	height 250px
	position absolute
	top 46px
	left -18px
	z-index 10
	
	.tooltip-text
		position relative
		height 45px
		width 340px
		top 93px
		left 407px
		background rimiPink
		color #FFF
		padding 10px 20px
		
		&:before
			content ''
			display block
			position absolute
			height 25px
			width 25px
			left -13px
			top 19px
			background rimiPink
			transform rotate(45deg)
			
		&:after
			content ''
			display block
			position absolute
			width 179px
			height 2px
			background rimiPink
			left -195px
			top 31px

		&.tooltip-text-2
			background transparent
			&:before
				background rimiOrange
			&:after
				background rimiOrange
		&.tooltip-text-3
			background transparent
			&:before
				background rimiOrange
			&:after
				background rimiOrange
	.tooltip
		position absolute
		height 173px
		width 173px
		border-radius 50%
		left 36px
		top 37px
		cursor pointer
		
		&.tooltip-1
			border 2px solid rimiPink
		&.tooltip-2
			border 2px solid rimiOrange
		&.tooltip-3
			border 2px solid rimiOrange		

	.goal-tutorial
		display none


</style>