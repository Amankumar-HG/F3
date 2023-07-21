import { Component } from '@angular/core';
import { UsersType } from 'src/app/data/user-types.enum';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.css']
})
export class NavigationBarComponent {
  public UsersType = UsersType;  // Expose the Enum to the template.
  public appName: String;
  public userType: String;

  constructor() {
    this.appName = "F2 Fertilizers";  // Farmer's Farm Fertilizers (F2 Fertilizers)
    this.userType = UsersType.User; // TODO: Check the user type.
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
}
