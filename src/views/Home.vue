<template>
  <div class="container">
    <div class="row">
        <div class="col-12 col-sm-12 col-md-6 col-lg-4 col-xl-4" 
              v-for="(curso, index) in traerDataCursos" :key="index">
          <b-card-group deck>
            <b-card :title="curso.nombreCurso" :img-src="curso.img" :img-alt="curso.nombreCurso" img-top style="max-width: 30rem;">
              <!--<b-card-text> </b-card-text>-->
              <template v-slot:footer>
                 <!--Modal opinar -->
                 <b-button variant="primary" v-b-tooltip.hover title="Opinar" class="mx-4" v-b-modal="'opinar'+index"><i class="fas fa-comment-dots" ></i></b-button>

                 <b-modal :id="'opinar'+index" :title="curso.nombreCurso" hide-footer>
                 <div class="text-center">
                    <b-img :src="curso.img" :img-alt="curso.nombreCurso" img-top style="max-width: 7rem;"></b-img>                   
                </div>
                    <b-form>
                      <b-form-group
                        id="input-group-1"
                        label="Tu Nombre"
                        label-for="input-1"
                        description="Hasta 20 caracteres"
                      >
                        <b-form-input
                          id="input-1"
                          v-model="nombre"
                          type="text"
                          required
                          placeholder="Escribe tu nombre"                           
                        ></b-form-input>
                        
                      </b-form-group>

                      <b-form-group id="input-group-2" label="Tu Opinión" label-for="input-2">
                        <b-form-textarea
                          id="textarea"
                          v-model="opinion"
                          placeholder="Escribe tu opinión...hasta 500 caracteres"
                          rows="3"
                          max-rows="80"
                          max-length="480"                               
                        ></b-form-textarea>
                        <div>
                          
                        </div>
                      </b-form-group>

                      <b-button  variant="danger" v-b-tooltip.hover title="Cerrar Ventana" class="mx-4"><i class="fas fa-door-closed"></i></b-button>
                      <b-button  variant="primary" v-b-tooltip.hover title="Guardar Opinión" @click.prevent="guardarOpinion(curso)"><i class="far fa-save"></i></b-button>
                       <b-alert
                          :show="dismissCountDown"
                          dismissible
                          variant="warning"
                          @dismissed="dismissCountDown=0"
                          @dismiss-count-down="countDownChanged"
                          >
                          <p>Escribe tu Nombre y opinión {{ dismissCountDown }} seconds...</p>
                          <b-progress
                            variant="warning"
                            :max="dismissSecs"
                            :value="dismissCountDown"
                            height="4px"
                          ></b-progress>
                      </b-alert>
                    </b-form>                     
                 </b-modal>
                 <!--Modal opinar -->

                 <!--ver mas -->
                 <b-button variant="success" v-b-tooltip.hover title="Ver más información" class="mx-4" data-toggle="modal" :data-target="'#vermas'+index" ><i class="fas fa-search-plus"></i></b-button> 
                 <b-button variant="primary" v-show="!curso.finalizado"  v-b-tooltip.hover title="Inscripción" class="mx-4" @click="inscribirCurso(curso)"><i class="fas fa-laptop-code"></i></b-button> 
              </template>
            </b-card>
          </b-card-group>
          <ModalCurso 
            :index="index"
            :nombrecurso="curso.nombreCurso"
            :img="curso.img"
            :inscritos="curso.datos.inscritos"
            :graduados="curso.datos.graduados"
            :abandonos="curso.datos.abandono"
            :codigo="curso.codigo"
            :duracion="curso.duracion"
            :disponible="curso.finalizado"
          >
          </ModalCurso>
        </div>
    </div>
  </div>
</template>

<script>
import ModalCurso from '../components/ModalCurso.vue';
import Swal from 'sweetalert2';

export default {
  name: 'Home',    
  components: {
    ModalCurso
  },
  data(){
    return {
      caracteres1:20,
      caracteres2:480,
      nombre:'',
      opinion:'',
      dismissSecs: 2,
      dismissCountDown: 0,
      showDismissibleAlert: false
    }
  },
  computed:{
      traerDataCursos(){
        return this.$store.getters.enviarDataCursos.filter((element)=>{
          return element.nombreCurso.toLowerCase().includes(this.$store.state.busqueda.toLowerCase())
        }); 
      }      
  },
  methods:{
    guardarOpinion(curso){
      if(this.nombre.length >2 && this.nombre.length<=20 && this.opinion.length>20 && this.opinion.length<=480 ){
        let idRandom = Math.ceil(Math.random()*100);
        let auxiliarCurso= {
          idOpinion: idRandom,             // 1 id aleatorio
          codigocurgo:curso.codigo,        // 2 codigo de curso 
          nombrecurso: curso.nombreCurso,  // 2 nombre de curso
          nombreusuario: this.nombre,      // 3 nombre del usuario
          opinioncurso: this.opinion,      // 4 opinion del usuario
          imgcurso:curso.img               // 5 imagen del curso 
        }
        this.$store.dispatch('guardarOpinion', auxiliarCurso)
        this.$router.push('/opiniones');
      }else{
        this.showAlert();
      }
    },
    countDownChanged(dismissCountDown) {
        this.dismissCountDown = dismissCountDown
      },
    showAlert() {
        this.dismissCountDown = this.dismissSecs
    },
    inscribirCurso(curso){            
            let auxiliarInscribir={
                codigo: curso.codigo,
                nombrecurso: curso.nombreCurso,
                img:curso.img
            }
            Swal.fire({
              title: 'Inscripción',
              text: "Desea Inscribirse en este curso?",
              icon: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Si'
            }).then((result) => {
              if (result.value) {
                Swal.fire(
                  this.$store.dispatch('inscribirCurso', auxiliarInscribir),
                  this.$router.push('/miscursos'),
                )
              }
            })
        }
  }
}
</script>
