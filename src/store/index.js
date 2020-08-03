import Vue from 'vue'
import Vuex from 'vuex'


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    busqueda:'',
    opiniones:[],
    misfavoritos:[],
    cursos:[],
    miscursos:[],
    acceso:'123456'
    
  },
  //************************************************************************************* */
  getters:{
    enviarDataCursos(state){
      return state.cursos; 
    },
    enviarDataOpiniones(state){
      return state.opiniones;
    },
    enviarDataFavoritos(state){
      return state.misfavoritos;
    },
    enviarDataMisCursos(state){
      return state.miscursos;
    }

  },
  //************************************************************************************* */
  mutations: {
    llamadoApiCursos(state, informacionApiCursos){
      state.cursos= informacionApiCursos;
    },
    editarCurso(state, informacionEditCurso){
      let cursoseleccionado = state.cursos.find(dato=>(dato.codigo)===(informacionEditCurso.editcodigo));
      console.log(cursoseleccionado.codigo);
      console.log(cursoseleccionado.nombreCurso);
      console.log(informacionEditCurso)

      cursoseleccionado.codigo=informacionEditCurso.editcodigo;
      cursoseleccionado.nombreCurso=informacionEditCurso.editnombre;

    },
    guardarOpinion(state, informacionOpinion){
      state.opiniones.unshift(informacionOpinion);
    },
    eliminarOpinion(state, index){
      state.opiniones.splice(index,1);
    },
    editarOpinion(state, informacionEditOpinion){
      let itemedicion= state.opiniones.find(dato=>(dato.codigo)===(informacionEditOpinion.editcodigocurso)) 
      itemedicion.opinioncurso = informacionEditOpinion.editopinioncurso      
    },    
    agregarFavoritos(state, informacionFavorito){      
      if(state.misfavoritos.find(dato=>(dato.codigo) === (informacionFavorito.codigo))) {
        console.log("Ya existe .. no se graba");
      }
      else {
        state.misfavoritos.unshift(informacionFavorito);
      }
    },
    eliminarFavorito(state, index){
      state.misfavoritos.splice(index,1)
    },
    inscribirCurso(state, informacionInscripcion){
      if(state.miscursos.find(dato=>(dato.codigo) === (informacionInscripcion.codigo))) {
        console.log("ya existe inscripcion")
      }
      else {
        state.miscursos.unshift(informacionInscripcion);
        let cursoseleccionado = state.cursos.find(dato=>(dato.codigo)===(informacionInscripcion.codigo)) 
        cursoseleccionado.datos.inscritos++;
      }
    },
    eliminarMiCurso(state, informacionEliminarInscripcion){
        state.miscursos.splice(informacionEliminarInscripcion.indice,1);
        let cursoseleccionado = state.cursos.find(dato=>(dato.codigo)===(informacionEliminarInscripcion.codigo)) 
        cursoseleccionado.datos.inscritos--;
        cursoseleccionado.datos.abandono++;
    },
    activar_desactivar(state, codigocurso){
      let cursoseleccionado = state.cursos.find(dato=>(dato.codigo)===(codigocurso));
      cursoseleccionado.finalizado= !cursoseleccionado.finalizado;
      cursoseleccionado.datos.graduados= (cursoseleccionado.datos.graduados+cursoseleccionado.datos.inscritos);
      cursoseleccionado.datos.inscritos=0;
    }
  },
  //************************************************************************************* */
  actions: {
    llamadoApiCursos(context, parametrosApiCursos){
      context.commit('llamadoApiCursos', parametrosApiCursos);
    },
    editarCurso(context, dataEditCurso){
      context.commit('editarCurso', dataEditCurso);
    },
    guardarOpinion(context, dataOpinion){
      context.commit('guardarOpinion', dataOpinion);      
    },
    eliminarOpinion(context, index){
      context.commit('eliminarOpinion', index);
    },
    editarOpinion(context, dataEditOpinion){
      context.commit('editarOpinion', dataEditOpinion)
    },
    agregarFavoritos(context,dataFavorito){
      context.commit('agregarFavoritos', dataFavorito)      
    },
    eliminarFavorito(context, index){
      context.commit('eliminarFavorito', index);
    },
    inscribirCurso(context, dataInscribir){
      context.commit('inscribirCurso', dataInscribir)
    },
    eliminarMiCurso(context, dataEliminarInscripcion){
      context.commit('eliminarMiCurso', dataEliminarInscripcion)
    },
    activar_desactivar(context, codigocurso){
      context.commit('activar_desactivar', codigocurso);
    }
  },
  //************************************************************************************* */
  modules: {
  }
})
