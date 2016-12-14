<template>

	<div class="resource-item" :class="isHidden ? 'hidden-item' : 'visible-resource-item'">
		
		<h4 class="resource-title" @click="showInfo">{{resource.resource_title}}</h4>

		<transition-group 
			name="fade-resource" 
			tag="div" 
			@beforeLeave="changeSection">
				<div class="resource-info" v-show="!isHidden" :key="resource.resource_title" 
					@beforeEnter="beforeEnter" 
					@afterEnter="afterEnter" 
					@beforeLeave="beforeLeave" 
					@afterLeave="afterLeave" 
					>
					<div class="completion-icon"></div>
					<div class="resource-description">{{resource.resource_description}}</div>
					
					<template v-for="link in resource.links">
						<a class="resource-pdf" v-if="link.indexOf('.pdf') > 0" v-bind:href="link">PDF</a>
						<a class="resource-web" v-else :href="link">WWW</a>
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
			console.log('here');
			this.isHidden = true;
		},
		beforeEnter(el) {
	        // Setup clone

	        el.style.opacity = '0';

	        var clone = el.cloneNode(true), 
	        	h

	        clone.style.visibility = 'hidden'
	        clone.style.removeProperty('display')
	        
	        // var desc = clone.querySelectorAll("*");
	        // [].forEach.call(desc, function (item) {
	        //     item.style.removeProperty('display')
	        // });
	        
	        el.parentNode.appendChild(clone)
	        h = clone.clientHeight
	        clone.remove()
	        
	        // // Force animation instead of simple "setting a height"
	        el.style.height = "0px"
	        setTimeout(() => el.style.height = h + "px", 1)
	        el.parentNode.parentNode.style.height = '20px'
	        setTimeout(() => el.parentNode.parentNode.style.height = el.parentNode.parentNode.clientHeight + h + "px", 25)
		},
		afterEnter(el) {

	        el.style.opacity = '1';
        	el.style.removeProperty('height')
		},
		beforeLeave(el) {
	        el.style.opacity = '0';
	        el.parentNode.parentNode.style.height = el.parentNode.parentNode.clientHeight + "px";
	        setTimeout(() => el.parentNode.parentNode.style.height = "20px", 25)

    		el.style.height = el.clientHeight + "px"
        	setTimeout(() => el.style.height = "0px", 1)
		},
		afterLeave(el) {
        	el.style.removeProperty('height')
		}
	},
	beforeUpdate: function() {
		// console.log('here');
		// this.isHidden = true;
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
		padding 10px 60px 4px 25px
		margin-left 10px
		border-top 1px solid transparent
		
		&.visible-resource-item
			background #EAEAEA
			padding 10px 60px 4px 65px
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
				content ''
				display block
				position absolute
				background rimiLightGreen
				height 70.5%
				width 15px
				left -12px
				top 18%
				transform rotateZ(-45deg) skew(-45deg)
				transform-origin center
			
		
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