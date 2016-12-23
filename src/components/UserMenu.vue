<template>

  <transition appear :name="transition">
	<div class="userMenu">
	  <!-- <spinner :show="!user"></spinner> -->
	  <template v-if="user">

		<div class="user-description">
			<div class="user-row">
				<h4 class="name-surname">{{ user.name }}<br>{{ user.surname }}</h4>
				<div class="profile-pic"></div>
			</div>
			<h4 class="department"> {{ user.department }}</h4>

			<router-link class="logout" :to="'/'">Logout</router-link>
		</div>


		<div class="student-menu" v-if="user.role === 'student'">
			<ul>
				<li><router-link class="link-home" :to="'/home'" v-on:click="setPageHome">Home</router-link></li>
				<li><router-link class="link-goals" :to="'/goals'" v-on:click="setPageGoals">Development Goals</router-link></li>
				<li><router-link class="link-courses" :to="'/courses'" v-on:click="setPageCourses">Rimi e-learning</router-link></li>
				<li><router-link class="link-resources" :to="'/resources'" v-on:click="setPageResources">Learning resources</router-link></li>
			</ul>

		</div>

		<div class="manager-menu" v-if="user.role === 'manager'">
			
			<ul>
				<li><a v-on:click="setManagerContent">Manager Menu 1</a></li>
				<li><a v-on:click="setManagerContent">Manager Menu 2</a></li>
				<li><a v-on:click="setManagerContent">Manager Menu 3</a></li>
			</ul>
		
		</div>
	  </template>

	</div>
  </transition>

</template>

<script>

import Spinner from '../components/Spinner.vue';

function fetchUser ( store ) {
  return store.dispatch('FETCH_USER', {
	id: store.state.userId
  })
}


function fetchCourses ( store ) {
  return store.dispatch('FETCH_COURSES', {
	userPosition: store.state.users['currentUser'].position
  });
}


function leave( store, renderStage ) {
  return store.dispatch('HANDLE_RENDERING', {
	renderStage
  });
}


function setAdditionalField( store, page ) {
  return store.dispatch('HANDLE_ADDITIONAL_FIELD', { page });
}
function setMainField( store, page ) {
  return store.dispatch('HANDLE_MAIN_FIELD', { page })
}


export default {

  name: 'UserMenu',
  components: { Spinner },
  data () {
	return {
	  fullName: 'John Doe',
	  transition: 'slide-left'
	}
  },
  computed: {
	user () {
	  return this.$store.state.users['currentUser']
	}
  },
  preFetch: fetchUser,
  beforeMount () {
	fetchUser(this.$store);
  },
  //Methods here
  methods: {

	setPageHome: function() {

	  setAdditionalField(this.$store, 'home');
	  setMainField(this.$store, 'home');

	},

	setPageGoals: function(){ console.log('goals') },
	setPageCourses: function(){ console.log('courses') },
	setPageResources: function(){ console.log('resources') },

	// Temp (don't change state outside actions/mutations)
	// setAddContent: function() {
	//   this.$store.state.additionalBlockState = 'home';
	//   this.$store.state.renderStage = 1;
	//   console.log(this.$store.state.additionalBlockState);
	// },

	// Temp (don't change state outside actions/mutations)
	// setContent: function() {
	//   this.$store.state.additionalBlockState = 'notHome';
	//   this.$store.state.renderStage = 1;
	//   console.log(this.$store.state.additionalBlockState);
	//   console.log('changing content here');
	// },
	// fetchCourses: function() {
	//   fetchCourses(this.$store);
	// },

	setManagerContent: function() {
	  console.log('hey');
	  console.log('beatmaker');
	},

	changePath: function() {
	  leave(this.$store, '/');
	}
  }
}
</script>

<style lang="stylus">

@import '../styles/variables.styl';

.userMenu
	width 270px
	height 100%
	left 0%
	
	.user-description
		padding 15px
		
		h4
			margin 5px 0px
		
	.user-row
		display flex
		align-items center
		
	.name-surname
		flex 1 1 auto
		font-size 18px
		font-weight 300
		color rimiRed
	
	.profile-pic
		background transparent url('../styles/img/profile-ph.png') 0 0 no-repeat
		height 45px
		width 45px
		
	.logout
		text-decoration none
		color rimiGrey
		
	.student-menu			
		ul
			margin 0px
			padding 0px
		li
			list-style none
		a
			position relative
			text-decoration none
			color rimiGrey
			display block
			padding 5px 0px 5px 15px
			
			&:hover
				background #999
		
		.link-home
			margin-bottom 20px
			
		.link-home
		.link-goals
		.link-courses
		.link-resources
			&:hover
				color #FFF
			&:before
				content ''
				display block
				position absolute
				height 100%
				width 4px
				margin-left -15px
				top 0px
		
		.link-home
			&:hover
				background rimiRed
			&:before
				background rimiRed
				
		.link-goals
			&:hover
				background rimiPink
			&:before
				background rimiPink
		.link-courses
			&:hover
				background rimiOrange
			&:before
				background rimiOrange
		.link-resources
			&:hover
				background rimiLightGreen
			&:before
				background rimiLightGreen
				
		.router-link-active
			color #FFF
			&.link-home
				background rimiRed
			&.link-goals
				background rimiPink
			&.link-courses
				background rimiOrange
			&.link-resources
				background rimiLightGreen
</style>