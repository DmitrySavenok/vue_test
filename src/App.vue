<template>
  <div id="wrapper">
    <!-- header -->
    <div id="header">
      <h2>Custom header (Visible on all pages)</h2>
    </div>
    <!-- main view -->
    <!-- <transition name="slide-fade"> -->
    	<router-view class="view"></router-view>
    <!-- </transition> -->
  </div>
</template>

<style lang="stylus" scoped>


html, body
	height 100%
	width 100%
	margin 0px

#wrapper
	height 100%
	width 100%
	overflow hidden

.slide-fade-enter-active
	transition all .3s ease
	
.slide-fade-leave-active
	transition all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0)
	
.slide-fade-enter, .slide-fade-leave-active
	padding-left:10px
	opacity 0

#app
	font-family 'Avenir', Helvetica, Arial, sans-serif
	-webkit-font-smoothing antialiased
	-moz-osx-font-smoothing grayscale
	text-align center
	color #2c3e50
	margin-top 60px
#header
	text-align center
h1, h2
	font-weight normal

ul
	list-style-type none
	padding 0

li
	display inline-block
	margin 0 10px

a
	color #42b983

</style>