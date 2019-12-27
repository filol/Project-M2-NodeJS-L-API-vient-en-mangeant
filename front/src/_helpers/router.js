import Vue from 'vue'
import Router from 'vue-router'

import HomePage from '../components/home/HomePage.vue'
import LoginPage from '../components/login/LoginPage.vue'
import RegisterPage from '../components/login/RegisterPage.vue'
import SandBoxPage from '../components/game/SandBoxPage.vue'
import QuizzPage from '../components/game/QuizzPage.vue'
import AccountPage from '../components/user/AccountPage.vue'

Vue.use(Router)

export const router = new Router({
  mode: 'history',
  routes: [
    { path: '/', component: HomePage },
    { path: '/login', component: LoginPage },
    { path: '/register', component: RegisterPage },
    { path: '/game/sandbox', component: SandBoxPage },
    { path: '/game/quizz', component: QuizzPage },
    { path: '/user/account', component: AccountPage },
    // otherwise redirect to home
    { path: '*', redirect: '/' }
  ]
})

/* router.beforeEach((to, from, next) => {
  // redirect to login page if not logged in and trying to access a restricted page
  const publicPages = ['/login']
  const authRequired = !publicPages.includes(to.path)
  const loggedIn = localStorage.getItem('user')

  if (authRequired && !loggedIn) {
    return next('/login')
  }

  next()
}) */
