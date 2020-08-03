import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

//*********************************************************************** */
import 'bootstrap';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import JwPagination  from 'jw-vue-pagination';
import accounting from 'accounting';


// Install BootstrapVue
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)

Vue.filter('mayuscula',(texto)=>{
  return texto.toUpperCase();
})
Vue.filter('recorte',(texto)=>{
  return texto.substr(1,100)+'...'
})
Vue.component('jw-pagination', JwPagination);
Vue.filter('formato', (monto)=>{  //Nota requiere instalar la libreria accounting 
  return accounting.formatMoney(monto, '',0,'.',',')
})

//firebase **********************************************************
//import firebase from 'firebase';
//import { firebaseConfig } from './configuracion/firebaseConfig.js'; 
// firebase.initializeApp(firebaseConfig);  // Initialize Firebase
//export const db = firebase.firestore();
//firebase **********************************************************

//*********************************************************************** */

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
