<template>
  <v-container>
    <!-- invisible audio player -->
    <audio id="audioPlayback" @ended="endPlaying()" style="display:none;" controls>
      <source id="audioSource" type="audio/mp3" src />
    </audio>

    <v-row no-gutters justify="center" align="center" class="text-center">
      <v-col cols="12">
        <v-alert type="warning">This page should be restricted to login user in the future !</v-alert>
      </v-col>
    </v-row>
    <v-card>
      <v-row no-gutters justify="center" align="center" class="text-center">
        <v-col cols="12" class="mt-3">
          <v-btn v-on:click="play()" fab>
            <v-icon>{{ buttonIcon }}</v-icon>
          </v-btn>
        </v-col>
      </v-row>

      <v-row no-gutters justify="center" align="center">
        <v-col cols="12" sm="8" md="8" lg="4">
          <v-card-text>
            <v-text-field type="text" v-model="word" label="Your guess" outlined shaped></v-text-field>
          </v-card-text>
        </v-col>
      </v-row>

      <v-row no-gutters justify="center" align="center">
        <v-col cols="6" sm="6" md="6" lg="6" align="right">
          <div class="my-2">
            <v-btn large>I don't know</v-btn>
          </div>
        </v-col>
        <v-col cols="6" sm="6" md="6" lg="6">
          <div class="my-2">
            <v-btn v-on:click="validateAnswer()" large color="primary">Validate2</v-btn>
          </div>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script>
import Vue from 'vue'
var AWS = require('aws-sdk/dist/aws-sdk-react-native')

AWS.config.region = 'us-east-1'
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
  IdentityPoolId: 'us-east-1:d5beba94-b05a-49ce-b90c-a2c2ad452e44'
})

export default {
  name: 'App',
  data: () => ({
    buttonIcon: 'mdi-play',
    wordToGuess: '',
    word: '',
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
      console.log(this.word)
      if (this.word === this.wordToGuess) {
        alert('GAGNE !')
      } else {
        alert('PERDU ! the word was: ' + this.wordToGuess)
      }
      this.generateNewGame()
    },

    loadNewWordAudio () {
      // Create the JSON parameters for getSynthesizeSpeechUrl
      var speechParams = {
        OutputFormat: 'mp3',
        SampleRate: '16000',
        Text: '',
        TextType: 'text',
        VoiceId: 'Matthew'
      }
      speechParams.Text = this.wordToGuess

      // Create the Polly service object and presigner object
      var polly = new AWS.Polly({ apiVersion: '2016-06-10' })
      var signer = new AWS.Polly.Presigner(speechParams, polly)

      // Create presigned URL of synthesized speech file
      signer.getSynthesizeSpeechUrl(speechParams, function (error, url) {
        if (error) {
          console.log(error)
        } else {
          document.getElementById('audioSource').src = url
          document.getElementById('audioPlayback').load()
        }
      })
    },
    generateNewGame () {
      // select a new random word
      Vue.axios
        .get('https://random-word-api.herokuapp.com/word?key=9BG04C8Q&number=1')
        .then(response => {
          console.log(response.data)
          this.wordToGuess = response.data[0]
          this.word = ''
          this.loadNewWordAudio()
        })
    }
  },
  created () {
    this.generateNewGame()
  }
}
</script>

<style scoped></style>
