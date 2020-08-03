<template>
  <div>
     <b-form class="editform">
                      <b-form-group
                        id="input-group-1"
                        label="Código Curso"
                        label-for="input-1"
                        description="Hasta 10 caracteres"
                      >
                        <b-form-input
                          id="input-1"
                          v-model="codigocurso"
                          type="text"
                          required
                          placeholder="Código Curso"                           
                        ></b-form-input>
                        
                      </b-form-group>

                      <b-form-group id="input-group-2" label="Descripción Curso" label-for="input-2">

                        <b-form-input
                          id="input-2"
                          v-model="nombrecurso"
                          type="text"
                          required
                          placeholder="Descripción Curso"                            
                        ></b-form-input>
                        <div>
                          
                        </div>
                      </b-form-group>

                      <router-link to="/"><b-button  variant="danger" v-b-tooltip.hover title="Cerrar Ventana" class="mx-4"><i class="fas fa-home"></i></b-button></router-link>
                      <b-button  variant="primary" v-b-tooltip.hover title="Guardar Opinión" @click.prevent="editarCurso"><i class="far fa-save"></i></b-button>
                       <b-alert
                          :show="dismissCountDown"
                          dismissible
                          variant="warning"
                          @dismissed="dismissCountDown=0"
                          @dismiss-count-down="countDownChanged"
                          >
                          <p>Escribe código curso y su nombre correctamente{{ dismissCountDown }} seconds...</p>
                          <b-progress
                            variant="warning"
                            :max="dismissSecs"
                            :value="dismissCountDown"
                            height="4px"
                          ></b-progress>
                      </b-alert>
                    </b-form>
  
  </div>
</template>

<script>
import Swal from 'sweetalert2';

export default {
  name:'EditCurso',
  data(){
    return{
      codigocurso:'',
      nombrecurso:'' ,
      dismissSecs: 2,
      dismissCountDown: 0,
      showDismissibleAlert: false
    }
  },
  mounted(){
    this.$store.getters.enviarDataCursos[this.$route.params.id];
    this.codigocurso =  this.$store.getters.enviarDataCursos[this.$route.params.id].codigo;
    this.nombrecurso =  this.$store.getters.enviarDataCursos[this.$route.params.id].nombreCurso;
  },

  methods:{
    countDownChanged(dismissCountDown) {
        this.dismissCountDown = dismissCountDown
      },
    showAlert() {
        this.dismissCountDown = this.dismissSecs
    },
    editarCurso(){
      console.log(this.codigocurso.length);
      console.log(this.nombrecurso.length);
      if(this.codigocurso.length>=5){
        let auxiliarCurso={
          index: this.$route.params.id,
          editcodigo: this.codigocurso,
          editnombre: this.nombrecurso
        }
        this.$store.dispatch('editarCurso', auxiliarCurso)
        Swal.fire("Modificado"); 
        this.$router.push('/');
      }else {
        this.showAlert();
      }
    }
  }
}
</script>

<style>
.editform {
  width: 400px;
  margin-left: auto;
  margin-right: auto;
}

</style>