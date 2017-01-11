<template>

	<div class="login-form">

		<div class="login-fields">
      		<h1>{{ $t("message.header") }}</h1>
			<!-- <h1>{{ msg }}</h1> -->

			<div class="lang-select">
				<button @click="changeLang" data-lang="ee" class="lang-button" name="lang-ee">EE</button>
				<button @click="changeLang" data-lang="lv" class="lang-button" name="lang-lv">LV</button>
				<button @click="changeLang" data-lang="lt" class="lang-button" name="lang-lt">LT</button>
				<button @click="changeLang" data-lang="eng" class="lang-button" name="lang-eng">ENG</button>
			</div>
			
			<form v-on:submit.prevent="onSubmit">
				<div class="login-field"><input v-model="login" type="text" name="name" placeholder="Login"></label></div>
				<div class="login-field"><input v-model="password" type="password" name="password" placeholder="Password"></label></div>
				<input class="login-submit" type="submit" name="submit" value="Log in">
			</form>
		</div>

	</div>

</template>

<script>

import axios from 'axios';

function setLang( store, lang ) {
	return store.dispatch('SET_LANG', { lang });
}


function devLogin( child, data ) {


	console.log('dev login PHP function called');

	console.log(data);

	return new Promise((resolve, reject) => {
		axios.post(`http://slprod.lv/tmp/rimi/api_v0.php`, {data}).then( (res) => {
			console.log('DATA: ');
			console.log(res);
			resolve(res.data);
		})
		.catch( (err) => {
			reject(err);
		});
	})


}

export default {
  name: 'LoginView',
  // Initial data object
  // All the fields are must-have for template
  // I.e. {{ msg }} must have data () { msg: 'something' } initial value
  data () {
    return {
      msg: 'RIMI LMS 3.0',
      login: '',
      password: ''
    }
  },
  methods: {
  	onSubmit: function() {
  		// Auth here. if ( true ) =>
  		// Set user pin here (and login in UserMenu.vue component?)
  		let data = {
  			login: this.$data.login,
  			pass: this.$data.password
  		}
  		devLogin('que', data).then( (res) => {
			console.log('LOGIN DATA: ');
			console.log(res);
	  		this.$store.state.userId = +this.$data.login;
	  		this.$store.changePath('/home', { router: this.$router });
		})
		.catch( (err) => {
			console.log('LOGIN ERROR: ');
			console.log(err);
			// reject(err);
		});
  		// console.log(this);
  	},

  	changeLang: function(e) {

  		let newLang = e.target.getAttribute('data-lang');
  		setLang(this.$store, newLang);
  		
  	}
  }
}
</script>

<style lang="stylus" scoped>

@import '../styles/variables.styl';


.login-form
	height 100%
	width 400px
	background #FFF
	left 0px
	right 0px
	margin auto
	
	.lang-select
		display flex
		flex-direction row
		
		.lang-button
			color #FFF
			flex 1 0 25%
			background rimiLightGrey
			border none
			font-size 16px
			font-weight 400
			padding 5px 0px
			cursor pointer
			
			&:hover
				background rimiLightBlue
			&:focus
				border none
				outline none
			&:active
				border none
				outline none

	.login-fields
		position absolute
		height 400px
		width 400px
		left 0px
		right 0px
		top 0px
		bottom 0px
		margin auto
		text-align center
		
		h1
			color rimiGrey
			margin 0px 0px 30px 0px
			
		input
			width 290px
			border none
			padding 10px 0px 10px 110px
			background rimiLighterGrey
			color rimiGrey
			font-size 21px
			margin-top 20px
			font-family 'Neris'
			
			&:active
			&:focus
				outline none

			&::placeholder
				color rimiGrey
				
			&.login-submit
				background rimiRed
				padding 10px 0px
				width 100%
				color #FFF
				cursor pointer
				

</style>