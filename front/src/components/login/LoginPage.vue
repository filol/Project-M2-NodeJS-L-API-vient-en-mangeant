<template>
    <v-form
        ref="form"
      >
        <v-text-field
          v-model="username"
          type="text"
          label="Username"
          required
        ></v-text-field>

        <v-text-field
          v-model="password"
          type="password"
          label="Password"
          required
        ></v-text-field>

        <v-btn
          class="mr-4"
          @click="handleSubmit"
        >
          Validate
        </v-btn>
      </v-form>
</template>

<script>
export default {
  data () {
    return {
      username: '',
      password: '',
      submitted: false
    }
  },
  computed: {
    loggingIn () {
      return this.$store.state.authentication.status.loggingIn
    }
  },
  created () {
    // reset login status
    this.$store.dispatch('authentication/logout')
  },
  methods: {
    handleSubmit (e) {
      this.submitted = true
      const { username, password } = this
      const { dispatch } = this.$store
      if (username && password) {
        dispatch('authentication/login', { username, password })
      }
    }
  }
}
</script>
