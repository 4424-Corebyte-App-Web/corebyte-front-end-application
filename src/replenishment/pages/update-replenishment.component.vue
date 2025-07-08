<script>
import { Replenishment } from "../model/replenishment.entity.js";
import { ReplenishmentApiService } from "../services/replenishment-api.service.js";
import LanguageSwitcher from "../../public/components/language-switcher.component.vue";

export default {
  name: "update-replenishment",
  components: {
    LanguageSwitcher,
  },
  data() {
    return {
      productId: '',
      replenishment: new Replenishment({
        id: "",
        name: "",
        type: "",
        date: "",
        stockActual: 0,
        stockMinimo: 0,
        price: 0,
      }),
      loading: false,
      searchLoading: false,
      replenishmentApiService: new ReplenishmentApiService("replenishment"),
    };
  },
  methods: {
    fetchProduct() {
      if (!this.productId) {
        alert('Por favor ingrese un ID de producto');
        return;
      }
      
      this.searchLoading = true;
      this.replenishmentApiService.getResourceById(this.productId)
        .then(response => {
          this.replenishment = new Replenishment(response.data);
        })
        .catch(error => {
          alert('No se pudo encontrar el producto con el ID proporcionado');
          this.replenishment = new Replenishment({
            id: this.productId,
            name: "",
            type: "",
            date: "",
            stockActual: 0,
            stockMinimo: 0,
            price: 0,
          });
        })
        .finally(() => {
          this.searchLoading = false;
        });
    },
    
    updateReplenishment() {
      if (!this.productId) {
        alert('Por favor ingrese un ID de producto');
        return;
      }
      
      try {
        // Prepare the data in the format expected by the API
        const updateData = {
          id: Number(this.productId),
          name: String(this.replenishment.name || '').trim(),
          type: String(this.replenishment.type || '').trim(),
          date: this.replenishment.date || new Date().toISOString().split('T')[0],
          stockActual: Number(this.replenishment.stockActual) || 0,
          stockMinimo: Number(this.replenishment.stockMinimo) || 0,
          price: Number(parseFloat(this.replenishment.price || 0).toFixed(2)),
          orderNumber: String(this.replenishment.orderNumber || '').trim() || `ORD-${Date.now()}` // Add order number with a default value if empty
        };
        
        // Validate required fields
        if (!updateData.name) {
          throw new Error('El nombre es requerido');
        }
        if (!updateData.type) {
          throw new Error('El tipo es requerido');
        }
        if (isNaN(updateData.stockActual) || updateData.stockActual < 0) {
          throw new Error('El stock actual debe ser un número positivo');
        }
        if (isNaN(updateData.stockMinimo) || updateData.stockMinimo < 0) {
          throw new Error('El stock mínimo debe ser un número positivo');
        }
        if (isNaN(updateData.price) || updateData.price < 0) {
          throw new Error('El precio debe ser un número positivo');
        }
        
        this.loading = true;
        this.replenishmentApiService
          .updateResource(this.productId, updateData)
          .then((response) => {
            if (response && response.data) {
              alert("Producto actualizado exitosamente");
              this.$router.push('/replenishment');
            } else {
              throw new Error('No data in response');
            }
          })
          .catch((error) => {
            if (error.response?.data) {
              // Handle validation errors
              if (error.response.data.errors) {
                const errorMessages = Object.entries(error.response.data.errors)
                  .map(([field, errors]) => `${field}: ${Array.isArray(errors) ? errors.join(', ') : errors}`)
                  .join('\n');
                alert(`Error de validación:\n${errorMessages}`);
              } 
              // Handle other error formats
              else if (error.response.data.title || error.response.data.detail) {
                alert(`${error.response.data.title || 'Error'}: ${error.response.data.detail || 'Error desconocido'}`);
              } else {
                alert(`Error del servidor: ${JSON.stringify(error.response.data)}`);
              }
            } else {
              alert("Error de conexión. Por favor, intente nuevamente.");
            }
          })
          .finally(() => {
            this.loading = false;
          });
      } catch (error) {
        alert('Error inesperado al procesar la solicitud');
        this.loading = false;
      }
    },
  },
};
</script>

<template>
  <div class="form-container">
    <h2>Actualizar Producto</h2>    
    <div class="search-section">
      <div class="search-input-group">
        <input 
          type="text" 
          v-model="productId" 
          placeholder="Ingrese ID del producto" 
          class="search-input"
          :disabled="loading"
        />
        <button 
          type="button" 
          @click="fetchProduct" 
          class="submit-btn"
          :disabled="!productId || searchLoading"
        >
          {{ searchLoading ? 'Buscando...' : 'Buscar' }}
        </button>
      </div>
    </div>

    <div v-if="loading" class="loading">Actualizando producto...</div>
    <div v-else-if="searchLoading" class="loading">Buscando producto...</div>

    <form @submit.prevent="updateReplenishment" v-if="productId">
      <div class="form-group">
        <label>Name:</label>
        <input v-model="replenishment.name" required type="text" />
      </div>

      <div class="form-group">
        <label>Type:</label>
        <input v-model="replenishment.type" required type="text" />
      </div>

      <div class="form-group">
        <label>Expiration Date:</label>
        <input v-model="replenishment.date" required type="date" />
      </div>

      <div class="form-group">
        <label>Current stock:</label>
        <input
          v-model.number="replenishment.stockActual"
          required
          type="number"
        />
      </div>

      <div class="form-group">
        <label>Stock minimum:</label>
        <input
          v-model.number="replenishment.stockMinimo"
          required
          type="number"
        />
      </div>

      <div class="form-group">
        <label>Price:</label>
        <input
          v-model.number="replenishment.price"
          required
          type="number"
          step="0.01"
        />
      </div>

      <div class="form-group">
        <label>Order Number:</label>
        <input
          v-model="replenishment.orderNumber"
          type="text"
          placeholder="Enter order number"
        />
      </div>

      <button type="submit" class="submit-btn">Update</button>
    </form>
  </div>
</template>

<style scoped>
.form-container {
  background-color: #1a1a1a;
  color: white;
  padding: 2rem;
  border-radius: 10px;
  max-width: 500px;
  margin: 0 auto;
}

h2 {
  margin-bottom: 1.5rem;
  text-align: center;
}

.form-group {
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column;
}

label {
  margin-bottom: 0.5rem;
  font-weight: bold;
}

input {
  padding: 0.5rem;
  border-radius: 6px;
  border: none;
  background-color: #333;
  color: white;
}

.submit-btn {
  margin-top: 1rem;
  padding: 0.7rem;
  background-color: transparent;
  border: 1px solid #f5b301;
  color: white;
  border-radius: 20px;
  width: 100%;
  font-weight: bold;
  cursor: pointer;
}
</style>