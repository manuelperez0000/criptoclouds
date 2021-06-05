import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CoinsPricesService {

  constructor(private http:HttpClient) { 
  }
  getCoinPrice(){
    console.log("lista cripto services activated")
    return this.http.get("http://localhost:3000/api/criptos")
  }
}
