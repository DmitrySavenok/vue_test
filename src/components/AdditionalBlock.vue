<template>

	<transition name="slide-left">
		<div class="additional-block">

		</div>
	</transition>


</template>

<script>

import store from '../store';


export default {

  name: 'AdditionalBlock',

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

.additional-block
	left 15%
	width 12%
	min-width 180px

</style>