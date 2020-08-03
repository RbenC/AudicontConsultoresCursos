<template>
    <div v-if="traerDataOpiniones.length>0">
        <div class="accordion text-left container" id="accordionExample">
            <div class="text-center display-4">Lista de opiniones</div>
                <div class="card" v-for="(opinion, index) in traerDataOpiniones" :key="index">
                    <div class="card-header" id="headingOne">
                    <h2 class="mb-0">
                        <button class="btn btn-link btn-block text-left" type="button" data-toggle="collapse" :data-target="'#collapseOne'+index" aria-expanded="true" aria-controls="collapseOne">
                        <i class="fas fa-comment-dots" ></i> {{index+1}}.- Opinion sobre: {{opinion.nombrecurso}}.  Realizado por: {{opinion.nombreusuario}}
                        </button>
                    </h2>
                    </div>

                    <div :id="'collapseOne'+index" class="collapse" aria-labelledby="headingOne" data-parent="#accordionExample">
                    <div class="card-body">
                        {{opinion.opinioncurso}}
                    </div>                    
                </div> 
            </div> 
        </div>
    </div>    
    <div class="text-center mx-4" v-else>
        <img :src="imagendefondo" alt="imagen fondo">
        <h3>Aún no existen opiniones de usuarios</h3>
    </div> 
</template>



<script>
import sinopiniones from '../assets/sincomentarios.png'


export default {
    name: 'Opiniones',
    data(){
        return{
            imagendefondo: sinopiniones
        }
    },
    computed:{
        traerDataOpiniones(){
            return this.$store.getters.enviarDataOpiniones;
        }
    }
}
</script>

<style>

</style>