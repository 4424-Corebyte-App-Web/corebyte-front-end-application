export class Record {
    constructor(id = 0, customer = '', type = '', year = '', producer = '', batch = 0, stock = 0){
        this.id = id;
        this.customer = customer;
        this.type = type;
        this.year = year;
        this.producer = producer;
        this.batch = batch;
        this.stock = stock;
    }
}
