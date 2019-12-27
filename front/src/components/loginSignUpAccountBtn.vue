<template>
  <!-- Si un utilisateur est logged in, on n'affiche pas les boutons et on affiche
  d'autre bouton, comme par exemple "bonjour user1" et un bouton de deconnection-->
  <div class="text-center">
    <template v-if="loggedIn">
      <v-btn class="ma-2" to="/user/account" :color="color" large >{{ welcomeMessage }}</v-btn>
      <v-btn class="ma-2" @click="handleLogout" :color="color" large >logout</v-btn>
    </template>
    <template v-else>
      <v-btn class="ma-2" :to="'/register'" :color="color" large>register</v-btn>
      <v-btn class="ma-2" to="/login" :color="color" large>login</v-btn>
    </template>
  </div>
</template>

<script>
export default {
  props: {
    drawer: Boolean
  },
  data () {
    return {
      color: '#90A4AE'
    }
  },
  computed: {
    loggedIn () {
      return this.$store.state.authentication.status.loggedIn
    },
    welcomeMessage () {
      return `Welcome ${this.$store.state.authentication.user.username}`
    }
  },
  methods: {
    handleLogout () {
      this.$store.dispatch('authentication/logout')
      if (this.$route.path !== '/') this.$router.push('/')
      // location.reload()
    }
  }
}
</script>
