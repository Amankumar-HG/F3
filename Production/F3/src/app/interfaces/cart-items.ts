export class CartItem {
  id: number;
  name: string;
  imageurl: string;
  price: number;
  quantity: number;
  itemTotal: number;

  constructor(id: number, name: string, imageurl: string, price: number, quantity: number) {
    this.id = id;
    this.name = name;
    this.imageurl = imageurl;
    this.price = price;
    this.quantity = quantity;
    this.itemTotal = price * quantity;
  }
}












