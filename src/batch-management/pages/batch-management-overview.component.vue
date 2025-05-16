<template>
  <div class="batch-overview-container">
    <h1>Batch Management Overview</h1>
    
    <div class="stage-navigation">
      <div class="stage-nav-item" @click="navigateTo('fermentation')">
        <div class="stage-icon">
          <i class="pi pi-cog"></i>
        </div>
        <div class="stage-name">Fermentation</div>
      </div>
      <div class="stage-nav-item" @click="navigateTo('pressing')">
        <div class="stage-icon">
          <i class="pi pi-filter"></i>
        </div>
        <div class="stage-name">Pressing</div>
      </div>
      <div class="stage-nav-item" @click="navigateTo('clarification')">
        <div class="stage-icon">
          <i class="pi pi-filter-fill"></i>
        </div>
        <div class="stage-name">Clarification</div>
      </div>
      <div class="stage-nav-item" @click="navigateTo('aging')">
        <div class="stage-icon">
          <i class="pi pi-hourglass"></i>
        </div>
        <div class="stage-name">Aging</div>
      </div>
      <div class="stage-nav-item" @click="navigateTo('bottled')">
        <div class="stage-icon">
          <i class="pi pi-inbox"></i>
        </div>
        <div class="stage-name">Bottled</div>
      </div>
    </div>

    <div class="batch-summary">
      <h2>Active Batches</h2>

      <div v-if="loading" class="loading">Loading batches...</div>

      <template v-else>
        <div v-if="error" class="error">Error: {{ error }}</div>
        <div v-else-if="batches.length === 0" class="no-batches">No active batches found.</div>
        <div v-else class="batches-grid">
          <div v-for="batch in batches" :key="batch.id" class="batch-card">
            <div class="batch-header">
              <h3>Batch #{{ batch.id }}</h3>
              <span class="batch-stage">{{ batch.estado || 'N/A' }}</span>
            </div>
            <div class="batch-details">
              <p><strong>Created:</strong> {{ formatDate(batch.fechaInicio) }}</p>
              <p><strong>Last Updated:</strong> {{ formatDate(batch.fechaFin) }}</p>
              <p><strong>Volume:</strong> {{ batch.volumenExtraido ?? 'N/A' }} liters</p>
              <p><strong>Status:</strong> <span :class="'status-' + (batch.estado?.toLowerCase() || 'unknown')">{{ batch.estado || 'Unknown' }}</span></p>
            </div>
            <div class="batch-actions">
              <button @click="viewBatchDetails(batch.id)" class="view-button">View Details</button>
            </div>
          </div>
        </div>
      </template>
    </div>

  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

export default {
  name: 'BatchManagementOverview',
  setup() {
    const router = useRouter();
    const batches = ref([]);
    const loading = ref(true);
    const error = ref(null);

    const fetchBatches = async () => {
      try {
        loading.value = true;
        const response = await axios.get('http://localhost:3001/batches');
        batches.value = response.data;
      } catch (err) {
        console.error('Error fetching batches:', err);
        error.value = err.message || 'Failed to load batches';
      } finally {
        loading.value = false;
      }
    };

    const navigateTo = (stage) => {
      router.push(`/batch-management/${stage}`);
    };

    const viewBatchDetails = (batchId) => {
      // Redirect to batch details view
      router.push(`/batch-management/fermentation?id=${batchId}`);
    };

    const formatDate = (dateString) => {
      if (!dateString) return 'N/A';
      return new Date(dateString).toLocaleDateString();
    };

    onMounted(() => {
      fetchBatches();
    });

    return {
      batches,
      loading,
      error,
      navigateTo,
      viewBatchDetails,
      formatDate
    };
  }
};
</script>

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
  background-color: white;
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

.loading, .error, .no-batches {
  text-align: center;
  padding: 2rem;
  border-radius: 8px;
  background-color: #f8f8f8;
}

.error {
  color: #e53935;
}
</style>

