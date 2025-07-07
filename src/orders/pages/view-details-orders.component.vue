<template>
  <div>
    <h2>Detalle de Orden</h2>
    <div v-if="order" class="container">
      <div class="card">
        <div class="order-detail">
          <div class="order-info">
            <p><strong>ID:</strong> {{ order.id }}</p>
            <p><strong>Cliente:</strong> {{ order.customer }}</p>
            <p><strong>Fecha:</strong> {{ order.date }}</p>
            <p><strong>Producto:</strong> {{ order.product }}</p>
            <p><strong>Cantidad:</strong> {{ order.amount }}</p>
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

    <p v-else>No se encontró la orden.</p> <!-- Mostrar sólo si no hay orden -->
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { getOrderById, deleteOrderById } from '../services/orders.services.js';
import Button from 'primevue/button';

const route = useRoute();
const router = useRouter();
const order = ref(null);

// Map product IDs to names
const productMap = {
  1: 'Vino',
  2: 'Ron',
  3: 'Perro Negro',
  4: 'Vodka',
  5: 'Whisky',
  6: 'Cerveza'
};

// Format date for display
const formatDate = (dateString) => {
  if (!dateString) return 'N/A';
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-PE', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  } catch (e) {
    return dateString;
  }
};

onMounted(async () => {
  const id = route.params.id;
  if (!id) {
    console.error('No order ID provided in URL');
    return;
  }

  try {
    console.log('Fetching order with ID:', id);
    const response = await getOrderById(id);
    console.log('Raw API Response:', JSON.stringify(response, null, 2));
    
    // Handle case where response might be an array or have a data property
    const orderData = Array.isArray(response) ? response[0] : (response.data || response);
    
    if (!orderData) {
      console.error('No order data received');
      return;
    }

    console.log('Processed order data:', orderData);
    
    // Map the API response to match our component's expected format
    const mappedOrder = {
      id: orderData.id ?? 'N/A',
      customer: orderData.customer ?? orderData.client ?? 'N/A',
      date: formatDate(orderData.date),
      product: orderData.productId ? (productMap[orderData.productId] || 'N/A') : 'N/A',
      amount: orderData.amount ?? orderData.quantity ?? '0',
      total: orderData.total ? `S/ ${parseFloat(orderData.total).toFixed(2)}` : 'N/A',
      imageUrl: orderData.url ?? orderData.imageUrl ?? null
    };
    
    console.log('Mapped order data:', mappedOrder);
    order.value = mappedOrder;
  } catch (error) {
    console.error('Error loading order:', {
      message: error.message,
      response: error.response?.data,
      stack: error.stack
    });
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
