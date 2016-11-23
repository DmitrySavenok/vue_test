<template>

	<div class="main-data-blocks">
		<div class="orange"></div>
		
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

.orange
	height 50px
	width 50px
	background orange

.home-page
	min-height 600px
	position relative
	

.userMenu
.additional-block
.main-block
	position absolute
	background #ccc
	min-height 600px
	top 50px
	transition all .5s cubic-bezier(.55,0,.1,1)

h1
	text-align center


</style>