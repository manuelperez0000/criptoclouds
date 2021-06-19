import { Component, OnInit } from '@angular/core';
import { PrecioDolarService } from '../../services/precio-dolar.service';

@Component({
  selector: 'app-resguarda',
  templateUrl: './resguarda.component.html',
  styleUrls: ['./resguarda.component.css']
})
export class ResguardaComponent implements OnInit {

  coin:any;
  amount:any;
  wallet:any;
  banco:string ="ven"
  email:any = localStorage.getItem('sessionEmail')
  recibes:any;
  vesModel:any
  preciodolar:any;

  constructor(private precioDolar:PrecioDolarService ) {
    this.precioDolar.getPrecioDolar().subscribe((res)=>{
      this.preciodolar = res
    })
  }

  ngOnInit(): void {
  }
  sendWathsapp(){
    var montoMinimo= 10000000
    if(this.vesModel){
      if(parseFloat(this.vesModel) < montoMinimo){
        alert("Monto minimo de Bs."+montoMinimo)
      }else{
        var nombre = localStorage.getItem('sessionNombre')
        var recibesRedondeada = this.recibes
        recibesRedondeada = Number(recibesRedondeada.toFixed(2));
        var location = "https://api.whatsapp.com/send?phone=584141220527&text=Nombre:"+nombre+"%20%20%20Recarga-saldo-Nimbus:%20$:"+recibesRedondeada+"%20%20%20%20%20%20%20%20%20%20%20%20Total%20en%20Bs:"+this.vesModel+"%20%20%20Banco:"+this.banco
        window.location.href = location
      }
    }else{
      alert("Monto minimo de Bs."+montoMinimo)
    }
  }
  calcula(){
    this.recibes = this.vesModel/this.preciodolar.precio
  }
}
