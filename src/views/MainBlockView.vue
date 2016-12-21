<template>

	<transition appear name="slide-left">
		<div class="main-block" :class="[goalTutorialPhase, mainBlockState]">


			<template v-if="mainBlockState === 'home'">
				
				<!-- <h2>news here</h2> -->

				<ul class="news">
						
					<li class="article" v-for="article in news">
						
						<div class="article-first-row">
							<div class="article-headline">{{article.headline}}</div>
							<p class="article-description">
								<span class="article-name">{{article.name}}</span>
								{{article.description}}
							</p>
						</div>
						<p class="article-notification">{{article.article_notification}}</p>

					</li>

				</ul>

				<div class="videos">
					
					<!-- Probably will be remade to v-for type template -->
					<!-- With proper descriptions etc. -->

					<div class="main-video-block"></div>

					<div class="video-selection-panel">
						
						<div class="video-selector">
							<p class="video-description"><span>Video 1</span>short description here.</p>
						</div>
						<div class="video-selector">
							<p class="video-description"><span>Video 2</span>short description here.</p>
						</div>
						<div class="video-selector">
							<p class="video-description"><span>Video 3</span>short description here.</p>
						</div>
						<div class="video-selector">
							<p class="video-description"><span>Video 4</span>short description here.</p>
						</div>

					</div>

				</div>

			</template>


			<template v-if="mainBlockState === 'goals'">
				
				<!-- <h2>squad G | O | A | L | S</h2> -->

				<div v-if="goalToShow && goals[goalToShow]">

					<GoalListItem v-bind:goalToShow="goals[goalToShow]"></GoalListItem>
				
				</div>

				<div v-if="!goals[goalToShow]">

					<GoalFirstTimeTutorial></GoalFirstTimeTutorial>

				</div>

				<div v-if="goalTutorialPhase == 'phase-2'">
					<div @click="createEmptyGoal" class="tooltip tooltip-1"></div>
					<div @click="createEmptyGoal" class="tooltip tooltip-2"></div>
					<div @click="createEmptyGoal" class="tooltip tooltip-3"></div>
				</div>

			</template>

			<template v-if="mainBlockState === 'courses'">

				<h2 class="course-header">{{sectionNum}} courses</h2>

				<ul class="course-list">
					
					<template v-if="courses">
						
						<div v-for="course in courses">
							<!-- {{course}} -->
							<!-- {{resource.resource_title}} -->
							<CourseListItem v-bind:course="course"></CourseListItem>
						</div>

					</template>

				</ul>

			</template>
			
			<template v-if="mainBlockState === 'resources'">

				<h2 class="resource-header">Section {{sectionNum}}</h2>

				<div class="resource-list">
					
					<template v-if="resources && resources[sectionNum]">
						
						<div v-for="resource in resources[sectionNum].section_resources">
							<!-- {{resource.resource_title}} -->
							<ResourceListItem v-bind:resource="resource"></ResourceListItem>
						</div>

					</template>

				</div>

			</template>


		</div>
	</transition>


</template>

<script>

import ResourceListItem from '../components/resources/ResourceListItem.vue';
import CourseListItem from '../components/courses/CourseListItem.vue';
import GoalListItem from '../components/goals/GoalListItem.vue';
import GoalFirstTimeTutorial from '../components/goals/GoalFirstTimeTutorial.vue';


function setEmptyGoal(store, userId) {
	store.dispatch('CREATE_EMPTY_GOAL', { userId });
}

export default {

  name: 'MainBlock',

  data () {
    return {
    	sectionNum: 0
    }
  },
  components: {
  	ResourceListItem,
  	CourseListItem,
  	GoalListItem,
  	GoalFirstTimeTutorial
  },
  computed: {
  	user () {
  		return this.$store.state.users['currentUser']
  	},
  	goalToShow() {
  		return this.$store.state.goalToShow[0];
  	},
  	goals() {
  		return this.$store.state.goals;
  	},
  	goalTutorialPhase() {
  		return this.$store.state.goalTutorialPhase[0];
  	},
  	courses() {
  		return this.$store.state.lists.currentUserCourses;
  	},
  	news() {
  		return this.$store.state.lists.news;
  	},
  	sectionNum() {
  		return this.$store.state.showSection;
  	},
  	resources() {
  		return this.$store.state.lists.resources;
  	},
  	mainBlockState() {
  		return this.$store.state.mainBlockState;
  	}
  },
  //Methods here
  methods: {

  	createEmptyGoal: function() {

  		let userId = this.$store.state.users['currentUser'].id;

  		setEmptyGoal( this.$store, userId );

  	}
  }
}
</script>

