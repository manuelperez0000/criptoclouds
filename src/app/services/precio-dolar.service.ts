import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PrecioDolarService {

  constructor(private http:HttpClient) {}
  getPrecioDolar(){
    console.log("servicio del precio del dolar")
    return this.http.get("https://criptoclouds.com/firebase/precio-dolar");
   
  }
}
