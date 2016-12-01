<template>
		

	<div v-if="!goal" class="goal-item">
		
		<!-- Empty goal here -->

		<h4>Goal {{goalIndex}}</h4>
		Empty

		<div class="goal-graph-wrapper">

			<div class="percentage"> 42% </div>

			<div @mouseover="mouseOver" @mouseleave="mouseLeave" v-bind:class="'goal-bg-' + goalIndex" class="graph-part graph-part-1"></div>
			<div @mouseover="mouseOver" @mouseleave="mouseLeave" v-bind:class="'goal-bg-' + goalIndex" class="graph-part graph-part-2"></div>
			<div @mouseover="mouseOver" @mouseleave="mouseLeave" v-bind:class="'goal-bg-' + goalIndex" class="graph-part graph-part-3"></div>
			<div @mouseover="mouseOver" @mouseleave="mouseLeave" v-bind:class="'goal-bg-' + goalIndex" class="graph-part graph-part-4"></div>	

		</div>

	</div>	


	<div v-else @click="showGoal" class="goal-item">

		<!-- Existing goal here -->
		<h4>Goal {{goalIndex}}</h4>
		<span>285 B.C - 476 A.D</span>

		<div class="goal-graph-wrapper">

			<div class="percentage"> 42% </div>

			<div @mouseover="mouseOver" @mouseleave="mouseLeave" v-bind:class="'goal-bg-' + goalIndex" class="graph-part graph-part-1"></div>
			<div @mouseover="mouseOver" @mouseleave="mouseLeave" v-bind:class="'goal-bg-' + goalIndex" class="graph-part graph-part-2"></div>
			<div @mouseover="mouseOver" @mouseleave="mouseLeave" v-bind:class="'goal-bg-' + goalIndex" class="graph-part graph-part-3"></div>
			<div @mouseover="mouseOver" @mouseleave="mouseLeave" v-bind:class="'goal-bg-' + goalIndex" class="graph-part graph-part-4"></div>	
			
		</div>

	</div>


</template>

<script>


export default {

	name: 'GoalComponent',
	data () {
		return {
		}
	},
	props: ['goal', 'goalIndex'],

	computed: {

	},

	methods: {
		showGoal() {
			console.log(this.goal);
		},
		mouseOver(e) {
			e.target.classList.add('bigger')
		},
		mouseLeave(e) {
			e.target.classList.remove('bigger')
		}
	}
}

</script>

<style lang="stylus" scoped>

// borders(n, a, b, c, d)
// 	border-top n solid a
// 	border-right n solid b
// 	border-bottom n solid c
// 	border-left n solid d


.goal-item
	height 100%
	cursor pointer

	.goal-graph-wrapper
		height 250px
		width 250px
		position relative
		
		.percentage
			height 50px
			width 50px
			position absolute
			left 0px
			top 0px
			right 0px
			bottom 0px
			margin auto
			z-index 2
			background #FFF
			border-radius 50%
			text-align center
			font-size 19px
			font-family OpenSans, Arial, sans-serif
			line-height 50px

		.graph-part
			height 75px
			width 75px
			position absolute
			transition all 0.3s ease-out
			background green


		.graph-part-1
			height 30px
			width 30px
			
			border-radius 0px 100px 0px 0px
			left 125px
			bottom 125px
			
			&.goal-bg-1
				background rgb(204, 51, 102)
			&.goal-bg-2
				background rgb(255, 204, 0)
			&.goal-bg-3
				background rgb(255, 102, 0)
				
		.graph-part-2
			border-radius 0px 0px 100px 0px
			left 125px
			top 125px
			
			height 45px
			width 45px
			
			&.goal-bg-1
				background rgb(255, 102, 153)
			&.goal-bg-2
				background rgb(255, 204, 102)
			&.goal-bg-3
				background rgb(255, 153, 51)
				
		.graph-part-3
			border-radius 0px 0px 0px 100px
			right 125px
			top 125px
			
			height 60px
			width 60px
			
			&.goal-bg-1
				background rgb(204, 51, 102)
			&.goal-bg-2
				background rgb(255, 204, 0)
			&.goal-bg-3
				background rgb(255, 102, 0)
				
		.graph-part-4
			border-radius 100px 0px 0px 0px
			right 125px
			bottom 125px
			
			&.goal-bg-1
				background rgb(153, 51, 102)
			&.goal-bg-2
				background rgb(204, 153, 0)
			&.goal-bg-3
				background rgb(204, 102, 0)
				
		.bigger
			height 100px
			width 100px

</style>