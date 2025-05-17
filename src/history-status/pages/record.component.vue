<script>
    import { ref } from "vue";
    import SideNavbar from '../../public/components/side-navbar.component.vue';
    import LanguageSwitcher from '../../public/components/language-switcher.component.vue'
    import { RecordService } from '../services/record.service.js';

    export default {
        name: "record",
        title: "Record",
        components: {SideNavbar, LanguageSwitcher},
        data() {
            return {
                value: '',
                items: [],
                recordService: new RecordService(), 
                records: [], 
            };
        },
        methods: {
            search(event) {
                this.items = [...Array(10).keys()].map((item) => event.query + '-' + item);
            },
            generatePdfReport() {
                try {
                    //create a new pdf with jsPDF instance
                    const doc = new window.jsPDF();
                    
                    //add a title to the pdf
                    doc.setFontSize(18);
                    doc.text("Records Report", 14, 20);
                    doc.setFontSize(12);
                    
                    //define the columns for the table
                    const tableColumn = ["ID", "Customer", "Type", "Year", "Producer", "Batch", "Stock"];
                    const tableRows = [];

                    //add data rows from the records
                    this.records.forEach(record => {
                        const recordData = [
                            record.id,
                            record.customer,
                            record.type,
                            record.year,
                            record.producer,
                            record.batch,
                            record.stock
                        ];
                        tableRows.push(recordData);
                    });

                    //generate the table using the global autoTable function
                    window.autoTable(doc, {
                        head: [tableColumn],
                        body: tableRows,
                        startY: 30,
                        theme: 'grid',
                        styles: {
                            fontSize: 10,
                            cellPadding: 3,
                            lineColor: [200, 200, 200]
                        },
                        headStyles: {
                            fillColor: [41, 128, 185],
                            textColor: 255,
                            fontStyle: 'bold'
                        },
                        alternateRowStyles: {
                            fillColor: [245, 245, 245]
                        }
                    });
                    
                    //save the pdf
                    doc.save('records-report.pdf');
                    console.log('PDF generated successfully!');
                } catch (error) {
                    console.error('Error generating PDF:', error);
                }
            }
        },
        created() {
            this.recordService.getAllRecords().then(data => {
                this.records = data;
            }).catch(error => {
                console.error("Error fetching records for component:", error);
                this.records = []; 
            });
        }
    }
</script>
<template>
    <div class="main-layout">
        <div class="w-full main-content-padding">
            <div class="header-content">
                <div class="start">
                    <h1>{{$t('titles.record')}}</h1>
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
                <div class="table-and-button-container">
                    <div class="data-table" style="flex-grow: 1;">
                        <pv-datatable :value="records" paginator :rows="13" :rowsPerPageOptions="[5, 10, 20, 50]" tableStyle="min-width: 60rem">
                            <pv-column field="id" header="ID" sortable style="width: 10%"></pv-column>
                            <pv-column field="customer" header="Customer" sortable style="width: 20%"></pv-column>
                            <pv-column field="type" header="Type" sortable style="width: 15%"></pv-column> 
                            <pv-column field="year" header="Year" sortable style="width: 20%"></pv-column> 
                            <pv-column field="producer" header="Producer" sortable style="width: 10%"></pv-column> 
                            <pv-column field="batch" header="Batch" sortable style="width: 15%"></pv-column>
                            <pv-column field="stock" header="Stock" sortable style="width: 10%"></pv-column>
                        </pv-datatable>
                    </div>
                    <div class="report-button-card card">
                        <pv-button label="Generate Report" @click="generatePdfReport" icon="pi pi-file-pdf" iconPos="right"/>
                    </div>
                </div>
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

.main-layout {
    display: flex;
}
.header-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.5rem 1rem;
    margin-bottom: 1rem;
}

.filter-controls-container {
    display: flex;
    align-items: flex-start;
    gap: 1rem;
    margin-bottom: 1rem;
}
.search-filter{
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #242424;
}
.filter-controls-container :deep(.p-button) {
    border: 1px solid #DAA520 !important;
    color: #DAA520 !important;
    background: transparent !important;
    transition: background-color 0.2s, color 0.2s;
    padding: 10px;
    border-radius: 25px;
    box-shadow: none !important;
}

.filter-controls-container :deep(.p-button:hover) {
    background-color: #DAA520 !important;
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

.table-and-button-container {
    display: flex;
    align-items: flex-start;
    gap: 1rem;
}

.report-button-card {
    border: 1px solid #556B2F;    
    color: #556B2F;
    border-radius: 8px;             
    padding: 1rem;                  
    display: flex;                 
    align-items: center;         
    justify-content: center;      
}

.report-button-card:hover {
    background-color: #556B2F;
    color: #000;    
}


</style>
