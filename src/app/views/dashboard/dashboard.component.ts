import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { UserModel } from '../../models/user.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  userData:any;
  user:UserModel = new UserModel
  email:any;
  dolar:any;
  constructor( private userService:UserService ) {
    
   }

  ngOnInit(): void {
    this.userService.getUser().subscribe((res)=>{
      this.user = res
       console.log("respuesta de subscripcion:"+res)
    })
    
  }

}
