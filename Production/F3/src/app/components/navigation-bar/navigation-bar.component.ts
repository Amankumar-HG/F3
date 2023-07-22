import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { UsersType } from 'src/app/data/user-types.enum';
import { AdminFormComponent } from '../admin-form/admin-form.component';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.css']
})
export class NavigationBarComponent {
  public UsersType = UsersType;  // Expose the Enum to the template.
  public appName: String;
  public userType: String;

  constructor(public adminFormDialog: MatDialog) {
    this.appName = "F2 Fertilizers";  // Farmer's Farm Fertilizers (F2 Fertilizers)
    this.userType = UsersType.Admin; // TODO: Check the user type.
  }

  public logout(): void {
    this.userType = UsersType.Guest;  // Update user type to guest.
    // TODO: Perform logout
  }

  public login(): void {
    // TODO: Perform login
    console.log("Navigate to Login Page");
  }

  public signup(): void {
    // TODO: Navigate to the Signup Page
    console.log("Navigate to Signup Page");
  }

  public openCart(): void {
    // TODO: Navigate to the Cart Page
    console.log("Navigate to Cart Page");
  }

  public openAdminForm(): void {
    let productName: string = "ABC";
    let productPrice: number = 12;

    const dialogConfig = new MatDialogConfig();
    // dialogConfig.minWidth = '512px'; // Set the desired width here

    // Pass the data to the dialog
    dialogConfig.data = { name: productName, price: productPrice };

    const dialogRef = this.adminFormDialog.open(AdminFormComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      productPrice = result;
    });
  }
}
