<template>
  <div class="container">
    <h1>Carrito</h1>
       <PWAPrompt />
   
    <hr>
    <Carrito />
    <div class="row">
      <Card
        v-for="producto in productos"
        :key="producto.id"
        :producto="producto"
      />
    </div>

     <canvas id="canvas"></canvas>

  </div>
</template>

<script>
import { useStore } from 'vuex'
import { computed, onMounted } from 'vue'
import Card from './components/Card.vue'
import Carrito from './components/Carrito.vue'
import QRCode from 'qrcode';
import PWAPrompt from './components/PWAPrompt.vue';

export default {
  name: 'App',
  components: {
    Card, Carrito, PWAPrompt,
  },
  setup() {
    const store = useStore()

    onMounted(async () => {
      await store.dispatch('fetchData')
    })

    const productos = computed(() => store.state.productos)
    // const carrito = computed(() => store.state.carrito)
    return { productos }
  },
  mounted() {
    QRCode.toCanvas(document.getElementById('canvas'), 'https://qrco.de/bf24PP', function (error) {
        if (error) console.error(error);
        console.log('Código QR generado correctamente');
    });
}
}
</script>
