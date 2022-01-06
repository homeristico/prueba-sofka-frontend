<template>
    <div class="container">
        <div class="row">
            <div class="col-sm-12">

                <table class="table">
  <thead>
    <tr>
      <th scope="col">Jugador</th>
      <th scope="col">Nivel</th>
      <th scope="col">Puntos</th>
      <th scope="col">Estado</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="registro,key in arregloHistorico" :key="key">
      <th scope="row">{{registro.usuario}}</th>
      <td>{{registro.nivel}}</td>
      <td>{{registro.puntos}}</td>
      <td>{{registro.estado}}</td>
    </tr>    
  </tbody>
</table>
               
            </div>
        </div>
    </div> 
</template>

<script>
import { ref } from '@vue/reactivity'
export default {
    setup() {

        const arregloHistorico = ref([]);

        const cargarHistorico = async () => {

            try {
                const res = await fetch('http://localhost/api/historico/all');  
                const datos = await res.json();
                arregloHistorico.value = datos;
                
            } catch (error) {
                console.log(error)
            }
        }
        cargarHistorico();

        return {
            arregloHistorico
        }
        
    },
}
</script>

<style>

</style>