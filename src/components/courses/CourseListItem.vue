<template>
	
	<div class="course-item" :class="isHidden ? 'hidden-item' : 'visible-course-item'">
		<!-- {{course}} -->
		
		<h4 class="course-title" @click="showInfo">{{course.course_name}}</h4>

		<transition-group 
			name="fade-course" 
			tag="div" 
			@beforeLeave="changeSection">
				<div class="course-info" v-show="!isHidden" :key="course" 
					@beforeEnter="beforeEnter" 
					@afterEnter="afterEnter" 
					@beforeLeave="beforeLeave" 
					@afterLeave="afterLeave"
					>
					<div class="completion-icon"></div>
					<div class="course-description">{{course.course_description}}</div>
					
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
		},
		beforeEnter(el) {

			el.style.opacity = '0';

			var clone = el.cloneNode(true), 
				h

			clone.style.visibility = 'hidden'
			clone.style.removeProperty('display')

			
			el.parentNode.appendChild(clone)
			h = clone.clientHeight
			clone.remove()
			
			el.style.height = "0px"
			setTimeout(() => el.style.height = h + "px", 1)

			el.parentNode.parentNode.style.height = '20px'
			setTimeout(() => el.parentNode.parentNode.style.height = el.parentNode.parentNode.clientHeight + h + "px", 25)
		},
		afterEnter(el) {
			el.style.opacity = '1';
 			el.style.removeProperty('height')
		},
		beforeLeave(el) {
			el.style.opacity = '0';
			el.parentNode.parentNode.style.height = el.parentNode.parentNode.clientHeight + "px";
			setTimeout(() => el.parentNode.parentNode.style.height = "20px", 25)

			el.style.height = el.clientHeight + "px"
			setTimeout(() => el.style.height = "0px", 1)
		},
		afterLeave(el) {
			el.style.removeProperty('height')
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
	padding 10px 60px 4px 25px
	margin-left 10px
	border-top 1px solid transparent
	
	&.visible-course-item
		background #EAEAEA
		padding 10px 60px 4px 65px
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
			content ''
			display block
			position absolute
			background rimiLightGreen
			height 70.5%
			width 15px
			left -12px
			top 18%
			transform rotateZ(-45deg) skew(-45deg)
			transform-origin center
		
	
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