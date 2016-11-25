<template>


	<div class="resource-item">
		
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
					<div class="resource-description">{{resource.resource_description}}</div>
					
					<template v-for="link in resource.links">
						<a v-if="link.indexOf('.pdf') > 0" v-bind:href="link">PDF</a>
						<a v-else :href="link">Else</a>
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


.resource-item
	transition height 0.3s ease-out
	
.resource-title
	margin 0px
	cursor pointer
	
.resource-info
			

.fade-resource-enter-active, .fade-resource-leave-active
	transition opacity .5s

.fade-resource-enter, .fade-resource-leave-active
	opacity 0
	



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