export class Order {
  constructor({ id, customer, date, product, amount, total, imageUrl }) {
    this.Id = id;
    this.Customer = customer;
    this.Date = date;
    this.Product = product;
    this.Amount = amount;
    this.Total = total;
    this.Url = imageUrl;
  }
}
