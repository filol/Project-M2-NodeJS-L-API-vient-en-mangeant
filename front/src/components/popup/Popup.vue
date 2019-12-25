<template>
    <v-snackbar
        :value="snackbar"
        :timeout="timeout"
    >
        {{ message }}
        <v-btn
          color="pink"
          text
          @click="snackbarClose"
        >
          Close
        </v-btn>
    </v-snackbar>
</template>

<script>
export default {
  computed: {
    snackbar () {
      return this.$store.state.notification.snackbar
    },
    color () {
      return this.$store.state.notification.color
    },
    message () {
      return this.$store.state.notification.message
    },
    timeout () {
      return this.$store.state.notification.timeout
    }
  },
  methods: {
    snackbarClose () {
      this.$store.dispatch('notification/clear')
    }
  }
}
</script>
