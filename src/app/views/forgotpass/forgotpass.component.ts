import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { UserModel  } from '../../models/user.model';
import { NgForm } from '@angular/forms';
import  Swal  from 'sweetalert2';

@Component({
  selector: 'app-forgotpass',
  templateUrl: './forgotpass.component.html',
  styleUrls: ['./forgotpass.component.css']
})
export class ForgotpassComponent implements OnInit {

  user:UserModel = new UserModel;

  constructor(private userService:UserService) {
   }

  ngOnInit(): void { 
    if(localStorage.getItem('email')){
      this.user.email = localStorage.getItem('email')
    }
  }

  forgot(form:NgForm){
    if(form.invalid){ return }
    Swal.fire({
      title:"Cargando",
      text:"enviando correo de recuperacio",
      icon:"info"
    })
    Swal.showLoading()

    this.userService.forgotPass(this.user)
    .subscribe((res)=>{
      Swal.close()
      Swal.fire({
        title:"Correo enviado",
        text:"Revise su correo y haga click en el enlace de recuperacion",
        icon:"info"
      })
      console.log("Correo enviado a: "+res.email )
    },(err)=>{
      Swal.close()
      if(err.error.error.message == "EMAIL_NOT_FOUND"){
        Swal.fire({
          title:"Email no valido",
          text:"Este correo no se encuentra registrado",
          icon:"warning"
        })
      }else{
        Swal.fire({
          title:"Error",
          text:"Si no puede iniciar sesion debe comunicarse con nuestros operadores",
          icon:"warning"
        })
      }
      console.log(err.error.error.message)
    })

  }

}
