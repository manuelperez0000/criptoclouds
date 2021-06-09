import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  /* email:any = 'manuelperez.0000@gmail.com'
  password:any = 'nina89123' */
  // prodURL = 'https://criptoclouds.com/firebase/login'

  developURL = 'http://localhost:3000/firebase/login'

  constructor( private http:HttpClient) { }
  login(e:any,p:any){
    return this.http.post(this.developURL,{
      email:e,
      password:p
    })
  }

}

