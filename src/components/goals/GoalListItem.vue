<template>

	<div class="goal-item">
		
		<!-- {{goalToShow}} -->
		
		<div class="goal-header">
			<h2 class="goal-heading">Goal {{goalToShow.goal_id}}</h2>
			<p class="goal-date">Date here</p>
		</div>
		<!-- <pre>{{goalTasks}}</pre> -->

		<template>

			<div :class="index == visibleTaskIndex ? 'visible-slider' : 'hidden-slider'" class="task-wrapper" v-for="(task, index) in goalTasks" v-if="task.task_goal_id === goalToShow.goal_id">
				<!-- <template v-if="task.task_goal_id === goalToShow.goal_id"> -->
					<!-- <h4 class="task-header">{{task.task_name}}</h4> -->
					<h4 class="task-header" @click="showTaskDetails(index)">{{taskNames[index-1]}}</h4>
					
					<template>
						<textarea 
							class="editable-description" 
							@blur="stopEditing(task.id)" 
							v-model="task.task_description"
							v-if="editableTaskIndex == index"></textarea>
						<p v-else class="task-description">{{task.task_description}}</p>
					</template>

					<div class="task-slider" v-show="index == visibleTaskIndex">
						<div class="left-side">
							<div class="hover-popup qm-popup"></div>
							<div class="hover-popup info-popup"></div>
						</div>
						<div class="range-wrapper">
							<input @mouseup="saveGoalProgress(task.id)" type="range" v-model="goalTasks[index].task_complete" min="0" max="100">
							<div class="percentage-labels">
								<span>0%</span>
								<span>25%</span>
								<span>50%</span>
								<span>75%</span>
								<span>100%</span>
							</div>
						</div>
						<button class="edit-task-description" @click="editTaskDescription(index)"></button>
						<!-- <input type="submit" name="submit" @click="saveGoalProgress(task.id)"> -->
					</div>
					<!-- <span>%: {{goalTasks[index].task_complete}}</span> -->

				<!-- </template> -->
			</div>			

		</template>


	</div>

</template>

<script>

function updateTaskCompletionStatus( store, taskId, percentage ) {
	console.log(store, taskId, percentage);
	return store.dispatch('UPDATE_TASK_COMPLETION_STATUS', { taskId, percentage });
}
function updateTaskDescription( store, taskId, taskDescription ) {
	return store.dispatch('UPDATE_TASK_DESCRIPTION', { taskId, taskDescription });
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
			bindTask: '',
			taskNames: [
				'Macos no kolegiem',
				'Macos darba vieta',
				'Izzinu pats',
				'4th option',
				'Macos no kolegiem',
				'Macos darba vieta',
				'Izzinu pats',
				'4th option',
				'Macos no kolegiem',
				'Macos darba vieta',
				'Izzinu pats',
				'4th option'
			],
			visibleTaskIndex: '',
			editableTaskIndex: '',
			taskDesk: ''
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
		showTaskDetails: function( index ) {
			this.stopEditing();
			console.log(index);
			// this.visibleTaskIndex == index ? this.visibleTaskIndex = '' : this.visibleTaskIndex = index;
			this.visibleTaskIndex = index;
		},
		saveGoalProgress: function( taskId ) {

			// POST CURL:
			// curl -H "Accept: application/json" -H "Content-Type: application/json" -X POST (or PATCH?) '{"our": "data_here"}' http://our_url:here
			//e.g. curl -H "Accept: application/json" -H "Content-Type: application/json" -X PATCH -d '{"department: "New department"}' http://localhost:3000/users/1337

			let taskCompletion = this.$store.state.goalTasks[taskId].task_complete;
			// let taskDescription = this.$store.state.goalTasks[taskId].task_description;

			console.log(taskId);
			console.log(this.$store.state.goalTasks[taskId]);

			updateTaskCompletionStatus( this.$store, taskId, taskCompletion );
			// updateTaskDescription( this.$store, taskId, taskDescription );

			console.log('ayy save them progress changes');
		},
		editTaskDescription: function( index ) {
			this.editableTaskIndex = index;
		},
		stopEditing: function( taskId ) {

			console.log('Stop editing');

			if ( taskId ) {
				this.editableTaskIndex = '';

				let taskDescription = this.$store.state.goalTasks[taskId].task_description;
				updateTaskDescription( this.$store, taskId, taskDescription );
			}

		}
	}
}

</script>

<style lang="stylus" scoped>

@import '../../styles/variables.styl';

.goal-date
.task-header
	margin 0px
	padding 0px

.goal-header
	.goal-heading
		font-size 32px
		margin 0px
	.goal-date
		font-size 24px
		margin 0px
	
	&:before
		content ''
		background rimiPink







$slider-width-number = 240
$slider-width = $slider-width-number px
$slider-height = 10px
$background-slider = grey
$background-filled-slider = rimiLightGrey
$thumb-width = 28px
$thumb-height = 18px
$thumb-radius = 8px
$thumb-background = #fff
$thumb-border = 1px solid #777
$shadow-size = -8px
$fit-thumb-in-slider = -8px

