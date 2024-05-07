<template>
    <div class="col-12 col-sm-4 col-md-3 col-lg-2 mb-3">
      <div class="card">
        <img :src="producto.thumbnailUrl" :alt="`imagen-${producto.title}`" class="card-img-top" />
        <div class="card-body">
          <h5 class="card-title">{{ producto.title }}</h5>
          <p class="card-text">$ <span>{{ producto.precio }}</span></p>
          <button class="btn btn-dark" @click="agregarProducto(producto)">Comprar</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { useStore } from 'vuex';
  
  export default {
    props: {
      producto: {
        type: Object,
        required: true
      }
    },
    setup() {
      const store = useStore();
  
      const agregarProducto = (producto) => {
        // Llama a la acción para agregar el producto al carrito
        store.dispatch('agregarAlCarrito', producto);
      };
  
      return { agregarProducto };
    }
  };
  </script>
  