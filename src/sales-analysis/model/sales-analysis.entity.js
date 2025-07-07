export class SalesAnalysis {
    constructor(id = 0, customerId = 0, type = '', year = new Date(), product = '', batch = 0, stock = 0) {
        this.id = id;
        this.customerId = customerId;
        this.type = type;
        this.year = new Date(year);
        this.product = product;
        this.batch = batch;
        this.stock = stock;
    }
}