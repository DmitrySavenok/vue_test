<template>

	<div class="goal-tutorial">

		<h4 class="header header-top"> Vai Tu zini, kādas zināšanas vai prasmes vēlies attistīt? </h4>

		<div class="tutorial-level">
			<p class="level-option entry-level">{{msg1}}</p>
			<p class="level-option middle-level">{{msg2}}</p>
			<p class="level-option high-level">{{msg3}}</p>
		</div>

		<h4 class="header header-bottom">Paskaidrojoša teorija par katru punktu!</h4>
		<p class="level-description">Pat ja nezini, ar ko sākt, turpini - <br>mēs Tev palīdzēsim saprast un nodefinēt savus mērķus.</p>

		<div class="continue-button" @click="setTutorialPhase(2)">Continue!</div>
		
	</div>

</template>

<script>

function setGoalPhase( store, phaseNum ) {
	return store.dispatch('SET_GOAL_PHASE', { phaseNum });
}


export default {

	name: 'GoalFirstTimeTutorial',
	data: function() {
		return {
			msg1: 'Nē, es īsti nezinu, ar ko sākt',
			msg2: 'Aptuveni zinu, bet nespēju konkrēti nodefinēt',
			msg3: 'Diezgan skaidri zinu, ko vēlos attistīt'
		}
	},

	computed: {

	},

	mounted: function() {

	},
	methods: {
		setTutorialPhase: function( phaseNum ) {
			console.log(phaseNum);
			if ( phaseNum ) {
				setGoalPhase(this.$store, phaseNum);
			}
		} 
	}
}

</script>

<style lang="stylus" scoped>

@import '../../styles/variables.styl';

.goal-tutorial
	padding-top 200px
	.header
		color rimiRed
		padding-left 100px
		width 310px
		margin-bottom 40px
		
		&.header-bottom
			margin-bottom 0px
		
	.level-description
		font-size 18px
		padding-left 50px
	
	.tutorial-level
		display flex
		
	.level-option
		flex 1 0 20%
		background rimiRed
		height 50px
		margin 0px
		text-align center
		color #FFF
		font-size 19px
		padding 15px 30px
		cursor pointer
		
		&:nth-child(1)
			padding-left 70px
		&:nth-child(2)
			flex 1 0 30%
			background rimiDarkRed
		&:nth-child(3)
			background rimiLightRed
			padding-right 70px
		
	.continue-button
		position relative
		background rimiLightBlue
		height 50px
		width 100px
		text-align center
		line-height 46px
		font-size 21px
		color #FFF
		left 35px
		cursor pointer
		
		&:before
			leftSideLine(rimiLighterBlue)
			width 46px
			left -40px
			top 19px
			
		&:after
			content ''
			display block
			position absolute
			top 0px
			right -50px
			border-top 25px solid transparent
			border-right 25px solid transparent
			border-bottom 25px solid transparent
			border-left 25px solid rimiLightBlue
</style>