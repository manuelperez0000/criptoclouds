import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { UserModel } from '../../models/user.model';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  user:UserModel = new UserModel;

  constructor(private userService:UserService,private router:Router) { }

  ngOnInit(): void {
    this.user.nacionalidad = "v"
  }

  onSubmit(form:NgForm){
    if(form.invalid){  

      Swal.fire({
        title:"Error",
        text:"Debe llenar el formulario correctamente",
        icon:"warning"})
      return 
    }else{
      if(form.controls.password.value != form.controls.password2.value){
        Swal.fire({
          title:"Error",
          text:"Las contraseñas no coinciden",
          icon:"warning"})
        return
        }
    }
    console.log("Formulario validado correctamente, inicianod el proceso de registro")
    Swal.fire({ 
      title:"Guardando",
      text:"Se esta procesando su peticion de registro",
      allowOutsideClick:false,
      icon:"info"
    })
    Swal.showLoading()

    this.userService.registro(this.user).subscribe((res)=>{
      console.log("subscripto correcto"+res['email'])
      Swal.close()
      this.router.navigateByUrl("/home")
    })
  }

}
