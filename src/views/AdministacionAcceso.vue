<template>
  <div>    
    <div class="modal fade" id="accesoadministracion" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Introduzca contraseña</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
               <form  >
                    <label for="contrasena"></label>                    
                    <input type="password" v-model="clave" maxlength="20" minlength="6" placeholder="******">
                    <b-alert
                          :show="dismissCountDown"
                          dismissible
                          variant="warning"
                          @dismissed="dismissCountDown=0"
                          @dismiss-count-down="countDownChanged"
                          >
                          <p>Contraseña Invalida{{ dismissCountDown }} seconds...</p>
                          <b-progress
                            variant="warning"
                            :max="dismissSecs"
                            :value="dismissCountDown"
                            height="4px"
                          ></b-progress>
                    </b-alert> 
                    <div class="modal-footer">
                        <button type="submit" class="btn btn-primary" @click.prevent="acceso">Verificar</button>
                    </div>  
                </form>
            </div>
            
            </div>
        </div>
    </div>
  
  
  </div>
</template>

<script>
import $ from 'jquery'; 

export default {
    name:'AdministracionAcceso',

    data(){
        return{
            clave:'',
            dismissSecs: 2,
            dismissCountDown: 0,
            showDismissibleAlert: false
           
        }
    },
    methods:{
        acceso(){
            if(this.clave ===this.$store.state.acceso){
               console.log("this.clave");
               $("[data-dismiss=modal]").trigger({ type: "click" }); 
                this.$router.push('/administracion')

            }
            else {
                this.showAlert();                
            }
        },
        countDownChanged(dismissCountDown) {
        this.dismissCountDown = dismissCountDown
      },
    showAlert() {
        this.dismissCountDown = this.dismissSecs
    },
    }
}
</script>

<style>

</style>