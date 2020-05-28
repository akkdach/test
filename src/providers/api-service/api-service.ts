
import { Injectable } from '@angular/core';




//ที่อยู่ API
//let apiUrl = "http://localhost:8080/api/api-test/";
//let apiUrl = "https://scanme.in.th/ads/";
let apiUrl = "http://localhost:3000/";
//let apiUrl = "http://mnt-cs.drayddns.com:1025/api/test//";
let apiUrlNode = "http://startup.thddns.net:2883/myApi/";


/*
  Generated class for the ApiServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ApiServiceProvider {

 // constructor(public http: HttpClient) {
  constructor() {

  }

  postData(credentials, type){

    return new Promise((resolve, reject) =>{
      const req = new XMLHttpRequest();
     
      //req.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
      console.log(apiUrl+type);
      req.open('POST',apiUrl+type);
      req.setRequestHeader("keys","MEECAPSKDLFSSDFL@SLSLSO@!SLS");
      req.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
      req.send(JSON.stringify(credentials));

      req.onload = () => {
        const data = JSON.parse(req.response);
      
        resolve(data);
      };
    });

  }



  

}



