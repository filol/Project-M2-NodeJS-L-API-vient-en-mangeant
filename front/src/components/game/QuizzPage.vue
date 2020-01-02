<template>
  <v-container>
    <!-- invisible audio player -->
    <audio id="audioPlayback" @ended="endPlaying()" style="display:none;" controls>
      <source id="audioSource" type="audio/mp3" :src="audioSourceUrl" />
    </audio>

    <v-row no-gutters justify="center" align="center" class="text-center">
      <v-col cols=12 sm=10 md=8 lg=6>
        <h1>Quizz</h1>
        <v-card>
          <v-card-text v-if="gameOver">
            <p>Game over ! Your final score is {{ score }}</p>
            <v-btn @click="startGame()" large color="green accent-3">Start a new game</v-btn>
          </v-card-text>
          <template v-else-if="gameStarted">
            <p> Question {{ questionNumber }}/10 </p>
            <v-card-text>
            <v-btn @click="play()" color="grey darken-1" fab>
              <v-icon>{{ buttonIcon }}</v-icon>
            </v-btn>

            <v-text-field class="mt-4" type="text" @keyup.enter="validateAnswer()" v-model="word" label="Your guess" outlined shaped></v-text-field>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn @click="skipAnswer()" large color='red accent-2'>I don't know</v-btn>
              <v-spacer></v-spacer>
              <v-btn @click="validateAnswer()" large color="green accent-3">Validate</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </template>
          <v-card-text v-else>
            <p>
              The quizz is a series of 10 questions. For each, try to guess which word was said, write it and click the validate button.<br>
              Depending on the difficulty, you'll have 2 (hard), 4 (medium) or 6 (easy) trials.<br>
              If you fail to find the word after those, you'll fail the question !<br>
              You can skip a word by clicking the 'I don't know button'.<br>
              As soon as you're ready, hit the start button. Good luck !
            </p>
            <v-btn @click="startGame()" large color="green accent-3">Start</v-btn>
          </v-card-text>
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
    gameStarted: false,
    gameOver: false,
    score: 0,
    questionNumber: 1,
    timeToReadWord: 5000
  }),
  methods: {
    startGame () {
      axiosAPI.get('/game/newGame')
      this.questionNumber = 1
      this.gameStarted = true
      this.gameOver = false
      this.generateNewGame()
    },
    play () {
      if (this.buttonIcon === 'mdi-play') {
        this.buttonIcon = 'mdi-pause'
        document.getElementById('audioPlayback').play()
      }
    },
    endPlaying () {
      this.buttonIcon = 'mdi-play'
    },
    skipAnswer () {
      axiosAPI.get('/game/skip')
        .then(response => {
          this.questionNumber++
          if (response.data.gameOver === true) {
            this.$store.dispatch('notification/success', 'Game over !')
            this.endGame()
          } else {
            this.$store.dispatch('notification/success', 'You\'ll do better next time')
            this.generateNewGame()
          }
        })
    },
    validateAnswer () {
      axiosAPI.post('/game/verify', { word: this.word })
        .then(response => {
          this.questionNumber++
          if (response.data.gameOver === true) {
            this.$store.dispatch('notification/success', 'Game over !')
            this.endGame()
          } else {
            this.$store.dispatch('notification/success', 'Well done ! Onto the next word')
            this.generateNewGame()
          }
        }).catch(err => {
          const status = err.response.status

          switch (status) {
            case 418:
              this.$store.dispatch('notification/error', 'Wrong answer ! Try again.')
              break
            case 403:
              this.questionNumber++
              this.$store.dispatch('notification/error', 'Wrong answer ! No more trials')
              if (err.response.data.gameOver === true) {
                this.endGame()
              } else {
                this.generateNewGame()
              }
              break
          }
        })
    },
    generateNewGame () {
      this.word = ''

      // select a new random word
      axiosAPI.get('/game/randomWord')
        .then(response => {
          this.audioSourceUrl = response.data.pronunciation
          document.getElementById('audioPlayback').load()
        })
    },
    endGame () {
      axiosAPI.get('/game/score').then(response => {
        this.score = response.data.score
        this.gameOver = true
      })
    }
  }
}
</script>

<style scoped></style>
