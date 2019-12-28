<template>
  <v-container>
    <v-row no-gutters justify="center" align="center" class="text-center">
      <v-icon x-large>mdi-account</v-icon>
    </v-row>
    <v-card>
      <v-row no-gutters justify="center" align="center">
        <v-col cols="12" sm="8" md="8" lg="4">
          <v-card-text>
            <p class="font-weight-black">Pseudo:</p>
            <p>{{this.username}}</p>
          </v-card-text>
        </v-col>
      </v-row>
      <v-row no-gutters justify="center" align="center">
        <v-col cols="12" sm="8" md="8" lg="4">
          <v-card-text>
            <p class="font-weight-black">Email:</p>
            <p>{{this.email}}</p>
          </v-card-text>
        </v-col>
      </v-row>
      <v-row no-gutters justify="center" align="center">
        <v-col cols="12" sm="12" md="12" lg="12" justify="center" align="center">
          <v-card-text>
            <v-btn v-on:click="deleteAccount()" large color="error">Delete my account</v-btn>
          </v-card-text>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script>
import { axiosAPI } from '../../_helpers'

export default {
  name: 'Limba',
  data: () => ({
    username: 'Loading ...',
    email: 'Loading ...'
  }),
  methods: {
    deleteAccount () {
      axiosAPI
        .get('/users/delete').then(response => {
          this.$store.dispatch('authentication/logout')
          if (this.$route.path !== '/') this.$router.push('/')
        }).catch(err => {
          console.error('err: ', err)
        })
    }
  },
  created () {
    axiosAPI
      .get('/users/account')
      .then(response => {
        this.username = response.data.user.username
        this.email = response.data.user.email
      })
      .catch(err => {
        console.error('err: ', err)
        console.log('error while getting account informations')
      })
  }
}
</script>

<style scoped></style>
