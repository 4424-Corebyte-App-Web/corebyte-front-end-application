<template>
  <div class="form-card">
    <h2>Registrar Nueva Orden</h2>
    <form @submit.prevent="submitForm">

      <div class="field-card">
        <label>Cliente:</label>
        <InputText v-model="form.client" class="custom-text-color" required />
      </div>

      <div class="field-card">
        <label>Producto:</label>
        <InputText v-model="form.product" class="custom-text-color" required />
      </div>

      <div class="field-card">
        <label>Cantidad:</label>
        <InputNumber v-model="form.quantity" class="custom-text-color" required :min="1" />
      </div>

      <div class="field-card">
        <label>Fecha:</label>
        <Calendar v-model="form.date"  dateFormat="yy-mm-dd" class="custom-text-color" required />
      </div>

      <div class="field-card">
        <label>Total:</label>
        <InputNumber v-model="form.total" class="custom-text-color" required mode="currency" currency="PEN" locale="es-PE" />
      </div>

      <div class="field-card">
        <label>Imagen (URL):</label>
        <InputText v-model="form.imageUrl" class="custom-text-color" />
      </div>

      <div class="flex gap-15 mt-4">
        <Button
            label="Registrar"
            type="submit"
            class="register-button"
        />
        <RouterLink to="/orders" class="back-link">← Volver</RouterLink>
      </div>

    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import InputText from 'primevue/inputtext';
import InputNumber from 'primevue/inputnumber';
import Calendar from 'primevue/calendar';
import Button from 'primevue/button';
import { useToast } from 'primevue/usetoast';
import { getOrders,addOrder } from '../services/orders.service.js';

const router = useRouter();
const toast = useToast();
const form = ref({

  client: '',
  product: '',
  quantity: 1,
  date: new Date(),
  total: 0,
  imageUrl: ''
});

async function submitForm() {
  try {

    const orders = await getOrders();
    const maxId = orders.reduce((max, order) => {
      const idNum = Number(order.id);
      return idNum > max ? idNum : max;
    }, 0);


    const newId = (maxId + 1).toString();


    const newOrder = {
      ...form.value,
      id: newId,
      date: form.value.date.toISOString().split('T')[0]
    };

    // Guardar nueva orden
    await addOrder(newOrder);

    toast.add({
      severity: 'success',
      summary: 'Éxito',
      detail: `Orden registrada correctamente con ID ${newId}`,
      life: 3000
    });

    router.push('/orders');
  } catch (error) {
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: error.message,
      life: 4000
    });
  }
}
</script>

<style scoped>
.form-card {
  max-width: 500px;
  margin: auto;
  background-color: gray;
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}
.register-button {
  background-color: #16a34a;
  color: white;
  font-weight: bold;
  border-radius: 9999px;
  padding: 0.5rem 1.5rem;
  transition: transform 0.2s ease, background-color 0.3s ease;
}

.register-button:hover {
  background-color: #22c55e;
  transform: scale(1.05);
}

.back-link {
  display: inline-block;
  color: #111;
  font-weight: bold;
  text-decoration: none;
  padding: 0.5rem 1.5rem;
  border: 2px solid #999;
  border-radius: 9999px;
  transition: background-color 0.3s ease, color 0.3s ease;
}

.back-link:hover {
  background-color: #f3f3f3;
  color: #000;
}
.field-card {
  background: darkgrey; /* color de fondo suave */
  border: 1px solid #d1d5db; /* borde gris claro */
  border-radius: 8px;
  padding: 1rem 1.25rem;
  margin-bottom: 1rem;
  box-shadow: 0 1px 4px rgba(0,0,0,0.08);
  transition: box-shadow 0.3s ease;
  display: flex;
  flex-direction: column;
}

.field-card:hover {
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
}

.field-card label {
  font-weight: 600;
  color: #374151;
  margin-bottom: 0.5rem;
  font-size: 1rem;
}
.custom-text-color {
  color: black;
}

</style>
