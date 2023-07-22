export class NewProduct {
    name: string;
    description: string;
    price: number;
    image: string;
    manufacturer: string;
    
    constructor(name: string, description: string, price: number, image: string, manufacturer: string){
        this.name = name;
        this.description = description;
        this.price = price;
        this.image = image;
        this.manufacturer = manufacturer;
    }

    toPlainObject(): any {
        return {
            name: this.name,
            description: this.description,
            price: this.price,
            image: this.image,
            manufacturer: this.manufacturer
        };
    }
}
