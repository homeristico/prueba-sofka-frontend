<template>
  <div class="container">
        <div class="row">
            <div class="col-sm-12">
                <div class="card" style="width: 18rem;">                
                    <form>
                        <div class="mb-3">
                            <label for="exampleInputEmail1" class="form-label">Nombre</label>
                            <input v-model="usuario" type="email" class="form-control" id="nombre" aria-describedby="emailHelp">                            
                        </div>                                              
                        <router-link @click="guardarUsuario" to="/pregunta" class="btn btn-primary form-control">Iniciar</router-link>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { ref } from '@vue/reactivity';
// @ is an alias to /src
import { useStore } from 'vuex';


export default {
  name: 'Home',
  components: {
    
  },
  setup(){

        const usuario = ref('');        
        const store = useStore();

        const guardarUsuario = () => {
          store.dispatch('cargarUsuario', usuario);
          store.dispatch('cargarPuntaje',0);   
        }




      return {
        usuario, guardarUsuario
      }


  }
}
</script>
<style>
.col-sm-12 {
    display: flex;
    justify-content: center;    
}

.card {
    margin-top: 10vh;
}

form {
    padding: 20px;
}
</style>