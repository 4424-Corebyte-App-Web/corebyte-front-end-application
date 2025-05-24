<script>
  import { ref, onMounted } from 'vue';
  import { useRouter } from 'vue-router';
  import Column from 'primevue/column';
  import DataTable from 'primevue/datatable';
  import Button from 'primevue/button';
  import { getOrders } from '../services/orders.service.js';

  export default {
    name: 'OrderTable',
    components: {
      Column,
      DataTable,
      Button
    },
    data() {
      return {
        orders: [],
        router: useRouter()
      };
    },
    methods: {
      fetchOrders() {
        getOrders().then(data => {
          this.orders = data;
        });
      },
      goToRegisterOrder() {
        this.router.push('/orders/register');
      },
    },
    mounted() {
      this.fetchOrders();
    },
  }
</script>
<template>
    <div class="table-container">
      <h1 class="text-white">Ordenes de pedidos</h1>
  
      <div class="flex justify-between items-center mb-4">
          <pv-button
              label="Procesar órdenes de pedido"
              class="custom-order-button"
              @click="goToRegisterOrder"
          />
      </div>
  
      <pv-datatable
          :value="orders"
          paginator
          :rows="6"
          :rowsPerPageOptions="[6, 8, 12]"
          tableStyle="min-width: 60rem"
          paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
          currentPageReportTemplate="{first} a {last} "
      >
        <!-- Botón izquierdo de paginador -->
        <template #paginatorstart>
          <div class="p-paginator">
            <!--CENTRAR-PAGINATOR-->
          </div>
        </template>
  
        <!-- Botón derecho de paginador -->
        <template #paginatorend>
          <div class="p-paginator">
            <!--CENTRAR-PAGINATOR-->
          </div>
        </template>
  
        <!-- Columnas -->
        <pv-column field="id" header="ID Pedido" />
        <pv-column field="client" header="Cliente" />
        <pv-column field="date" header="Fecha" />
        <pv-column field="product" header="Producto" />
        <pv-column field="quantity" header="Cantidad" />
        <pv-column field="total" header="Total" />
        <pv-column header=" " style="width: 150px; text-align: center">
          <template #body="slotProps">
            <RouterLink :to="{ name: 'OrderDetails', params: { id: slotProps.data.id } }" class="details-button">
              <pv-button
                label="Detalles"
                icon="pi pi-search"
                class="details-button"
              />
            </RouterLink>
          </template>
        </pv-column>
  
      </pv-datatable>
    </div>
</template>
<style scoped>
  .table-container {
    max-width: 1500px;
    margin: 2px;
    padding: 1rem;
    background-color: #1a1a1a;
    border-radius: 100px;
  }
  
  :deep(.p-datatable .p-datatable-thead > tr > th),
  :deep(.p-datatable .p-datatable-tbody > tr > td),
  :deep(.p-datatable .p-datatable-tfoot > tr > td) {
    padding-top: 1rem;
    padding-bottom: 1rem;
  }
  :deep(.p-paginator) {
    padding-top: 0.1rem !important;
    padding-bottom: 0.1rem !important;
    margin-top: 0.1rem;
  }
  
  :deep(.p-paginator .p-paginator-pages .p-paginator-page),
  :deep(.p-paginator .p-paginator-first),
  :deep(.p-paginator .p-paginator-prev),
  :deep(.p-paginator .p-paginator-next),
  :deep(.p-paginator .p-paginator-last),
  :deep(.p-paginator .p-dropdown) {
    padding: 0.10rem 0.5rem !important;
    height: auto !important;
    min-height: 1.5rem !important;
    line-height: 1.2rem !important;
    font-size: 0.85rem;
  }
  
  
  /* Encabezado amarillo */
  :deep(.p-datatable-thead > tr > th) {
    background-color: #facc15;
    color: #000;
  }
  
  /* Estilo para paginador */
  :deep(.p-paginator) {
    background-color: #1a1a1a;
    color: white;
    border-top: 1px solid #333;
    margin-top: 1rem;
    padding-top: 1rem;
  }
  :deep(.custom-order-button) {
    background-color: #000 !important;     /* Fondo negro */
    color: #fff !important;                /* Letras blancas */
    border: 2px solid #facc15 !important;  /* Borde amarillo */
    border-radius: 9999px !important;      /* Bordes completamente circulares */
    padding: 0.5rem 1.5rem !important;     /* Espaciado interno */
    font-weight: bold;
    transition: all 0.3s ease;
  }
  
  :deep(.custom-order-button:hover) {
    background-color: #facc15 !important;  /* Hover: fondo amarillo */
    color: #000 !important;                /* Hover: texto negro */
  }
  :deep(.details-button) {
    background-color: transparent;
    border: 2px solid #facc15;
    color: #facc15;
    border-radius: 9999px;
    font-weight: bold;
    padding: 0.25rem 1rem;
    transition: all 0.3s ease;
  }
  
  :deep(.details-button:hover) {
    background-color: #facc15;
    color: #000;
  }
  
  </style>
