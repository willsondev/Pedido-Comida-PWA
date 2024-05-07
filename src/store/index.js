import { createStore } from 'vuex'

export default createStore({
  state: {
    productos: [],
    carrito: {}
  },
  mutations: {
    setProducto(state, payload) {
      state.productos = payload;
    },
    // Modifica la mutación para agregar productos al carrito correctamente
    agregarAlCarrito(state, producto) {
      if (state.carrito.hasOwnProperty(producto.id)) {
        state.carrito[producto.id].cantidad++;
      } else {
        producto.cantidad = 1;
        state.carrito[producto.id] = producto;
      }
    },
    vaciarCarrito(state) {
      state.carrito = {}
    },
    aumentar(state, payload) {
      state.carrito[payload].cantidad =    state.carrito[payload].cantidad + 1
    },
    disminuir(state, payload) {
      state.carrito[payload].cantidad = state.carrito[payload].cantidad - 1
      if (state.carrito[payload].cantidad === 0) {
        delete state.carrito[payload];
      }
    }
  },
  actions: { 
    async fetchData({ commit }) {
      try {
        const res = await fetch('api.json');
        const data = await res.json();
        commit('setProducto', data);
      } catch (error) {
        console.log(error);
      }
    },
    // Corrige el nombre de la acción a agregarAlCarrito
    agregarAlCarrito({ commit, state }, producto) {
      commit('agregarAlCarrito', producto); // Llama a la mutación correctamente
    }
  },
  getters: {
    totalCantidad(state) {
      return Object.values(state.carrito).reduce((acc, {cantidad}) => acc + cantidad, 0)
    },
    totalPrecio(state) {
      return Object.values(state.carrito).reduce((acc, {cantidad, precio}) => acc + cantidad * precio, 0)
    }
  },
  modules: {
  }
})
