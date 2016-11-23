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
							<li v-on:click="showSectionInfo" class="section-handle">
								Section {{index}}
								<div class="section-info hidden" v-bind:class="'section-' + index + '-info'" v-on:click.stop>
									<h3>{{section.section_name}}</h3>
									<p>{{section.section_description}}</p>
									<div class="section-expert">
										Section expert
										<div class="section-expert-photo"></div>
										<h3 class="section-expert-name">{{section.section_expert_name}}</h3>
										<p>
											<span class="section-expert-phone">{{section.section_expert_phone}}</span>
											<span class="section-expert-mail">{{section.section_expert_mail}}</span>
										</p>
									</div>
								</div>
							</li>
						</template>

					</ul>
					
				</div>
			</template>

		</div>
	</transition>


</template>

<script>

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
  		let descriptions = document.querySelectorAll('.section-info');

  		event.target.querySelector('.section-info').classList.contains('hidden')
  		? ( [].forEach.call(descriptions, description => description.classList.add('hidden')), event.target.querySelector('.section-info').classList.toggle('hidden') )
  		: [].forEach.call(descriptions, description => description.classList.add('hidden'));
  	}
  }
}
</script>

<style lang="stylus" scoped>

.additional-block
	left 15%
	width 12%
	min-width 180px
	
	.data
	.data-2
		height 150px
		width 100%
		background green
		position relative
		top 50px
		
	.data-2
		top 150px
	
	.section-info
		// display block
		visibility visible
		height auto
		transition 0.3s height ease-out
		&.hidden
			visibility hidden
			height 0px
			// display none
	
	.section-handle
		cursor pointer
		transition 0.3s all ease-out

</style>