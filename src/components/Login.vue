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


		<!-- <button @click="addDevUser">Add test user (user/password)</button> -->

	</div>

</template>

<script>

import axios from 'axios';
import docCookies from '../scripts/cookies.js';

console.log(docCookies);

function setLang( store, lang ) {
	return store.dispatch('SET_LANG', { lang });
}


function apiPostCall( child, data ) {


	console.log('dev login PHP function called');

	console.log(data);

	return new Promise((resolve, reject) => {
		axios({
			method: 'post',
			url: `http://localhost/server/test.php?r=${child}`,
			data: data
		}).then( (res) => {
			console.log('DATA: ');
			console.log(res);
			resolve(res.data);
		})
		.catch( (err) => {
			reject(err);
		});
	});

}

function apiGetCall( child ) {

	return new Promise((resolve, reject) => {
		axios({
			method: 'get',
			url: `http://localhost/server/test.php?r=${child}`
		}).then( (res) => {
			// console.log('DATA: ');
			// console.log(res);
			resolve(res.data);
		})
		.catch( (err) => {
			reject(err);
		});
	});

}

// function createDevUser() {

// 	return new Promise((resolve, reject) => {
// 		axios({
// 			method: 'post',
// 			url: 'http://localhost/server/test.php?r=add_user',
// 			data: {
// 				role: 'learner',
// 				name: 'Billy',
// 				surname: 'Bob',
// 				country: 'LV',
// 				position: 'Tester',
// 				department_alias: 'Testing department',
// 				department_id: 1337,
// 				login: 'user',
// 				password: 'pass'

// 			}
// 		}).then( (res) => {
// 			console.log('DATA: ');
// 			console.log(res);
// 			resolve(res.data);
// 		})
// 		.catch( (err) => {
// 			reject(err);
// 		});
// 	});

// }

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


  		apiPostCall('login', data).then( (res) => {

			console.log('LOGIN DATA: ');
			console.log(res.result);
			document.querySelector('#debug').innerHTML = JSON.stringify(res);

			if ( res.result.indexOf('Logged in') == 0 ) {

				console.log('ayy we here');

				docCookies.setItem('userId', res.COOKIE.id);
				docCookies.setItem('userHash', res.COOKIE.hash);
				
				apiGetCall(`users&userId=${res.COOKIE.id}&userHash=${res.COOKIE.hash}`).then( (res) => {
					console.log('User data: ');
					console.log(res);

					if ( res.id ) {
						// this.$store.state.userId = +res.id;
						this.$store.state.users.currentUser = res;
						this.$store.changePath('/home', { router: this.$router });	
					} else {
						console.log('error while getting user data');
					}

				}).catch( (err) => {
					console.log(err);
				});


			}
		})
		.catch( (err) => {
			console.log('LOGIN ERROR: ');
			console.log(err);
			// reject(err);
		});
  		// console.log(this);
  	},

  	// addDevUser: function() {



  	// 	createDevUser().then( (res) => {
			// document.querySelector('#debug').innerHTML = JSON.stringify(res);
  	// 		console.log('Created new user: ');
  	// 		console.log(res);
  	// 	}).catch( (err) => {
  	// 		console.log('Error while creating a new user');
  	// 		console.log(err);
  	// 	})

  	// },

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