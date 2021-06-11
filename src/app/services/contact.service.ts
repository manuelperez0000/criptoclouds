import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { UserModel } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  user:UserModel = new UserModel;
  url:any = "http://criptoclouds.com/firebase/contact";

  constructor(private http:HttpClient) { 

  }
  onSubmit(user:UserModel){
    var data = {
      ...user
    }
   return this.http.post(this.url,data)
   .pipe(map((resp:any)=>{
      console.log(resp)
      return resp
   }))
  }

}
