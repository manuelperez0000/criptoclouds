import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BitcoinPriceService {
  
  constructor(private http:HttpClient){}

  getApiRestCoin(){
    return this.http.get("https://swapi.dev/api/people/1");
  }
}