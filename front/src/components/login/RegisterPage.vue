<template>
  <v-row no-gutters justify="center" align="center">
    <v-col cols=12 sm=10 md=8 lg=6>
      <v-card>
        <v-card-title>
          Register
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
              v-model="email"
              type="email"
              label="Email"
              :rules="[required, emailValidation]"
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

            <v-text-field
              v-model="passwordVerification"
              type="password"
              label=" Same password"
              :rules="[required]"
              outlined
              shaped
            ></v-text-field>

            <v-btn @click="handleSubmit">
              Validate
            </v-btn>
          </v-form>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data () {
    return {
      username: '',
      email: '',
      password: '',
      passwordVerification: ''
    }
  },
  methods: {
    emailValidation: value => {
      const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      return pattern.test(value) || 'Adresse mail invalide'
    },
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
