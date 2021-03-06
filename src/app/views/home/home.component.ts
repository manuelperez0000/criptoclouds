import { Component, OnInit } from '@angular/core';
import { PrecioDolarService } from '../../services/precio-dolar.service';
import { CoinsPricesService } from '../../services/coins-prices.service';
/* import { Calc } from '../../models/calc'; */

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  vesModel:any
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

  constructor(private precio:PrecioDolarService,private coins:CoinsPricesService ) {    
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

  ngOnInit(){}

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
