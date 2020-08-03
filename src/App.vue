<template>
  <div id="app">
    <!--<div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>-->
    <BarraNavegacionActivo></BarraNavegacionActivo>
    <router-view/>
    <Footer></Footer>

  </div>
</template>

<script>
import { cursos } from './configuracion/conexionApi';
import BarraNavegacionActivo from './components/BarraNavegacionActivo.vue';
import Footer from './components/Footer.vue';

export default {
  name:'App',
  components:{
    BarraNavegacionActivo,
    Footer
  },
  mounted(){
    cursos()
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

$primary:#595bb5;
@import './node_modules/bootstrap/scss/bootstrap.scss'; 

.Oleo {
font-family: 'Oleo Script', cursive;
}
.Solway {
font-family: 'Solway', serif;
}
@import url('https://fonts.googleapis.com/css2?family=Oleo+Script&family=Solway:wght@500&display=swap');

</style>
