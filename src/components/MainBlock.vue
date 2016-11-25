<template>

	<transition appear name="slide-left">
		<div class="main-block">


			<template v-if="mainBlockState === 'home'">
				
				<h2>news here</h2>

				<ul class="news">
						
					<li v-for="article in news">
						
						{{article.headline}}
						{{article.name}}
						{{article.description}}
						{{article.article_notification}}

					</li>

				</ul>

			</template>


			<template v-if="mainBlockState === 'goals'">
				
				<h2>squad G | O | A | L | S</h2>

			</template>

			<template v-if="mainBlockState === 'courses'">

				<ul class="course-list">
					
					<li v-for="course in courses">
						{{ course.courseName }}
					</li>

				</ul>

			</template>
			
			<template v-if="mainBlockState === 'resources'">
				<h2>resources here</h2>

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

import ResourceListItem from './ResourceListItem.vue';

export default {

  name: 'MainBlock',

  data () {
    return {
    	sectionNum: 0
    }
  },
  components: {
  	ResourceListItem
  },
  computed: {
  	user () {
  		return this.$store.state.users['currentUser']
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
  }
}
</script>

<style lang="stylus" scoped>

.main-block
	width 80%
	left 2%

</style>