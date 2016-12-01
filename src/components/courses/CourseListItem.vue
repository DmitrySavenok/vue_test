<template>
	
	<div class="course-item">
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
					<div class="course-description">{{course.course_description}}</div>
					
					<template v-for="link in course.links">
						<a v-bind:href="link.url">{{link.lang}}</a>
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

.course-title
	cursor pointer


.fade-course-enter-active, .fade-course-leave-active
	transition opacity .5s

.fade-course-enter, .fade-course-leave-active
	opacity 0
	

</style>