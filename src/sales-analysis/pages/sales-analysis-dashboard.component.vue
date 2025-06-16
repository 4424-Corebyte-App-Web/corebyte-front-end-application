<script>
import { ref } from "vue";
import SideNavbar from "../../public/components/side-navbar.component.vue";
import LanguageSwitcher from "../../public/components/language-switcher.component.vue";
import { SalesAnalysisService } from "../services/sales-analysis.service";

export default {
  name: "sales-analysis-dashboard",
  title: "Análisis de venta",
  components: { SideNavbar, LanguageSwitcher },
  data() {
    return {
      salesAnalysisService: new SalesAnalysisService(),
      loading: false,
      error: null,
      products: [],
      mayorRotacionData: {
        labels: ['Verde', 'Rojo', 'Morado'],
        datasets: [
          {
            data: [40, 70, 10],
            backgroundColor: ['#4CAF50', '#F44336', '#9C27B0'],
            borderWidth: 0
          }
        ]
      },
      menorRotacionData: {
        labels: ['Verde', 'Rojo', 'Morado'],
        datasets: [
          {
            data: [50, 40, 10],
            backgroundColor: ['#4CAF50', '#F44336', '#9C27B0'],
            borderWidth: 0
          }
        ]
      },
      smallChartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            enabled: true
          }
        },
        scales: {
          x: {
            grid: {
              display: false,
              drawBorder: false
            },
            ticks: {
              color: '#fff'
            }
          },
          y: {
            display: false,
            beginAtZero: true,
            max: 100,
            grid: {
              display: false
            }
          }
        }
      },
      sortKey: null,
      sortOptions: [
        { label: 'Nombre A-Z', field: 'nombre', order: 1 },
        { label: 'Nombre Z-A', field: 'nombre', order: -1 },
        { label: 'Stock (Menor a Mayor)', field: 'stock', order: 1 },
        { label: 'Stock (Mayor a Menor)', field: 'stock', order: -1 }
      ]
    };
  },
  created() {
    this.loadSalesAnalysis();
  },
  methods: {
    async loadSalesAnalysis() {
      this.loading = true;
      this.error = null;

      try {
        const response = await this.salesAnalysisService.getSalesAnalysis();
        const productosData = Array.isArray(response) && response.length > 0 ? response[0] : [];

        if (!Array.isArray(productosData)) {
          throw new Error('Formato de datos inesperado');
        }

        this.products = productosData.map(item => ({
          id: item.id,
          product: item.product || 'Sin nombre',
          type: item.type || 'Sin tipo',
          expirationDate: item.expirationDate,
          currentStock: Number(item.currentStock) || 0,
          stockMinimum: Number(item.stockMinimum) || 0,
          price: Number(item.price) || 0
        }));

        if (this.products.length === 0) {

          this.error = 'No se encontraron datos de productos';
        } else {
          this.updateChartData();
        }
      } catch (error) {

        this.error = 'No se pudieron cargar los datos. Por favor, intente nuevamente.';
      } finally {
        this.loading = false;
      }
    },

    updateChartData() {
      if (!this.products || this.products.length === 0) {

        return;
      }
      const totalProductos = this.products.length;
      const bajoStock = this.products.filter(p => p.currentStock <= p.stockMinimum).length;
      const porVencer = this.products.filter(p => {
        try {
          if (!p.expirationDate) return false;
          const fechaVencimiento = new Date(p.expirationDate);
          const hoy = new Date();
          const diffTime = fechaVencimiento - hoy;
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
          return diffDays <= 30 && diffDays >= 0;
        } catch (e) {

          return false;
        }
      }).length;

      const porcentajeBajoStock = Math.round((bajoStock / totalProductos) * 100) || 0;
      const porcentajePorVencer = Math.round((porVencer / totalProductos) * 100) || 0;
      const porcentajeRestante = 100 - (porcentajeBajoStock + porcentajePorVencer);

      this.mayorRotacionData = {
        ...this.mayorRotacionData,
        datasets: [{
          ...this.mayorRotacionData.datasets[0],
          data: [porcentajeBajoStock, porcentajePorVencer, porcentajeRestante]
        }]
      };

      this.menorRotacionData = {
        ...this.menorRotacionData,
        datasets: [{
          ...this.menorRotacionData.datasets[0],
          data: [50, 40, 10]
        }]
      };
    },

    onSortChange() {
      if (this.sortKey) {
        this.products = [...this.products].sort((a, b) => {
          let value1 = a[this.sortKey.field];
          let value2 = b[this.sortKey.field];

          if (typeof value1 === 'string') value1 = value1.toLowerCase();
          if (typeof value2 === 'string') value2 = value2.toLowerCase();

          if (value1 < value2) return -1 * this.sortKey.order;
          if (value1 > value2) return 1 * this.sortKey.order;
          return 0;
        });
      }
    }
  }
};
</script>

