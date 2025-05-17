<script>
import { ref } from "vue";
import SideNavbar from '../../public/components/side-navbar.component.vue';
import LanguageSwitcher from '../../public/components/language-switcher.component.vue';
import { HistoryStatusService } from '../services/history-status.service';

export default {
    name: "status",
    title: "Status",
    components: {SideNavbar, LanguageSwitcher},
    data() {
        return {
            historyService: new HistoryStatusService(),
            value: '',
            items: [],
            products: [],
            showDialog: false,
            selectedProduct: null,
            isDelivered: false,
        };
    },
    methods: {
        search(event) {
            this.items = [...Array(10).keys()].map((item) => event.query + '-' + item);
        },
        modifyProduct(product) {
            this.selectedProduct = { ...product };
            this.isDelivered = this.selectedProduct.status === 'Entregado';
            this.showDialog = true;
        },
        async saveChanges() {
            if (this.selectedProduct) {
                const newStatus = this.isDelivered ? 'Entregado' : 'Pendiente'; 
                try {
                    const updatedProduct = await this.historyService.updateHistoryStatus(this.selectedProduct.id, newStatus);
                    const productIndex = this.products.findIndex(p => p.id === this.selectedProduct.id);
                    if (productIndex !== -1) {
                        this.products[productIndex] = updatedProduct; 
                    }
                    this.closeDialog();
                } catch (error) {
                    console.error("Failed to save changes:", error);
                }
            }
        },
        closeDialog() {
            this.showDialog = false;
            this.isDelivered = false;
            this.selectedProduct = null;
        },
    },
    created() {
        this.historyService.getAllHistoryStatus().then(data => {
            this.products = data;
        });
    }
}

</script>
<template>
    <div class="main-layout" :class="{ 'content-dimmed': showDialog }">
        <div class="w-full main-content-padding">
            <div class="header-content">
                <div class="start">
            <h1>{{$t('titles.state')}}</h1>
                </div>
                <language-switcher/>
            </div>
            <div class="filter-controls-container">
            <div class="card flex justify-center search-filter" style="border-radius:15px; padding:8px">
                <pv-autocomplete 
                v-model="value" 
                :suggestions="items" 
                @complete="search"
                placeholder="Search..." 
                class="w-64"
                />
        </div>
        <div class="card flex flex-col items-center gap-4">
            <div class="flex flex-wrap gap-4 justify-center ">
                <pv-button label="Filter" icon="pi pi-filter"  iconPos="right" />
            </div>
        </div>
        </div>
        <div class="center">
            <div class="data-table">
                <pv-datatable :value="products" paginator :rows="13" :rowsPerPageOptions="[5, 10, 20, 50]" tableStyle="min-width: 60rem">
                    <pv-column field="id" header="ID" sortable style="width: 10%"></pv-column>
                    <pv-column field="customer" header="Customer" sortable style="width: 20%"></pv-column>
                    <pv-column field="date" header="Date" sortable style="width: 15%"></pv-column>
                    <pv-column field="product" header="Product" sortable style="width: 20%"></pv-column>
                    <pv-column field="amount" header="Amount" sortable style="width: 10%"></pv-column>
                    <pv-column field="total" header="Total" sortable style="width: 15%"></pv-column>
                    <pv-column field="status" header="Status" sortable style="width: 10%"></pv-column>
                    <pv-column header="Actions" style="width: 10%; text-align: center;">
                        <template #body="slotProps">
                            <pv-button label="Modify" icon="pi pi-pencil" iconPos="right" class="p-button-sm p-button-info" @click="modifyProduct(slotProps.data)" />
                        </template>
                    </pv-column>
                </pv-datatable>
            </div>
            <!-- Dialog for modifying product status -->
            <pv-dialog v-model:visible="showDialog" :header="'Modify Order Status: ' + (selectedProduct ? selectedProduct.id : '')" :modal="true" :style="{ width: '450px' }" @hide="closeDialog">
                <div v-if="selectedProduct" class="product-details-dialog-content">
                    <p><strong>ID:</strong> {{ selectedProduct.id }}</p>
                    <p><strong>Customer:</strong> {{ selectedProduct.customer }}</p>
                    <p><strong>Product:</strong> {{ selectedProduct.product }}</p>
                    <p><strong>Current Status:</strong> {{ selectedProduct.status }}</p>
                    <div class="field-checkbox" style="margin-top: 1rem; margin-bottom: 1rem;">
                        <pv-checkbox v-model="isDelivered" inputId="deliveredStatusCheckbox" name="deliveredStatus" :binary="true" />
                        <label for="deliveredStatusCheckbox" style="margin-left: 0.5rem;">Mark as Delivered</label>
                    </div>
                </div>
                <template #footer>
                    <pv-button label="Cancel" icon="pi pi-times" class="p-button-text" @click="closeDialog" />
                    <pv-button label="Save Changes" icon="pi pi-check" @click="saveChanges" />
                </template>
            </pv-dialog>
        </div>
    </div>
    </div>
</template>
<style scoped>
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
    border: 1px solid #DAA520 !important;
    color: #DAA520 !important;
    background: transparent !important;
    transition: background-color 0.2s, color 0.2s;
    padding: 10px;
    border-radius: 25px;
}

.filter-controls-container :deep(.p-button:hover) {
    background-color: #DAA520 !important;
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
    background-color: #DAA520 !important;
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

.search-filter{
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