<style lang="stylus">

@import '../styles/variables.styl';

.main-block
	width 870px
	left 2%
	height 100%
	
	.news
		margin 0px
		padding 0px
		list-style none
		
		li
			margin 10px 0px 20px 0px

		.article
			
			.article-notification
				padding-left 90px
				margin 30px 0px 0px 0px
			
			.article-first-row
				display flex
				
				.article-headline
					display flex
					width 210px
					height 65px
					color #FFF
					font-size 32px
					font-weight 600
					padding 10px 0px 0px 60px
					line-height 26px
					margin-left 24px
					position relative
					
					&:before
						content ''
						display block
						position absolute
						height 70.5%
						width 35px
						left -29px
						top 23px
						transform rotateZ(-45deg) skew(-45deg)
						transform-origin center
					
				.article-name
					color rimiGrey
					font-size 21px
					font-weight 600
					display block
					
				.article-description
					color rimiGrey
					background rimiLightGrey
					height 65px
					flex 1 0 auto
					margin 0px
					padding 10px 0px 0px 70px

			&:nth-child(1)
				.article-headline
					background rimiPink
					&:before
						background #ea5f97
					// background transparent url('../styles/img/news-part-1.png') 0 0 no-repeat
			&:nth-child(2)
				.article-headline
					background rimiOrange
					&:before
						background #fb9d48
					// background transparent url('../styles/img/news-part-2.png') 0 0 no-repeat
			&:nth-child(3)
				.article-headline
					background rimiLightGreen
					&:before
						background #9ac561
					// background transparent url('../styles/img/news-part-3.png') 0 0 no-repeat
						
	.videos
		width 100%
		
		.main-video-block
			width 100%
			height 330px
			background transparent url('../styles/img/video-ph.png') 0 0 no-repeat
			background-size 100% 110%
		
		.video-selection-panel
			width 100%
			height 130px
			display flex
			justify-content space-around
			align-items center
			
			.video-selector
				cursor pointer
				background transparent url('../styles/img/video-ph-small.png') 0 0 no-repeat
				width 25%
				height 97%
				background-size 100% 100%
				position relative
				
				p
					position absolute
					height 100%
					width 100%
					left 0px
					top 0px
					background rgba(50, 50, 50, 0.8)
					visibility hidden
					margin 0px
					color #FFF
					
					span
						font-size 21px
						display block
				
				&:hover
					p
						visibility visible
	
	.course-list
		padding 0px
		margin 0px
		
	.resource-header
	.course-header
	.goal-header
		background #EAEAEA
		padding 25px 100px
		margin 0px
		margin-left 10px
		position relative
		bottom 10px
		color rimiGrey
		font-size 32px
		text-transform capitalize
		
		&:before
			content ''
			display block
			position absolute
			background rimiLightGreen
			height 70.5%
			width 15px
			left -12px
			top 19%
			transform rotateZ(-45deg) skew(-45deg)
			transform-origin center
	
	&.resources
		margin-top 120px
	&.courses
		margin-top 120px
	&.goals
		margin-top 120px
		
	&.phase-2
		margin-top 0px
		background rimiLightGrey
		
		.tooltip
			position absolute
			height 142px
			width 142px
			border-radius 50%
			left -240px
			cursor pointer
			
			&.tooltip-1
				top 108px
				border 2px solid rimiPink
			&.tooltip-2
				top 424px
				border 2px solid rimiOrange
			&.tooltip-3
				top 741px
				border 2px solid rimiOrange		

		.goal-tutorial
			display none
		
				

</style>