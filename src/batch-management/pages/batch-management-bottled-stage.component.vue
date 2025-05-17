<template>
  <div class="batch-stage-container">
    <h1>Bottled Stage</h1>
    <div class="stage-content">
      <p>This is the Bottled Stage view. Here you can manage all bottled batches.</p>
      
      <!-- Sección de estadísticas -->
      <div class="stats-container">
        <div class="stat-card">
          <h3>Total Bottled</h3>
          <p class="stat-value">0</p>
        </div>
        <div class="stat-card">
          <h3>Ready for Shipment</h3>
          <p class="stat-value">0</p>
        </div>
        <div class="stat-card">
          <h3>Shipped</h3>
          <p class="stat-value">0</p>
        </div>
      </div>

      <!-- Lista de lotes embotellados -->
      <div class="batches-list">
        <h2>Bottled Batches</h2>
        <div class="table-responsive">
          <table class="batch-table">
            <thead>
              <tr>
                <th>Batch ID</th>
                <th>Bottling Date</th>
                <th>Quantity</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <!-- Datos de ejemplo -->
              <tr>
                <td>BATCH-001</td>
                <td>2025-05-15</td>
                <td>1000</td>
                <td><span class="status-badge ready">Ready</span></td>
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
  name: 'BottledStage',
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

.status-badge.ready {
  background-color: #d4edda;
  color: #155724;
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
