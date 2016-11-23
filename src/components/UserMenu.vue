<template>

  <transition appear :name="transition">
    <div class="userMenu">
      <!-- <spinner :show="!user"></spinner> -->
      <template v-if="user">

          <div class="user-description">
            <h4>{{ user.name }} {{ user.surname }}</h4>
            <h4> {{ user.department }}</h4>
          </div>

          <div class="student-menu" v-if="user.role === 'student'">
            <ul>
              <li><router-link :to="'/home'" v-on:click="setPageHome">(HOME)</router-link></li>
              <li><router-link :to="'/goals'" v-on:click="setPageGoals">(DEV GOALS)</router-link></li>
              <li><router-link :to="'/courses'" v-on:click="setPageCourses">(RIMI E-LEARN)</router-link></li>
              <li><router-link :to="'/resources'" v-on:click="setPageResources">(LEARNING RESOURCES)</router-link></li>
            </ul>

          </div>

          <div class="manager-menu" v-if="user.role === 'manager'">
            
            <ul>
              <li><a v-on:click="setManagerContent">Manager Menu 1</a></li>
              <li><a v-on:click="setManagerContent">Manager Menu 2</a></li>
              <li><a v-on:click="setManagerContent">Manager Menu 3</a></li>
            </ul>

          </div>
      </template>

      <button v-on:click="changePath">Logout</button>

    </div>
  </transition>

</template>

<script>

import Spinner from '../components/Spinner.vue';

function fetchUser ( store ) {
  return store.dispatch('FETCH_USER', {
    id: store.state.userId
  })
}


function fetchCourses ( store ) {
  return store.dispatch('FETCH_COURSES', {
    userPosition: store.state.users['currentUser'].position
  });
}


function leave( store, renderStage ) {
  return store.dispatch('HANDLE_RENDERING', {
    renderStage
  });
}


function setAdditionalField( store, page ) {
  return store.dispatch('HANDLE_ADDITIONAL_FIELD', { page });
}
function setMainField( store, page ) {
  return store.dispatch('HANDLE_MAIN_FIELD', { page })
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

    setPageHome: function() {

      setAdditionalField(this.$store, 'home');
      setMainField(this.$store, 'home');

    },

    setPageGoals: function(){ console.log('goals') },
    setPageCourses: function(){ console.log('courses') },
    setPageResources: function(){ console.log('resources') },

    // Temp (don't change state outside actions/mutations)
    // setAddContent: function() {
    //   this.$store.state.additionalBlockState = 'home';
    //   this.$store.state.renderStage = 1;
    //   console.log(this.$store.state.additionalBlockState);
    // },

    // Temp (don't change state outside actions/mutations)
    // setContent: function() {
    //   this.$store.state.additionalBlockState = 'notHome';
    //   this.$store.state.renderStage = 1;
    //   console.log(this.$store.state.additionalBlockState);
    //   console.log('changing content here');
    // },
    // fetchCourses: function() {
    //   fetchCourses(this.$store);
    // },

    setManagerContent: function() {
      console.log('hey');
      console.log('beatmaker');
    },

    changePath: function() {
      leave(this.$store, '/');
    }
  }
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