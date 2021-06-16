import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class DashGuard implements CanActivate {
  storage:any;

  constructor(private router:Router){
    this.storage = localStorage.getItem('token')
  }

  canActivate():boolean{
    if(this.storage){
      console.log("Permiso Concedido")
      return true;
      
    }else{
      this.router.navigateByUrl('/login');
      console.log("Permiso denegado");
      return false;
    }
  }
  
}
