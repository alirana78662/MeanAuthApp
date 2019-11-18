
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { empty } from 'rxjs';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: string;
  password: string;

  constructor(private authService: AuthService,
    private router: Router,
    private flashMessage: FlashMessagesService

  ) { }

  ngOnInit() {
  }

  onLoginSubmit() {
    
    const user = {
      username: this.username,
      password: this.password

    }
    if(!this.authService.validatelogin(user)){
      this.flashMessage.show('User not Found', { cssClass: 'alert-danger', timeout: 3000});
      return false
  }
  
  
   
    this.authService.login(user).subscribe((res: any) => {
      //console.log('success')
     
     
      this.authService.storeUserData(res.token, res.user);
      this.flashMessage.show('You are logged in', {cssClass: 'alert-success', timeout: 5000});
      this.router.navigate(['dashboard']);
     
    }, function () { 
      //console.error('error');
     
      this.flashMessage.show('User not Found', {cssClass: 'alert-danger', timeout: 5000});
         this.router.navigate(['login']);
     
     });
  }






}

