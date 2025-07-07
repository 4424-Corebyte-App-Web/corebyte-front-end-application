<script>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { getAllBatches } from "../services/batch-management.service";
import LanguageSwitcher from "../../public/components/language-switcher.component.vue";

export default {
  name: "BatchManagementFermentationStage",

  components: { LanguageSwitcher },

  data() {
    return {
      loading: true,
      error: "",
      batchManagement: [],
      stageNames: {
        fermentation: "FermentationStage",
        pressing: "PressingStage",
        clarification: "ClarificationStage",
        aging: "AgingStage",
        bottled: "BottledStage",
      },
    };
  },

  created() {
    this.fetchBatches();
  },
  methods: {
    async fetchBatches() {
      this.loading = true;
      this.error = "";

      try {
        const response = await getAllBatches();
        this.batchManagement = response;
      } catch (err) {
        this.error =
            "Error al cargar los lotes: " +
            (err.message || "No se pudieron cargar los lotes");
        console.error("Error fetching batches:", err);
      } finally {
        this.loading = false;
      }
    },

    navigateTo(stage) {
      const routeName = this.stageNames[stage];
      if (routeName) {
        this.$router.push({ name: routeName });
      }
    },

    viewBatchDetails(batchId) {
      this.$router.push({
        path: "/batch-management/fermentation",
        query: { id: batchId },
      });
    },

    formatDate(dateString) {
      return dateString ? new Date(dateString).toLocaleDateString() : "N/A";
    },

    goToRegister() {
      this.$router.push("/batch-management/fermentation/register");
    },
  },
};
</script>
<template>
  <div class="batch-overview-container">
    <h1>{{ $t("batch.title") }}</h1>
    <LanguageSwitcher />
    <div class="stage-navigation">
      <div class="stage-nav-item" @click="navigateTo('fermentation')">
        <div class="stage-icon">
          <i class="pi pi-cog"></i>
        </div>
        <div class="stage-name">{{ $t("batch.texts.Fermentation") }}</div>
      </div>
      <div class="stage-nav-item" @click="navigateTo('pressing')">
        <div class="stage-icon">
          <i class="pi pi-filter"></i>
        </div>
        <div class="stage-name">{{ $t("batch.texts.pressing") }}</div>
      </div>
      <div class="stage-nav-item" @click="navigateTo('clarification')">
        <div class="stage-icon">
          <i class="pi pi-filter-fill"></i>
        </div>
        <div class="stage-name">{{ $t("batch.texts.clarification") }}</div>
      </div>
      <div class="stage-nav-item" @click="navigateTo('aging')">
        <div class="stage-icon">
          <i class="pi pi-hourglass"></i>
        </div>
        <div class="stage-name">{{ $t("batch.texts.aging") }}</div>
      </div>
      <div class="stage-nav-item" @click="navigateTo('bottled')">
        <div class="stage-icon">
          <i class="pi pi-inbox"></i>
        </div>
        <div class="stage-name">{{ $t("batch.texts.bottled") }}</div>
      </div>
    </div>

    <div class="batch-summary">
      <div class="batch-summary-header">
        <h2>{{ $t("batch.status") }}</h2>
        <button @click="goToRegister" class="new-batch-button">
          <i class="pi pi-plus"></i> {{ $t("batch.texts.register") }}
        </button>
      </div>
      <div v-if="loading" class="loading">Cargando lotes...</div>

      <template v-else>
        <div v-if="error" class="error">Error: {{ error }}</div>
        <div v-else-if="batchManagement.length === 0" class="no-batches">
          No se encontraron lotes activos.
        </div>
        <div v-else class="batches-grid">
          <div
              v-for="batch in batchManagement"
              :key="batch.id"
              class="batch-card"
          >
            <div class="batch-header">
              <h3>{{ batch.name }}</h3>
            </div>
            <div class="batch-details">
              <p>
                <strong>{{ $t("batch.tables.type") }}:</strong> {{ batch.type }}
              </p>
              <p>
                <strong>{{ $t("batch.tables.status") }}:</strong>
                {{ batch.status }}
              </p>
              <p>
                <strong>{{ $t("batch.tables.temperature") }}:</strong>
                {{ batch.temperature }}
              </p>
            </div>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>
<style scoped>
.batch-overview-container {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

h1 {
  margin-bottom: 2rem;
  text-align: center;
  color: #ffffff;
}

.stage-navigation {
  display: flex;
  justify-content: space-between;
  margin-bottom: 3rem;
  flex-wrap: wrap;
}

.stage-nav-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 18%;
  min-width: 150px;
  padding: 1.5rem;
  border-radius: 8px;
  background-color: #f8f8f8;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
  margin-bottom: 1rem;
}

.stage-nav-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}

.stage-icon {
  font-size: 2rem;
  margin-bottom: 1rem;
  color: #242424;
}

.stage-name {
  font-weight: bold;
  color: #242424;
}

.batch-summary {
  margin-top: 2rem;
}

.batch-summary-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.new-batch-button {
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 0.6rem 1.2rem;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  transition: background-color 0.2s;
}

.new-batch-button:hover {
  background-color: #45a049;
}

.new-batch-button i {
  font-size: 1rem;
}

.batches-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 1.5rem;
}

.batch-card {
  border: 1px solid #eaeaea;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  transition: transform 0.2s;
}

.batch-card:hover {
  transform: translateY(-5px);
}

.batch-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  border-bottom: 1px solid #eaeaea;
  padding-bottom: 0.5rem;
}

.batch-stage {
  background-color: #e9f7fe;
  color: #0288d1;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.8rem;
  font-weight: bold;
}

.batch-details {
  margin-bottom: 1.5rem;
}

.batch-details p {
  margin: 0.5rem 0;
}

.status-active {
  color: #43a047;
}

.status-paused {
  color: #fb8c00;
}

.status-completed {
  color: #2196f3;
}

.status-error {
  color: #e53935;
}

.batch-actions {
  text-align: right;
}

.view-button {
  background-color: #242424;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.view-button:hover {
  background-color: #333;
}

.loading,
.error,
.no-batches {
  text-align: center;
  padding: 2rem;
  border-radius: 8px;
  background-color: #f8f8f8;
}

.error {
  color: #e53935;
}
</style>