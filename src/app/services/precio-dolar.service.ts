import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PrecioDolarService {
  url:string = "https://criptoclouds.com"
  //url:string = "http://localhost:3000"

  constructor(private http:HttpClient) {}
  getPrecioDolar(){
    return this.http.get(this.url+"/firebase/precio-dolar");
  }
}
