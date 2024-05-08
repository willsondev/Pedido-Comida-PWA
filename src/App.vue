<template>
  <div class="container">
    <h1>Carrito</h1>
    <PWAPrompt />

    <hr>
    <Carrito />

    <div class="row">
      <select @change="mostrarProductosPorCategoria($event.target.value)">
        <option value="">Selecciona una categoría</option>
        <option v-for="categoria in categorias" :key="categoria" :value="categoria">{{ categoria }}</option>
      </select>
    </div>

    <div class="row" v-if="productosMostrados.length > 0">
      <Card
        v-for="producto in productosMostrados"
        :key="producto.id"
        :producto="producto"
      />
    </div>

    <canvas id="canvas"></canvas>
  </div>
</template>

<script>
import { useStore } from 'vuex'
import { computed, onMounted, ref } from 'vue'
import Card from './components/Card.vue'
import Carrito from './components/Carrito.vue'
import QRCode from 'qrcode'
import PWAPrompt from './components/PWAPrompt.vue'

export default {
  name: 'App',
  components: {
    Card,
    Carrito,
    PWAPrompt,
  },
  setup() {
    const store = useStore()
    const productos = computed(() => store.state.productos)
    const categorias = computed(() => [...new Set(store.state.productos.map(producto => producto.categoria))])
    const productosMostrados = ref([])

    onMounted(async () => {
      await store.dispatch('fetchData')
    })

    const mostrarProductosPorCategoria = categoriaSeleccionada => {
      if (!categoriaSeleccionada) {
        productosMostrados.value = []
      } else {
        productosMostrados.value = productos.value.filter(producto => producto.categoria === categoriaSeleccionada)
      }
    }

    return {
      productos,
      categorias,
      productosMostrados,
      mostrarProductosPorCategoria,
    }
  },
  mounted() {
    QRCode.toCanvas(document.getElementById('canvas'), 'https://qrco.de/bf24PP', function (error) {
      if (error) console.error(error);
      console.log('Código QR generado correctamente');
    });
  }
}
</script>
