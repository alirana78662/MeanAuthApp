import { Component, OnInit } from '@angular/core';

import { ValidateService } from '../../services/validate.service'
import { FlashMessagesService } from 'angular2-flash-messages';

import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { userdto } from 'src/app/services/models/user.model';



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

     name: string;
     username: string;
     email: string;
     password: string;
    
    
  constructor(private validateService: ValidateService,
              private flashMessage: FlashMessagesService,
              private authService: AuthService,
              private router: Router,
             
              ) { }


  ngOnInit() {
    
  }

  onRegisterSubmit(){
    const user = {
        name: this.name,
        username: this.username,
        email: this.email,
        password: this.password
    }

    // required fields
    if(!this.validateService.validateRegister(user)){
        this.flashMessage.show('Please fill in all fields', { cssClass: 'alert-danger', timeout: 3000});
        return false
    }

    // required email
    if(!this.validateService.validateEmail(user.email)){
    this.flashMessage.show('Please fill in a proper email', { cssClass: 'alert-danger', timeout: 3000});
    return false
    }
   
    // register user

    this.authService.registerUser(user).subscribe((res) => {   
   this.flashMessage.show('User are Registered Successfully', { cssClass: 'alert-success', timeout: 3000});
   this.router.navigate(['/login']);
    },err => {
      this.flashMessage.show('User are not Registered Successfully', { cssClass: 'alert-danger', timeout: 3000});
      this.router.navigate(['/register']);
    })

     
    
  }
}