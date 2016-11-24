<template>
	<li v-on:click="showSectionInfo" class="section-handle">
		Menu item {{section.id}}
		<transition appear name="section-fade">
			<div v-if="showSection" class="section-info" v-on:click.stop>
				<h3>{{section.section_name}}</h3>
				<p>{{section.section_description}}</p>
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
		</transition>
	</li>
</template>

<script>



// Rewrite that damn animation for opening lists

export default {

	name: 'ResourceSection',
	data () {
		return {
			showEl: 'none'
		}
	},
	props: ['type', 'section'],
	//Methods here
	computed: {
		showSection() {
			return this.$store.state.showSection === this.showEl;
		},
	  	sections() {
	  		return this.$store.state.lists.resources;
	  	}
	},
	methods: {
		showSectionInfo: function(event) {
			this.showSection ? this.showEl = '' : this.showEl = event.target;
			// Not a good idea to change state w/o outside actions/mutations
			this.$store.state.showSection = event.target;
		}
	},
	updated: function() {
		console.log('updated');
	}
}
</script>

<style lang="stylus" scoped>

.section-info
	transition all .5s cubic-bezier(.55,0,.1,1)
	// height auto
	// height 0px
	
.section-handle
	cursor pointer
	transition 0.3s all ease-out
		
</style>