<script>
import { Replenishment } from "../model/replenishment.entity.js";
import { ReplenishmentApiService } from "../services/replenishment-api.service.js";
import LanguageSwitcher from "../../public/components/language-switcher.component.vue";

export default {
  name: "register-replenishment",
  components: {
    LanguageSwitcher,
  },
  data() {
    return {
      replenishment: new Replenishment({
        id: "",
        name: "",
        type: "",
        date: "",
        stockActual: 0,
        stockMinimo: 0,
        price: 0,
      }),
      replenishmentApiService: new ReplenishmentApiService("replenishment"),
    };
  },
  methods: {
    registerReplenishment() {
      this.replenishmentApiService
        .createResource(this.replenishment)
        .then(() => {
          alert("Replenishment registered successfully.");
          // Reiniciar el formulario
          this.replenishment = new Replenishment({});
        })
        .catch((error) => {
          console.error("Error al registrar el replenishment", error);
          alert("Hubo un error al registrar el replenishment.");
        });
    },
  },
};
</script>

<template>
  <div class="form-container">
    <h2>Register Replenishment</h2>

    <form @submit.prevent="registerReplenishment">
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
        <label>Current Stock:</label>
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

      <button type="submit" class="submit-btn">Register</button>
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
