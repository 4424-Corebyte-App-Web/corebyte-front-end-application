export class Replenishment {
  constructor({ id, name, type, date, stockActual, stockMinimo, price, orderNumber }) {
    this.id = id;
    this.name = name;
    this.type = type;
    this.date = date;
    this.stockActual = stockActual;
    this.stockMinimo = stockMinimo;
    this.price = price;
    this.orderNumber = orderNumber || ''; // Add orderNumber with default empty string
  }
}
