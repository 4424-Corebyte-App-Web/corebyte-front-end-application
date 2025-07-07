export class SalesAnalysis {
    constructor(id = 0, product = '', type = '', expirationDate = '', currentStock = 0, stockMinimum = 0, price = 0){
        this.id = id;
        this.product = product;
        this.type = type;
        this.expirationDate = expirationDate;
        this.currentStock = currentStock;
        this.stockMinimum = stockMinimum;
        this.price = price;
    }
}