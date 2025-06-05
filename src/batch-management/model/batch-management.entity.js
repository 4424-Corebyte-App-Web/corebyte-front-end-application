export class Batch {
  constructor({
    id = 0,
    name = "",
    type = "",
    status = "",
    temperature = "",
    amount = "",
    date = "",
    NLote = "",
  }) {
    this.id = id;
    this.name = name;
    this.type = type;
    this.status = status;
    this.temperature = temperature;
    this.amount = amount;
    this.date = date;
    this.NLote = NLote;
  }
}
