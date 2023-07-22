import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';


// import { Router } from '@angular/router';



@Component({

  selector: 'app-register',

  templateUrl: './signup.component.html',

  styleUrls: ['./signup.component.css']

})

export class SignupComponent implements OnInit {
  username: string = '';
  email : string = '';
  password : string = '';
  phone: number = 0;
  role: string = '';
  router: any;

  // -----------------------------



  
  // ---------------------------------
 


  constructor(private auth : AuthService) { }
  ngOnInit(): void {
  }
  register() {

    if(this.email == '') {
      alert('Please enter email');
      return;

    }




    if(this.password == '') {

      alert('Please enter password');

      return;

    }




    this.auth.register(this.email, this.password );

    
    // Redirect based on the selected role
    if (this.role === 'customer') {
      this.router.navigate(['/customer-home']);
    } else if (this.role === 'seller') {
      this.router.navigate(['/seller-home']);
    }
   

    this.username = '';
    this.email = '';
    this.password = '';
    this.phone;
    this.role = '';

  }

}

