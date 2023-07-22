import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartItem } from 'src/app/data/cart-item';
import { CardService } from 'src/app/services/card.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent {
  public dataSource: CartItem[];
  public displayedColumns: string[];
  private amount: number;

  constructor(
    private cardService: CardService,
    public router: Router,
    public route: ActivatedRoute
  ) {
    this.dataSource = [];
    this.displayedColumns = [
      'demo-id',
      'demo-image',
      'demo-name',
      'demo-price',
      'demo-quantity',
      'demo-item-total',
      'demo-actions',
    ];
    this.fetchDataFromFirebase();
    this.amount = 0;
  }

  public fetchDataFromFirebase() {
    this.cardService.getCartItems().subscribe((data: any[]) => {
      this.dataSource = data.map((item) => ({
        ...item.payload.doc.data(),
        id: item.payload.doc.id,
      }));
    });
  }

  public removeItem(item: CartItem) {
    this.cardService
      .removeCartItem(item.id)
      .then(() => {
        console.log('Item removed from cart.');
        this.calculateItemTotalSum();
      })
      .catch((error) => {
        console.error('Error removing item from cart:', error);
      });
  }

  public incrementQuantity(item: CartItem) {
    if (item.quantity >= 1) {
      item.quantity++;
      this.calculateItemTotalSum();
      this.cardService
        .updateCartItem(item)
        .then(() => {
          console.log('Item quantity updated.');
        })
        .catch((error) => {
          console.error('Error updating item quantity:', error);
        });
    }
  }

  public decrementQuantity(item: CartItem) {
    if (item.quantity > 1) {
      item.quantity--;
      this.calculateItemTotalSum();
      this.cardService
        .updateCartItem(item)
        .then(() => {
          console.log('Item quantity updated.');
        })
        .catch((error) => {
          console.error('Error updating item quantity:', error);
        });
    } else {
      this.removeItem(item);
    }
  }

  public calculateItemTotalSum() {
    let sum = 0;
    if (this.dataSource) {
      this.dataSource.forEach((item: CartItem) => {
        sum += item.price * item.quantity;
      });
    }
    this.amount = sum;
    return sum;
  }

  public getItemTotal(cartItem: CartItem): number {
    return cartItem.quantity * cartItem.price;
  }

  public redirectToPaymentPage(): void {
    this.router.navigate(['/payment', this.amount]);
  }
}
