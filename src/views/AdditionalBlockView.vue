<template>

	<transition appear name="slide-left">

		<div class="additional-block">

			<template v-if="additionalBlockState === 'home'">
				
				<div class="notifications">

					<div class="notifications-header">
						<h4>Notifications</h4>
					</div>

					<ul>
						
						<li class="notification" v-for="notification in notifications">
							<p>
								<span>{{notification.name}}</span>
								{{notification.description}}
							</p>
							<div class="tick"></div>
						</li>

					</ul>

					<div class="notifications-footer">
						<h4>All notifications</h4>
					</div>

				</div>

			</template>

			<template v-if="additionalBlockState === 'goals'">

				<div class="goals-list">

					<div class="goal-section" v-for="index in [1,2,3]">
						<GoalComponent v-bind:goalIndex="index" v-bind:goal="goals['Goal' + index]"></GoalComponent>
					</div>

				</div>

			</template>

			<template v-if="additionalBlockState === 'courses'">

				<div class="course-sections">
					
					<ul>
						<CourseSection v-bind:section="mandatoryCourse"></CourseSection>
						<CourseSection v-bind:section="optionalCourse"></CourseSection>
					</ul>

				</div>

			</template>

			<template v-if="additionalBlockState === 'resources'">
				<div class="sections">
				<!-- <dir>{{mandatoryCourse}}</dir> -->
					<ul>
						<template v-for="(section, index) in sections">
							<ResourceSection v-bind:section="section"></ResourceSection>
						</template>
					</ul>
				</div>
			</template>

		</div>
	</transition>


</template>

<script>

import ResourceSection from '../components/resources/ResourceSection.vue';
import CourseSection from '../components/courses/CourseSection.vue';
import GoalComponent from '../components/goals/GoalComponent.vue';

// Not needed for now
// Used _.debounce on update to filter out function calls

// import _ from 'lodash';


function fetchGoals ( store ) {
	return store.dispatch('FETCH_GOALS', {
		id: store.state.userId
	})
}


export default {

  name: 'AdditionalBlock',

  data () {
    return {
    }
  },
  components: {
  	ResourceSection,
  	CourseSection,
  	GoalComponent
  },
  props: ['type'],

  computed: {
  	goals() {
  		return this.$store.state.goals;
  	},
  	notifications() {
  		return this.$store.state.lists.notifications;
  	},
  	mandatoryCourse() {
  		return this.$store.state.lists.courseSections.mandatory;
  	},
  	optionalCourse() {
  		return this.$store.state.lists.courseSections.optional;
  	},
  	courseSections() {
  		return this.$store.state.lists.courseSections;
  	},
  	sections() {
  		return this.$store.state.lists.resources;
  	},
  	additionalBlockState() {
  		return this.$store.state.mainBlockState;
  	}
  },
  //Methods here
  methods: {
  	setContent: function() {
  		// Temp (don't change state outside actions/mutations)
  		console.log('additional block set content');
  		this.$store.state.renderStage = 2;
  	},
  	setUpGoals: function() {
  		// TO REMOVE (NOT USED)
  		console.log('goal view');
  		this.$store.state.renderStage = 2;
  		fetchGoals(this.$store);
  	},
  	showSectionInfo: function(event) {
  		this.show = !this.show;
  	}
  }
}
</script>

<style lang="stylus" scoped>

@import '../styles/variables.styl';

ul
	margin 0
	padding 0
	list-style none

.additional-block
	left 1%
	width 300px
	

	.notifications
		.notifications-header
			height 95px
			width 300px
			background transparent url('../styles/img/notifications-header.png') 0 0 no-repeat
			background-size 100% 100%
			h4
				font-size 21px
				padding 15px 35px
				color #FFF
				margin 0px
				
		.notification
			min-height 120px
			padding 10px 25px 0px 25px
			margin 0px 15px 20px 28px
			background rimiLightGrey
			background-size 100% 100%
			position relative
			cursor pointer
			
			.tick
				position absolute
				background transparent url('../styles/img/tick-grey.png') 0 0 no-repeat
				height 36px
				width 36px
				right -5px
				bottom -5px
				z-index 1
			
			&:before
				content ''
				display block
				position absolute
				height 70.5%
				width 40px
				left -34px
				top 32px
				background #f0f0f0
				transform rotateZ(-45deg) skew(-45deg)
				transform-origin center
					
			&:after
				content ''
				display block
				position absolute
				border-right 15px solid #FFF
				border-bottom 15px solid #FFF
				border-top 15px solid transparent
				border-left 15px solid transparent
				right 0px
				bottom 0px
				
			p
				margin 0px
				color rimiGrey
				
			span
				display block
				font-size 21px
				font-weight 600
				line-height 21px
				padding-bottom 10px
		
		.notifications-footer
			background transparent url('../styles/img/notifications-all.png') 0 0 no-repeat
			position absolute
			bottom 0px
			width 100%
			color #FFF
			height 37px
			font-size 21px
			line-height 34px
			cursor pointer
			
			h4
				margin 0px
				padding-left 50px
		
	
	.data
	.data-2
		height 150px
		width 100%
		background green
		position relative
		top 50px

	.data-2
		top 150px

	.course-sections
	.sections
		position absolute
		height 78%
		width 100%
		ul
			display flex
			flex-direction column
			justify-content flex-end
			align-items stretch
			height 100%
			text-align center
			li
				transition all 0.3s ease-out

	.goals-list
		position absolute
		height 100%
		width 100%
		
		.goal-section
			height 33.3%
			display flex
			justify-content flex-start

</style>