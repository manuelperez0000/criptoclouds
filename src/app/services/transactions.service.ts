import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { TransactionsModel } from '../models/transactions.model';

@Injectable({
  providedIn: 'root'
})
export class TransactionsService {
  
  constructor(private http:HttpClient) { }

  saveTransaction(body:any){
    return this.http.post(environment.urlGeneral+'/firebase/savetransaction',body)
  }

  getTransactions(email:TransactionsModel){
    console.log("Pasando por el service de obtener transacciones")

    return  this.http.get(environment.urlGeneral+'/firebase/gettransactions/'+email)
    .pipe(map( async (resp)=>{
      
      //console.log("Este es el map y json"+JSON.stringify(resp))

      return resp
    }))
  }
}
