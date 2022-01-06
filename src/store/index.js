import { createStore } from 'vuex'

export default createStore({
  state: {
    usuario:'',
    puntaje:'0',
    nivel:'nivel1'
  },
  mutations: {
    setUsuario(state, payload){
      state.usuario = payload;
    },
    setPuntaje(state, payload){
      state.puntaje = payload;      
    },
    setNivel(state, payload){
      state.nivel = payload;
    }
  },
  actions: {
    cargarUsuario({commit},usuario){
      commit('setUsuario', usuario);
    },
    cargarPuntaje({commit}, puntaje){      
      commit('setPuntaje', puntaje);
    },
    cargarNivel({commit}, nivel){
      commit('setNivel', nivel);
    }
  },
  modules: {
  }
})
