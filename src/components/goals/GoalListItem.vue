<template>

	<div class="goal-item">
		
		<!-- {{goalToShow}} -->
		
		<div class="goal-header">
			<template>
				<textarea 
					class="editable-goal" 
					@blur="stopEditingGoal(goalToShow.goal_id, goalToShow.goal_name)" 
					@keyup.enter.prevent.stop="stopEditingGoal(goalToShow.goal_id, goalToShow.goal_name)"
					v-model="goalToShow.goal_name"
					v-if="editableGoalIndex == goalToShow.goal_id"></textarea>
				<h2 v-else class="goal-heading" @click="editGoalName(goalToShow.goal_id)">{{goalToShow.goal_name}}</h2>
			</template>
			<p class="goal-date">{{phDate}}</p>
			<button class="edit-button edit-task-description" @click="editGoalName(goalToShow.goal_id)"></button>
		</div>
		<!-- <pre>{{goalTasks}}</pre> -->

		<template>

			{{ rightTasks }}

			<div :class="[ index == visibleTaskIndex ? 'visible-slider' : 'hidden-slider', task.task_description.length > 0 ? '' : 'empty-task-text' ]" 
				  class="task-wrapper" 
				  v-for="(task, index) in rightTasks" 
				  v-if="task.task_goal_id === goalToShow.goal_id">

					<h4 class="task-header" @click="showTaskDetails(index)">{{taskNames[index-1]}}</h4>


					<p class="empty-task-tooltip">{{$t("goals.addNewText")}}</p>
					<button class="empty-task-button" @click="showTaskDetails(index)"></button>

					<!-- Take that from locales "howToSections.Section(n).sectionTitle" -->
					<!-- <h4 class="task-header" @click="showTaskDetails(index)"> -->
					
					<template>
						<textarea 
							class="editable-description" 
							@blur="stopEditing(task.id)" 
							v-model="task.task_description"
							v-if="editableTaskIndex == index"
							autofocus>
						</textarea>
						<p v-else class="task-description">{{task.task_description}}</p>
					</template>

					<div class="task-slider" v-show="index == visibleTaskIndex">
						<div class="left-side">
							<div @mouseleave="hidePopup" @mouseenter="showPopup" class="hover-popup qm-popup">
								<div v-if="qmPopup" class="popup-wrapper">{{$t("popups.goalQm")}}</div>
							</div>
							<div @mouseleave="hidePopup" @mouseenter="showPopup" class="hover-popup info-popup">
								<div v-if="infoPopup" class="popup-wrapper">{{$t("popups.goalInfo")}}</div>
							</div>
						</div>
						<div class="range-wrapper">
							<input v-if="isIe" @mouseup="saveGoalProgress(task.id)" type="range" v-model.lazy="rightTasks[index].task_complete" min="0" max="100">
							<input v-else type="range" v-model="rightTasks[index].task_complete" min="0" max="100">
							<div class="percentage-labels">
								<span>0%</span>
								<span>25%</span>
								<span>50%</span>
								<span>75%</span>
								<span>100%</span>
							</div>
						</div>
						<button class="edit-button edit-task-description" @click="editTaskDescription(index)"></button>
						<!-- <input type="submit" name="submit" @click="saveGoalProgress(task.id)"> -->
					</div>

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
function updateGoalName( store, goalId, goalName ) {
	return store.dispatch('UPDATE_GOAL_NAME', { goalId, goalName });
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
				'Mācos no kolēģiem',
				'Mācos darba vietā',
				'Izzinu pats',
				'4th option',
				'Mācos no kolēģiem',
				'Mācos darba vietā',
				'Izzinu pats',
				'4th option',
				'Mācos no kolēģiem',
				'Mācos darba vietā',
				'Izzinu pats',
				'4th option'
			],
			tasksArr: [],
			visibleTaskIndex: '',
			editableTaskIndex: '',
			editableGoalIndex: '',
			taskDesk: '',
			qmPopup: false,
			infoPopup: false
		}
	},
	props: ['goalToShow'],

	computed: {

		isIe() {
			return this.$store.state.isIe;
		},
		// CHANGE TO METHOD
		rightTasks() {
			console.log('something');
			let keys = Object.keys(this.$store.state.goalTasks);
			let properTasks = [];
			keys.forEach( key => {
				if ( +this.$store.state.goalTasks[key].task_goal_id === +this.$options.propsData['goalToShow'].goal_id ) {
					properTasks.push( this.$store.state.goalTasks[key])
				}
			})
			keys = keys.filter( key => {
				console.log(key);
				console.log(+this.$store.state.goalTasks[key].task_goal_id === +this.$options.propsData['goalToShow'].goal_id);
				+this.$store.state.goalTasks[key].task_goal_id === +this.$options.propsData['goalToShow'].goal_id
			})

			return keys;
		},
		goalTasks() {
			return this.$store.state.goalTasks;
		},

		phDate() {
			let date = new Date();
			return date.getDate() + '.' + (+date.getMonth() + 1) + '.' + date.getFullYear() + ' - ' + date.getDate() + '.' + date.getMonth(date.setMonth(date.getMonth() + 4 )) + '.' + date.getFullYear()
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
		loadNextTask: function() {
			// console.log('load next task ' + index);
			// console.log(this.tasksArr);
			// console.log('pushing ' + +this.tasksArr[this.tasksArr.length-1]++);
			// console.log(this.tasksArr);
			// this.tasksArr.push( +(this.tasksArr[this.tasksArr.length-1]+1) );
		},
		showPopup: function( el ) {

			if ( el.target.classList.contains('qm-popup') ) {
				this.$data.qmPopup = true;
			} else {
				this.$data.infoPopup = true;
			}
		},
		hidePopup: function( el ) {

			// to check? ( or to hide all the popups right away )
			// el.target.classList.contains('info-popup') ? this.$data.qmPopup = false : this.$data.infoPopup = false
			this.$data.qmPopup = false;
			this.$data.infoPopup = false;

		},
		showTaskDetails: function( index ) {
			this.stopEditing();
			console.log(index);
			// this.visibleTaskIndex == index ? this.visibleTaskIndex = '' : this.visibleTaskIndex = index;
			this.visibleTaskIndex === index ? this.visibleTaskIndex = 0 : this.visibleTaskIndex = index;
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
		editGoalName: function ( index ) {
			this.editableGoalIndex = index;
		},
		stopEditingGoal: function ( goalId, goalName ) {
			console.log('here');
			this.editableGoalIndex = '';

			console.log(goalName);

			updateGoalName( this.$store, goalId, goalName );
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
	
.empty-task-tooltip
.empty-task-button
	display none

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
		

.empty-task-text
	
	.task-header
	.empty-task-tooltip
		text-align center
	
	.task-header
		padding 0px
		margin 0px
		font-weight 600
		color rimiPink
		text-align center
		
	.empty-task-tooltip
		color rimiGrey
		display block
		
	.empty-task-button
		display inline-block
		position absolute
		border 2px solid rimiPink
		border-radius 50%
		height 32px
		width 32px
		background #FFF
		outline none
		margin-top 10px
		cursor pointer
		left 0px
		right 0px
		margin auto
		bottom -10px
		
		&:after
			content '+'
			font-family 'Neris'
			font-weight 600
			color rimiPink
			font-size 24px
			line-height 12px
	
	&.visible-slider
		.empty-task-tooltip
		.empty-task-button
			display none
		
		.task-header
			text-align left 
			color rimiGrey





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

		// &::-ms-track
		// 	background: transparent
		// 	border: 0
		// 	border-color: transparent
		// 	border-radius: 0
		// 	border-width: 0
		// 	color: transparent
		// 	height: $slider-height
		// 	margin-top: 10px
		// 	width: $slider-width
		
		// &::-ms-thumb
		// 	width $thumb-width
		// 	height $thumb-height

		// 	background: $thumb-background
		// 	border-radius: $thumb-radius
		// 	border: $thumb-border

		&::-ms-fill-lower
			background rimiPink
			color rimiPink
			border-radius 15px

		&::-ms-fill-upper
			background rimiLightGrey
			color rimiLightGrey
			border-radius 15px

		&::-ms-tooltip
			display: none


.goals
	.goal-item
				
		
		.edit-button
			position absolute
			background transparent url('../../styles/img/icon-edit.png') 0 0 no-repeat
			height 19px
			width 19px
			border none
			cursor pointer
			
			&:focus
			&:active
				outline none
				
		.edit-task-description
			right 50px
			top 50px
			
		.editable-goal
			width 250px
			height 45px
			resize none
			margin 0px
			border none
			border-radius 1px
			font-family 'Neris', Arial, sans-serif
			font-size 16px
			overflow hidden
				
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
				left -5%
				
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
			
			
			&.visible-slider
				background: #eaeaea;
				padding: 10px 60px 4px 85px;
				
				.task-header
					padding 0px 0px 10px 30px
		
			
				&:before
					leftSideLine(rimiPink)
					
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
						cursor pointer
						height 30px
						width 30px
						top 20px
						left 7px
						
						.popup-wrapper
							position absolute
							background rimiPink
							min-height 25px
							width 250px
							bottom 70px
							left -5px
							color #FFF
							padding 10px 20px
							border-radius 2px
							
							&:before
								content ''
								display block
								border-top 15px solid rimiPink
								border-left 15px solid transparent
								border-bottom 15px solid transparent
								border-right 15px solid transparent
								position absolute
								left 5px
								bottom -30px
						
					.qm-popup
						background transparent url('../../styles/img/qm-popup.png') 0 0 no-repeat
						
					.info-popup
						background transparent url('../../styles/img/info-popup.png') 0 0 no-repeat
						top 35px
						
				input[type=range]
					-webkit-appearance none
						
					&::-moz-range-track
						background rimiLightGrey
						height 15px
						margin-top 5px
						border-radius 15px
					
					&::-ms-track
						background rimiLightGrey
						color rimiLightGrey
						height 15px
						margin-top 5px
						border-radius 15px
					
					&::-webkit-slider-runnable-track
						-webkit-appearance none
						background rimiLightGrey
						height 15px
						margin-top 5px
						border-radius 15px
					
					&::-moz-range-thumb
						// border 15px solid rimiPink
						border-radius 50px
						height 10px
						width 10px
						background #FFF
						cursor pointer
						box-shadow 0px 0px 0px 10px rimiPink
						margin-top 2px
					
					&::-ms-thumb
						// border 15px solid rimiPink
						border-radius 50px
						height 10px
						width 10px
						background #FFF
						cursor pointer
						box-shadow 0px 0px 0px 10px rimiPink
						margin-top 2px
					
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
							
				// input[type=range]
				// 	-webkit-appearance none
				// 	&::-webkit-slider-thumb
				// 		-webkit-appearance none
				// 		// border 15px solid rimiPink
				// 		border-radius 50px
				// 		height 10px
				// 		width 10px
				// 		background #FFF
				// 		cursor pointer
				// 		box-shadow 0px 0px 0px 10px rimiPink
				// 		margin-top 2px
						
				// 	&::-webkit-slider-runnable-track
				// 		background rimiLightGrey
				// 		height 15px
				// 		margin-top 5px
				// 		border-radius 15px

				
			.task-header
				font-weight 600
				cursor pointer
			.task-description
				color rimiGrey
				min-height 10px


</style>