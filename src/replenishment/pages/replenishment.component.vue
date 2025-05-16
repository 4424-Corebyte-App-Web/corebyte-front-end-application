<script>

import {Replenishment} from "../model/replenishment.entity.js";
import {ReplenishmentApiService} from "../services/replenishment-api.service.js";

export default {
    name: 'replenishment',
    data() {
        return {
          replenishment: new Replenishment({}),
          replenishmentList: null,
          replenishmentApiService: new ReplenishmentApiService('replenishment'),
        };
    },

    methods: {


      getAll() {
        this.replenishmentApiService.getAllResources().then(response => {

          this.replenishmentList = response.data;
          console.log("Replenishment List", response.data);
        }).catch(error => {
          console.error("Error fetching replenishment list", error);
        });
      },
    },

    created() {
      this.getAll();

    }
}

</script>


<template>
  <div class="container">
    <h2>Solicitud de stock</h2>

    <div class="actions">
      <input type="text" placeholder="Buscar" class="search-input" />
      <button class="filter-btn">Filtros</button>
    </div>

    <div class="btn-group">
      <router-link to="/replenishment/register">
        <button class="action-btn">Registrar nuevo producto</button>
      </router-link>

      <button class="action-btn">Actualizar Insumos</button>
    </div>

    <table class="stock-table">
      <thead>
      <tr>
        <th><input type="checkbox" /></th>
        <th>Nombre</th>
        <th>Tipo</th>
        <th>Fecha de caducidad</th>
        <th>Stock actual</th>
        <th>Stock mínimo</th>
        <th>Precio</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="item in replenishmentList" :key="item.id">
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
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 6px;
}

.btn-group {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
}

.action-btn {
  border: 1px solid #f5b301;
  background: transparent;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 20px;
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
