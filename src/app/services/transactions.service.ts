import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TransactionsService {
  
  constructor(private http:HttpClient) { }

  saveTransaction(body:any){
    return this.http.post(environment.urlGeneral+'/firebase/savetransaction',body)
  }

  getTransactions(email:string){
    return  this.http.get(environment.urlGeneral+'firebase/gettransactions/'+email) 
  }
}
