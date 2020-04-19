<template>
  <div id="app">
    <img alt="Vue logo" src="../static/images/logo/logo.png">
    <Login/>
    <Register/>
    <Information/>
    <Header/>
    <NavMenu/>
    <Page404/>
    <Page500/>


  </div>
</template>

<script>
import Login from './views/login/Login.vue'
import Register from "./views/register/Register";
import Information from "./views/personnel/Information";
import Header from './components/Header';
import NavMenu from "./components/NavMenu";
import Page404 from "./views/ErrorPages/404";
import Page500 from './views/ErrorPages/500';

export default {
  name: 'App',
  components: {
    Page404,Page500,
    Register, Login, Information, Header, NavMenu
  }
}
</script>

