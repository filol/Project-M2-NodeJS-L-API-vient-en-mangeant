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
            <p class="title">Game is over ! Your final score is <strong>{{ score }}</strong></p>
            <p class="body-1">
              Words to guess (from first to last):<br>
              <span v-for="item in wordList" :key="item.index">{{ item }}<br></span>
            </p>
            <v-btn @click="startGame()" large color="green accent-3">Start a new game</v-btn>
          </v-card-text>
          <template v-else-if="gameStarted">
            <v-card-title>
              Question {{ questionNumber }}/10<br>
              Trials left: {{ trialLeft }}<br>
            </v-card-title>
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
          <v-card-text v-else class="body-1">
            <p>
              The quizz is a series of 10 questions. For each, try to guess which word was said, write it and click the validate button.<br>
              Depending on the difficulty, you'll have 2 (hard), 4 (medium) or 6 (easy) trials.<br>
              If you fail to find the word after those, you'll fail the question !<br>
              You can skip a word by clicking the 'I don't know button'.<br>
              As soon as you're ready, hit the start button. Good luck !
            </p>
            <p>
              Your difficulty is:  <strong>{{ selectedDifficulty }}</strong><br>
              Your language is: <strong>{{ selectedLanguage }}</strong>
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
    timeToReadWord: 5000,
    selectedDifficulty: '',
    selectedLanguage: '',
    trialLeft: 0,
    trial: 0,
    wordList: []
  }),
  created () {
    axiosAPI
      .get('/users/account')
      .then(response => {
        this.selectedDifficulty = response.data.user.difficulty
        this.selectedLanguage = response.data.user.language

        switch (this.selectedDifficulty) {
          // 'easy', 'medium', 'hard'
          case 'easy':
            this.trial = 6
            break

          case 'medium':
            this.trial = 4
            break

          case 'hard':
            this.trial = 2
            break
        }
      })
      .catch(err => {
        console.error('err: ', err)
        console.log('error while getting account informations')
      })
  },
  methods: {
    startGame () {
      axiosAPI.get('/game/newGame')
      this.questionNumber = 1
      this.gameStarted = true
      this.gameOver = false
      this.trialLeft = this.trial
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
          this.trialLeft = this.trial
          this.getAnswer()
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
            this.getAnswer()
            this.endGame()
          } else {
            this.trialLeft = this.trial
            this.$store.dispatch('notification/success', 'Well done ! Onto the next word')
            this.getAnswer()
            this.generateNewGame()
          }
        }).catch(err => {
          const status = err.response.status

          switch (status) {
            case 418:
              this.trialLeft--
              this.$store.dispatch('notification/error', 'Wrong answer ! Try again.')
              break
            case 403:
              this.questionNumber++
              this.trialLeft = this.trial
              this.$store.dispatch('notification/error', 'Wrong answer ! No more trials')
              this.getAnswer()
              if (err.response.data.gameOver === true) {
                this.endGame()
              } else {
                this.generateNewGame()
              }
              break
          }
        })
    },
    getAnswer () {
      axiosAPI.get('/game/answer')
        .then(response => {
          this.wordList.push(response.data.word)
        })
    },
    generateNewGame () {
      this.word = ''
      this.trialLeft = this.trial

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
