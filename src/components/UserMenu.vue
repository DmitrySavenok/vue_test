<template>

  <transition appear :name="transition">
    <div class="userMenu">
      <!-- <spinner :show="!user"></spinner> -->
      <template v-if="user">

          <div class="user-description">
            <h4 v-on:click="fetchGoals">{{ user.name }} {{ user.surname }}</h4>
            <h4> {{ user.department }}</h4>
          </div>

          <div class="student-menu" v-if="user.role === 'student'">
            <ul>
              <li><a v-on:click="setContent">User Menu item 1</a></li>
              <li><a v-on:click="fetchCourses">User Menu item 2</a></li>
              <li><a v-on:click="setContent">User Menu item 3</a></li>
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

function fetchCourses ( store ) {
  return store.dispatch('FETCH_COURSES', {
    userPosition: store.state.users['currentUser'].position
  });
}
function myFunc() {
  console.log('ayy');
}


export default {

  name: 'UserMenu',
  components: { Spinner },
  data () {
    return {
      fullName: 'John Doe',
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
    fetchGoals: function() {
      fetchGoals(this.$store);
    },
    setContent: function() {
      console.log('changing content here');
    },
    fetchCourses: function() {
      fetchCourses(this.$store);
    }
  },
  mounted: myFunc
}
</script>

<style lang="stylus" scoped>

.userMenu
  width 12%
  min-width 180px
  height 100%
  background #ccc
  left 0%
  margin-left 15px
  
  .student-menu
    ul
      margin 0px
      padding 0px
    li
      padding 10px 0px
      list-style none
      a
        text-decoration none
        color #FFF
        background #aaa
        display block
        padding 10px 0px
        text-align center
        
        &:hover
          background #999
        
</style>