import { Component, OnInit } from '@angular/core';
import { TransactionsService } from 'src/app/services/transactions.service';
import { PrecioDolarService } from '../../services/precio-dolar.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { TransactionsModel } from 'src/app/models/transactions.model';
import { NotificationsService } from 'src/app/services/notifications.service';

@Component({
  selector: 'app-resguarda',
  templateUrl: './resguarda.component.html',
  styleUrls: ['./resguarda.component.css']
})
export class ResguardaComponent implements OnInit {

  coin:any;
  transactionModel:TransactionsModel = new TransactionsModel;
  amount:any;
  wallet:any;
  banco:string ="Venezuela"
  email:any = localStorage.getItem('sessionEmail')
  recibes:any;
  vesModel:any
  preciodolar:any;

  constructor(  private precioDolar:PrecioDolarService,
                private router:Router, 
                private notifications:NotificationsService,
                private transaction:TransactionsService ) {

    this.precioDolar.getPrecioDolar().subscribe((res)=>{
      this.preciodolar = res
    })
  }

  ngOnInit(): void {
    this.transaction.getTransactions(this.email).subscribe((res)=>{
      console.log(JSON.stringify(res)) 
    })
  }

  confirmTransaction(){


    var montoMinimo = 10000000
    if(this.vesModel){
      if(parseFloat(this.vesModel) < montoMinimo){
        alert("Monto minimo de Bs."+montoMinimo)
      }else{

        Swal.fire({ 
          title:"Cargando",
          text:"Espere un momento por favor",
          allowOutsideClick:false,
          icon:"info"
        })
        Swal.showLoading()

        var recibesRedondeada = this.recibes
        recibesRedondeada = Number(recibesRedondeada.toFixed(2));
        var ves = this.vesModel
        var banco = this.banco
        var date = new Date()
        var fecha = date.toLocaleDateString()
        var objTransaction = {
          email:this.email,
          montoRecibe:recibesRedondeada,
          montoEnvia:ves,
          monedaEnvia:"ves",
          monedaRecibe:"nimbus",
          banco:banco,
          wallet:"",
          estatus:0,
          fecha,
          tipo:0,
          concepto:"Agregar saldo Nimbus"
        }

        this.transaction.saveTransaction(objTransaction).subscribe((res)=>{

          this.notifications.send().subscribe(()=>{
            console.log("Notificacione enviada desde resguarda")
          })

          console.log("Respuesta de transaccion: "+ JSON.stringify(res))
          Swal.close()
          Swal.fire({
            title:"Enviado correctamente",
            icon:"info",
            text:"Recibira un correo con la informacion de su transaccion"
          }).then(()=>{
            this.router.navigateByUrl("/dashboard")

          })
        },(err)=>{
          console.log("Error en la subscripcion "+err.error.error.message)
        })
       
      }
    }else{
      alert("Monto minimo de Bs."+montoMinimo)
    }
  }
  calcula(){
    this.recibes = this.vesModel/this.preciodolar.precio
  }
}
