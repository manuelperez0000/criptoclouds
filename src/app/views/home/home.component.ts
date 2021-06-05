import { Component, OnInit } from '@angular/core';
import { PrecioDolarService } from '../../services/precio-dolar.service';
import { CoinsPricesService } from '../../services/coins-prices.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  loading:boolean = true
  loadingCripto:boolean = true
  dolar:any = {precio:0}
  listaCriptos:any = [{"price":0}]
  recibes:number = 0
  cripto:number = 0
  inputValue:number = 1
  constructor(private precio:PrecioDolarService,
              private coins:CoinsPricesService ) {

      this.precio.getPrecioDolar().subscribe((resp:any)=>{
        this.dolar = resp
        this.loading = false
      })
      this.coins.getCoinPrice().subscribe((res:any) =>{
        this.listaCriptos = res
        console.log(res)
        this.loadingCripto = false
      })
   }

  ngOnInit(){
    
  }

  getKey(termino:string){
    this.recibes = (parseFloat(termino)*this.listaCriptos[0].price*this.dolar.precio)*0.97 
    console.log(parseFloat(termino)*this.listaCriptos[0].price)

  }
  calcularCripto(){
    this.recibes = this.dolar.precio * this.inputValue * this.listaCriptos[0].price
  }
    
}
