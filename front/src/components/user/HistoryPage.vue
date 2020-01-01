<template>
    <v-container>
        <!-- header logo -->
        <v-row no-gutters justify="center" align="center" class="text-center">
            <v-icon x-large>mdi-account</v-icon>
        </v-row>
        <v-card class="mx-auto" max-width="500">
            <v-list>
                <v-list-item-group v-model="model">
                    <v-list-item v-for="(item, i) in items" :key="i">
                        <v-list-item-icon>
                            <v-icon v-text="item.icon"></v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                            <v-list-item-title v-text="item.text"></v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </v-list-item-group>
            </v-list>
        </v-card>
    </v-container>
</template>

<script>
import { axiosAPI } from '../../_helpers'

export default {
  name: 'Limba',
  data: () => ({
    model: 1,
    items: []
  }),
  methods: {},
  created () {
    axiosAPI
      .get('/user/history')
      .then(response => {
        if (response.data.history.length === 0) {
          this.items.push({ text: 'No previous question' })
        } else {
          response.data.history.map((elem) => {
            const isFound = (elem.find) ? 'Correct answer' : 'Wrong answer'
            this.items.push({ text: elem.wordToFind + ' (' + elem.language + ')' + ' - ' + isFound })
          })
        }
      })
      .catch(err => {
        console.error('err: ', err)
        console.log('error while getting account informations')
      })
  }
}

</script>

<style scoped></style>
