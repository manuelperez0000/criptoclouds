import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { UserModel } from '../models/user.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  
  urlGeneral:string;
  user:UserModel = new UserModel;

  constructor(private http:HttpClient) { 
    this.urlGeneral = environment.urlGeneral
  }
  onSubmit(user:UserModel){
    var data = {
      ...user
    }
   return this.http.post(this.urlGeneral+"/firebase/contact",data)
   .pipe(map((resp:any)=>{
      console.log(resp)
      return resp
   }))
  }

}
