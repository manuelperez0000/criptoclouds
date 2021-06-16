import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PrecioDolarService {

  constructor(private http:HttpClient) {}
  getPrecioDolar(){
    return this.http.get("https://criptoclouds.com/firebase/precio-dolar");
  }
}