makelongshadow(color, size)
	$val = 5px 0 0 size color
	for i in 6..$slider-width-number
		$val: $i + 'px' 0 0 size color
		
	return $val

// div
// 	height 100px
// 	display flex
// 	justify-content center

.range-wrapper
	height 30px
	margin-top 20px
	display flex
	justify-content center
	position relative
	
	input
		align-items center
		-webkit-appearance none
		background none
		cursor pointer
		display flex
		height 100%
		min-height 50px
		overflow hidden
		width 90%
		padding 0px 10px
		// box-shadow makelongshadow($background-slider, $shadow-size)

		&:focus
			box-shadow none
			outline none
	  
		&::-webkit-slider-runnable-track
			background $background-filled-slider
			content ''
			height $slider-height
			pointer-events none
	  
		// &::-webkit-slider-thumb
		// 	// width $thumb-width
		// 	// height $thumb-height
		// 	height 50px
		// 	width 50px
			
		// 	// appearance none
		// 	background $thumb-background
		// 	border-radius $thumb-radius
		// 	box-shadow makelongshadow($background-slider, $shadow-size)
		// 	margin-top $fit-thumb-in-slider
		// 	border $thumb-border
			
		&::-moz-range-track
			width: $slider-width
			height: $slider-height

		// &::-moz-range-thumb
		// 	width $thumb-width
		// 	height $thumb-height

		// 	background: $thumb-background
		// 	border-radius: $thumb-radius
		// 	border: $thumb-border
		// 	position: relative

		&::-moz-range-progress
			height: $slider-height
			background: $background-filled-slider
			border: 0
			margin-top: 0

		&::-ms-track
			background: transparent
			border: 0
			border-color: transparent
			border-radius: 0
			border-width: 0
			color: transparent
			height: $slider-height
			margin-top: 10px
			width: $slider-width
		
		// &::-ms-thumb
		// 	width $thumb-width
		// 	height $thumb-height

		// 	background: $thumb-background
		// 	border-radius: $thumb-radius
		// 	border: $thumb-border

		&::-ms-fill-lower
			background: $background-filled-slider
			border-radius: 0

		&::-ms-fill-upper
			background: $background-slider
			border-radius: 0

		&::-ms-tooltip
			display: none


.goals
	.goal-item
		.task-wrapper
			position relative
			padding 20px 20px
			margin-left 10px
			margin-bottom 20px
			margin-top 10px
			cursor default
			
			.percentage-labels
				position absolute
				display flex
				flex-direction row
				justify-content space-between
				bottom -30px
				width 109%
				
				span
					flex 1 0 20%
					padding 0px
					text-align center
			
			.editable-description
				width 650px
				height 75px
				resize none
				margin 0px
				border none
				border-radius 1px
				font-family 'Neris', Arial, sans-serif
				font-size 16px
			
			.edit-task-description
				position absolute
				background transparent url('../../styles/img/icon-edit.png') 0 0 no-repeat
				height 19px
				width 19px
				border none
				right 50px
				top 50px
				cursor pointer
				
				&:focus
				&:active
					outline none
			
			&.visible-slider
				background: #eaeaea;
				padding: 10px 60px 4px 85px;
				
				.task-header
					padding 0px 0px 10px 30px
		
			
				&:before
					content ''
					display block
					position absolute
					background rimiPink
					height 70.5%
					width 15px
					left -12px
					top 19%
					transform rotateZ(-45deg) skew(-45deg)
					transform-origin center
					
			.task-slider
				.left-side
					position absolute
					height 100%
					width 50px
					top 0px
					left 10px
					border-right 1px solid rimiLightGrey
					.hover-popup
						position relative
						height 30px
						width 30px
						top 20px
						left 7px
						
					.qm-popup
						background transparent url('../../styles/img/qm-popup.png') 0 0 no-repeat
						
					.info-popup
						background transparent url('../../styles/img/info-popup.png') 0 0 no-repeat
						top 35px
						
				input[type=range]
					-webkit-appearance none
					&::-webkit-slider-thumb
						-webkit-appearance none
						// border 15px solid rimiPink
						border-radius 50px
						height 10px
						width 10px
						background #FFF
						cursor pointer
						box-shadow 0px 0px 0px 10px rimiPink
						margin-top 2px
						
					&::-webkit-slider-runnable-track
						background rimiLightGrey
						height 15px
						margin-top 5px
						border-radius 15px
						
					// &::-webkit-slider-thumb
					// 	-webkit-appearance none
					// 	border 1px solid #000000
					// 	border-radius 50px
					// 	height 25px
					// 	width 25px
					// 	background #ffffff
					// 	cursor pointer
					// 	box-shadow 1px 1px 1px #000000, 0px 0px 1px #0d0d0d
				
			.task-header
				font-weight 600
				cursor pointer
			.task-description
				color rimiGrey


</style>