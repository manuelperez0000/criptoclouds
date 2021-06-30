import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PrecioDolarService {
  
  urlGeneral:string;
  
  constructor(private http:HttpClient) {
    this.urlGeneral = environment.urlGeneral
  }
  getPrecioDolar(){
    return this.http.get(this.urlGeneral+"/firebase/precio-dolar");
  }
}
