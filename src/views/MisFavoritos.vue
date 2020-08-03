<template>
    <div class="container" v-if="traerDataFavoritos.length>0">
        <div><h3>Listado de Favoritos</h3> </div>
        <div class="row">
            <div class="col-12 col-sm-12 col-md-6 col-lg-4 col-xl-4" 
                v-for="(curso, index) in traerDataFavoritos" :key="index">
                <b-card-group deck>
                    <b-card :title="curso.nombreCurso" :img-src="curso.img" :img-alt="curso.nombreCurso" img-top style="max-width: 30rem;">
                    <template v-slot:footer>
                        <b-button variant="danger" v-b-tooltip.hover title="Eliminar" class="mx-4" @click="eliminarFavorito(index)"><i class="fas fa-laptop-code"></i></b-button> 
                    </template>
                    </b-card>
                </b-card-group>
            </div>
        </div>
    </div>    
        <div class="text-center mx-4" v-else>
            <img :src="imagendefondo" alt="imagen fondo">
            <h3>Aún no existen opiniones de usuarios</h3>
        </div> 
    
 
</template>

<script>
import Swal from 'sweetalert2';
import sinfavorito from '../assets/sinfavoritos.png'

export default {
    name:'MisFavoritos',
    data(){
        return{
            imagendefondo: sinfavorito
        }
    },
    
    
    computed:{
      traerDataFavoritos(){
        return this.$store.getters.enviarDataFavoritos; 
    }      
  },
  methods:{
     eliminarFavorito(index){
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
                    this.$store.dispatch('eliminarFavorito', index); 
                    }
            })           
            
        }
  }
}
</script>

<style>

</style>