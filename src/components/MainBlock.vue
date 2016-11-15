<template>

	<transition appear name="slide-left">
		<div class="main-block">

			<ul class="course-list">
				
				<li v-for="course in courses">
					{{ course.courseName }}
				</li>

			</ul>


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