<template>
  <div class="container text-left">
    <div class="modal fade" :id="'vermas'+index" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog ">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel" v-text="nombrecurso"></h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div class="row">
                    <div class="col-4">
                        <img :src="img" alt="nombrecurso" width="80%">
                    </div>
                    <div class="col-8">
                        <table class="table table-responsive">
                            <tr>
                                <td># inscritos</td>
                                <td v-text="inscritos"></td>
                            </tr>
                            <tr>
                                <td># graduados</td>
                                <td v-text="graduados"></td>
                            </tr>
                            <tr>
                                <td># abandonos</td>
                                <td v-text="abandonos"></td>
                            </tr>
                            <tr>
                                <td>código</td>
                                <td v-text="codigo"></td>
                            </tr>
                            <tr>
                                <td>duración horas</td>
                                <td v-text="duracion"></td>
                            </tr>
                            <tr v-show="disponible">
                                <td>disponible</td>
                                <td v-text="disponible ? 'Si' : 'No' "></td>
                            </tr> 
                        </table>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <b-button  variant="primary" v-b-tooltip.hover title="Cerrar Ventana" class="mx-4" data-dismiss="modal"><i class="fas fa-door-closed"></i></b-button>
                <b-button  variant="primary" v-b-tooltip.hover title="Agregar a Favorito" class="mx-4" data-dismiss="modal" @click="agregarFavoritos"><i class="far fa-heart"></i></b-button>                
            </div>
            </div>
        </div>
    </div>
  
  
  </div>
</template>

<script>
export default {
    name: 'ModalCurso',
    props: [
        'index',
        'nombrecurso',
        'img',
        'inscritos',
        'graduados',
        'abandonos',
        'codigo',
        'duracion',
        'disponible'
    ],
    methods:{
        agregarFavoritos(){            
            let auxiliarFavorito={
                codigo: this.codigo,
                nombrecurso: this.nombrecurso,
                img:this.img
            }
            this.$store.dispatch('agregarFavoritos',auxiliarFavorito)
            this.$router.push('/misfavoritos'); 
        }
    }
}
</script>

<style>

</style>