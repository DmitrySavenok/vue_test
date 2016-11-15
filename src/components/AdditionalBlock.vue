<template>

	<transition appear name="slide-left">

		<div class="additional-block">

			{{addBlockContent.additionalBlockState}}
			
			<div class="home-additional-data" v-if="addBlockContent.additionalBlockState == 'home'">
				<div class="data">
					
					some stuff here

				</div>

				<div class="data-2" v-on:click="setContent">
					
					some stuff here

				</div>
			</div>

		</div>
	</transition>


</template>

<script>

import store from '../store';


export default {

  name: 'AdditionalBlock',

  data () {
    return {
    }
  },
  computed: {
  	addBlockContent () {
  		return this.$store.state;
  	}
  },
  //Methods here
  methods: {
  	setContent: function() {
  		// Temp (don't change state outside actions/mutations)
  		console.log('additional block set content');
  		this.$store.state.renderStage = 2;
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

</style>