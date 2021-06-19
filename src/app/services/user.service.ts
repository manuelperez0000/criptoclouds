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
  urlGeneral:string = "http://localhost:3000"
  //urlGeneral:string ="https://criptoclouds.com"
  forgotUrl:string = "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyCWNCK0lFUH01MuAzk-42hA3IXYhgE6QQ4"
  loginURL = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCWNCK0lFUH01MuAzk-42hA3IXYhgE6QQ4'
  registerURL = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCWNCK0lFUH01MuAzk-42hA3IXYhgE6QQ4'
  userActive:any;
  constructor( private http:HttpClient) {
    this.leerToken()
    this.userActive = localStorage.getItem('sessionEmail')
   }
  
  login(user:UserModel){
    var userData = {
      ...user,
      returnSecureToken:true
    }
    console.log("usando la funcion del service: Login")
    return this.http.post(this.loginURL,userData)
    .pipe( map((resp:any)=>{
      console.log("Esta es la respuesta del map"+resp)
      this.guardarToken(resp.idToken)
      return resp
    }))
  }

  registro(user:UserModel){
    console.log("Service: Registro")
    var userData = {
      ...user,
      returnSecureToken:true
    }
    return this.http.post(this.registerURL,userData)
    .pipe( map((resp:any)=>{
     
      /* var objBody={
        id:resp.idToken,
        userData
      }
      console.log(objBody)
     return this.http.post('http:localhost:3000/firebase/secondUserReg',objBody) */

      console.log(resp.idToken)
      this.guardarToken(resp.idToken)
      console.log("registrado con exito")

      return resp
    }))
  }
  secondUserReg(user:UserModel){
    console.log("segundo registro a: "+user.email)
    var objUser ={
      email:user.email,
      nombre:user.nombre,
      telefono:user.telefono,
      nacionalidad:user.nacionalidad,
      cedula:user.cedula
    }
    return this.http.post(this.urlGeneral+'/firebase/secondUserReg',objUser)
    .pipe(map((resp:any) =>{
      console.log("mapa del sugundo registro: "+resp.estado)
      return resp
    }))
  }
 

  forgotPass(user:UserModel){
    var userData = {
      email:user.email,
      requestType:"PASSWORD_RESET"
      
    }
    console.log("forgot service")
   return this.http.post(this.forgotUrl,userData, {headers:{
    "X-Firebase-Locale":"es"
  }})
    .pipe( map((resp:any)=>{
      console.log("Recuperando contraseña")
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
    localStorage.removeItem('sessionTelefono')
    localStorage.removeItem('sessionCedula')
    localStorage.removeItem('sessionNombre')
    localStorage.removeItem('token')
    localStorage.removeItem('sessionEmail')
  }

  getUser(){
    return this.http.get(this.urlGeneral+"/firebase/getUser/"+this.userActive)
    .pipe(map((resp:any)=>{
      //console.log("respuesta en el map:"+ JSON.stringify(resp) )
      return  resp
    }))
  }
}

