<template>
  <div class="myDiv">
    <div class="bg"></div>
    <v-container>
      <v-row no-gutters justify="center" align="center" class="text-center mt-12">
        <v-col xs="0" sm="2"></v-col>
        <v-col xs="12" sm="4" class="mt-12 pt-6">
          <h1>Limba</h1>
          <p>The best way to learn a new language</p>
          <v-btn to="/game/sandbox" x-large color="success" dark>Try it now</v-btn>
        </v-col>
        <v-col xs="0" sm="6"></v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: 'App',
  data: () => ({
    //
  })
}
</script>

<style scoped>
.myDiv {
  position: relative;
  z-index: 1;
  height: 100%;
}
.myDiv .bg {
  position: absolute;
  z-index: -1;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: url(http://www.appwrap.org/wp-content/uploads/2017/01/mobile-learn.jpg)
    center center;
  opacity: 0.15;
  width: 100%;
}
</style>
