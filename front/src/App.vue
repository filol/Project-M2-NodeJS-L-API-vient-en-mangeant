<template>
  <v-app dark v-touch="{
      left: () => drawer = false,
      right: () => drawer = true
    }">
    <!-- NAVIGATION DRAWER -->
    <v-navigation-drawer app temporary v-model="drawer" :color="primaryColor">
      <v-list nav>
        <v-list-item v-for="item in linkList" :key="item.index" :to="item.to">
          <v-list-item-content>
            <v-list-item-title>{{ item.name }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <template v-slot:append>
        <loginSignUpAccountBtn class="ma-2" v-bind:drawer="drawer" />
      </template>
    </v-navigation-drawer>

    <!-- HEADER -->
    <v-app-bar app fixed :color="primaryColor">
      <v-app-bar-nav-icon class="hidden-md-and-up" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-items>
        <v-btn text @click="goHome" class="headline" depressed>{{ title }}</v-btn>
      </v-toolbar-items>

      <v-spacer />

      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn v-for="item in linkList" :key="item.index" text :to="item.to">{{ item.name }}</v-btn>
      </v-toolbar-items>

      <loginSignUpAccountBtn v-bind:drawer="drawer" class="hidden-sm-and-down" />
    </v-app-bar>

    <!-- MAIN CONTENT -->
    <v-content>
      <router-view></router-view>
    </v-content>

    <!-- FOOTER -->
    <v-footer absolute class="font-weight-medium" :color="primaryColor">
      <v-col class="text-center" cols="12">
        {{ new Date().getFullYear() }} —
        <strong>{{ teamName }}</strong>
      </v-col>
    </v-footer>
  </v-app>
</template>

<script>
import loginSignUpAccountBtn from './components/loginSignUpAccountBtn'

export default {
  name: 'App',
  components: {
    loginSignUpAccountBtn
  },
  methods: {
    goHome () {
      this.$router.push({ path: '/' })
    }
  },
  data: () => ({
    drawer: false,
    primaryColor: '#455A64',
    title: 'Limbia',
    teamName: 'L\'API VIENT EN MANGEANT',
    linkList: [
      { name: 'Home', to: '/' },
      { name: 'Sandbox', to: '/game/sandbox' },
      { name: 'Quizz', to: '/game/quizz' },
      { name: '', to: '' }
    ]
  })
}
</script>
