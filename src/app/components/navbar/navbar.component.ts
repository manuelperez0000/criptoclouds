import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IsloginService } from '../../services/islogin.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  login:any;
  constructor(private router:Router, private islogin:IsloginService) { 
  }
  ngOnInit(){
    console.log("comprobacion del login")
    this.login = this.islogin.islog()
    console.log(this.login)
  }
  logout(){
    this.login = false
    localStorage.removeItem('token')
    this.router.navigateByUrl('/login')
  }
}
