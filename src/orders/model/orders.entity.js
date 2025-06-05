export class Order {
  constructor({ id, client, date, product, quantity, total, imageUrl }) {
    this.id = id;
    this.client = client;
    this.date = date;
    this.product = product;
    this.quantity = quantity;
    this.total = total;
    this.imageUrl = imageUrl;
  }
}
