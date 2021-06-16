import { Component, OnInit } from '@angular/core';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'ng-app';
  objCalc:any;
  constructor( private user:UserService ){
  
  }

  ngOnInit(){
    this.user.getUser().subscribe((res)=>{
      localStorage.setItem('sessionNombre',res.nombre)
      localStorage.setItem('sessionCedula',res.cedula)
      localStorage.setItem('sessionTelefono',res.telefono)
    })
  }

}
