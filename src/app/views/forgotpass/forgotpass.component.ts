import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-forgotpass',
  templateUrl: './forgotpass.component.html',
  styleUrls: ['./forgotpass.component.css']
})
export class ForgotpassComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  forgot(){
    alert("Se a enviado un link de recuperacion a su correo, esto puede tardar unos minutos")
  }
}
