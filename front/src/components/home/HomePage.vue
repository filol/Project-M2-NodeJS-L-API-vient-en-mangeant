<template>
  <div class="myDiv">
    <div class="bg"></div>
    <v-container>
      <v-card flat color="transparent">
        <v-card-title>
          <v-row align="center" justify="center">Welcome to the Limbia project !</v-row>
        </v-card-title>
      </v-card>
    </v-container>
  </div>
</template>

<script>
export default {
  name: 'App',
  data: () => ({
    //TODO
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
  background: url(https://cue.org/wp-content/uploads/2018/09/CUE-Craft-2-e1536698468391.jpg)
    center center;
  opacity: 0.4;
  width: 100%;
}
</style>
