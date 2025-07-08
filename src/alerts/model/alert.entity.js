export class Alert {
  constructor({
    id = 0,
    name = "",
    type = "",
    date = new Date().toISOString(),
    stockActual = 0,
    stockMinimo = 0,
    price = 0
  } = {}) {
    this.id = Number(id) || 0;
    this.name = String(name || "");
    this.type = String(type || "");
    this.date = date ? new Date(date).toISOString() : new Date().toISOString();
    this.stockActual = Number(stockActual) || 0;
    this.stockMinimo = Number(stockMinimo) || 0;
    this.price = Number(price) || 0;
  }
}

