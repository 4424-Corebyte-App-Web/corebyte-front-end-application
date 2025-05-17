<template>
  <div class="batch-stage-container">
    <h1>Clarification Stage</h1>
    <div class="stage-content">
      <p>This is the Clarification Stage view. Here you can manage all batches in the clarification process.</p>
      
      <!-- Sección de estadísticas -->
      <div class="stats-container">
        <div class="stat-card">
          <h3>Total Clarifying</h3>
          <p class="stat-value">0</p>
        </div>
        <div class="stat-card">
          <h3>Completed Today</h3>
          <p class="stat-value">0</p>
        </div>
        <div class="stat-card">
          <h3>Ready for Aging</h3>
          <p class="stat-value">0</p>
        </div>
      </div>

      <!-- Lista de lotes en clarificación -->
      <div class="batches-list">
        <h2>Clarification Batches</h2>
        <div class="table-responsive">
          <table class="batch-table">
            <thead>
              <tr>
                <th>Batch ID</th>
                <th>Start Time</th>
                <th>Duration</th>
                <th>Clarification Method</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <!-- Datos de ejemplo -->
              <tr>
                <td>BATCH-001</td>
                <td>2025-05-16 09:00</td>
                <td>4 hours</td>
                <td>Filtration</td>
                <td><span class="status-badge in-progress">In Progress</span></td>
                <td>
                  <button class="btn btn-sm btn-primary">View</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ClarificationStage',
  data() {
    return {
      // Datos del componente
    };
  },
  methods: {
    // Métodos del componente
  },
  created() {
    // Lógica al crear el componente
  }
};
</script>

<style scoped>
.batch-stage-container {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

h1 {
  color: #2c3e50;
  margin-bottom: 20px;
}

.stats-container {
  display: flex;
  gap: 20px;
  margin: 20px 0;
}

.stat-card {
  flex: 1;
  background: #fff;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.stat-value {
  font-size: 24px;
  font-weight: bold;
  color: #3498db;
  margin: 10px 0 0;
}

.batches-list {
  margin-top: 30px;
}

.table-responsive {
  overflow-x: auto;
}

.batch-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;
}

.batch-table th,
.batch-table td {
  padding: 12px 15px;
  text-align: left;
  border-bottom: 1px solid #e0e0e0;
}

.batch-table th {
  background-color: #f8f9fa;
  font-weight: 600;
}

.status-badge {
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
}

.status-badge.in-progress {
  background-color: #cce5ff;
  color: #004085;
}

.btn {
  padding: 6px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.2s;
}

.btn-sm {
  padding: 4px 8px;
  font-size: 12px;
}

.btn-primary {
  background-color: #3498db;
  color: white;
}

.btn-primary:hover {
  background-color: #2980b9;
}
</style>
