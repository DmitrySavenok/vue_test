<template>

	<div class="main-data-blocks">
		
		<AdditionalBlock></AdditionalBlock>
		<MainBlock></MainBlock>

	</div>

</template>

<script>

import AdditionalBlock from './AdditionalBlock.vue';
import MainBlock from './MainBlock.vue';


export default {

  name: 'MainDataBlocksView',

  data () {
    return {
    }
  },
  components: {
  	AdditionalBlock,
  	MainBlock
  },
  //Methods here
  computed: {
  	renderStage() {
  		return this.$store.state.renderStage
  	}
  },
  methods: {
  	changePath: function() {
  		this.$store.changePath('/', { router: this.$router });
  	}
  }
}
</script>

<style lang="stylus">


</style>

<style lang="stylus" scoped>

// .home-page
// 	min-height 600px
// 	position relative
	

// .userMenu
// .additional-block
// .main-block
// 	position absolute
// 	background #ccc
// 	min-height 600px
// 	top 50px
// 	transition all .5s cubic-bezier(.55,0,.1,1)

.main-data-blocks
	display inline-block
	width 80%
	
h1
	text-align center


</style>