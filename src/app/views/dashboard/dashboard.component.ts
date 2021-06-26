import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { UserModel } from '../../models/user.model';
import { PrecioDolarService } from '../../services/precio-dolar.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  userData:any;
  user:UserModel = new UserModel
  email:any;
  tiempoExpira:any = new Date();
  tiempoActual:any = new Date();
  tiempoFalta:any;
  dolar:any;
  monto:any;
  selectBank:string="ven";
  montoRetiro:any;
  calculado:boolean=false;
  loading:boolean = true;
  datosBancarios:any;

  constructor(private precioDolar:PrecioDolarService, private userService:UserService ) {
    this.tiempoActual = this.tiempoActual.getTime()
    this.tiempoExpira = localStorage.getItem('expira')

    this.tiempoFalta = ((this.tiempoExpira-this.tiempoActual)/1000)/60


  }

  ngOnInit(): void {
    
    if(this.tiempoFalta<1){
      this.userService.logOut()
    }
    this.precioDolar.getPrecioDolar().subscribe((res)=>{
      this.dolar = res
      this.loading = false
    }, (err)=>{
      console.log("Error obteniendo el precio del dolar: "+err)
    })
    
    this.userService.getUser("manuelperez.0000@gmail.com").subscribe((res)=>{
      this.user = res
      this.loading = false
    }, (err)=>{
      console.log("Error obteniendo el usuario: "+err)
    })
    
  }

  retiroVes(){
    var ret = parseFloat(this.montoRetiro)
    if(this.montoRetiro){
      if(ret<5){
        alert("Monto minimo para retirar son $USD.5")
      }else{
        if(ret > this.user.saldoNimbus){
          alert("Su saldo Nimbus no es suficiente:"+this.user.saldoNimbus)
        }else{
          this.monto = this.dolar.precio*this.montoRetiro
          this.calculado = true
        }
      }
      
    }else{
      alert("Debe ingresar un monto valido")
    }
  }

  onChange(){
    this.calculado=false
  }

  continuaralcajero(){
    var ret = parseFloat(this.montoRetiro)
    if(ret){
      if(ret<5){
        alert("Monto minimo para retirar son $USD.5")
      }else{
        if(ret > this.user.saldoNimbus){
          alert("Su saldo Nimbus no es suficiente:"+this.user.saldoNimbus)
        }else{

          var monto = this.montoRetiro
          var selectBank = this.selectBank
          var datos = this.datosBancarios
          var nombre = localStorage.getItem('sessionNombre');
          var direccion = "https://api.whatsapp.com/send?phone=584141220527&text=Nombre:"+nombre+"--Retiro-saldo-nimbus:%20$USD"+monto+"--Metodo%20de%20Retiro:"+selectBank+"Datos-Bancarios:"+datos;
      
          var direccion = direccion.toString();
          window.location.href = direccion;

        }
      }
    }else{
      alert("Debe ingresar un monto valido")
    }
  }
  verificacion(){
    var nombre = localStorage.getItem('sessionNombre');
    var correo = localStorage.getItem('sessionEmail')
    var direccion = "https://api.whatsapp.com/send?phone=584141220527&text=Hola%20mi%20nombre%20es%20"+nombre+"%20y%20mi%20correo:"+correo+",%20me gustaria%20verificar%20mi%20cuenta%20en%20criptoclouds"
    
    window.location.href = direccion;
  }
}
