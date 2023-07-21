import { Component } from '@angular/core';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.css']
})
export class NavigationBarComponent {
  public appName: String;
  public hasLoggedIn: boolean;

  constructor() {
    this.appName = "F2 Fertilizers";  // Farmer's Farm Fertilizers (F2 Fertilizers)
    this.hasLoggedIn = true; // TODO: Check if user has logged in or not.
  }

  public logout(): void {
    this.hasLoggedIn = false;
    // TODO: Perform logout
  }

  public login(): void {
    // TODO: Perform login
    this.hasLoggedIn = true;
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
