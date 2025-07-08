<script>
import { Replenishment } from "../model/replenishment.entity.js";
import { ReplenishmentApiService } from "../services/replenishment-api.service.js";
import LanguageSwitcher from "../../public/components/language-switcher.component.vue";

export default {
  name: "replenishment",
  components: {
    LanguageSwitcher,
  },
  data() {
    return {
      replenishment: new Replenishment({}),
      replenishmentList: [],
      searchQuery: '',
      replenishmentApiService: new ReplenishmentApiService("replenishment"),
    };
  },
  computed: {
    filteredItems() {
      if (!this.searchQuery) return this.replenishmentList;
      const query = this.searchQuery.toLowerCase();
      return this.replenishmentList.filter(item => 
        item.name.toLowerCase().includes(query)
      );
    }
  },
  methods: {
    getAll() {
      this.replenishmentApiService
        .getAllResources()
        .then((response) => {
          this.replenishmentList = response.data;
        })
        .catch((error) => {
          console.error("Error fetching replenishment list", error);
        });
    },
  },

  created() {
    this.getAll();
  },
};
</script>

<template>
  <div class="container">
    <h2>{{ $t("replenishment.title") }}</h2>
    <LanguageSwitcher />
    <div class="actions">
      <input 
        type="text" 
        v-model="searchQuery"
        :placeholder="$t('replenishment.texts.search')" 
        class="search-input" 
      />
    </div>

    <div class="btn-group">
      <router-link to="/replenishment/register">
        <button class="action-btn">
          {{ $t("replenishment.texts.register") }}
        </button>
      </router-link>
      <router-link to="/replenishment/update/:id">
        <button class="action-btn">{{ $t("replenishment.texts.update") }}</button>
      </router-link>
    </div>

    <table class="stock-table">
      <thead>
        <tr>
          <th><input type="checkbox" /></th>
          <th>{{ $t("replenishment.tables.name") }}</th>
          <th>{{ $t("replenishment.tables.type") }}</th>
          <th>{{ $t("replenishment.tables.date") }}</th>
          <th>{{ $t("replenishment.tables.stockActual") }}</th>
          <th>{{ $t("replenishment.tables.stockMinimo") }}</th>
          <th>{{ $t("replenishment.tables.price") }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in filteredItems" :key="item.id">
          <td><input type="checkbox" /></td>
          <td>{{ item.name }}</td>
          <td>{{ item.type }}</td>
          <td>{{ item.date }}</td>
          <td>{{ item.stockActual }}</td>
          <td>{{ item.stockMinimo }}</td>
          <td>S/.{{ Number(item.price).toFixed(2) }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.container {
  background-color: #1a1a1a;
  color: white;
  padding: 2rem;
  border-radius: 10px;
}

h2 {
  margin-bottom: 1rem;
}

.actions {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
}

.search-input {
  background-color: #333;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  width: 250px;
}

.filter-btn {
  border: 1px solid #f5b301;
  background: transparent;
  color: #facc15;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.filter-btn:hover {
  background-color: #f5b301;
  color: #000;
}

.btn-group {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
}

.action-btn {
  border: 1px solid #f5b301;
  color: #facc15;
  background: transparent;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.action-btn:hover {
  background-color: #f5b301;
  color: #000;
}

.stock-table {
  width: 100%;
  border-collapse: collapse;
}

.stock-table thead {
  background-color: #111;
}

.stock-table th,
.stock-table td {
  padding: 0.75rem 1rem;
  text-align: left;
  border-bottom: 1px solid #333;
}

.stock-table td input[type="checkbox"] {
  transform: scale(1.2);
}
</style>
