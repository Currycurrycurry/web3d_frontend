<template>
  <div id="app">
    <img alt="Vue logo" src="../static/images/logo/logo.png">
    <Login/>
    <Register/>
    <Information/>
  </div>
</template>

<script>
import Login from './views/login/Login.vue'
import Register from "./views/register/Register";
import Information from "./views/personnel/Information";
export default {
  name: 'App',
  components: {
    Register, Login, Information
  }
}
</script>

