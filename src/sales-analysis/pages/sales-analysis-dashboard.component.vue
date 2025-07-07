<script>
import { ref, onMounted, onBeforeUnmount, nextTick } from "vue";
import SideNavbar from "../../public/components/side-navbar.component.vue";
import LanguageSwitcher from "../../public/components/language-switcher.component.vue";
import { SalesAnalysisService } from "../services/sales-analysis.service";
import { Chart, registerables } from 'chart.js';

// Register Chart.js components
Chart.register(...registerables);

// Store chart instances
let higherTurnoverChart = null;
let lowerTurnoverChart = null;

export default {
  name: "sales-analysis-dashboard",
  title: "Sales Analysis Dashboard",
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
          }
        }
      },
      sortKey: null,
      sortOptions: [
        { label: 'Nombre A-Z', field: 'product', order: 1 },
        { label: 'Nombre Z-A', field: 'product', order: -1 },
        { label: 'Stock (Menor a Mayor)', field: 'stock', order: 1 },
        { label: 'Stock (Mayor a Menor)', field: 'stock', order: -1 }
      ]
    };
  },
  mounted() {
    this.loadSalesAnalysis();
  },
  
  beforeUnmount() {
    // Clean up charts when component is destroyed
    if (higherTurnoverChart) {
      higherTurnoverChart.destroy();
      higherTurnoverChart = null;
    }
    if (lowerTurnoverChart) {
      lowerTurnoverChart.destroy();
      lowerTurnoverChart = null;
    }
  },
  methods: {
    async loadSalesAnalysis() {
      this.loading = true;
      this.error = null;
      
      try {
        const salesData = await this.salesAnalysisService.getSalesAnalysis();
        
        if (!Array.isArray(salesData)) {
          throw new Error('Formato de datos inesperado: se esperaba un arreglo');
        }
        
        // Map the SalesAnalysis instances to the format expected by the component
        this.products = salesData.map(item => ({
          id: item.id,
          customerId: item.customerId,
          product: item.product || 'Sin nombre',
          type: item.type || 'Sin tipo',
          year: item.year,
          stock: Number(item.stock) || 0,
          batch: Number(item.batch) || 0
        }));
        
        // Sort by stock in descending order by default
        this.products.sort((a, b) => b.stock - a.stock);
        
        // Wait for the next tick to ensure the DOM is updated
        await nextTick();
        
        // Update charts after loading data
        this.updateCharts();
        
      } catch (error) {
        console.error('Error loading sales analysis:', error);
        this.error = 'Error al cargar el análisis de ventas';
      } finally {
        this.loading = false;
      }
    },
    
    updateCharts() {
      if (!this.products || this.products.length === 0) return;
      
      // Sort products by stock (descending for higher turnover, ascending for lower)
      const sortedByStock = [...this.products].sort((a, b) => b.stock - a.stock);
      
      // Get top 5 products for each chart
      const topProducts = sortedByStock.slice(0, 5);
      const bottomProducts = [...sortedByStock].reverse().slice(0, 5);
      
      // Destroy existing charts if they exist
      if (higherTurnoverChart) {
        higherTurnoverChart.destroy();
      }
      
      if (lowerTurnoverChart) {
        lowerTurnoverChart.destroy();
      }
      
      // Create higher turnover chart (top stocks)
      this.createChart(
        'higherTurnoverChart',
        topProducts,
        this.$t('salesAnalysis.text.higher'),
        'rgba(75, 192, 192, 0.6)'
      );
      
      // Create lower turnover chart (bottom stocks)
      this.createChart(
        'lowerTurnoverChart',
        bottomProducts,
        this.$t('salesAnalysis.text.lower'),
        'rgba(255, 99, 132, 0.6)'
      );
    },
    
    createChart(chartRef, data, label, backgroundColor) {
      const ctx = document.getElementById(chartRef);
      if (!ctx) return;
      
      const chart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: data.map(item => item.product || 'Sin nombre'),
          datasets: [{
            label: label,
            data: data.map(item => item.stock || 0),
            backgroundColor: backgroundColor,
            borderColor: backgroundColor.replace('0.6', '1'),
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: 'Stock',
                color: '#e0e0e0'
              },
              ticks: {
                color: '#e0e0e0',
                stepSize: 1
              },
              grid: {
                color: 'rgba(255, 255, 255, 0.1)'
              }
            },
            x: {
              ticks: {
                color: '#e0e0e0'
              },
              grid: {
                display: false
              }
            }
          },
          plugins: {
            legend: {
              display: true,
              position: 'top',
              labels: {
                color: '#e0e0e0',
                font: {
                  size: 14
                }
              }
            },
            tooltip: {
              callbacks: {
                label: function(context) {
                  return `Stock: ${context.raw}`;
                }
              },
              backgroundColor: 'rgba(0, 0, 0, 0.8)',
              titleColor: '#ffffff',
              bodyColor: '#e0e0e0',
              borderColor: 'rgba(255, 255, 255, 0.1)',
              borderWidth: 1,
              padding: 10,
              displayColors: false
            }
          }
        }
      });
      
      // Save chart instance
      if (chartRef === 'higherTurnoverChart') {
        higherTurnoverChart = chart;
      } else {
        lowerTurnoverChart = chart;
      }
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
      <LanguageSwitcher class="language-switcher" />
    </div>

    <div v-if="loading" class="loading-overlay">
      <div class="loading-spinner"></div>
      <p>Cargando datos...</p>
    </div>
    
    <div v-else-if="error" class="error-message">
      {{ error }}
    </div>
    
    <template v-else>
      <div class="grid">
        <!-- Higher Turnover Chart -->
        <div class="card">
          <div class="card-header">{{ $t('salesAnalysis.text.higher') }}</div>
          <div class="chart-container">
            <canvas id="higherTurnoverChart"></canvas>
          </div>
        </div>

        <!-- Lower Turnover Chart -->
        <div class="card">
          <div class="card-header">{{ $t('salesAnalysis.text.lower') }}</div>
          <div class="chart-container">
            <canvas id="lowerTurnoverChart"></canvas>
          </div>
        </div>
      </div>
      
      <div class="card full-width">
        <div class="card-header">{{ $t('salesAnalysis.saleRisk') }}</div>
        <div class="table-container">
          <div class="table-header">
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
                  <th>{{ $t('salesAnalysis.table.name') }}</th>
                  <th>{{ $t('salesAnalysis.table.type') }}</th>
                  <th>{{ $t('salesAnalysis.table.expiration') }}</th>
                  <th>{{ $t('salesAnalysis.table.current') }}</th>
                  <th>{{ $t('salesAnalysis.table.batch') }}</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="product in products" :key="product.id">
                  <td>{{ product.product || 'N/A' }}</td>
                  <td>{{ product.type || 'N/A' }}</td>
                  <td>{{ product.year ? new Date(product.year).toLocaleDateString() : 'N/A' }}</td>
                  <td :class="{ 'low-stock': (product.stock || 0) <= (product.stockMinimum || 0) }">
                    {{ product.stock || 0 }}
                  </td>
                  <td>{{ product.batch || 0 }}</td>
                </tr>
              </tbody>
            </table>
            <div v-else class="no-data">
              No hay datos disponibles
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<style scoped>
/* Layout */
.dashboard-container {
  padding: 1.5rem;
  min-height: 100vh;
  background-color: #1e1e1e;
  color: #e0e0e0;
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

/* Grid and Cards */
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-bottom: 1.5rem;
}

