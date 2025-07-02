<script>
import { ref } from "vue";
import SideNavbar from "../../public/components/side-navbar.component.vue";
import LanguageSwitcher from "../../public/components/language-switcher.component.vue";
import { HistoryStatusService } from "../services/history-status.service";

export default {
  name: "status",
  title: "Status",
  components: { SideNavbar, LanguageSwitcher },
  emits: ["close", "update:visible", "login"],
  data() {
    return {
      historyService: new HistoryStatusService(),
      value: "",
      items: [],
      products: [],
      allProducts: [],
      showDialog: false,
      selectedProduct: null,
      isDelivered: false,
      historyId: null,
      status: "",
    };
  },
  computed: {
    filteredProducts() {
      if (!this.value) return this.products;
      const searchTerm = this.value.toLowerCase();
      return this.products.filter(
        (product) =>
          product.customer &&
          product.customer.toLowerCase().includes(searchTerm)
      );
    },
  },
  methods: {
    mapStatus(status) {
      if (!status) return "PENDING";
      if (typeof status === "string") status = status.toUpperCase();

      switch (status) {
        case 0:
        case "0":
        case "PENDING":
          return "PENDING";
        case 1:
        case "1":
        case "SHIPPED":
          return "SHIPPED";
        case 2:
        case "2":
        case "DELIVERED":
          return "DELIVERED";
        default:
          return "PENDING";
      }
    },
    search(event) {
      this.value = event.query;
      this.items = [
        ...new Set(
          this.products
            .filter(
              (p) =>
                p.customer &&
                p.customer.toLowerCase().includes(event.query.toLowerCase())
            )
            .map((p) => p.customer)
        ),
      ];
    },
    modifyProduct(product) {
      this.selectedProduct = { ...product };
      this.isDelivered = this.selectedProduct.status === "DELIVERED";
      this.showDialog = true;
    },
    async saveChanges() {
      if (this.selectedProduct) {
        try {
          const statusToUpdate = this.isDelivered ? "DELIVERED" : "PENDING";

          const updatedProduct = await this.historyService.updateHistoryStatus(
            this.selectedProduct.id,
            statusToUpdate
          );

          const productIndex = this.products.findIndex(
            (p) => p.id === this.selectedProduct.id
          );
          if (productIndex !== -1) {
            this.products[productIndex] = {
              ...this.products[productIndex],
              ...updatedProduct,
              status: this.mapStatus(updatedProduct.status),
            };
          }

          this.showDialog = false;
          this.resetForm();
        } catch (error) {
          console.error("Failed to save changes:", error);
        }
      }
    },
    closeModal() {
      this.showDialog = false;
      this.resetForm();
      this.$emit("close");
      this.$emit("update:visible", false);
    },
    resetForm() {
      this.selectedProduct = null;
      this.isDelivered = false;
      this.historyId = null;
      this.status = "";
    },
  },
  created() {
    this.historyService.getAllHistoryStatus().then((data) => {
      this.products = data;
      this.allProducts = [...data];
    });
  },
};
</script>
<template>
  <div class="main-layout" :class="{ 'content-dimmed': showDialog }">
    <div class="w-full main-content-padding">
      <div class="header-content">
        <div class="start">
          <h1>{{ $t("titles.state") }}</h1>
        </div>
        <language-switcher />
      </div>
      <div class="filter-controls-container">
        <div
          class="card flex justify-center search-filter"
          style="border-radius: 15px; padding: 8px"
        >
          <pv-autocomplete
            v-model="value"
            :suggestions="items"
            @complete="search"
            placeholder="Search..."
            class="w-64"
            @item-select="search({ query: $event.value })"
          />
        </div>
        <div class="card flex flex-col items-center gap-4">
          <div class="flex flex-wrap gap-4 justify-center">
            <pv-button label="Filter" icon="pi pi-filter" iconPos="right" />
          </div>
        </div>
      </div>
      <div class="center">
        <div class="data-table">
          <pv-datatable
            :value="filteredProducts"
            paginator
            :rows="13"
            :rowsPerPageOptions="[5, 10, 20, 50]"
            tableStyle="min-width: 60rem"
          >
            <pv-column
              field="id"
              header="ID"
              sortable
              style="width: 10%"
            ></pv-column>
            <pv-column
              field="customer"
              header="Customer"
              sortable
              style="width: 20%"
            ></pv-column>
            <pv-column
              field="date"
              header="Date"
              sortable
              style="width: 15%"
            ></pv-column>
            <pv-column
              field="product"
              header="Product"
              sortable
              style="width: 20%"
            ></pv-column>
            <pv-column
              field="amount"
              header="Amount"
              sortable
              style="width: 10%"
            ></pv-column>
            <pv-column
              field="total"
              header="Total"
              sortable
              style="width: 15%"
            ></pv-column>
            <pv-column
              field="status"
              header="Status"
              sortable
              style="width: 10%"
            ></pv-column>
            <pv-column header="Actions" style="width: 10%; text-align: center">
              <template #body="slotProps">
                <pv-button
                  label="Modify"
                  icon="pi pi-pencil"
                  iconPos="right"
                  class="p-button-sm p-button-info"
                  @click="modifyProduct(slotProps.data)"
                  style="z-index: 10"
                />
              </template>
            </pv-column>
          </pv-datatable>
        </div>
      </div>
    </div>
  </div>
  <!-- Dialog for modifying product status -->
  <pv-dialog
    v-model:visible="showDialog"
    :modal="true"
    :style="{
      width: '500px',
      borderRadius: '12px',
      boxShadow: '0 10px 25px rgba(0, 0, 0, 0.3)',
    }"
    :header="'Modify Order #' + (selectedProduct ? selectedProduct.id : '')"
    :closable="false"
    @hide="closeModal"
    class="custom-dialog dark-dialog"
  >
    <div v-if="selectedProduct" class="dialog-content">
      <div class="dialog-section">
        <h4 class="section-title">Order Details</h4>
        <div class="detail-row">
          <span class="detail-label">ID:</span>
          <span class="detail-value">{{ selectedProduct.id }}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Customer:</span>
          <span class="detail-value">{{ selectedProduct.customer }}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Product:</span>
          <span class="detail-value">{{ selectedProduct.product }}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Status:</span>
          <span
            class="status-badge"
            :class="{
              'status-delivered': selectedProduct.status === 'Entregado',
              'status-pending': selectedProduct.status !== 'Entregado',
            }"
          >
            {{ selectedProduct.status }}
          </span>
        </div>
      </div>

      <div class="dialog-section">
        <h4 class="section-title">Update Status</h4>
        <div class="checkbox-container">
          <pv-checkbox
            v-model="isDelivered"
            inputId="deliveredStatusCheckbox"
            name="deliveredStatus"
            :binary="true"
            class="custom-checkbox"
          />
          <label for="deliveredStatusCheckbox" class="checkbox-label">
            Mark as Delivered
          </label>
        </div>
      </div>
    </div>
    <template #footer>
      <div class="dialog-footer">
        <pv-button
          label="Cancel"
          icon="pi pi-times"
          class="p-button-text p-button-secondary"
          @click="closeModal"
        />
        <pv-button
          label="Save Changes"
          icon="pi pi-check"
          class="p-button-primary"
          @click="saveChanges"
          autofocus
        />
      </div>
    </template>
  </pv-dialog>
