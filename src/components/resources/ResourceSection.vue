<template>
	<li v-on:click="showSectionInfo" class="section-handle">
		<div class="list-handle">Section {{section.id}}</div>
		<!-- <transition appear name="section-fade"> -->
			<div v-if="showSection" class="section-info" v-on:click.stop>
				<h3>{{section.section_name}}</h3>
				<p>{{section.section_description}}</p>
				<hr>
				<div class="section-expert">
					Section expert
					<div class="section-expert-photo"></div>
					<h3 class="section-expert-name">{{section.section_expert_name}}</h3>
					<p>
						<span class="section-expert-phone">{{section.section_expert_phone}}</span>
						<span class="section-expert-mail">{{section.section_expert_mail}}</span>
					</p>
				</div>
			</div>
		<!-- </transition> -->
	</li>
</template>

<script>



// Rewrite that damn animation for opening lists
// Transition left for later..

export default {

	name: 'ResourceSection',
	data () {
		return {
			showEl: 0
		}
	},
	props: ['type', 'section'],
	//Methods here
	computed: {
		showSection() {
			return this.$store.state.showSection === this.showEl;
		}
	},
	methods: {
		showSectionInfo: function(event) {
			this.showSection ? this.showEl = '' : this.showEl = this.section.id;
			// Not a good idea to change state w/o outside actions/mutations
			this.$store.state.showSection = this.section.id;
		}
	}
}
</script>

<style lang="stylus" scoped>

@import '../../styles/variables.styl';

.section-info
	transition all .5s cubic-bezier(.55,0,.1,1)
	min-height 602px
	text-align left
	
	h3
		color rimiRed
		padding 30px 50px 0px 50px
	p
		padding 0px 50px 30px 50px

	
.section-expert
	text-align center
	
	.section-expert-photo
		background transparent url('../../styles/img/expert-ph.png') 0 0 no-repeat
		height 194px
		width 194px
		margin 25px auto 5px auto
	
	.section-expert-name
		padding 10px 50px 0px 50px
		color rimiGrey

.section-handle
	transition 0.3s all ease-out
	
	&:nth-child(1)
		.list-handle
			background rimiRed
			&:after
				border-bottom 18px solid rimiRed
	&:nth-child(2)
		.list-handle
			background rimiRed
			&:after
				border-bottom 18px solid rimiRed
	&:nth-child(3)
		.list-handle
			background rimiDarkRed
			&:after
				border-bottom 18px solid rimiDarkRed
	&:nth-child(4)
		.list-handle
			background rimiLightRed
			&:after
				border-bottom 18px solid rimiLightRed
	
.list-handle
	cursor pointer
	color #FFF
	font-size 21px
	text-align left
	padding 5px 0px 5px 50px
	position relative
	
	&:before
		content ''
		display block
		position absolute
		border-top 16px solid transparent
		border-left 16px solid transparent
		border-right 16px solid transparent
		border-bottom 18px solid #FFF
		left 5px
		
	&:after
		content ''
		display block
		position absolute
		border-top 16px solid transparent
		border-left 16px solid transparent
		border-right 16px solid transparent
		left 5px
		bottom 36px
	

		
</style>