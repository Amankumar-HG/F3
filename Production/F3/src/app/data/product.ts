export class Product {
    id: string;
    name: string;
    description: string;
    price: number;
    image: string;
    manufacturer: string;
    
    constructor(id: string, name: string, description: string, price: number, image: string, manufacturer: string){
        this.id = id;
        this.name = name;
        this.description = description;
        this.price = price;
        this.image = image;
        this.manufacturer = manufacturer;
    }

    toPlainObject(): any {
        return {
            id: this.id,
            name: this.name,
            description: this.description,
            price: this.price,
            image: this.image,
            manufacturer: this.manufacturer
        };
    }
}
