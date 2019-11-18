import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient,HttpHeaderResponse,HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { userdto } from './models/user.model';
import { Loginuserdto } from './models/loginuser.model';
// import { tokenNotExpired } from 'angular2-jwt';



const baseUrl ='http://localhost:3000'


@Injectable()
export class AuthService {
  authToken: any;
  user: any;
  
  constructor(private http: HttpClient) { }
  validatelogin(user){
    if( user.username == undefined || user.password == undefined ){
        return false;
    } else {
        return true;
    }
  }
  

registerUser(data: userdto){
  return this.http.post(baseUrl + '/users/register', data);
}
login(data: Loginuserdto ){
 return this.http.post(baseUrl + '/users/authenticate', data);
} 
getProfile() {
let headers = new HttpHeaders();
this.loadToken();
headers.append('Authorization', this.authToken);
  return this.http.get(baseUrl + '/users/profile'  );
}


loadToken(){
  const token = localStorage.getItem('id_token');
  this.authToken = token;
}

storeUserData(token, user){
  localStorage.setItem('id_token', token);
  localStorage.setItem('user', JSON.stringify(user));
  this.authToken = token;
  this.user = user;
}
// loggedIn() {
//   return tokenNotExpired();
// }
 loggedIn(){
  return localStorage.getItem('id_token') !==  null;
}
logout() {
  this.authToken = null;
  this.user = null;
  localStorage.clear();
}


  }

