import { Component, OnInit } from '@angular/core';
import { SwPush } from '@angular/service-worker';
import { NotificationsService } from '../../services/notifications.service';

@Component({
  selector: 'app-admin-push',
  templateUrl: './admin-push.component.html',
  styleUrls: ['./admin-push.component.css']
})
export class AdminPushComponent implements OnInit {

  endpoint:any="";
  readonly VAPID_PUBLIC_KEY = "BIlfXfJh1uTbF0cQl6yxlBEtPZ6j_9N7IoxLBA9mu5Xoz3JQ7YKBdRVdFtXsQJI1xfz0Nkwp8SfxPXvHVzDbzj8"
  objCalc:any;
  constructor( private swpush:SwPush, private notification:NotificationsService){
  
  }

  ngOnInit(): void { 
    this.swpush
    .requestSubscription({
      serverPublicKey:this.VAPID_PUBLIC_KEY
    })
    .then(res =>{
      this.endpoint = res
      console.log("esta es la respuesta: "+res)
    })
    .catch(err =>{
      console.log("Error en la matrix: "+err)
    })
  }

  send(){
    this.notification.send().subscribe((res)=>{
      console.log(res)
    },(err)=>{
      console.log("Ocurrio un error en el envio de la notificacion2: "+err.error.error)
    })
  }
 /*  save(){
    this.notification.save(this.endpoint).subscribe((res)=>{
      console.log("Guardando notificacion: "+res)
      alert("Dispositivo agregado con exito")
    },(err)=>{
      alert("No se pudo agregar")
      console.log("Ocurrio un error al guardar el enpoint de la notificacion: "+err)
    })
  } */

}
