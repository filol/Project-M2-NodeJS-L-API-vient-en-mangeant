<template>
  <v-container>
    <v-row no-gutters justify="center" align="center">
      <v-col cols=12 sm=10 md=8 lg=6>
        <v-card>
          <v-card-title>
            Login
          </v-card-title>
          <v-card-text>
            <v-form
              ref="form"
            >
              <v-text-field
                v-model="username"
                type="text"
                label="Username"
                :rules="[required]"
                outlined
                shaped
              ></v-text-field>

              <v-text-field
                v-model="password"
                type="password"
                label="Password"
                :rules="[required]"
                outlined
                shaped
              ></v-text-field>

              <v-btn
                class="mr-4"
                @click="handleSubmit"
              >
                Validate
              </v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
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
    required: value => !!value || 'Requis',
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
