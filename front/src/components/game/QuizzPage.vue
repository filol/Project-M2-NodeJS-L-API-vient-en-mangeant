<template>
  <v-container>
    <!-- invisible audio player -->
    <audio id="audioPlayback" @ended="endPlaying()" style="display:none;" controls>
      <source id="audioSource" type="audio/mp3" :src="audioSourceUrl" />
    </audio>

    <v-row no-gutters justify="center" align="center" class="text-center">
      <v-col cols=12 sm=10 md=8 lg=6>
        <v-alert type="warning">TODO: link with the back and make this page work</v-alert>

        <v-card>
          <v-card-text>
            <v-btn @click="play()" color="grey darken-1" fab>
              <v-icon>{{ buttonIcon }}</v-icon>
            </v-btn>

            <v-text-field class="mt-4" type="text" @keyup.enter="validateAnswer()" v-model="word" label="Your guess" outlined shaped></v-text-field>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn large color='red accent-2'>I don't know</v-btn>
            <v-spacer></v-spacer>
            <v-btn @click="validateAnswer()" large color="green accent-3">Validate</v-btn>
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
// import Vue from 'vue'
import { axiosAPI } from '../../_helpers'
var AWS = require('aws-sdk/dist/aws-sdk-react-native')

AWS.config.region = 'us-east-1'
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
  IdentityPoolId: 'us-east-1:d5beba94-b05a-49ce-b90c-a2c2ad452e44'
})

export default {
  name: 'App',
  data: () => ({
    buttonIcon: 'mdi-play',
    word: '',
    audioSourceUrl: '',
    timeToReadWord: 1500
  }),
  methods: {
    play () {
      if (this.buttonIcon === 'mdi-play') {
        this.buttonIcon = 'mdi-pause'
        document.getElementById('audioPlayback').play()
      }
    },
    endPlaying () {
      this.buttonIcon = 'mdi-play'
    },
    validateAnswer () {
      axiosAPI.post('/game/verify', { word: this.word })
        .then(response => {
          console.log('response: ', response)
        }).catch(err => {
          this.$store.dispatch('notification/error', 'Wrong !')
          console.log(err)
        })
    },
    generateNewGame () {
      // select a new random word
      axiosAPI.get('/game/randomWord')
        .then(response => {
          this.audioSourceUrl = response.data.pronunciation
          document.getElementById('audioPlayback').load()
        })
    }
  },
  created () {
    this.generateNewGame()
  }
}
</script>

<style scoped></style>
