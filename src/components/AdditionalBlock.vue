<template>

	<transition appear name="slide-left">

		<div class="additional-block">

			<h1>{{additionalBlockState}}</h1>

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
				
				<div class="home-additional-data">
					<div class="data" v-on:click="setUpGoals">
						
						some stuff here

					</div>

					<div class="data-2" v-on:click="setContent">
						
						some stuff here

					</div>
				</div>

			</template>

			<template v-if="additionalBlockState === 'courses'">
				<div class="goals_list">

					<ul>
						<li v-for="goal in goals">
							{{goal.goal_id}} / {{goal.goal_name}}
						</li>

					</ul>
					
					{{goals}}
				</div>
			</template>

			<template v-if="additionalBlockState === 'resources'">
				<div class="sections">
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

import ResourceSection from './ResourceSection.vue';
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
  	ResourceSection
  },
  props: ['type'],
  computed: {
  	goals() {
  		return this.$store.state.goals;
  	},
  	notifications() {
  		return this.$store.state.lists.notifications;
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

.additional-block
	left 1%
	width 12%
	min-width 140px
	
	.data
	.data-2
		height 150px
		width 100%
		background green
		position relative
		top 50px
		
	.data-2
		top 150px
	
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
			margin 0
			padding 0
			list-style none
			
			li
				transition all 0.3s ease-out

</style>