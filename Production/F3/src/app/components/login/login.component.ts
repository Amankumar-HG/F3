import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  email: string = '';
  password: string = '';

  constructor(private auth: AuthService) {} // Inject the AuthService in the constructor to handle login authentication

  ngOnInit(): void {
    // Lifecycle hook: ngOnInit is called after the component is initialized
  }

  login() {
    // Method to handle user login
    if (this.email == '') {
      alert('Please enter a email');
      return;
    }

    if (this.password == '') {
      alert('Please Enter Password');
      return;
    }

    this.auth.login(this.email, this.password);
    this.email = ''; // Clear the email and password fields after login is initiated
    this.password = '';
  }
}
