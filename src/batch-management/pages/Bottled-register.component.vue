<script>
import axios from "axios";

export default {
  name: "BottledRegister",
  data() {
    return {
      batch: {
        name: "",
        type: "Destilado",
        status: "Fermentación en proceso",
        temperature: "",
        amount: "mediana",
        total: 0,
        date: new Date().toISOString().split("T")[0],
        NLote: `#${Math.floor(100 + Math.random() * 900)}`,
      },
      loading: false,
      validationErrors: {},
      amountOptions: [
        { label: "Pequeña", value: "pequeña" },
        { label: "Mediana", value: "mediana" },
        { label: "Grande", value: "grande" },
      ],
    };
  },
  computed: {
    isFormValid() {
      return (
          this.batch.name &&
          this.batch.type &&
          this.batch.status &&
          this.batch.temperature !== ""
      );
    },
  },
  methods: {
    cancel() {
      this.$router.push({ name: "BottledStage" });
    },

    validateForm() {
      this.validationErrors = {};
      let isValid = true;

      if (!this.batch.name) {
        this.validationErrors.name = "El nombre del lote es requerido";
        isValid = false;
      }

      if (!this.batch.type) {
        this.validationErrors.type = "El tipo de lote es requerido";
        isValid = false;
      }
      if (!this.batch.status) {
        this.validationErrors.status = "El estado del lote es requerido";
        isValid = false;
      }

      if (this.batch.temperature === "" || isNaN(this.batch.temperature)) {
        this.validationErrors.temperature =
            "La temperatura es requerida y debe ser un número";
        isValid = false;
      }

      return isValid;
    },
    async saveBatch() {
      if (!this.validateForm()) {
        this.showToast(
            "error",
            "Error de validación",
            "Por favor complete todos los campos requeridos"
        );
        return;
      }

      this.loading = true;

      try {
        const batchData = {
          id: ((Date.now() % 9000) + 1000).toString(),
          name: this.batch.name,
          type: this.batch.type,
          status: this.batch.status,
          temperature: `${this.batch.temperature} C°`,
          amount: this.batch.amount,
          total: parseInt(this.batch.total) || 0,
          date: this.batch.date,
          NLote: this.batch.NLote,
        };

        console.log("Sending batch data to batchManagement:", batchData);

        const response = await axios.post(
            "http://localhost:3000/batchManagement",
            batchData
        );

        console.log("Server response:", response.data);

        this.showToast(
            "success",
            "Éxito",
            "Lote de fermentación guardado correctamente"
        );
        this.$router.push({ name: "FermentationStage" });
      } catch (error) {
        console.error("Error al guardar el lote:", error);
        if (error.response) {
          console.error("Error response data:", error.response.data);
          console.error("Error status:", error.response.status);
        }
        this.showToast(
            "error",
            "Error",
            "No se pudo guardar el lote. Por favor, intente nuevamente."
        );
      } finally {
        this.loading = false;
      }
    },

    getBatchSize(quantity) {
      if (quantity <= 30) return "pequeña";
      if (quantity <= 70) return "mediana";
      return "grande";
    },

    showToast(severity, summary, detail) {
      this.$toast.add({
        severity: severity,
        summary: summary,
        detail: detail,
        life: 3000,
      });
    },
  },
};
</script>
<template>
  <div class="form-container">
    <div class="form-header">
      <h1>Nuevo Registro de Embotellado</h1>
      <pv-button
          icon="pi pi-arrow-left"
          class="p-button-text p-button-rounded p-button-secondary"
          @click="cancel"
          label="Volver"
      />
    </div>

    <div class="p-fluid form-content">
      <h2 class="section-title">Información del lote</h2>

      <div class="p-field">
        <label for="batchName">Nombre del lote</label>
        <pv-inputtext
            id="batchName"
            v-model="batch.name"
            class="w-full"
            placeholder="Ingrese el nombre del lote"
            required
        />
      </div>

      <div class="p-field">
        <label for="batchType">Tipo de vino</label>
        <pv-inputtext
            id="batchType"
            v-model="batch.type"
            class="w-full"
            placeholder="Ingrese el tipo de vino"
            required
        />
      </div>

      <div class="p-field">
        <label for="batchTemperature">Temperatura (°C)</label>
        <pv-inputnumber
            id="batchTemperature"
            v-model="batch.temperature"
            class="w-full"
            placeholder="Ej: 16"
            suffix=" °C"
            :min="0"
            :max="30"
            required
        />
      </div>

      <div class="p-field">
        <label for="batchAmount">Tamaño del lote</label>
        <pv-inputtext
            id="batchAmount"
            v-model="batch.amount"
            class="w-full"
            placeholder="Ingrese el tamaño del lote"
            required
        />
      </div>

      <div class="p-field">
        <label for="batchTotal">Cantidad (litros)</label>
        <pv-inputnumber
            id="batchTotal"
            v-model="batch.total"
            class="w-full"
            placeholder="Ingrese la cantidad en litros"
            :min="0"
            required
        />
      </div>

      <div class="p-field">
        <label for="batchDate">Fecha</label>
        <pv-datepicker
            id="batchDate"
            v-model="batch.date"
            class="w-full"
            dateFormat="yy-mm-dd"
            showIcon
            required
        />
      </div>

      <div class="p-field">
        <label for="batchNumber">N° de lote</label>
        <pv-inputtext
            id="batchNumber"
            v-model="batch.NLote"
            class="w-full"
            placeholder="Ej: #123"
            required
        />
      </div>
      <div class="form-actions">
        <pv-button label="Cancelar" class="p-button-text" @click="cancel" />
        <pv-button
            label="Guardar"
            @click="saveBatch"
            :disabled="!isFormValid"
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
  font-size: 1.75rem;
}

.form-content {
  background-color: #242424;
  padding: 2rem;
  border-radius: 8px;
}

.section-title {
  color: #facc15;
  margin-top: 0;
  margin-bottom: 1.5rem;
  font-size: 1.25rem;
  border-bottom: 1px solid #333;
  padding-bottom: 0.5rem;
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
.p-inputnumber,
.file-input {
  width: 100%;
  background-color: #333 !important;
  border: 1px solid #444 !important;
  color: #fff !important;
  padding: 0.5rem 0.75rem;
  border-radius: 4px;
}

.file-input {
  padding: 0.5rem;
  cursor: pointer;
}

.file-input::file-selector-button {
  background-color: #444;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  margin-right: 1rem;
  border-radius: 4px;
  cursor: pointer;
}

.file-input:hover::file-selector-button {
  background-color: #555;
}

.p-button {
  background-color: #facc15;
  color: #000;
  border: none;
  padding: 0.75rem 1.5rem;
  font-weight: bold;
  transition: all 0.3s ease;
  margin-left: 0.5rem;
}

.p-button:hover:not(:disabled) {
  background-color: #e6b800;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  margin-top: 2rem;
  padding-top: 1rem;
  border-top: 1px solid #333;
}

.p-button.p-button-text {
  color: #facc15 !important;
  background: transparent !important;
}

.p-button.p-button-text:hover {
  background-color: rgba(250, 204, 21, 0.1) !important;
}

.p-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.p-inputtext:focus,
.p-inputnumber:focus,
.file-input:focus {
  outline: none;
  box-shadow: 0 0 0 0.2rem rgba(250, 204, 21, 0.25);
  border-color: #facc15 !important;
}
</style>
