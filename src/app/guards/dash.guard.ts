import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class DashGuard implements CanActivate {
  storage:any;

  constructor(private router:Router){
    
  }

  canActivate():boolean{

    this.storage = localStorage.getItem('token')
    if(this.storage){
     // console.log("Storage:true:"+this.storage)
      //console.log("Permiso Concedido")
      return true;
      
    }else{
      //console.log("Storage:false"+this.storage)
      this.router.navigateByUrl('/login');
      console.log("Permiso denegado");
      return false;
    }
  }
  
}
