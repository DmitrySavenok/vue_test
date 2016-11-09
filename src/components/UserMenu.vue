<template>

  <transition appear :name="transition">
    <div class="userMenu">
      <!-- <spinner :show="!user"></spinner> -->
      <template v-if="user">


          <div class="user-description">
            <h4 v-on:click="fetchGoals">{{ user.name }} {{ user.surname }}</h4>
          </div>

          <div class="menu">
            <ul>
              <li><a href="#">Menu item 1</a></li>
              <li><a href="#">Menu item 2</a></li>
              <li><a href="#">Menu item 3</a></li>
            </ul>

          </div>

      </template>

    </div>
  </transition>

</template>

<script>

import Spinner from '../components/Spinner.vue';

function fetchUser ( store ) {
  return store.dispatch('FETCH_USER', {
    id: 123
  })
}

function fetchGoals ( store ) {
  return store.dispatch('FETCH_GOALS', {
    user: 'vasily'
  })
}


export default {

  name: 'UserMenu',
  components: { Spinner },
  data () {
    return {
      fullName: 'que',
      transition: 'slide-left'
    }
  },
  computed: {
    user () {
      return this.$store.state.users['currentUser']
    }
  },
  preFetch: fetchUser,
  beforeMount () {
    fetchUser(this.$store);
  },
  //Methods here
  methods: {
  	smth: function() {
  		this.msg = Math.random();
  	},
    fetchGoals: function() {
      fetchGoals(this.$store);
    }
  }
}
</script>

<style lang="stylus">

.slide-left-enter
  opacity 0
  transform translate(30px, 0)

.slide-left-leave-active
  opacity 0
  transform translate(-30px, 0)

</style>

<style lang="stylus" scoped>

.userMenu
  width 12%
  min-width 180px
  height 100%
  background #ccc
  left 0%
  margin-left 15px

</style>