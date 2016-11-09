<template>

	<transition name="slide-left">
		<div class="home-page">
			<h1>{{ msg }}</h1>
			
			<UserMenu></UserMenu>
			<AdditionalBlock></AdditionalBlock>
			<MainBlock></MainBlock>
			<button v-on:click="changePath">Login</button>
		</div>
	</transition>




</template>

<script>

import UserMenu from './UserMenu.vue';
import AdditionalBlock from './AdditionalBlock.vue';
import MainBlock from './MainBlock.vue';


export default {

  name: 'HomeView',

  data () {
    return {
      msg: 'Ayy we home'
    }
  },
  components: {
  	UserMenu,
  	AdditionalBlock,
  	MainBlock
  },
  //Methods here
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

</style>

<style lang="stylus" scoped>


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