import { Component, OnInit } from '@angular/core';
import  Swal  from 'sweetalert2';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-califications',
  templateUrl: './califications.component.html',
  styleUrls: ['./califications.component.css']
})
export class CalificationsComponent implements OnInit {
  url:any = "http://localhost:3000/firebase/calificacion";
  constructor(private router:Router, private http:HttpClient ) { }

  ngOnInit(): void {
  }
  calificar(star:number){
    Swal.fire({
      text:"Calificaste con "+star+" estrellas, tu opinion es importante para nosotros",
      title:"Muchas Gracias"
    }).then(()=>{
      var data = {
        estrellas:star
      }
      this.http.post(this.url,data).subscribe(()=>{
        this.router.navigateByUrl("/")
      })
    })
  }

}
