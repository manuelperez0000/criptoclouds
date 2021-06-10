import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  token:string="";
  developURL = 'http://localhost:3000/firebase/login'

  constructor( private http:HttpClient) { }
  
  login(e:any,p:any){
    console.log("usando la funcion del servie")
    return this.http.post(this.developURL,{ email:e,password:p})
    .pipe( map((resp:any)=>{
      console.log(resp.idToken)
      this.guardarToken(resp.idToken)
      return resp
    })
  )}

  guardarToken(idToken:any){
    localStorage.setItem('token',idToken)
  }
}

