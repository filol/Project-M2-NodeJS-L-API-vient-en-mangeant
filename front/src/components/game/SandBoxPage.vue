<template>
  <v-container>
    <v-card>
      <v-row no-gutters justify="center" align="center" class="text-center">
        <v-col cols="12" class="mt-3">
          <v-btn v-on:click="changeIcon()" fab>
            <v-icon>{{buttonIcon}}</v-icon>
          </v-btn>
        </v-col>
      </v-row>

      <v-row no-gutters justify="center" align="center">
        <v-col cols="12" sm="8" md="8" lg="4">
          <v-card-text>
            <v-text-field type="text" label="Your guess" outlined shaped></v-text-field>
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
            <v-btn large color="primary">Validate</v-btn>
          </div>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: 'App',
  data: () => ({
    buttonIcon: 'mdi-play'
  }),
  methods: {
    changeIcon () {
      if (this.buttonIcon === 'mdi-play') {
        this.buttonIcon = 'mdi-pause'
      } else if (this.buttonIcon === 'mdi-pause') {
        this.buttonIcon = 'mdi-play'
      }
    }
  }
}
</script>

<style scoped>
</style>
