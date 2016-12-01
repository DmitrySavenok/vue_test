<template>

	<li v-on:click="showSectionInfo" class="section-handle">

		<div v-if="section">

			<!-- {{section.category_handle}} -->
			{{section.category_name}}
			<!-- <transition appear name="section-fade"> -->
				<div v-if="showSection" class="section-info" v-on:click.stop>
					<h3>{{section.category_heading}}</h3>
					<p>{{section.category_description}}</p>
					<div class="section-expert">
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

.section-info
	transition all .5s cubic-bezier(.55,0,.1,1)
	min-height 360px
	// height auto
	// height 0px
	
.section-handle
	cursor pointer
	transition 0.3s all ease-out
		
</style>