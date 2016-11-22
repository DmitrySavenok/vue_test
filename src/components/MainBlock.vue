<template>

	<transition appear name="slide-left">
		<div class="main-block">

			<template v-if="mainBlockTemplate == 'goalsView'">
				
				<h2>squad G | O | A | L | S</h2>

			</template>
			
			<template v-else>
				<ul class="course-list">
					
					<li v-for="course in courses">
						{{ course.courseName }}
					</li>

				</ul>
			</template>


		</div>
	</transition>


</template>

<script>

import store from '../store';


export default {

  name: 'MainBlock',

  data () {
    return {
    }
  },
  computed: {
  	user () {
  		return this.$store.state.users['currentUser']
  	},
  	courses() {
  		return this.$store.state.lists.currentUserCourses;
  	},
  	mainBlockTemplate() {
  		return this.$store.state.mainBlockTemplate;
  	}
  },
  //Methods here
  methods: {
  }
}
</script>

<style lang="stylus" scoped>

.main-block
	width 70%
	left 28%

</style>