<template>
<!-- Si un utilisateur est logged in, on affiche pas les boutons et on affiche
d'autre bouton, comme par exemple "bonjour user1" et un bouton de deconnection -->
  <div class="text-center">
    <v-btn
      class="ma-2"
      :color="color"
      large
      @click="test"
    >
      register
    </v-btn>
    <v-btn
      class="ma-2"
      to='/register'
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
      color: '#90A4AE',
      toDelete: true
    }
  },
  methods: {
    test () {
      console.log(this.$vuetify.breakpoint.xs)
      console.log(this.$vuetify.breakpoint.sm)
      console.log(this.$vuetify.breakpoint.md)
      console.log(this.$vuetify.breakpoint.lg)
      console.log(this.$vuetify.breakpoint.xl)
    }
  }
}
</script>
