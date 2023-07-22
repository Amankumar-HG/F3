import { Component, Input } from '@angular/core';
import { Product } from 'src/app/interfaces/product';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {
  @Input() public product!: Product;

  /**
   * Returns true if the `product` description is greater than the 90 otherwise false.
   */
  public isClamped(product: Product): boolean {
    return product.description.length > 90;
  }

  public productDetailsPopup(product: Product) {
    // TODO: Display the product details popup
    console.log("Product Details: ", product.id, product.name);
  }

  public addProductToCart(product: Product) {
    // TODO: Add item to the cart
    console.log("Add to Cart:", product.id, product.name);
  }
}
