import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserModel } from '../../models/user.model';
import Swal from 'sweetalert2';
import { ContactService } from '../../services/contact.service';

 
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  user:UserModel = new UserModel;
  
  constructor(private contact:ContactService) { }

  ngOnInit(): void {
  }

  onSubmit(form:NgForm){
    if(form.invalid){ return }
    Swal.fire({
      title:"Enviando Formulario",
      icon:"info"
    })
    Swal.showLoading();
    this.contact.onSubmit(this.user).subscribe(()=>{
      console.log("subscrito")
      Swal.close()
      Swal.fire({
        title:"Enviando con exito",
      icon:"info"
      })
    },(err)=>{
      console.log(err)
      Swal.close()
    })
    

  }

}
