import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as jsPDF from 'jspdf';
import { CartItem } from 'src/app/data/cart-item';
import { CardService } from 'src/app/services/card.service';
@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent {
  public dataSource: CartItem[] = [];
  selectOption!: string; 
  // Array of available payment options
  options: string[] = ['UPI', 'Net Banking', 'Credit Card/Debit Card', 'Cash On Delivery']; 
  amount: number = 0; // Initialize amount to zero
  constructor(private route: ActivatedRoute,private cardService:CardService) {
    this.fetchDataFromFirebase();
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const amountParam = params.get('amount');
      if (amountParam !== null) {
        this.amount = +amountParam;
      }
    });
  }
  public fetchDataFromFirebase() {
    this.cardService.getCartItems().subscribe((data: any[]) => {
      this.dataSource = data.map((item) => ({
              id: item.payload.doc.id,
            ...item.payload.doc.data()
            }));
    });
  }
  public generatePDF(): void {
    // Check if the data is available before generating the PDF
    if (this.dataSource.length === 0) {
      return;
    }

    const doc = new jsPDF.default();
   
    let yPos = 20;
    for (const item of this.dataSource) {
      const productName = item.name;
      const quantity = item.quantity;
      const totalPrice = item.price * item.quantity;

      //TODO: User data is not available yet
      doc.text(`Product Name: ${productName}`, 20, yPos);
      doc.text(`Quantity: ${quantity}`, 20, yPos + 10);
      doc.text(`Total Price: ${totalPrice}`, 20, yPos + 20);
      doc.text('--------------------------', 20, yPos + 30);
      yPos += 40;
    }
  

    doc.save('cart_items.pdf');
  }
}