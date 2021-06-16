import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-datosventa',
  templateUrl: './datosventa.component.html',
  styleUrls: ['./datosventa.component.css']
})
export class DatosventaComponent implements OnInit {
  email:any = localStorage.getItem('sessionEmail')
  coin:any=""
  ves:any=""
  amount:any=""
  banco:string="ven"
  tipo:any="corriente"
  nroCuenta:any=""
  cedula:any=""
  titular:any=""

  constructor(private activated:ActivatedRoute ) { }

  ngOnInit(): void {
    this.activated.params.subscribe(param=>{
    this.ves = param.ves;
    this.coin = param.coin;
    this.amount = param.amount;
    })
  }
}