</template>
<style scoped>
/* Dialog Styles */
:deep(.dark-dialog) {
  background: #242424;
  color: #ffffff;
}

:deep(.p-dialog .p-dialog-header) {
  background: #333333;
  border-bottom: 1px solid #444444;
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
  padding: 1.25rem 1.5rem;
}

:deep(.p-dialog .p-dialog-header .p-dialog-title) {
  color: #ffffff;
}

:deep(.p-dialog .p-dialog-header .p-dialog-title) {
  font-size: 1.25rem;
  font-weight: 600;
  color: #2c3e50;
}

:deep(.p-dialog .p-dialog-content) {
  padding: 1.5rem;
  background: #242424;
}

:deep(.p-dialog .p-dialog-footer) {
  border-top: 1px solid #444444;
  padding: 1rem 1.5rem;
  background: #333333;
  border-bottom-left-radius: 12px;
  border-bottom-right-radius: 12px;
  text-align: right;
}

.dialog-content {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.dialog-section {
  background: #333333;
  border-radius: 8px;
  padding: 1.25rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
}

.section-title {
  font-size: 1rem;
  font-weight: 600;
  color: #ffffff;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid #444444;
}

.detail-row {
  display: flex;
  margin-bottom: 0.75rem;
  align-items: center;
}

.detail-label {
  font-weight: 500;
  color: #a0a0a0;
  width: 100px;
  flex-shrink: 0;
}

.detail-value {
  color: #ffffff;
  flex-grow: 1;
}

.checkbox-container {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.checkbox-label {
  color: #2c3e50;
  cursor: pointer;
  user-select: none;
}

.status-badge {
  display: inline-block;
  padding: 0.25rem 0.75rem;
  border-radius: 1rem;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: capitalize;
}

.status-delivered {
  background-color: #d4edda;
  color: #155724;
}

.status-pending {
  background-color: #fff3cd;
  color: #856404;
}

.dialog-footer {
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
}

:deep(.p-button) {
  min-width: 100px;
}

:deep(.p-button.p-button-primary) {
  background: #3b82f6;
  border-color: #3b82f6;
}

:deep(.p-button.p-button-primary:hover) {
  background: #2563eb;
  border-color: #2563eb;
}

:deep(.p-button.p-button-secondary) {
  color: #ffffff;
  background: #444444;
  border: 1px solid #555555;
}

:deep(.p-button.p-button-secondary:hover) {
  background: #555555;
  border-color: #666666;
}

:deep(.p-checkbox .p-checkbox-box) {
  border-radius: 4px;
  border-color: #666666;
  background: #444444;
}

:deep(.p-checkbox .p-checkbox-box .p-checkbox-icon) {
  color: #ffffff;
}

:deep(.p-checkbox .p-checkbox-box.p-highlight) {
  background: #3b82f6;
  border-color: #3b82f6;
}

:deep(.p-dialog .p-dialog-header-close) {
  color: #ffffff;
}

:deep(.p-dialog .p-dialog-header-close:hover) {
  color: #a0a0a0;
}
.main-content-padding {
  padding: 5rem;
  height: 100vh;
  width: 100%;
}
.main-layout.content-dimmed {
  opacity: 0.3;
  transition: opacity 0.25s ease-in-out;
}
.main-layout.content-dimmed .p-dialog {
  opacity: 1;
}
.main-layout {
  display: flex;
}
.filter-controls-container :deep(.p-button) {
  border: 1px solid #daa520 !important;
  color: #daa520 !important;
  background: transparent !important;
  transition: background-color 0.2s, color 0.2s;
  padding: 10px;
  border-radius: 25px;
}

.filter-controls-container :deep(.p-button:hover) {
  background-color: #daa520 !important;
  color: #000 !important;
}

.data-table :deep(.p-button-info) {
  border: 1px solid #4caf50 !important;
  color: #4caf50 !important;
  background: transparent !important;
  transition: background-color 0.2s, color 0.2s;
  padding: 10px;
  border-radius: 25px;
}

.data-table :deep(.p-button-info:hover) {
  background-color: #4caf50 !important;
  color: #000 !important;
}
.data-table :deep(.p-datatable-thead > tr > th) {
  background-color: #daa520 !important;
  color: #000 !important;
}

.data-table :deep(.p-datatable-thead > tr > th) {
  border-color: #333333 !important;
  padding: 0.75rem 1rem;
}

.data-table :deep(.p-datatable-tbody > tr > td) {
  background-color: #242424 !important;
  color: #fff !important;
  border-color: #242424 !important;
}

.data-table :deep(.p-datatable-tbody > tr:nth-child(even) > td) {
  background-color: #242424 !important;
}

.data-table :deep(.p-datatable-tbody > tr > td) {
  padding: 0.75rem 1rem;
}

.data-table :deep(.p-paginator) {
  background: transparent !important;
  border: none !important;
  padding: 0.5rem 0 !important;
  font-size: 0.9rem;
  justify-content: center;
}

.data-table :deep(.p-paginator .p-paginator-page) {
  background: transparent !important;
  border: none !important;
  margin: 0 0.25rem;
  width: auto !important;
  padding: 0.25rem 0.5rem !important;
  color: #fff;
}

.filter-controls-container {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  margin-bottom: 1rem;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 1rem;
  margin-bottom: 1rem;
}

.search-filter {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #242424;
}
.main-layout :deep(.p-dialog) {
  background-color: #242424 !important;
  border: 1px solid #444 !important;
  border-radius: 0.5rem !important;
  padding: 1.5rem !important;
  max-width: 600px;
}

.product-details-dialog-content {
  display: flex;
  gap: 2rem;
  color: #fff;
}

.product-details-dialog-content > div:first-child {
  flex: 1;
  display: flex;
  gap: 0.75rem;
  font-size: 1rem;
}

.product-details-dialog-content p strong {
  display: inline-block;
  width: 7rem;
  color: #f1f1f1;
}

.product-details-dialog-content > div:last-child {
  flex: 0 0 150px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.product-details-dialog-content > div:last-child img {
  max-width: 100%;
  border-radius: 0.25rem;
}

.main-layout :deep(.p-dialog .p-dialog-header) {
  background: transparent !important;
  color: #fff !important;
  font-size: 1.25rem !important;
  border-bottom: none !important;
}

.main-layout :deep(.p-dialog .p-dialog-footer) {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  background: transparent !important;
  border-top: none !important;
  padding-top: 1rem !important;
}
</style>
