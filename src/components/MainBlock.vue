<template>

	<transition name="slide-left">
		<div class="main-block">

		</div>
	</transition>


</template>

<script>

import store from '../store';


export default {

  name: 'MainBlock',

  data () {
    return {
      fullName: 'John Doe'
    }
  },
  //Methods here
  methods: {
  	smth: function() {
  		this.msg = Math.random();
  	}
  }
}
</script>

<style lang="stylus" scoped>

.main-block
	width 70%
	left 28%

</style>