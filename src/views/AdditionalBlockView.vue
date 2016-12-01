<template>

	<transition appear name="slide-left">

		<div class="additional-block">

			<template v-if="additionalBlockState === 'home'">
				
				<div class="notifications">

					<ul>
						
						<li v-for="notification in notifications">
							{{notification.name}}
							{{notification.description}}
						</li>

					</ul>

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
import _ from 'lodash';


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
  		return this.$store.state.lists.currentUserGoals;
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

ul
	margin 0
	padding 0
	list-style none

.additional-block
	left 1%
	width 12%
	min-width 250px
	
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