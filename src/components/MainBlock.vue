<template>

	<transition appear name="slide-left">
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
    }
  },
  //Methods here
  methods: {
  }
}
</script>

<style lang="stylus" scoped>

.main-block
	width 70%
	left 28%

</style>