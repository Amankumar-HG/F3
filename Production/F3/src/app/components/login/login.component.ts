import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {


  email : string = '';
  password : string = '';
  role: '' = "";
  constructor(private auth: AuthService) { }

  ngOnInit(): void {

  }

  login() {   
      if(this.email == '')
      {

        alert('Please enter a email');

        return;

      }

      if(this.password == '')

      {

        alert('Please Enter Password');

        return;

      }

      this.auth.login(this.email,this.password);

      this.email = '';

      this.password = '';
  }
}

// ===========================================================


// import { Component } from '@angular/core';
// import { Router } from '@angular/router';
// import { MatInputModule } from '@angular/material/input';
// import { MatSelectModule } from '@angular/material/select';
// import { MatButtonModule } from '@angular/material/button';



// @Component({
//   selector: 'app-login',
//   templateUrl: './login.component.html',
//   styleUrls: ['./login.component.css']
// })
// export class LoginComponent {

//   email: string = ''; // Initialize to an empty string
//   password: string = ''; // Initialize to an empty string
//   role: string = 'user'; // Initialize to a default value, for example, 'user'

//   constructor(private router: Router) { }

//   login() {
//     // Add your authentication logic here based on the role selected
//     if (this.role === 'user') {
//       // If the role is 'user', redirect to the user's home page
//       this.router.navigate(['/user-home']);
//     } else if (this.role === 'admin') {
//       // If the role is 'admin', redirect to the admin's home page
//       this.router.navigate(['/admin-home']);
//     } else {
//       // If no role is selected (optional), you can display an error message here
//       console.log('Please select a role.');
//     }
//   }
// }

