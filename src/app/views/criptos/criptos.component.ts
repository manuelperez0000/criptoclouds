import { Component, OnInit } from '@angular/core';
import { PrecioDolarService } from '../../services/precio-dolar.service';
import { CoinsPricesService } from '../../services/coins-prices.service';
import { Router } from '@angular/router';
import { IsloginService } from 'src/app/services/islogin.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-criptos',
  templateUrl: './criptos.component.html',
  styleUrls: ['./criptos.component.css']
})
export class CriptosComponent implements OnInit {
  vesModel:any="";
  coinModel:any

  decimalVes:any = 0
  decimalCoin:any = 0
  btnChange:boolean = true

  porcentage:any = 5

  decimalAux:any = 0
  loading:boolean = true
  loadingCripto:boolean = true
  dolar:any = {precio:0}
  listaCriptos:any
  cripto:number = 0
  symbol:string = "BTC"
  changeValor:any = 0
  comenzar:string = "/dashboard"
  constructor(private islogin:IsloginService, private router:Router, private precio:PrecioDolarService,private coins:CoinsPricesService ) { 
    this.precio.getPrecioDolar().subscribe((resp:any)=>{
      this.dolar = resp
      this.loading = false
    })
    this.coins.getCoinPrice().subscribe((res:any) =>{
      this.listaCriptos = res
      this.changeValor = res[0].price
      console.log(res)
      this.loadingCripto = false
    })
  }

  ngOnInit(): void {
  }

  procCompra(){
    if(this.islogin.islog()){
      var montoBs
      if(this.vesModel != ""){
        montoBs = parseInt(this.vesModel)
        if(montoBs<35000000){
          Swal.fire({
            title:"Discupe",
            icon:"warning",
            text:"El monto minimo es de Bs. 35.000.000,00"
          })
        }else{
          if(this.btnChange){
            this.router.navigateByUrl('/datoscompra/'+this.vesModel+'/'+this.symbol+'/'+this.coinModel)
          }else{
            this.router.navigateByUrl('/datosventa/'+this.vesModel+'/'+this.symbol+'/'+this.coinModel)
          }
        }
      }else{
        Swal.fire({
          title:"Discupe",
          icon:"warning",
          text:"El monto minimo es de Bs. 35.000.000,00"
      })
    }
    }else{
      this.router.navigateByUrl('/login')
    }
    
    
  }

  vesToCoin(){
    this.decimalAux = (parseFloat(this.vesModel)/this.dolar.precio/this.changeValor)
    if(this.btnChange){
      this.decimalVes = this.decimalAux-(this.decimalAux/100*this.porcentage)
    }else{
      this.decimalVes = this.decimalAux+(this.decimalAux/100*this.porcentage)
    }
    this.coinModel = this.ochoDecimal(this.decimalVes)
    console.log(this.vesModel)
  }
  
  coinToVes(){
    this.decimalAux = (parseFloat(this.coinModel)*this.dolar.precio*this.changeValor)
    if(this.btnChange){
      this.decimalCoin = this.decimalAux+(this.decimalAux/100*this.porcentage) 
    }else{
      this.decimalCoin = this.decimalAux-(this.decimalAux/100*this.porcentage)
    }
    this.vesModel = this.dosDecimal(this.decimalCoin)
  }

  ochoDecimal(valor:any){
    return valor.toFixed(8)
  }
  dosDecimal(valor:any){
    return valor.toFixed(2)
  }

  changeCoin(item:string,price:number){
    this.changeValor = price
    this.symbol = item
    this.vesToCoin()
  }

  changeConvert(){
    this.btnChange = (!this.btnChange)
    this.vesModel = ""
    this.coinModel = ""
  }

}
