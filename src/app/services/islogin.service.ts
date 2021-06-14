import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IsloginService {

  constructor() { 
    
  }
  islog(){
    if(localStorage.getItem('token')){
      return true
    }else{
      return false
    }
  }
}

