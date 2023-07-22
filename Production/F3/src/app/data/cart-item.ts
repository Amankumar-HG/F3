export class CartItem {
  id: string;
  name: string;
  description: string;
  image: string;
  price: number;
  manufacturer: string;
  quantity: number;

  constructor(id: string, name: string, description: string, image: string, price: number, manufacturer: string, quantity: number) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.image = image;
    this.price = price;
    this.manufacturer = manufacturer;  
    this.quantity = quantity;  
  }

  toPlainObject(): any {
    return {
      id: this.id,
      name: this.name,
      description: this.description,
      image: this.image,
      price: this.price,
      manufacturer: this.manufacturer,
      quantity: this.quantity,
    };
  }
}












