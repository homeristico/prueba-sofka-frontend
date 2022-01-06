<template>
  
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container-fluid">
        <router-link class="navbar-brand" to="/" >Inicio</router-link>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <router-link class="navbar-brand" to="/historico">Historicos</router-link>
            </li> 
            <li class="nav-item">
              <button @click="home" class="btn btn-warning">Retirarse</button>
            </li>                                
          </ul>  
      
          <span class="usuario-nav">{{usuario}}</span> | <span class="puntaje-nav"> Puntaje</span> = <span class="puntos-nav">{{puntaje}}</span>
        </div>
      </div>
    </nav>
    <!-- <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link> -->
  
  <router-view />
</template>

<script>
import { computed } from '@vue/reactivity';
import { useRouter } from 'vue-router'
import { useStore } from 'vuex';
export default {
  setup() {
    
    const store = useStore();
    const usuario = computed(() => store.state.usuario);
    const puntaje = computed(() => store.state.puntaje);
    const nivel = computed(() => store.state.nivel);
    const router = useRouter();

    const home = () => {
      if(usuario.value == ''){
        return swal("Info!", "Eliga un nombre de usuario!", "info");
      }
      guardarHistorico(usuario, nivel, puntaje, "Retirado");
      router.push("/")
      swal("Buen Trabajo!", "Intentalo de nuevo!", "success");
    }

    const guardarHistorico = async (usuario, nivel, puntos, estado) => {
           

            try {
                const res = await fetch('http://168.138.233.89/api/historico/save',{
                    method:'POST',
                    mode:'cors',
                    headers:{
                        'Content-Type': 'application/json'
                        //'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    body:JSON.stringify({
                        usuario:usuario.value,
                        nivel:nivel.value,
                        puntos:puntos.value,
                        estado:estado
                    })
                });
                const datos = await res.json();
                
            } catch (error) {
                console.error(error)
            }

        }

    

    return {
      home, usuario, puntaje
    }


  },
}
</script>

<style>
.usuario-nav {
  font-weight: bolder;
  margin-right: 10px;
  font-size: 20px;
  color: rgb(59, 129, 121);
}
.puntaje-nav {
  font-weight: bolder;
  margin-right: 10px;
  margin-left: 10px;
  font-size: 20px;
  color: orange;
}
.puntos-nav {
  font-weight: bolder;
  margin-right: 10px;
  margin-left: 10px;
  font-size: 20px;
  color: rgb(32, 30, 27);
}
</style>
