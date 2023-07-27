import { Component, DoCheck, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { UserTypes } from 'src/app/data/user-types.enum';
import { AdminFormComponent } from '../admin-form/admin-form.component';
import { Router } from '@angular/router';
import { User } from 'src/app/data/user';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.css'],
})
export class NavigationBarComponent implements OnInit, DoCheck {
  public UsersType = UserTypes; // Expose the Enum to the template.
  public appName: String;
  public userType: String;

  constructor(public router: Router, public adminFormDialog: MatDialog) {
    this.appName = 'F2 Fertilizers'; // Farmer's Farm Fertilizers (F2 Fertilizers)
    this.userType = UserTypes.Guest;
  }

  public ngOnInit(): void {
    localStorage.clear();
    this.userType = UserTypes.Guest;
    
    let tokenValue = localStorage.getItem('token');
    if (tokenValue != null) {
      let user = JSON.parse(tokenValue) as User;
      if (user.userType == UserTypes.Admin) {
        this.userType = UserTypes.Admin;
      } else if (user.userType == UserTypes.User ) {
        this.userType = UserTypes.User;
      }
    }
  }

  public ngDoCheck(): void {
    this.userType = UserTypes.Guest;

    let tokenValue = localStorage.getItem('token');
    if (tokenValue != null) {
      let user = JSON.parse(tokenValue) as User;
      if (user.userType == UserTypes.Admin) {
        this.userType = UserTypes.Admin;
      } else if (user.userType == UserTypes.User){ 
        this.userType = UserTypes.User;
      }
    }
  }

  /**
   * Navigate to the Home page.
   */
  public navigateToHomePage(): void {
    this.router.navigate(['']);
  }

  /**
   * Logout from the page and navigate to the Home page.
   */
  public logout(): void {
    this.userType = UserTypes.Guest; // Update user type to guest.
    this.router.navigate(['']);
    localStorage.clear();
    // TODO: Perform logout
  }

  /**
   * Navigate to the Login page.
   */
  public navigateToLoginPage(): void {
    // TODO: Perform login
    this.router.navigate(['/login']);
  }

  /**
   * Navigate to the Signup page.
   */
  public navigateToSignupPage(): void {
    // TODO: Navigate to the Signup Page
    this.router.navigate(['/signup']);
  }

  /**
   * Navigate to the Cart page.
   */
  public navigateToCartPage(): void {
    // TODO: Navigate to the Cart Page
    this.router.navigate(['/cart']);
  }

  /**
   * Open the Admin form dialog, to accept the details of the new fertilizer.
   */
  public openAdminForm(): void {
    // TODO: Get the current admin id.
    let id: string = '';
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = { id: id };
    const dialogRef = this.adminFormDialog.open(
      AdminFormComponent,
      dialogConfig
    );
  }
}
