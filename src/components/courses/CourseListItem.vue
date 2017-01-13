<template>
	
	<div class="course-item" :class="isHidden ? 'hidden-item' : 'visible-course-item'">
		<!-- {{course}} -->
		
		<h4 class="course-title" @click="showInfo">{{course.name}}</h4>

		<transition-group 
			name="fade-course" 
			tag="div" 
			@beforeLeave="changeSection"
			@beforeEnter="beforeEnter" 
			@afterEnter="afterEnter" 
			@afterLeave="afterLeave"
			>
				<div class="course-info" v-if="!isHidden" :key="course">

					<!-- check if course is completed here -->
					<div class="completion-icon"></div>
					<div class="course-description">{{course.description}}</div>
					
					<template v-for="link in course.links">
						<a target="_blank" class="course-link" v-bind:href="link.url">{{link.lang}}</a>
					</template>
				</div>
		</transition-group>

	</div>


</template>

<script>


export default {

	name: 'CourseListItem',
	data () {
		return {
			isHidden: true
		}
	},
	props: ['course'],

	computed: {

	},
	methods: {
		showInfo(event) {
			this.isHidden = !this.isHidden;
		},
		changeSection(el) {
			this.isHidden = true;

			el.style.visibility = 'hidden';
			el.style.transition = '';


			let parentEl = el.parentNode.parentNode;
	        setTimeout(() => parentEl.style.height = "20px", 25)

		},
		beforeEnter(el) {

	        console.log('before');

	        el.style.visibility = 'hidden';

		},
		afterEnter(el) {

			console.log('after');

			// console.log(el);
			// console.log(el.parentNode.parentNode);
			// console.log(el.clientHeight);

			let elHeight 	 = el.clientHeight;
			let parentHeight = el.parentNode.parentNode.clientHeight;

			el.style.transition = 'opacity 0.1s 0.3s ease-out';

			setTimeout(() => el.parentNode.parentNode.style.height = elHeight + parentHeight + "px", 25)
			setTimeout(() => el.style.visibility = 'visible', 50)
			setTimeout(() => el.style.opacity = 1, 100)

		},
		beforeLeave(el) {

			setTimeout(() => el.parentNode.parentNode.style.height = 15 + "px", 25)

		},
		afterLeave(el) {

		}
	}
}

</script>

<style lang="stylus" scoped>

@import '../../styles/variables.styl';


.course-item
	transition height 0.3s ease-out
	border-bottom 1px solid rimiLightGrey
	position relative
	padding 12px 60px 12px 0px
	margin 0px 25px
	border-top 1px solid transparent
	height 20px
	
	&.visible-course-item
		background #EAEAEA
		padding 9px 60px 8px 65px
		margin-left 10px
		.course-title
			font-size 24px
			font-weight 600
			padding 5px 40px
			color rimiGrey
			text-transform capitalize
		
		.course-description
			padding-left 15px
			
		&:after
			content ''
			display block
			position absolute
			left 64px
			background #C2C2C2
			height 100%
			width 1px
			top 0px
							
		&:before
			leftSideLine(rimiLightGreen)
		
	
.course-title
	margin 0px
	cursor pointer
	font-weight 300

.course-description
	margin-bottom 20px
.course-link
	background #C2C2C2	
	color #FFF
	padding 5px 40px
	font-size 18px
	text-decoration none
	
	&:nth-child(4)
	&:nth-child(6)
		background rimiLighterGrey
	&:nth-child(5)
		background rimiLightGrey

	&:hover
		background rimiLightBlue

.course-info
	opacity 0
	.completion-icon
		background transparent url('../../styles/img/tick-green.png') 0 0 no-repeat
		width 34px
		height 32px
		left 16px
		top 0px
		bottom 0px
		margin auto
		position absolute
	
.course-title
	cursor pointer


// .fade-course-enter-active, .fade-course-leave-active
// 	transition opacity .5s

// .fade-course-enter, .fade-course-leave-active
// 	opacity 0
	

</style>