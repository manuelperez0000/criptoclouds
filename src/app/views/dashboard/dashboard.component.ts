import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { UserModel } from '../../models/user.model';
import { DatosBancoModel } from '../../models/datosBanco.model';
import { PrecioDolarService } from '../../services/precio-dolar.service';
import { TransactionsService } from 'src/app/services/transactions.service';
import { TransactionsModel } from 'src/app/models/transactions.model';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  userData: any;
  user: UserModel = new UserModel

  datosBanco: DatosBancoModel = new DatosBancoModel;

  transaction: TransactionsModel = new TransactionsModel;

  arrayTransactions: any = []
  email: any;
  tiempoExpira: any = new Date();
  tiempoActual: any = new Date();
  tiempoFalta: any;
  dolar: any;
  monto: any;
  selectBank: string = "Venezuela";
  montoRetiro: any;
  calculado: boolean = false;
  loading: boolean = true;
  datosBancarios: any;

  constructor(private precioDolar: PrecioDolarService,
    private userService: UserService,
    private router: Router,
    private transactionService: TransactionsService) {

    this.tiempoActual = this.tiempoActual.getTime()
    this.tiempoExpira = localStorage.getItem('expira')

    this.tiempoFalta = ((this.tiempoExpira - this.tiempoActual) / 1000) / 60

    this.user.email = localStorage.getItem('sessionEmail')
    console.log(JSON.stringify(this.user))

  }

  ngOnInit(): void {

    if (this.tiempoFalta < 1) {
      this.userService.logOut()
    }

    this.precioDolar.getPrecioDolar().subscribe((res) => {
      this.dolar = res
      this.loading = false
    }, (err) => {
      console.log("Error obteniendo el precio del dolar: " + err)
    })
    var email = this.user.email

    this.userService.getUser(email).subscribe((res) => {
      this.user = res
      this.loading = false
    }, (err) => {
      console.log("Error obteniendo el usuario: " + err)
    })

    this.getTransaction()

  }

  getTransaction() {
    this.transactionService.getTransactions(this.user.email).subscribe(async (res) => {
      this.arrayTransactions = res
      this.arrayTransactions = this.arrayTransactions.__zone_symbol__value
    })
  }

  cambio(i: any) {
    this.arrayTransactions[i].collapse = !this.arrayTransactions[i].collapse
  }

  retiroVes() {
    var ret = parseFloat(this.montoRetiro)
    if (this.montoRetiro) {
      if (ret < 5) {
        alert("Monto minimo para retirar son $USD.5")
      } else {
        if (ret > this.user.saldoNimbus) {
          alert("Su saldo Nimbus no es suficiente:" + this.user.saldoNimbus)
        } else {
          this.monto = this.dolar.precio * this.montoRetiro
          this.calculado = true
        }
      }

    } else {
      alert("Debe ingresar un monto valido")
    }
  }


  onChange() {
    this.calculado = false
  }

  retiroNimbus(form: NgForm) {

    if (form.invalid) {

      Swal.fire({
        title: "Error",
        text: "Debe llenar todos los campos",
        icon: "warning"
      })
      return

    } else {
      if(this.montoRetiro > this.user.saldoNimbus){
        Swal.fire({
          title: "Saldo Insuficiente",
          text: "No puede retirar un monto mayor de lo que poseen en su Wallet Nimbus",
          icon: "warning"
        })
        return
      }else{
        var date = new Date()
        var fecha = date.toLocaleDateString()
        var recibe = this.montoRetiro * this.dolar.precio
        let body = {
          banco: this.selectBank,
          concepto: "Retiro de fondos",
          email: this.user.email,
          estatus: 0,
          fecha,
          tipo: 2,
          montoEnvia: this.montoRetiro,
          montoRecibe: recibe,
          monedaEnvia: "Nimbus",
          monedaRecibe: this.datosBanco.banco,
          wallet: "A nombre de: " + this.datosBanco.titular +
            ", Cuenta: " + this.datosBanco.cuenta +
            ", Tipo de cuenta: " + this.datosBanco.tipo +
            ", Telefono: " + this.datosBanco.telefono +
            ", Cedula: " + this.datosBanco.cedula,
          enviado:date.getTime()
        }

      Swal.fire({
        title: "Cargando",
        text: "Espere un momento por favor",
        allowOutsideClick: false,
        icon: "info"
      })
      Swal.showLoading()

      this.transactionService.saveTransaction(body).subscribe((res) => {
        Swal.close()
        Swal.fire({
          title: "Enviado correctamente",
          icon: "info",
          text: "Recibira un correo con la informacion de su transaccion"
        })
      },(err)=>{console.log("Error en la subscripcion del transactionService: "+err.error.error.message)})
    }
      }
      
      
    this.getTransaction()
  }

  verificacion() {
    var correo = localStorage.getItem('sessionEmail')
    var direccion = "https://api.whatsapp.com/send?phone=584141220527&text=Hola%20mi%20correo:" + correo + ",%20me gustaria%20verificar%20mi%20cuenta%20en%20criptoclouds"

    window.location.href = direccion;
  }
}
