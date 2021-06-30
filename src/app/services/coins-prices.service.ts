import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CoinsPricesService {
  urlGeneral:String;
  constructor(private http:HttpClient) { 
    this.urlGeneral = environment.urlGeneral
  }
  getCoinPrice(){
    console.log("lista cripto services activated")
    
    /*  production */
    return this.http.get(this.urlGeneral+"/api/criptos")
    
    /* local */
   /*  return this.http.get("http://localhost:3000/api/criptos") */
    
  }
}
