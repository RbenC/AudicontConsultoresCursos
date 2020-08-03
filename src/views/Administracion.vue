<template>
<div>
    <div class="container text-left" v-if="traerDataOpiniones.length>0">
        <p class="text-left">Administrando Opiniones</p>
            <table class="table table-hover">
                <thead>
                    <tr>
                    <th>#</th>
                    <th>Curso</th>
                    <th>Opinión</th>
                    <th>Usuario</th>
                    <th>Editar</th>
                    <th>Eliminar</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(opinion, index) in traerDataOpiniones" :key="index">
                    <td>{{index+1}}</td>
                    <td>{{opinion.nombrecurso}}</td>
                    <td>{{opinion.opinioncurso}}</td>
                    <td>{{opinion.nombreusuario}}</td>
                    <td><button class="btn btn-danger" @click.prevent="eliminarOpinion(index)"><i class="far fa-trash-alt"></i></button> </td>                    
                    <td><b-button variant="primary" v-b-tooltip.hover title="Editar" v-b-modal="'editarOpinion'+index" @click.prevent="editarOpinion(opinion)"><i class="far fa-edit" ></i></b-button></td>




                    <!--Modal opinar -->
                    <b-modal :id="'editarOpinion'+index" :title="opinion.nombrecurso" hide-footer>
                        <div class="text-center">
                            <b-img :src="opinion.imgcurso" :img-alt="opinion.nombrecurso" img-top style="max-width: 7rem;"></b-img>                   
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
                                v-model="editopinion"
                                placeholder="Escribe tu opinión...hasta 500 caracteres"
                                rows="3"
                                max-rows="80"
                                max-length="480"                               
                                ></b-form-textarea>
                                <div>
                                
                                </div>
                            </b-form-group>

                            <b-button  variant="danger" v-b-tooltip.hover title="Cerrar Ventana" class="mx-4"><i class="fas fa-door-closed"></i></b-button>
                            <b-button  variant="primary" v-b-tooltip.hover title="Guardar Opinión" @click.prevent="guardarOpinion(opinion)"><i class="far fa-save"></i></b-button>

                            




                            <b-alert
                                :show="dismissCountDown"
                                dismissible
                                variant="warning"
                                @dismissed="dismissCountDown=0"
                                @dismiss-count-down="countDownChanged"
                                >
                                <p>Escribe opinión {{ dismissCountDown }} seconds...</p>
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


                    </tr>
                </tbody>
            </table>



    </div>
    <div class="text-center mx-4" v-else>
            <img :src="imagendefondo" alt="imagen fondo">
            <h3>Aún no existen opiniones de usuarios que administrar</h3>
    </div>
  




<!-- administrar mis cursos  -->
    <div class="container text-left" v-if="traerDataCursos.length>0">
        <p class="text-left">Administrando Cursos</p>
            <table class="table table-hover">
                <thead>
                    <tr>
                    <th>#</th>
                    <th>Código</th>
                    <th>Nombre Curso</th>
                    <th>Estadísticas</th>
                    <th>Estado</th>
                    <th>Editar</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(curso, index2) in traerDataCursos" :key="index2">
                    <td>{{index2+1}}</td>
                    <td>{{curso.codigo}}</td>
                    <td>{{curso.nombreCurso}}</td>
                    <td>Inscritos: {{curso.datos.inscritos}} <br/> Abandono:{{curso.datos.abandono}}  <br/> Graduados: {{curso.datos.graduados}}</td>
                    
                    <td>
                    <button class="btn btn-warning"  :class="{ favorito: curso.finalizado }" @click.prevent="cambiarfinalizado(curso.codigo)">{{curso.finalizado  ? "Activar" : "Desactivar" }}   </button>   
                    <!--<button class="btn btn-warning">Activar/Desactivar</button>-->
                    </td>
                    <td><button class="btn btn-info" @click.prevent="editarDataCurso(index2)"><i class="far fa-edit"></i></button></td>
                    </tr>
                </tbody>
            </table>
    </div>
    <div class="text-center mx-4" v-else>
            <img :src="imagendefondo2" alt="imagen fondo">
            <h3>Aún no existen cursos seleccionados por el usuario para  administrar</h3>
    </div>
</div>
</template>

<script>
import sinopiniones from '../assets/sincomentarios.png';
import sincursos from '../assets/sinfavoritos.png';
import Swal from 'sweetalert2';

export default {
    name:'Administracion',
    data(){
        return{
            imagendefondo: sinopiniones,
            imagendefondo2: sincursos,
            nombre:'',
            editopinion:'',
            dismissSecs: 2,
            dismissCountDown: 0,
            showDismissibleAlert: false
        }
    },
    computed:{
        traerDataOpiniones(){
            return this.$store.getters.enviarDataOpiniones;
        },
        traerDataCursos(){
        return this.$store.getters.enviarDataCursos; 
        }   
    },
    methods:{
        eliminarOpinion(index){
            const swalWithBootstrapButtons = Swal.mixin({
                customClass: {
                    confirmButton: 'btn btn-danger',
                    cancelButton: 'btn btn-success'
                },
                buttonsStyling: false
                })

                swalWithBootstrapButtons.fire({
                title: 'Seguro de eliminar Favorito ?',
                text: "",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: '  Si  ',
                cancelButtonText: '  No  ',
                reverseButtons: true
                }).then((result) => {
                    if (result.value) {
                        this.$store.dispatch('eliminarOpinion',index);
                    }
            })    
            
        },
        editarOpinion(opinion){            
            this.nombre = opinion.nombreusuario;
            this.editopinion = opinion.opinioncurso
        },
        guardarOpinion(opinion){
            if(this.nombre.length >2 && this.nombre.length<=20 && this.editopinion.length>20 && this.editopinion.length<=480 ){
                let auxiliarCurso= {
                editcodigocurso: opinion.codigocurso,  // 1 codigo curso
                editopinioncurso: this.editopinion,      // 4 opinion del usuario
                }
                this.$store.dispatch('editarOpinion', auxiliarCurso)                
//                this.$router.push('/opiniones');
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
        cambiarfinalizado(codigocurso){
            this.$store.dispatch('activar_desactivar', codigocurso);
        },
        editarDataCurso(index){
            //this.$store.dispatch('editarDataCurso', codigocurso);
            console.log(index);
            this.$router.push(`editarcurso/${index}`)
        }
    }
}
</script>



<style scoped lang="scss">
tbody {
    tr {
        &:hover{
            td {
                background-color: #75a5a5;
            }      
        }
    }
}

.favorito {
  background-color: #75a5a5;  
}


</style>