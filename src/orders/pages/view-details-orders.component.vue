<template>
  <div>
    <h2>Detalle de Orden</h2>
    <div v-if="order" class="container">
      <div class="card">
        <div class="order-detail">
          <div class="order-info">
            <p><strong>ID:</strong> {{ order.id }}</p>
            <p><strong>Cliente:</strong> {{ order.client }}</p>
            <p><strong>Fecha:</strong> {{ order.date }}</p>
            <p><strong>Producto:</strong> {{ order.product }}</p>
            <p><strong>Cantidad:</strong> {{ order.quantity }}</p>
            <p><strong>Total:</strong> {{ order.total }}</p>
          </div>
          <div v-if="order.imageUrl" class="order-image">
            <img :src="order.imageUrl" alt="Imagen del producto" />
          </div>
        </div>
        <div class="flex gap-3 mt-4">
          <RouterLink to="/orders" class="back-button">← Volver</RouterLink>
          <Button label="Eliminar" class="delete-button" @click="deleteOrder" />
        </div>
      </div>
    </div>

    <p v-else>No se encontró la orden.</p> 
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { getOrderById, deleteOrderById } from '../services/orders.service.js';
import Button from 'primevue/button';

const route = useRoute();
const router = useRouter();
const order = ref(null);

onMounted(async () => {
  const id = route.params.id;
  try {
    order.value = await getOrderById(id);
    console.log('Orden cargada:', order.value);
  } catch (error) {
    console.error('Error al cargar la orden:', error);
  }
});

async function deleteOrder() {
  try {
    const id = route.params.id;
    await deleteOrderById(id);
    alert('Orden eliminada correctamente');
    router.push('/orders');
  } catch (error) {
    alert('Error al eliminar la orden: ' + error.message);
  }
}
</script>

<style>
.container {
  display: flex;
  align-items: center;
  gap: 5rem;
}

.back-button {
  display: inline-block;
  padding: 8px 16px;
  background-color: black;
  color: white;
  border-radius: 9999px;
  font-weight: bold;
  text-decoration: none;
  transition: background-color 0.3s ease;
}

.back-button:hover {
  background-color: #facc15;
  color: black;
}

.card {
  background-color: gray;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  padding: 30px;
  max-width: 600px;
  margin: 1rem auto;
}

.order-detail {
  display: flex;
  align-items: flex-start;
  gap: 0.9rem;
}

.order-info {
  flex: 1;
  margin: 0;
}

.order-image img {
  max-width: 190px;
  height: auto;
  border-radius: 8px;
  object-fit: cover;
}

.delete-button {
  background-color: #dc2626;
  color: white;
  font-weight: bold;
  border-radius: 9999px;
  padding: 0.5rem 1.5rem;
  transition: background-color 0.3s ease;
}

.delete-button:hover {
  background-color: #b91c1c;
}
</style>
