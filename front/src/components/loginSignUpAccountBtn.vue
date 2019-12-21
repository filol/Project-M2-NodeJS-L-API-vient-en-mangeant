<template>
<!-- Si un utilisateur est logged in, on n'affiche pas les boutons et on affiche
d'autre bouton, comme par exemple "bonjour user1" et un bouton de deconnection -->
  <div class="text-center">
    <v-btn
      class="ma-2"
      :to="'/register'"
      :color="color"
      large
    >
      register
    </v-btn>
    <v-btn
      class="ma-2"
      to='/login'
      :color="color"
      large
    >
      login
    </v-btn>
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
  }
}
</script>
