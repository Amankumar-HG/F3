import { Component, DoCheck, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { UsersType } from 'src/app/data/user-types.enum';
import { AdminFormComponent } from '../admin-form/admin-form.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.css']
})
export class NavigationBarComponent implements OnInit, DoCheck{
  public UsersType = UsersType;  // Expose the Enum to the template.
  public appName: String;
  public userType: String;

  constructor(
    public router: Router,
    public adminFormDialog: MatDialog
    ) {
    this.appName = "F2 Fertilizers";  // Farmer's Farm Fertilizers (F2 Fertilizers)
    this.userType = UsersType.Guest; 
  }

  public ngOnInit(): void {
    // TODO: Check the user type.
    this.userType = UsersType.Guest;
    if (localStorage.getItem('token') == "admin"){
      this.userType = UsersType.Admin;
    } else if (localStorage.getItem('token') =="user"){
      this.userType = UsersType.User;
    }
  }

  public ngDoCheck(): void {
        // TODO: Check the user type.
        this.userType = UsersType.Guest;
        if (localStorage.getItem('token') == "admin"){
          this.userType = UsersType.Admin;
        } else if (localStorage.getItem('token') =="user"){
          this.userType = UsersType.User;
        }

        console.log(localStorage.getItem('token'))
  }

  public logout(): void {
    this.userType = UsersType.Guest;  // Update user type to guest.
    this.router.navigate(['']);
    localStorage.clear();
    // TODO: Perform logout
  }

  public login(): void {
    // TODO: Perform login
    this.router.navigate(['/login']);
    console.log("Navigate to Login Page");
  }

  public signup(): void {
    // TODO: Navigate to the Signup Page
    this.router.navigate(['/signup']);
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
