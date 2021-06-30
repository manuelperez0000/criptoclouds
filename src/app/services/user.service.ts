import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { UserModel } from '../models/user.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  user:UserModel = new UserModel;
  userToken:string | null = "";
  urlGeneral:string;
  forgotUrl:string = "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key="+environment.apikey
  loginURL = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key='+environment.apikey
  registerURL = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key='+environment.apikey
  userActive:any;
  expirationDate:Date = new Date();

  constructor( private http:HttpClient) {
    this.urlGeneral = environment.urlGeneral
    this.leerToken()
    this.userActive = localStorage.getItem('sessionEmail')
   }
  
  login(user:UserModel){
    var userData = {
      ...user,
      returnSecureToken:true
    }
    return this.http.post(this.loginURL,userData)
    .pipe( map( async(resp:any)=>{
      var vuelto = await this.guardarToken(resp)
      console.log("vuelto_"+vuelto.nombre)
      return vuelto
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

  guardarToken(res:any){
    this.userToken = res.idToken
    localStorage.setItem('token',res.idToken);
    var expira = ((this.expirationDate.getTime())+3600000).toString()
    localStorage.setItem('expira',expira)
    localStorage.setItem('sessionEmail',res.email)
    
    return res
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
    localStorage.removeItem('expira')
  }

  getUser(email:String){
    return this.http.get(this.urlGeneral+"/firebase/getUser/"+email)
    .pipe(map((resp:any)=>{
      //console.log("respuesta en el map:"+ JSON.stringify(resp) )
      return  resp
    }))
  }
}