.card {
  background: #2d2d2d;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  display: flex;
  flex-direction: column;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

.card.full-width {
  grid-column: 1 / -1;
}

.card-header {
  background: #3a3a3a;
  padding: 1rem 1.5rem;
  font-size: 1.2rem;
  font-weight: 600;
  color: #ffffff;
  border-bottom: 1px solid #444;
}

/* Charts */
.chart-container {
  position: relative;
  height: 300px;
  width: 100%;
  padding: 1rem;
  flex-grow: 1;
}

:deep(.chartjs-render-monitor) {
  background-color: #2d2d2d;
  border-radius: 8px;
}

canvas {
  max-width: 100%;
  height: auto !important;
}

/* Loading and Error States */
.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.8);
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
  background-color: rgba(198, 40, 40, 0.1);
  color: #ef5350;
  padding: 1rem;
  border-radius: 4px;
  margin: 1rem 0;
  border-left: 4px solid #ef5350;
}

.no-data {
  text-align: center;
  padding: 2rem;
  color: #9e9e9e;
  font-style: italic;
}

/* Tables */
.table-container {
  width: 100%;
  padding: 1rem;
  overflow-x: auto;
}

.table-wrapper {
  width: 100%;
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.9rem;
  background: #2d2d2d;
  border-radius: 8px;
  overflow: hidden;
}

th, td {
  padding: 0.75rem 1rem;
  text-align: left;
  border-bottom: 1px solid #444;
}

th {
  background-color: #3a3a3a;
  color: #ffffff;
  font-weight: 600;
  text-transform: uppercase;
  font-size: 0.75rem;
  letter-spacing: 0.5px;
}

tr:hover {
  background-color: #383838;
}

.low-stock {
  color: #ef5350;
  font-weight: 500;
}

/* Table Header */
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
  background: #3a3a3a;
  border: 1px solid #555;
  color: #e0e0e0;
  border-radius: 6px;
  padding: 0.5rem 1rem;
  font-size: 0.9rem;
  cursor: pointer;
}

/* Scrollbar Styling */
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

/* Responsive Adjustments */
@media (max-width: 768px) {
  .grid {
    grid-template-columns: 1fr;
  }
  
  .chart-container {
    height: 250px;
  }
  
  .card {
    width: 100%;
  }
  
  h1 {
    font-size: 1.5rem;
  }
}
</style>
