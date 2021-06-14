import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class DashGuard implements CanActivate {
  storage:any;

  constructor(){
    this.storage = localStorage.getItem('token')
  }

  canActivate():boolean{
    if(this.storage){
      console.log("Permiso Concedido")
      return true;
      
    }else{
      console.log("Permiso denegado");
      return false;
    }
  }
  
}
