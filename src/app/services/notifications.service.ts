import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  urlGeneral:String;
  constructor(private http:HttpClient) { 

    this.urlGeneral = environment.urlGeneral

  }

  send(){
    return this.http.post(this.urlGeneral+"/notifications/send",{})
    .pipe(map((resp:any)=>{
      //console.log("respuesta en el map:"+ JSON.stringify(resp) )
      return  resp
    }))
  }

  /* save(endpointAndKeys:any){

    
    return this.http.post(this.urlGeneral+"/notifications/save",endpointAndKeys)
    .pipe(map((resp:any)=>{
      console.log("Pasando por el map del save notification: "+resp)
      return resp
    }))
  } */

}

