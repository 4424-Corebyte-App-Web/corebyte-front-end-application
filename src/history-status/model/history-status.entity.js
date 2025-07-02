export class HistoryStatus {
    constructor(id = 0, customer = '', date = '', product = '', amount = 0, total = 0, status = ''){
        this.id = id;
        this.customer = customer;
        this.date = date;
        this.product = product;
        this.amount = amount;
        this.total = total;
        this.status = status;
    }
}
