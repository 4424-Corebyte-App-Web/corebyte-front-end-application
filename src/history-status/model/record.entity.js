export class Record {
    constructor(id = 0, customer = '', type = '', year = '', product = '', batch = 0, stock = 0){
        this.id = id;
        this.customer = customer;
        this.type = type;
        this.year = year;
        this.product = product;
        this.batch = batch;
        this.stock = stock;
    }
}
