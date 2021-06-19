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
  dolar:any;
  monto:any;
  selectBank:string="ven";
  montoRetiro:any;
  calculado:boolean=false;
  loading:boolean = true;
  datosBancarios:any;
  constructor(private precioDolar:PrecioDolarService, private userService:UserService ) {
    this.precioDolar.getPrecioDolar().subscribe((res)=>{
      this.dolar = res
      this.loading = false
    })
    this.userService.getUser().subscribe((res)=>{
      this.user = res
      localStorage.setItem('sessionNombre',res.nombre)
      localStorage.setItem('sessionCedula',res.cedula)
      localStorage.setItem('sessionTelefono',res.telefono)
      console.log("respuesta de subscripcion:"+res)
    })

    this.user.nombre = localStorage.getItem('sessionNombre')
    
   }

  ngOnInit(): void {
    
    
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
}
