<template>

	<li v-on:click="showSectionInfo" class="section-handle">

		<div v-if="section">

			<div class="list-handle">{{$t('courseSections.' + section + '.category_name')}}</div>

			<!-- <transition appear name="section-fade"> -->
				<div v-if="showSection" class="section-info" v-on:click.stop>
					<h3>{{$t('courseSections.' + section + '.category_heading')}}</h3>
					<p>{{$t('courseSections.' + section + '.category_description')}}</p>
					<hr>
					<div class="section-completion">
						<!-- check course completion status -->
						Course passed

						<!-- Check how many courses passed in that sections -->
						<div class="courses-passed courses-passed-ph"></div>
						<span class="passed-number-ph">3/14</span>
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

	computed: {
		showSection() {
			return this.$store.state.showSection === this.showEl;
		}
	},
	methods: {
		showSectionInfo: function(event) {
			this.showSection ? this.showEl = '' : this.showEl = this.$t('courseSections.' + this.$options.propsData.section + '.category_handle');
			// Not a good idea to change state w/o outside actions/mutations
			this.$store.state.showSection = this.$t('courseSections.' + this.$options.propsData.section + '.category_handle');
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
	
	.courses-passed-ph
		background transparent url('../../styles/img/completed-courses-ph.png') 0 0 no-repeat
		height 200px
		width 200px
		left 0px
		right 0px
		margin auto
		top 30px
		position relative
	.passed-number-ph
		position relative
		top 40px
	
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