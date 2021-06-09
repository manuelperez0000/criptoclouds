import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2'
import { UserService } from '../../services/user.service';
import { UserModel } from '../../models/user.model';
import { NgForm } from '@angular/forms';
/* Swal.fire({
      title: 'Error!',
      text: 'Do you want to continue',
      icon: 'error',
      confirmButtonText: 'Cool'
    }) */
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user:UserModel = new UserModel() 

  constructor(private log:UserService) { }

  ngOnInit(): void {
    this.user.email = "manuelperez.0000@gmail.com"
    this.user.password = "nina89123"
  }

  onSubmit( form:NgForm ){
    if(form.invalid){
      return;
    }
    console.log("enviando form")
    console.log(this.user)
    console.log(form)
    /* this.log.login(this.user.email,this.user.password).subscribe((res)=>{
      console.log(res)
    }) */
  }

}
