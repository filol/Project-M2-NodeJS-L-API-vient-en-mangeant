<template>
  <v-container>
    <!-- Bad user answer Snackbar -->
    <v-snackbar v-model="wrongSnackbar" :vertical="vertical" :timeout="2000">
      <v-row align="center" justify="center">
        <h1>"{{ previousWord }}"</h1>
      </v-row>
      <v-row align="center" justify="center">
        <v-img
          src="https://img.pngio.com/wrong-icon-with-png-and-vector-format-for-free-unlimited-download-wrong-png-512_512.png"
          aspect-ratio="1"
          max-width="100"
          max-height="100"
        ></v-img>
      </v-row>
    </v-snackbar>

    <!-- Good user answer Snackbar -->
    <v-snackbar v-model="correctSnackbar" :vertical="vertical" :timeout="1000">
      <v-row align="center" justify="center">
        <v-img
          src="https://img.pngio.com/validate-input-data-using-validator-in-vapor-20-swiftyjimmy-validate-png-270_270.png"
          aspect-ratio="1"
          max-width="100"
          max-height="100"
        ></v-img>
      </v-row>
    </v-snackbar>

    <!-- Loading overlay animation -->
    <v-overlay :value="overlay">
      <v-progress-circular class :size="100" :width="7" color="green" indeterminate></v-progress-circular>
    </v-overlay>

    <!-- Invisible audio player -->
    <audio id="audioPlayback" @ended="endPlaying()" style="display:none;" controls>
      <source id="audioSource" type="audio/mp3" src />
    </audio>

    <v-row no-gutters justify="center" align="center" class="text-center">
      <v-col cols=12 sm=10 md=8 lg=6>
        <!-- Game instructions -->
        <h1>Sandbox</h1>
        <p>A random word is chosen and you have to guess the word by hearing it</p>

        <v-card>
          <v-card-text>
            <v-row>
              <v-col cols=6 sm=4 lg=3>
                <v-select
                  v-on:change="generateNewGame"
                  v-model="selectedLanguage"
                  :items="languageIds"
                  label="Choose your language"
                ></v-select>
              </v-col>
            </v-row>

              <!-- Play button -->
              <v-btn v-on:click="play()" fab color='grey darken-1'>
                <v-icon>{{ buttonIcon }}</v-icon>
              </v-btn>

              <!-- User text input -->
              <v-text-field @keyup.enter="validateAnswer()" class="my-4" type="text" v-model="word" label="Your guess" outlined shaped></v-text-field>

              <!-- Validate button -->
              <v-btn @click="validateAnswer()" large color="green accent-3">Validate</v-btn>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
// Dictionary of nearly 2600 english words
import json from '../../assets/dictionary.json'

// Importing the AWS SDK (for translation or pronunciation)
var AWS = require('aws-sdk/dist/aws-sdk-react-native')
AWS.config.region = 'us-east-1'
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
  IdentityPoolId: 'us-east-1:d5beba94-b05a-49ce-b90c-a2c2ad452e44'
})
var translate = new AWS.Translate({ apiVersion: '2017-07-01' })

export default {
  name: 'App',
  data: () => ({
    languageIds: ['fr-FR', 'es-ES', 'it-IT', 'de-DE', 'en-US'],
    voiceIds: ['Mathieu', 'Enrique', 'Giorgio', 'Hans', 'Matthew'],
    buttonIcon: 'mdi-play',
    wordToGuess: '',
    previousWord: '',
    word: '',
    selectedLanguage: 'en-US',
    overlay: false,
    correctSnackbar: false,
    wrongSnackbar: false,
    vertical: true,
    dictionary: json
  }),
  methods: {
    // Play the word audio
    play () {
      if (this.buttonIcon === 'mdi-play') {
        this.buttonIcon = 'mdi-pause'
        document.getElementById('audioPlayback').play()
      }
    },
    endPlaying () {
      this.buttonIcon = 'mdi-play'
    },

    // Validate an answer, display if good or wrong and generate next game
    validateAnswer () {
      this.previousWord = this.wordToGuess
      if (this.word === this.wordToGuess) {
        this.correctSnackbar = true
      } else {
        this.wrongSnackbar = true
      }
      this.generateNewGame()
    },

    // Get the mp3 of the 'wordToGuess' and make it ready to play
    loadNewWordAudio () {
      var ref = this
      // Create the JSON parameters for getSynthesizeSpeechUrl
      var speechParams = {
        OutputFormat: 'mp3',
        SampleRate: '16000',
        Text: '',
        TextType: 'text',
        LanguageCode: this.selectedLanguage,
        VoiceId: this.voiceIds[this.languageIds.indexOf(this.selectedLanguage)]
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
          ref.overlay = false // hidding the loading overlay
        }
      })
    },
    async generateNewGame () {
      this.overlay = true
      var ref = this
      var params = {
        SourceLanguageCode: 'en', /* required */
        TargetLanguageCode: this.selectedLanguage.substring(0, 2), /* required */
        Text: this.dictionary.data[Math.floor(Math.random() * 2645)]/* required */
      }
      await translate.translateText(params, function (err, data) {
        if (err) {
          console.log(err, err.stack)
        } else {
          ref.wordToGuess = data.TranslatedText
          ref.word = ''
          ref.loadNewWordAudio()
        }
      })
    }
  },
  created () {
    this.generateNewGame()
  }
}
</script>

<style scoped></style>