<template>
  <div class="dashboard-container">
    <div class="header">
      <h1>{{ $t('salesAnalysis.title') }}</h1>
      <language-switcher class="language-switcher"/>
    </div>

    <div v-if="loading" class="loading-overlay">
      <div class="loading-spinner"></div>
      <p>Cargando datos...</p>
    </div>

    <div v-if="error" class="error-message">
      {{ error }}
    </div>

    <div v-else class="grid">
      <div class="card">
        <div class="card-header">Mayor rotación</div>
        <div class="chart-container">
          <Chart type="bar" :data="mayorRotacionData" :options="smallChartOptions" :style="{ height: '250px', width: '100%' }" />
        </div>
      </div>

      <div class="card">
        <div class="card-header">Menor rotación</div>
        <div class="chart-container">
          <Chart type="bar" :data="menorRotacionData" :options="smallChartOptions" />
        </div>
      </div>

      <div class="card full-width">
        <div class="card-header">Riesgo de venta</div>
        <div class="table-container">
          <div class="table-header">
            <h3>Productos</h3>
            <pv-dropdown
                v-model="sortKey"
                :options="sortOptions"
                option-label="label"
                @change="onSortChange"
                placeholder="Ordenar por"
                class="sort-dropdown"
            />
          </div>
          <div class="table-wrapper">
            <table v-if="products.length > 0">
              <thead>
              <tr>
                <th>Nombre</th>
                <th>Tipo</th>
                <th>Vencimiento</th>
                <th>Stock Actual</th>
                <th>Mínimo</th>
                <th>Precio</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="product in products" :key="product.id">
                <td>{{ product.product || 'N/A' }}</td>
                <td>{{ product.type || 'N/A' }}</td>
                <td>{{ product.expirationDate ? new Date(product.expirationDate).toLocaleDateString() : 'N/A' }}</td>
                <td :class="{ 'low-stock': (product.currentStock || 0) <= (product.stockMinimum || 0) }">
                  {{ product.currentStock || 0 }}
                </td>
                <td>{{ product.stockMinimum || 0 }}</td>
                <td>${{ (product.price || 0).toFixed(2) }}</td>
              </tr>
              </tbody>
            </table>
            <div v-else class="no-data">
              No hay datos disponibles
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  color: white;
}

.loading-spinner {
  width: 50px;
  height: 50px;
  border: 5px solid #f3f3f3;
  border-top: 5px solid #3498db;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 1rem;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.error-message {
  background-color: #ffebee;
  color: #c62828;
  padding: 1rem;
  border-radius: 4px;
  margin: 1rem 0;
  border-left: 4px solid #c62828;
}

.no-data {
  text-align: center;
  padding: 2rem;
  color: #9e9e9e;
  font-style: italic;
}

.dashboard-container {
  padding: 1.5rem;
  color: #e0e0e0;
  min-height: 100vh;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

h1 {
  color: #ffffff;
  margin: 0;
  font-size: 1.75rem;
  font-weight: 500;
}

.language-switcher {
  margin-left: auto;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-bottom: 1.5rem;
}

.card {
  background: #1e1e1e;
  border-radius: 12px;
  padding: 1.25rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
}

.card.full-width {
  grid-column: 1 / -1;
}

.card-header {
  font-size: 1.25rem;
  font-weight: 500;
  color: #ffffff;
  margin-bottom: 1.25rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid #333;
}

.chart-container {
  height: 250px;
  position: relative;
  flex-grow: 1;
}

.table-container {
  width: 100%;
}

.table-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.table-header h3 {
  margin: 0;
  font-size: 1rem;
  font-weight: 500;
  color: #e0e0e0;
}

.sort-dropdown {
  background: #2d2d2d;
  border: 1px solid #444;
  color: #e0e0e0;
  border-radius: 6px;
  padding: 0.5rem 1rem;
}

.table-wrapper {
  width: 100%;
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.9rem;
}

th, td {
  padding: 0.75rem 1rem;
  text-align: left;
  border-bottom: 1px solid #333;
}

th {
  color: #a0a0a0;
  font-weight: 500;
  text-transform: uppercase;
  font-size: 0.75rem;
  letter-spacing: 0.5px;
}

tr:hover {
  background-color: #2a2a2a;
}

.low-stock {
  color: #ef5350;
  font-weight: 500;
}

@media (max-width: 768px) {
  .grid {
    grid-template-columns: 1fr;
  }

  .card {
    width: 100%;
  }
}

::-webkit-scrollbar {
  height: 8px;
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #2d2d2d;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb {
  background: #555;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #777;
}
</style>
