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
  modelCalc:string=""
  loading:boolean = true
  loadingCripto:boolean = true
  dolar:any
  listaCriptos:any
  recibes:number = 0
  cripto:number = 0
  inputValue:number = 1
  symbol:string = "BTC"
  changeValor:any
  recibesUsd:number = 0
  recibesVES:number = 0

  constructor( private precio:PrecioDolarService,
               private coins:CoinsPricesService ) {
                
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

  ngOnInit(){
    
  }

  getKey(termino:string){
    this.inputValue = parseFloat(termino) 
    this.recibes = this.inputValue*this.changeValor*this.dolar.precio
    this.recibesUsd = this.inputValue*this.changeValor
    console.log(this.changeValor)
  }
  getKey2(termino:string){
    this.inputValue = parseFloat(termino) 
    this.recibesVES = this.inputValue/this.dolar.precio/this.changeValor
    this.recibesUsd = this.inputValue/this.dolar.precio
    console.log(this.changeValor) 
    
  }

  changeCoin(item:string,price:number){
    this.changeValor = price
    this.symbol = item
    this.recibes    = this.changeValor*this.dolar.precio*this.inputValue
    this.recibesVES = this.inputValue/this.dolar.precio/this.changeValor
    this.recibesUsd = this.changeValor*this.inputValue
    console.log("change: "+item+" price: "+price)
  }
  
  deleteInput(){
    this.recibes = 0
    this.recibesVES = 0
    this.inputValue = 0
    this.modelCalc = ""
  }
    
}
