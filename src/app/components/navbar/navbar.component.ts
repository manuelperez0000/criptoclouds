import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IsloginService } from '../../services/islogin.service';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  login:any;
  constructor(private user:UserService, private router:Router, private islogin:IsloginService) { 
  }
  ngOnInit(){
    console.log("comprobacion del login")
    var log = this.login = this.islogin.islog()
    if(log){
      console.log("Si esta logueado")
    }else{
      console.log("No esta logueado")
    }
  }
  
  logout(){
    this.user.logOut()
    this.router.navigateByUrl('/login')
  }
}
