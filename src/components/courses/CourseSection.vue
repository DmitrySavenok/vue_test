<template>

	<li v-on:click="showSectionInfo" class="section-handle">

		<div v-if="section">

			<div class="list-handle">{{section.category_name}}</div>

			<!-- <transition appear name="section-fade"> -->
				<div v-if="showSection" class="section-info" v-on:click.stop>
					<h3>{{section.category_heading}}</h3>
					<p>{{section.category_description}}</p>
					<hr>
					<div class="section-completion">
						Course passed
					</div>
				</div>
			<!-- </transition> -->
		</div>
		
	</li>

</template>

<script>



// Rewrite that damn animation for opening lists
// Transition left for later..

export default {

	name: 'CourseSection',
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
			this.showSection ? this.showEl = '' : this.showEl = this.section.category_handle;
			// Not a good idea to change state w/o outside actions/mutations
			this.$store.state.showSection = this.section.category_handle;
		}
	}
}
</script>

<style lang="stylus" scoped>

@import '../../styles/variables.styl';

.section-info
	transition all .5s cubic-bezier(.55,0,.1,1)
	min-height 360px
	// height auto
	// height 0px
	
.section-info
	transition all .5s cubic-bezier(.55,0,.1,1)
	min-height 602px
	text-align left
	
	h3
		color rimiRed
		padding 30px 50px 0px 50px
	p
		padding 0px 50px 30px 50px


.section-handle
	transition 0.3s all ease-out
	
	&:nth-child(1)
		.list-handle
			background rimiRed
			&:after
				border-bottom 18px solid rimiRed
	&:nth-child(2)
		.list-handle
			background rimiLightRed
			&:after
				border-bottom 18px solid rimiLightRed

.section-completion
	text-align center
	
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