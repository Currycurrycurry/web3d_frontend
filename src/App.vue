<template>
  <div id="app">
    <img alt="Vue logo" src="../static/images/logo/logo.png">
    <Login/>
    <Register/>
  </div>
</template>

<script>
import Login from './views/login/Login.vue'
import Register from "./views/register/Register";
export default {
  name: 'App',
  components: {
    Register, Login
  }
}
</script>

