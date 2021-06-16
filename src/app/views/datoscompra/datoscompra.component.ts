import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-datoscompra',
  templateUrl: './datoscompra.component.html',
  styleUrls: ['./datoscompra.component.css']
})
export class DatoscompraComponent implements OnInit {

  ves:any;
  coin:any;
  amount:any;
  wallet:any;
  banco:string ="ven"
  email:any = localStorage.getItem('sessionEmail')
  constructor(private activated:ActivatedRoute ) {
    
     }

  ngOnInit(): void {
      this.activated.params.subscribe(param=>{
      this.ves = param.ves;
      this.coin = param.coin;
      this.amount = param.amount;
    })
  }
}
