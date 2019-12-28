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
