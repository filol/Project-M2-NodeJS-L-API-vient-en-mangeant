<template>
  <v-container>
    <!-- header logo -->
    <v-row no-gutters justify="center" align="center" class="text-center">
      <v-icon x-large>mdi-account</v-icon>
    </v-row>
    <v-card>
      <!-- Pseudo label -->
      <v-row no-gutters justify="center" align="center">
        <v-col cols="12" sm="8" md="8" lg="4">
          <v-card-text>
            <p class="font-weight-black">Pseudo:</p>
            <p>{{this.username}}</p>
          </v-card-text>
        </v-col>
      </v-row>

      <!-- Email label -->
      <v-row no-gutters justify="center" align="center">
        <v-col cols="12" sm="8" md="8" lg="4">
          <v-card-text>
            <p class="font-weight-black">Email:</p>
            <p>{{this.email}}</p>
          </v-card-text>
        </v-col>
      </v-row>

      <!-- Change password button and popup-->
      <v-row justify="center">
        <v-dialog v-model="dialog" scrollable max-width="300px">
          <template v-slot:activator="{ on }">
            <v-btn color="primary" dark v-on="on">Change my password</v-btn>
          </template>
          <v-card>
            <v-card-title>Enter a new password</v-card-title>
            <v-divider></v-divider>
            <v-card-text style="height: 10px;"></v-card-text>
            <v-text-field
              v-model="newPassword"
              type="password"
              label="New password"
              outlined
              shaped
            ></v-text-field>
            <v-divider></v-divider>
            <v-card-actions>
              <v-btn
                v-on:click="changePassword()"
                color="blue darken-1"
                text
                @click="dialog = false"
              >Validate</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>

      <!-- Delete account button -->
      <v-row no-gutters justify="center" align="center">
        <v-col cols="12" sm="12" md="12" lg="12" justify="center" align="center">
          <v-card-text>
            <v-btn v-on:click="deleteAccount()" large color="error">Delete my account</v-btn>
          </v-card-text>
        </v-col>
      </v-row>
    </v-card>

    <!-- Modifications changed success snackbar -->
    <v-snackbar v-model="successSnackbar" :vertical="true" :timeout="2000">
      <v-row align="center" justify="center">
        <h1>Modifications saved</h1>
      </v-row>
      <v-row align="center" justify="center">
        <v-img
          src="https://img.pngio.com/validate-input-data-using-validator-in-vapor-20-swiftyjimmy-validate-png-270_270.png"
          aspect-ratio="1"
          max-width="100"
          max-height="100"
        ></v-img>
      </v-row>
    </v-snackbar>
  </v-container>
</template>

<script>
import { axiosAPI } from '../../_helpers'

export default {
  name: 'Limba',
  data: () => ({
    dialog: false,
    newPassword: '',
    username: 'Loading ...',
    email: 'Loading ...',
    successSnackbar: false
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
    },
    changePassword () {
      axiosAPI
        .post('/users/changePassword', { password: this.newPassword }).then(response => {
          this.successSnackbar = true
          console.log(response)
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
