<template>
  <div id="app">
    <img alt="Vue logo" src="../static/images/logo/logo.png">
    <Login/>
  </div>
</template>

<script>
import Login from './views/login/Login.vue'
export default {
  name: 'App',
  components: {
    Login,
  }
}
</script>

