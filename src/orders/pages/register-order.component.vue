<template>
    <div class="table-container">
      <h1 class="text-white">Ordenes de pedidos</h1>
  
      <div class="flex justify-between items-center mb-4">
        <Button
            label="Procesar órdenes de pedido"
            class="custom-order-button"
            @click="goToRegister"
        />
        <br>
        <br>
      </div>
  
      <DataTable
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
        <Column field="id" header="ID Pedido" />
        <Column field="client" header="Cliente" />
        <Column field="date" header="Fecha" />
        <Column field="product" header="Producto" />
        <Column field="quantity" header="Cantidad" />
        <Column field="total" header="Total" />
        <Column header=" " style="width: 150px; text-align: center">
          <template #body="slotProps">
            <Button
                label="Detalles"
                icon="pi pi-search"
                class="details-button"
                @click="goToOrderDetails(slotProps.data.id)"
            />
  
          </template>
        </Column>
  
      </DataTable>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { useRouter } from 'vue-router';
  import Column from 'primevue/column';
  import DataTable from 'primevue/datatable';
  import Button from 'primevue/button';
  import { getOrders } from '../services/orders.service.js';
  
  const orders = ref([]);
  const router = useRouter();
  
  onMounted(async () => {
    orders.value = await getOrders();
  });
  
  
  function goToOrderDetails(orderId) {
    router.push(`/orders/details/${orderId}`);
  }
  function goToRegister() {
    router.push('/orders/register');
  }
  
  </script>
  
  
  
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
    background-color: #000 !important;    
    color: #fff !important;               
    border: 2px solid #facc15 !important;  /
    border-radius: 9999px !important;     
    padding: 0.5rem 1.5rem !important;    
    font-weight: bold;
    transition: all 0.3s ease;
  }
  
  :deep(.custom-order-button:hover) {
    background-color: #facc15 !important; 
    color: #000 !important;                
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
