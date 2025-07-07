<script>
import axios from 'axios';

// Define the product enum to match the backend
const Products = {
  Vino: 1,
  Ron: 2,
  Perro_Negro: 3,
  Vodka: 4,
  Whisky: 5,
  Cerveza: 6
};

export default {
  name: "register-order",
  data() {
    // Convert the Products enum to an array of { name, code } objects for the dropdown
    const productOptions = Object.entries(Products).map(([name, code]) => ({
      name: name.replace('_', ' '), // Convert Perro_Negro to 'Perro Negro' for display
      code: code,
      value: name // Store the original enum key
    }));

    return {
      loading: false,
      submitting: false,
      error: null,
      validationErrors: {},
      products: productOptions,
      formData: {
        client: '',
        product: null,
        quantity: 1,
        date: new Date().toISOString().split('T')[0],
        total: 0,
        imageUrl: ''
      }
    };
  },
  computed: {
    isFormValid() {
      return (
        this.formData.client &&
        this.formData.product &&
        this.formData.quantity > 0 &&
        this.formData.date &&
        this.formData.total > 0
      );
    }
  },
  created() {
    // No need to fetch products as we're using the enum directly
  },
  methods: {
    // Remove fetchProducts since we're using the enum directly
    validateForm() {
      this.validationErrors = {};
      if (!this.formData.client) this.validationErrors.client = 'El cliente es requerido';
      if (!this.formData.product) this.validationErrors.product = 'El producto es requerido';
      if (!this.formData.quantity || this.formData.quantity < 1) this.validationErrors.quantity = 'La cantidad debe ser mayor a 0';
      if (!this.formData.date) this.validationErrors.date = 'La fecha es requerida';
      if (!this.formData.total || this.formData.total <= 0) this.validationErrors.total = 'El total debe ser mayor a 0';
      
      return Object.keys(this.validationErrors).length === 0;
    },
    async submitOrder() {
      if (!this.validateForm()) {
        this.$toast.add({
          severity: 'warn',
          summary: 'Validación',
          detail: 'Por favor complete todos los campos requeridos',
          life: 3000
        });
        return;
      }

      this.submitting = true;
      try {
        // Send the product as a string (the backend will parse it to the enum)
        const orderData = {
          customer: this.formData.client,
          date: new Date(this.formData.date).toISOString(),
          product: this.formData.product, // Send the string value (e.g., 'Vino', 'Ron')
          amount: parseInt(this.formData.quantity, 10),
          total: parseFloat(this.formData.total),
          url: this.formData.imageUrl || ''
        };
        
        console.log('Enviando datos al servidor:', JSON.stringify(orderData, null, 2));
        
        console.log('Enviando datos al servidor:', JSON.stringify(orderData, null, 2));
        
        const response = await axios.post('https://localhost:7164/api/v1/order', orderData, {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
        });
        
        console.log('Respuesta del servidor:', response.data);
        
        this.$toast.add({
          severity: 'success',
          summary: 'Éxito',
          detail: 'Orden registrada correctamente',
          life: 3000
        });
        
        this.$router.push('/orders');
      } catch (error) {
        console.error('Error al registrar la orden:', error);
        let errorMessage = 'No se pudo registrar la orden';
        
        if (error.response) {
          // El servidor respondió con un status code fuera del rango 2xx
          console.error('Datos de error del servidor:', error.response.data);
          console.error('Status:', error.response.status);
          console.error('Headers:', error.response.headers);
          
          if (error.response.data && error.response.data.errors) {
            // Si hay errores de validación, mostrarlos
            const validationErrors = [];
            // Procesar los errores de validación del backend
            for (const [field, errors] of Object.entries(error.response.data.errors)) {
              validationErrors.push(...errors);
            }
            errorMessage = `Errores de validación:\n${validationErrors.join('\n')}`;
          } else if (error.response.data) {
            errorMessage = error.response.data.title || error.response.data.message || JSON.stringify(error.response.data);
          }
        } else if (error.request) {
          // La petición fue hecha pero no hubo respuesta
          console.error('No se recibió respuesta del servidor:', error.request);
          errorMessage = 'No se pudo conectar con el servidor. Por favor, intente nuevamente.';
        } else {
          // Algo pasó en la configuración de la petición
          console.error('Error al configurar la petición:', error.message);
          errorMessage = `Error: ${error.message}`;
        }
        
        this.$toast.add({
          severity: 'error',
          summary: 'Error',
          detail: errorMessage,
          life: 5000
        });
      } finally {
        this.submitting = false;
      }
    },
    formatDate(date) {
      if (!date) return '';
      const d = new Date(date);
      return d.toISOString().split('T')[0];
    },
    
    // Helper to get the product name from the enum value
    getProductName(value) {
      return Object.keys(Products).find(key => Products[key] === value) || '';
    },
    
    // Helper to get the enum value from the product name
    getProductValue(name) {
      return Products[name] || null;
    },
    
    goBack() {
      this.$router.go(-1);
    }
  }
}
</script>
<template>
  <div class="form-container">
    <div class="form-header">
      <h1>Registrar Nueva Orden</h1>
      <pv-button 
        icon="pi pi-arrow-left" 
        class="p-button-text p-button-rounded p-button-secondary" 
        @click="goBack" 
        label="Volver"
      />
    </div>
    
    <div class="p-fluid form-content">
      <div class="p-field">
        <label for="client">Cliente</label>
        <pv-inputtext 
          id="client" 
          v-model="formData.client" 
          class="w-full"
          :class="{'p-invalid': validationErrors.client}"
        />
        <small class="p-error" v-if="validationErrors.client">{{ validationErrors.client }}</small>
      </div>
      
      <div class="p-field">
        <label for="product">Producto</label>
        <pv-dropdown 
          id="product" 
          v-model="formData.product" 
          :options="products" 
          optionLabel="name"
          optionValue="value"
          placeholder="Seleccione un producto"
          class="w-full"
          :class="{'p-invalid': validationErrors.product}"
          :loading="loading"
          showClear
        >
          <template #option="slotProps">
            <div class="flex align-items-center">
              <div>{{ slotProps.option.name }}</div>
            </div>
          </template>
        </pv-dropdown>
        <small class="p-error" v-if="validationErrors.product">{{ validationErrors.product }}</small>
      </div>
      
      <div class="p-field">
        <label for="quantity">Cantidad</label>
        <pv-inputnumber 
          id="quantity" 
          v-model="formData.quantity" 
          :min="1" 
          class="w-full"
          :class="{'p-invalid': validationErrors.quantity}"
        />
        <small class="p-error" v-if="validationErrors.quantity">{{ validationErrors.quantity }}</small>
      </div>
      
      <div class="p-field">
        <label for="startDate">Fecha</label>
        <pv-datepicker
          id="startDate"
          v-model="formData.date"
          :showIcon="true"
          dateFormat="yy-mm-dd"
          :showButtonBar="true"
          class="w-full"
          :class="{'p-invalid': validationErrors.date}"
        />
        <small class="p-error" v-if="validationErrors.date">{{ validationErrors.date }}</small>
      </div>
      
      <div class="p-field">
        <label for="total">Total</label>
        <pv-inputnumber 
          id="total" 
          v-model="formData.total" 
          :min="0.01" 
          mode="currency" 
          currency="PEN" 
          locale="es-PE"
          class="w-full"
          :class="{'p-invalid': validationErrors.total}"
        />
        <small class="p-error" v-if="validationErrors.total">{{ validationErrors.total }}</small>
      </div>
      
      <div class="p-field">
        <label for="imageUrl">Imagen (URL):</label>
        <pv-inputtext 
          id="imageUrl" 
          v-model="formData.imageUrl" 
          class="w-full"
          placeholder="https://ejemplo.com/imagen.jpg"
        />
      </div>
      
      <div class="form-actions">
        <pv-button 
          label="Registrar Orden" 
          icon="pi pi-check" 
          class="p-button-success" 
          @click="submitOrder"
          :loading="submitting"
          :disabled="!isFormValid || submitting"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
  .form-container {
    max-width: 800px;
    margin: 2rem auto;
    padding: 2rem;
    background-color: #1a1a1a;
    border-radius: 10px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  }
  
  .form-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid #333;
  }

  .form-header h1 {
    color: #fff;
    margin: 0;
  }

  .form-content {
    background-color: #242424;
    padding: 2rem;
    border-radius: 8px;
  }

  .p-field {
    margin-bottom: 1.5rem;
  }

  label {
    display: block;
    margin-bottom: 0.5rem;
    color: #facc15;
    font-weight: bold;
  }

  .p-inputtext,
  .p-dropdown,
  .p-inputnumber,
  .p-inputtextarea,
  .p-datepicker {
    width: 100%;
    background-color: #333 !important;
    border: 1px solid #444 !important;
    color: #fff !important;
  }

  .p-dropdown .p-dropdown-label {
    background: transparent !important;
  }

  .p-dropdown-panel {
    background: #333 !important;
    border: 1px solid #444 !important;
  }

  .p-dropdown-item {
    color: #fff !important;
  }

  .p-dropdown-item:hover {
    background: #444 !important;
  }

  .p-datepicker {
    background: #333 !important;
  }

  .p-datepicker-header {
    background: #1a1a1a !important;
    border-bottom: 1px solid #444 !important;
  }

  .p-datepicker-calendar th {
    color: #facc15 !important;
  }

  .p-datepicker-calendar td > span {
    color: #fff !important;
  }

  .p-datepicker-calendar td > span.p-highlight {
    background: #facc15 !important;
    color: #000 !important;
  }

  .p-button {
    background-color: #facc15;
    color: #000;
    border: none;
    padding: 0.75rem 1.5rem;
    font-weight: bold;
    transition: all 0.3s ease;
  }

  .p-button:hover:not(:disabled) {
    background-color: #e6b800;
  }

  .form-actions {
    display: flex;
    justify-content: flex-end;
    margin-top: 2rem;
  }

  .p-button.p-button-text {
    color:rgb(0, 0, 0);
  }

  .p-button.p-button-text:hover {
    background-color: rgba(250, 204, 21, 0.1);
  }
  
  .p-error {
    color: #f87171;
    font-size: 0.875rem;
    margin-top: 0.25rem;
    display: block;
  }
  
  .p-invalid {
    border-color: #f87171 !important;
  }
  
  .p-button:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
</style>
