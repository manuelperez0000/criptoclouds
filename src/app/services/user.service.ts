import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { UserModel } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  user:UserModel = new UserModel;
  userToken:any;
  loginURL = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCWNCK0lFUH01MuAzk-42hA3IXYhgE6QQ4'
  registerURL = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCWNCK0lFUH01MuAzk-42hA3IXYhgE6QQ4'

  constructor( private http:HttpClient) {
    this.leerToken()
   }
  
  login(user:UserModel){
    var userData = {
      ...user,
      returnSecureToken:true
    }
    console.log("usando la funcion del service: Login")
    return this.http.post(this.loginURL,userData)
    .pipe( map((resp:any)=>{
      console.log(resp.idToken)
      this.guardarToken(resp.idToken)
      return resp
    }))
  }

  registro(user:UserModel){
    var userData = {
      ...user,
      returnSecureToken:true
    }
    console.log("usando la funcion del service: Registro")
    return this.http.post(this.registerURL,userData)
    .pipe( map((resp:any)=>{
      console.log(resp.idToken)
      this.guardarToken(resp.idToken)
      console.log("registrado con exito")
      return resp
    }))
  }

  guardarToken(idToken:any){
    localStorage.setItem('token',idToken);
  }

  leerToken(){
    if(localStorage.getItem('token')){
      this.userToken = localStorage.getItem('token');
    }else{
      this.userToken = '';
    }
    return this.userToken
  }

  logOut(){
    localStorage.removeItem('token')
  }
}

