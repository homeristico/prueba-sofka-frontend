<template>
     <div class="container">
        <div class="row">
            <div class="col-sm-12">
                <div class="card card-pregunta" style="width: 18rem;">  
                    <p>{{pregunta.texto}}</p>              
                    <form>
                            <div class="form-check" v-for="respuesta,key in pregunta.respuestas" :key="key">
                            <input @click="validarCampo(respuesta.texto)" class="form-check-input" type="radio" name="flexRadioDefault" :id="'flexRadioDefault'+respuesta.respuesta_id">
                            <label class="form-check-label" :for="'flexRadioDefault'+respuesta.respuesta_id">
                                {{respuesta.texto}}
                            </label>
                            </div>

                            <div @click="calificar" class="btn btn-outline-success form-control mt-5">Enviar</div>

                        <!-- <router-link to="/pregunta/1" class="btn btn-primary form-control">Iniciar</router-link> -->
                    </form>
                </div>
            </div>
        </div>
    </div>  
</template>

<script>
import { computed, ref } from '@vue/reactivity';
import {  useRouter } from 'vue-router';
import { useStore } from 'vuex';
export default {
    setup() {

        const store = useStore();        
        const pregunta = ref({});
        const respuesta = ref('');          
        const router = useRouter();
        const usuario = computed(() => store.state.usuario);
        const puntaje = computed(() => store.state.puntaje);
        
        

        const calificar = () => {
            // Si no ha elegido una respuesta
            if(respuesta.value == ''){
                return swal("Info!", "Elige una respuesta!", "info");
            }

            // evalua la respuesta
            if(pregunta.value.respuesta === respuesta.value){
                // respuesta correcta
                store.dispatch('cargarPuntaje', pregunta.value.categoria.puntos);
                // evalua nivel
                if(pregunta.value.categoria.id < 5){
                    // se cargan las nuevas preguntas
                    store.dispatch('cargarNivel', pregunta.value.categoria.nombre);
                    let pagina = pregunta.value.categoria.id + 1;                    
                    cargarPreguntas(pagina);
                   
                }else{
                    // cuando se completan todos los niveles
                    swal("Excelente!", "Completaste todos los niveles!", "success");
                    guardarHistorico(usuario, pregunta.value.categoria.nombre, puntaje, "Completado");
                    router.push("/");
                }
                
            }else {
                // cuando el jugador no acierta en la respuesta
                swal("Lo sentimos!", "La respuesa no es fue la correcta!", "error");  
                store.dispatch('cargarPuntaje', 0);
                guardarHistorico(usuario, pregunta.value.categoria.nombre, puntaje, "Perdido");
                router.push("/");
                
            }
        }

        // va guardando el radio button elegido
        const validarCampo = (res) => {
            respuesta.value = res;
        }


        // función que carga las preguntas segun nivel
        const cargarPreguntas = async (id=1) => {   
            pregunta.value = {};
            respuesta.value = "";      
            
            try {
                
                const res = await fetch('http://168.138.233.89/api/categoria/'+id);
                const datos = await res.json();                
                pregunta.value = datos;
                

            } catch (error) {
                console.log(error)
            }
        }
        cargarPreguntas();


        // funcion que guarda los datos del juego y usuario
        const guardarHistorico = async (usuario, nivel, puntos, estado) => {
            

            try {
                const res = await fetch('http://168.138.233.89/api/historico/save',{
                    method:'POST',
                    mode:'cors',
                    headers:{
                        'Content-Type': 'application/json'                        
                    },
                    body:JSON.stringify({
                        usuario:usuario.value,
                        nivel:nivel,
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
            pregunta, validarCampo, calificar
        }
        
    },
}
</script>

<style>
.col-sm-12 {
    display: flex;
    justify-content: center;    
}

.card-pregunta {
    margin-top: 10vh;
    min-width: 80vw;
}

form {
    padding: 20px;
}
p {
    padding: 20px;
}

</style>