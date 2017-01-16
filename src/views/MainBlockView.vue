<template>

	<transition appear name="slide-left">
		<div class="main-block" :class="[goalTutorialPhase, mainBlockState]">


			<template v-if="mainBlockState === 'home'">
				
				<!-- <h2>news here</h2> -->

				<ul class="news">
						
					<li class="article" :class="'article-' + index" v-for="(article, index) in news">
						
						<div class="article-first-row">
							<div class="article-headline">{{article.headline}}</div>
							<p class="article-description">
								<span class="article-name">{{article.name}}</span>
								{{article.description}}
							</p>
						</div>
						<router-link v-if="index == 1" class="article-notification" :to="'/goals'" >{{article.article_notification}}</router-link>
						<router-link v-else-if="index == 2" class="article-notification" :to="'/courses'" >{{article.article_notification}}</router-link>
						<p v-else class="article-notification">{{article.article_notification}}</p>

					</li>

				</ul>

				<div class="videos">
					
					<!-- Probably will be remade to v-for type template -->
					<!-- With proper descriptions etc. -->

					<div class="main-video-block">
						<div class="video-description">
							<h3>Video 1</h3>
							<p>Garāks apraksts par konkrētu video</p>
							<div class="play-button"></div>
						</div>
					</div>

					<div class="video-selection-panel">
						
						<div class="video-selector">
							<div class="video-description">
								<p><span>Video 1</span>short description here.</p>
							</div>
						</div>
						<div class="video-selector">
							<div class="video-description">
								<p><span>Video 2</span>short description here.</p>
							</div>
						</div>
						<div class="video-selector">
							<div class="video-description">
								<p><span>Video 3</span>short description here.</p>
							</div>
						</div>
						<div class="video-selector">
							<div class="video-description">
								<p><span>Video 4</span>short description here.</p>
							</div>
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

<!-- 				<div v-if="goalTutorialPhase == 'phase-2'">
					<div class="tooltip-wrapper">
						<div @click="createEmptyGoal" class="tooltip tooltip-1"></div>
						<div class="tooltip-text tooltip-text-1">Izvēlies kādu no trīs mērķiem un sāc plānot savu izaugsmi! Katrs mērķis satur četrus uzdevumus.</div>
					</div>
					<div class="tooltip-wrapper">
						<div @click="createEmptyGoal" class="tooltip tooltip-2"></div>
						<div class="tooltip-text tooltip-text-2"></div>
					</div>
					<div class="tooltip-wrapper">
						<div @click="createEmptyGoal" class="tooltip tooltip-3"></div>
						<div class="tooltip-text tooltip-text-3"></div>
					</div>
				</div> -->

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


// function setEmptyGoal(store, userId) {
// 	store.dispatch('CREATE_EMPTY_GOAL', { userId });
// }

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
  		return this.$store.state.users['currentUser'];
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
  		// TODO:
  		// Filter courses so all the completed ones would be at the bottom ( after API update? )
  		return this.$store.state.lists.currentUserCourses;
  	},
  	news() {
  		// Hardcoded for now
  		// TODO:
  		// Implement for admin panel (w/ server side?)
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

  	// createEmptyGoal: function() {

  	// 	let userId = this.$store.state.users['currentUser'].id;

  	// 	setEmptyGoal( this.$store, userId );

  	// }
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
				position relative
				cursor pointer
				display block
				text-decoration none
				&:before
					content ''
					display block
					position absolute
					border-left 10px solid rimiLightGrey
					border-top 10px solid transparent
					border-right 10px solid transparent
					border-bottom 10px solid transparent
					left 70px
					bottom 0px

			&.article-1
				.article-notification
					color rimiPink
					&:before
						border-left-color rimiPink
			
			&.article-2
				.article-notification
					color rimiOrange
					&:before
						border-left-color rimiOrange
			
			&.article-3
				margin-bottom 50px
				.article-notification
					display none
			
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
						leftSideLine(rimiLighterGrey)
						width 32px
						left -28px
						top 13px
						
						// content ''
						// display block
						// position absolute	
						// height 70.5%
						// width 35px
						// left -29px
						// top 23px
						// transform rotateZ(-45deg) skew(-45deg)
						// transform-origin center
					
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
			position relative
			width 100%
			height 330px
			background transparent url('../styles/img/video-ph.png') 0 0 no-repeat
			background-size 100% 110%
			
			.video-description
				position absolute
				right 0px
				top 0px
				height 100%
				width 200px
				background rimiLightGrey
				color rimiGrey
				
				h3
					font-weight 600
					padding 0px 15px
					margin-bottom 0px
					font-size 24px
				p
					padding 10px 15px
					margin 0px
					font-size 20px
				
				.play-button
					background transparent url('../styles/img/big-play.png') 0 0 no-repeat
					height 100px
					width 75px
					position relative
					left 15px
					top 20px

		.video-selection-panel
			width 100%
			height 140px
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
				
				.video-description
					position absolute
					height 100%
					width 100%
					left 0px
					top 0px
					background rimiLightGrey
					visibility hidden
					color rimiGrey
					
					p
						margin 0px
						font-size 20px
						padding 20px 20px 0px 20px
					
					span
						font-size 24px
						display block
				
				&:hover
					.video-description
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
			leftSideLine(rimiLightGreen)
			
			// content ''
			// display block
			// position absolute
			// background rimiLightGreen
			// height 70.5%
			// width 15px
			// left -12px
			// top 19%
			// transform rotateZ(-45deg) skew(-45deg)
			// transform-origin center
	
	&.resources
		margin-top 120px
	&.courses
		margin-top 120px
	&.goals
		margin-top 120px
		&.phase-2
			display none
			// margin-top 0px
			// background rimiLightGrey
						

</style>