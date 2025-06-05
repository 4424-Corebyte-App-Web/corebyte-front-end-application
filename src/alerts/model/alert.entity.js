export class Alert {
  constructor({
    id = 0,
    name = "",
    type = "",
    date = "",
    stockActual = 0,
    stockMinimo = 0,
    price = 0,
  }) {
    this.id = id;
    this.name = name;
    this.type = type;
    this.date = date;
    this.stockActual = stockActual;
    this.stockMinimo = stockMinimo;
    this.price = price;
  }
}
