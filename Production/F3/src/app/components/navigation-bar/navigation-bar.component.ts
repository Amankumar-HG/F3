import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { UsersType } from 'src/app/data/user-types.enum';
import { AdminFormComponent } from '../admin-form/admin-form.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.css']
})
export class NavigationBarComponent {
  public UsersType = UsersType;  // Expose the Enum to the template.
  public appName: String;
  public userType: String;

  constructor(public router: Router,public adminFormDialog: MatDialog) {
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
    this.router.navigate(['/cart']);
    console.log("Navigate to Cart Page");
  }

  public openAdminForm(): void {
    // TODO: Get the current admin id.
    let id: string = "";

    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = { id: id};

    const dialogRef = this.adminFormDialog.open(AdminFormComponent, dialogConfig);
    // dialogRef.afterClosed().subscribe(result => {
    //   console.log('The dialog was closed');
    // });
  }
}
