<template>

	<transition name="slide-left">
		<div class="home-page">
			<h1>{{ msg }} {{type}}</h1>
			
			<UserMenu></UserMenu>

	  <DataBlocks></DataBlocks>

		</div>
	</transition>




</template>

<script>

import UserMenu from './UserMenu.vue';
import DataBlocks from './DataBlocks.vue';


export default {

  name: 'HomeView',

  data () {
	return {
	  msg: 'Ayy we'
	}
  },
  props: ['type'],
  components: {
	UserMenu,
	DataBlocks
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

.slide-left-enter
	opacity 0
	transform translate(30px, 0)

.slide-left-leave-active
	opacity 0
	transform translate(-30px, 0)

.fade-enter-active, .fade-leave-active
	transition all .5s

.fade-enter, .fade-leave-active
	opacity 0


.section-fade-enter
	transition height .5s
	
.section-fade-enter-active
	transition all .5s
	height 0px
	opacity 0

.section-fade-leave-enter
	opacity 0
	height auto
	
.section-fade-leave-active
	height auto
	opacity 0



</style>

<style lang="stylus">


.home-page
	min-height 600px
	position relative
	
.userMenu
.additional-block
.main-block
	position relative
	display inline-block
	vertical-align top
	background #ccc
	min-height 600px
	top 50px
	transition all .5s cubic-bezier(.55,0,.1,1)

h1
	text-align center


</style>