<template>

	<div class="login-form">
		
		<h1>  </h1>
		<div class="login-fields">
			<h1>{{ msg }}</h1>
			
			<form v-on:submit.prevent="onSubmit">
				<div class="login-field"><label>Login: <input v-model="login" type="text" name="name" placeholder="pin here"></label></div>
				<div class="login-field"><label>Password: <input type="password" name="password" value="Password"></label></div>
				<input type="submit" name="submit" value="Submit">
			</form>
		</div>

	</div>

</template>

<script>


export default {
  name: 'LoginView',
  // Initial data object
  // All the fields are must-have for template
  // I.e. {{ msg }} must have data () { msg: 'something' } initial value
  data () {
    return {
      msg: 'Test msg',
      login: ''
    }
  },
  methods: {
  	onSubmit: function() {
  		// Auth here. if ( true ) =>
  		// Set user pin here (and login in UserMenu.vue component?)
  		console.log(this);
  		this.$store.state.userId = +this.$data.login;
  		this.$store.changePath('/home', { router: this.$router });
  	}
  }
}
</script>

<style lang="stylus" scoped>

.login-fields
	height 400px
	width 400px
	left 0px
	right 0px
	top 0px
	bottom 0px
	margin auto
	position absolute
	border 1px solid #9c9c9c
	border-radius 4px
	padding 15px
	text-align center

</style>