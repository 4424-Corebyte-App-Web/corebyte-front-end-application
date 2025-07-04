<script>
import { AlertService } from "../services/alert.service.js";
import LanguageSwitcher from "../../public/components/language-switcher.component.vue";
export default {
  name: "alert-dashboard",
  title: "Alert Dashboard",
  components: { LanguageSwitcher },
  data() {
    return {
      alertService: new AlertService(),
      urgentAlerts: [],
      expiringAlerts: [],
    };
  },
  methods: {
    async fetchAlerts() {
      try {
        const [urgent, expiring] = await Promise.all([
          this.alertService.getUrgentAlerts(),
          this.alertService.getExpiringAlerts(),
        ]);

        this.urgentAlerts = urgent.map((alert) => ({
          ...alert,
          status: "Urgente",
        }));

        this.expiringAlerts = expiring.map((alert) => ({
          ...alert,
          daysLeft: this.calculateDaysLeft(alert.date),
        }));
      } catch (error) {
        console.error("Error fetching alerts:", error);
      }
    },
    calculateDaysLeft(expiryDate) {
      const today = new Date();
      const expiry = new Date(expiryDate);
      const diffTime = expiry - today;
      return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    },
    formatDate(dateString) {
      if (!dateString) return "Fecha no disponible";
      try {
        const options = { year: "numeric", month: "long", day: "numeric" };
        return new Date(dateString).toLocaleDateString("es-ES", options);
      } catch (error) {
        console.error("Error formateando fecha:", error);
        return dateString;
      }
    },
  },
  mounted() {
    this.fetchAlerts();
  },
};
</script>
<template>
  <div class="dashboard-container">
    <h1 class="dashboard-title">{{ $t("alerts.titles.title") }}</h1>
    <LanguageSwitcher />
    <div>
      <div class="alert-section">
        <h2 class="section-title">{{ $t("alerts.titles.urgent") }}</h2>
        <div v-if="urgentAlerts.length > 0" class="alert-grid">
          <div
            class="alert-item"
            v-for="(item, index) in urgentAlerts"
            :key="'urgent-' + index"
          >
            <div class="alert-icon urgent">!</div>
            <div class="alert-content">
              <h3>{{ item.name }}</h3>
              <p>
                {{ $t("alerts.tables.stockActual") }}: {{ item.stockActual }}
              </p>
              <p>
                {{ $t("alerts.tables.stockMinimo") }}: {{ item.stockMinimo }}
              </p>
            </div>
          </div>
        </div>
        <p v-else class="no-alerts">
          No hay productos que requieran reposición urgente.
        </p>
      </div>

      <div class="alert-section">
        <h2 class="section-title">{{ $t("alerts.titles.close") }}</h2>
        <div v-if="expiringAlerts.length > 0" class="alert-grid">
          <div class="alert-item" v-for="item in expiringAlerts">
            <div class="alert-icon warning">!</div>
            <div class="alert-content">
              <h3>{{ item.name }}</h3>
              <p>
                {{ $t("alerts.tables.date") }} {{ item.daysLeft }}
                {{ $t("alerts.tables.days") }}
              </p>
            </div>
          </div>
        </div>
        <p v-else class="no-alerts">No hay productos próximos a vencer.</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.dashboard-container {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.dashboard-title {
  color: #333;
  margin-bottom: 2rem;
  font-size: 2rem;
}

.alert-section {
  margin-bottom: 3rem;
}

.section-title {
  color: #555;
  margin-bottom: 1.5rem;
  font-size: 1.5rem;
  border-bottom: 2px solid #eee;
  padding-bottom: 0.5rem;
}

.alert-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
}

.alert-item {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  display: flex;
  align-items: flex-start;
  transition: transform 0.2s, box-shadow 0.2s;
}

.alert-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.alert-icon {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
  margin-right: 1rem;
  flex-shrink: 0;
}

.alert-icon.urgent {
  background-color: #ff4444;
}

.alert-icon.warning {
  background-color: #ffbb33;
}

.alert-content {
  flex: 1;
}

.alert-content h3 {
  margin: 0 0 0.5rem 0;
  color: #333;
  font-size: 1.1rem;
}

.alert-content p {
  margin: 0.25rem 0;
  color: #666;
  font-size: 0.9rem;
}

.alert-status {
  color: #ff4444;
  font-weight: 600;
  margin-top: 0.5rem !important;
}

.alert-date {
  color: #666;
  font-style: italic;
  margin-top: 0.5rem !important;
}

@media (max-width: 768px) {
  .alert-grid {
    grid-template-columns: 1fr;
  }

  .dashboard-container {
    padding: 1rem;
  }
}
</style>
