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
      <v-divider></v-divider>

      <!-- Language selection select -->
      <v-row class="mt-4" no-gutters justify="center" align="center">
        <v-col cols="12" sm="8" md="8" lg="4">
          <v-card-text>
            <p>Language you want to learn</p>
            <v-select
              v-model="selectedLanguage"
              :items="availableLanguages"
              v-on:change="changeLanguage"
              menu-props="auto"
              label="Select"
              hide-details
              single-line
            ></v-select>
          </v-card-text>
        </v-col>
      </v-row>

      <!-- Difficulty selection select -->
      <v-row class="mt-2 mb-6" no-gutters justify="center" align="center">
        <v-col cols="12" sm="8" md="8" lg="4">
          <v-card-text>
            <p>Difficulty</p>
            <v-select
              v-model="selectedDifficulty"
              :items="availableDifficulties"
              v-on:change="changeDifficulty"
              menu-props="auto"
              label="Select"
              hide-details
              single-line
            ></v-select>
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
    availableLanguages: ['fr', 'en', 'it', 'de', 'es'],
    availableDifficulties: ['easy', 'medium', 'hard'],
    selectedLanguage: '',
    selectedDifficulty: '',
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
        }).catch(() => {
          this.$store.dispatch('notification/error', 'Error while deleting account')
        })
    },
    changePassword () {
      axiosAPI
        .post('/users/changePassword', { password: this.newPassword }).then(response => {
          this.successSnackbar = true
        }).catch(() => {
          this.$store.dispatch('notification/error', 'Error while changing the password')
        })
    },
    changeDifficulty (choice) {
      axiosAPI
        .post('/users/changeDifficulty', { difficulty: this.selectedDifficulty })
        .then(response => {
          this.successSnackbar = true
        })
        .catch(err => {
          this.$store.dispatch('notification/error', err)
        })
    },
    changeLanguage (choice) {
      axiosAPI
        .post('/users/changeLanguage', { language: this.selectedLanguage })
        .then(response => {
          this.successSnackbar = true
        })
        .catch(err => {
          this.$store.dispatch('notification/error', err)
        })
    }

  },
  created () {
    axiosAPI
      .get('/users/account')
      .then(response => {
        this.username = response.data.user.username
        this.email = response.data.user.email
        this.selectedDifficulty = response.data.user.difficulty
        this.selectedLanguage = response.data.user.language
      })
      .catch(err => {
        this.$store.dispatch('notification/error', err)
      })
  }
}
</script>

<style scoped></style>
