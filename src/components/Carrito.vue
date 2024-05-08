<template>
    <div class="my-5">
        <h4>Carrito de compras</h4>
        <table class="table">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Item</th>
                    <th scope="col">Cantidad</th>
                    <th scope="col">Acción</th>
                    <th scope="col">Total</th>
                </tr>
            </thead>
            <tbody id="items">
                <item
                    v-for="item in items" :key="item.id"
                    :item="item"
                />
            </tbody>
            <tfoot>
                <tr id="footer-carrito">
                    <th scope="row" colspan="5" v-if="Object.keys(items).length === 0">Carrito vacío - Comience a comprar</th>
                    <Footer v-else/>
                </tr>
            </tfoot>
        </table>
    
    </div>
    <button class="btn btn-success btn-lg btn-block" @click="pedirPedido">
        Pedir Pedido ({{ totalProductos }})
    </button>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'

import item from './item.vue'
import Footer from './Footer.vue'

export default {
    components: { item, Footer },
    setup() {
        const store = useStore()
        const items = computed(() => store.state.carrito)

        const totalProductos = computed(() => {
            return Object.values(store.state.carrito).reduce((acc, item) => acc + item.cantidad, 0)
        })

        const pedirPedido = () => {
            // Aquí puedes agregar la lógica para enviar el pedido por WhatsApp
            // Por ejemplo, puedes enviar los detalles del pedido a una función o método que maneje el envío de WhatsApp
           const productosEnCarrito = store.state.carrito
    const totalProductos = Object.values(productosEnCarrito).reduce((acc, item) => acc + item.cantidad, 0)
    const totalPrecio = Object.values(productosEnCarrito).reduce((acc, item) => acc + item.precio * item.cantidad, 0)

    console.log('Productos en el carrito:', productosEnCarrito)
    console.log('Total de productos:', totalProductos)
    console.log('Total de la suma de la cuenta:', totalPrecio)

    // Aquí puedes agregar la lógica para enviar el pedido por WhatsApp
        }

        return { items, pedirPedido, totalProductos }
    }
}
</script>
