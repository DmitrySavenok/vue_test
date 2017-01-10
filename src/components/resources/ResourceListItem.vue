<template>

	<div class="resource-item" :class="isHidden ? 'hidden-item' : 'visible-resource-item'">
		
		<h4 class="resource-title" @click="showInfo">{{resource.resource_title}}</h4>

		<transition-group 
			name="fade-resource" 
			tag="div" 
			@beforeLeave="changeSection"
			@beforeEnter="beforeEnter" 
			@afterEnter="afterEnter" 
			@afterLeave="afterLeave" 
			>
				<div class="resource-info" v-if="!isHidden" :key="resource.resource_title">
					<div class="completion-icon"></div>
					<div class="resource-description">{{resource.resource_description}}</div>
					
					<template v-for="link in resource.links">
						<a target="_blank" class="resource-pdf" v-if="link.indexOf('.pdf') > 0" v-bind:href="link">PDF</a>
						<a target="_blank" class="resource-web" v-else :href="link">WWW</a>
					</template>
				</div>
		</transition-group>

	</div>

</template>

<script>


export default {

	name: 'ResourceListItem',
	data () {
		return {
			isHidden: true
		}
	},
	props: ['resource'],

	computed: {

	},

	methods: {
		showInfo(event) {
			this.isHidden = !this.isHidden;
		},
		changeSection(el) {
			this.isHidden = true;

			el.style.visibility = 'hidden';
			el.style.transition = '';


			let parentEl = el.parentNode.parentNode;
	        setTimeout(() => parentEl.style.height = "20px", 25)

		},
		beforeEnter(el) {

	        console.log('before');

	        el.style.visibility = 'hidden';

		},
		afterEnter(el) {

			console.log('after');

			// console.log(el);
			// console.log(el.parentNode.parentNode);
			// console.log(el.clientHeight);

			let elHeight 	 = el.clientHeight;
			let parentHeight = el.parentNode.parentNode.clientHeight;

			el.style.transition = 'opacity 0.1s 0.3s ease-out';

			setTimeout(() => el.parentNode.parentNode.style.height = elHeight + parentHeight + "px", 25)
			setTimeout(() => el.style.visibility = 'visible', 50)
			setTimeout(() => el.style.opacity = 1, 100)

		},
		beforeLeave(el) {

			setTimeout(() => el.parentNode.parentNode.style.height = 15 + "px", 25)

		},
		afterLeave(el) {

		}
	}
}

</script>

<style lang="stylus" scoped>

@import '../../styles/variables.styl';


.resource-list

	.resource-item
		transition height 0.3s ease-out
		border-bottom 1px solid rimiLightGrey
		position relative
		padding 12px 60px 12px 0px
		margin 0px 25px
		border-top 1px solid transparent
		height 20px
		
		&.visible-resource-item
			background #EAEAEA
			padding 9px 60px 8px 65px
			margin-left 10px
			.resource-title
				font-size 24px
				font-weight 600
				padding 5px 40px
				color rimiGrey
				text-transform capitalize
			
			.resource-description
				padding-left 15px
				
			&:after
				content ''
				display block
				position absolute
				left 64px
				background #C2C2C2
				height 100%
				width 1px
				top 0px
								
			&:before
				leftSideLine(rimiLightGreen)
			
		
	.resource-title
		margin 0px
		cursor pointer
		font-weight 300
	
	.resource-description
		margin-bottom 20px

	.resource-pdf
	.resource-web
		background #C2C2C2	
		color #FFF
		padding 5px 20px
		font-size 18px
		text-decoration none
	
	.resource-web
		background rimiLightBlue
		margin-left -4px
	
	.resource-info
		opacity 0
		.completion-icon
			background transparent url('../../styles/img/tick-green.png') 0 0 no-repeat
			width 34px
			height 32px
			left 16px
			top 0px
			bottom 0px
			margin auto
			position absolute
			

// .fade-resource-enter-active, .fade-resource-leave-active
// 	transition opacity .5s

// .fade-resource-enter, .fade-resource-leave-active
// 	opacity 0
	



// Only transition related styling

.grow-transition {
  transition: all .7s ease;
  overflow: hidden;
}

.animated {
    // Slightly faster
    -webkit-animation-duration: .7s;
  animation-duration: .7s;
}


</style>