<template>

	<transition appear name="slide-left">
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
    }
  },
  //Methods here
  methods: {
  }
}
</script>

<style lang="stylus" scoped>

.additional-block
	left 15%
	width 12%
	min-width 180px

</style>