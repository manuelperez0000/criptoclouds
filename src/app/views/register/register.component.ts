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
  errorMessage:any;
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
       
        }else{
          //primer acto
          console.log("Formulario validado correctamente, inicianod el proceso de registro")
          Swal.fire({ 
            title:"Realizando peticion",
            text:"Se esta procesando su peticion de registro",
            allowOutsideClick:false,
            icon:"info"
          })
          Swal.showLoading()
          this.userService.registro(this.user).subscribe((res)=>{
            console.log("subscripto email primer acto: "+res['email'])
            localStorage.setItem('sessionEmail',res['email'])
            localStorage.setItem('sessionNombre',res['Nombre'])
            localStorage.setItem('sessionTelefono',res['Telefono'])
            localStorage.setItem('sessionCedula',res['Cedula'])
            localStorage.setItem('email',res['email'])
            Swal.close()
            this.router.navigateByUrl("/dashboard")
          },(err)=>{
            if(err.error.error.message == "EMAIL_EXISTS"){
              this.errorMessage = "Este correo ya se encuentra registrado"
            }else{
              this.errorMessage = err.error.error.message
            }
            /* console.log(err.error.error.message) */
            Swal.close()
            Swal.fire({ 
              title:"Error",
              text:this.errorMessage,
              icon:"warning"
            })
            return
          });

          //segundo acto
          Swal.fire({ 
          title:"Guardando",
          text:"Guardando en la base de datos",
          allowOutsideClick:false,
          icon:"info"
          })
          Swal.showLoading()
          this.userService.secondUserReg(this.user).subscribe((res)=>{
            console.log(res) 
           /*  console.log("Usando secondUserReg")
            
      
            console.log("Registrado en firebase con exito"+res)
            Swal.close()
            this.router.navigateByUrl("/dashboard") */
          },(err)=>{
            console.log(err.error)
          })
        //fin actos
        }
      }
    

    
    
    
    

  }

}
