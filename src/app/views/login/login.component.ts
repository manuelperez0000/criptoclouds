import { Component, OnInit } from '@angular/core';
import  Swal  from 'sweetalert2';
import { UserService } from '../../services/user.service';
import { UserModel } from '../../models/user.model';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  userToken:any
  user:UserModel = new UserModel()
  errorMessage:string="";
  recuerdame:boolean = false
  

  constructor(private userService:UserService, private router:Router) { 

  }

  ngOnInit(): void {
    if(localStorage.getItem('email')){
      this.user.email = localStorage.getItem('email')
      this.recuerdame = true
    }
  }

  onSubmit( form:NgForm ){
    
    if(form.invalid){ return }
    
    Swal.fire({ 
      title:"Cargando",
      text:"Espere un momento por favor",
      allowOutsideClick:false,
      icon:"info"
    })
    Swal.showLoading()
    
    this.userService.login(this.user)
    .subscribe(async(res)=>{
      
      if(this.recuerdame){ 
      await this.saveEmail() 
      }

      localStorage.setItem('sessionEmail',this.user.email)

      Swal.close()

      this.router.navigateByUrl("/dashboard")
        
    },(err)=>{
      if(err.error.error.message == "INVALID_PASSWORD"){
        this.errorMessage = "Contraseña incorrecta"
      }else{
        this.errorMessage = "El correo ingresado no se encuentra registrado"
      }
      /* console.log(err.error.error.message) */
      Swal.close()

      Swal.fire({ 
        title:"Error",
        text:this.errorMessage,
        icon:"warning"
      })
    });
  }

  async saveEmail(){
    localStorage.setItem('email',this.user.email)
    return true
  }


}
