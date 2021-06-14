import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-datoscompra',
  templateUrl: './datoscompra.component.html',
  styleUrls: ['./datoscompra.component.css']
})
export class DatoscompraComponent implements OnInit {

  ves:any;
  coin:any;
  amount:any;
  banco:string ="ven"
  constructor(private router:Router,private activated:ActivatedRoute ) {
    
     }

  ngOnInit(): void {
    this.activated.params.subscribe(param=>{
      this.ves = param.ves;
      this.coin = param.coin;
      this.amount = param.amount;
    })
  }
  confirmar(){
   /*  replaceState('../https://api.whatsapp.com/send?phone=584141220527&text=Manauel-Perez-Compra:'+this.coin+'%20'+this.amount+'A-Transferir:'+this.ves+'--Banco:'+this.banco) */
  }
}
