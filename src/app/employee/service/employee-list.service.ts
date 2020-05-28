import { Injectable } from '@angular/core';
import { ApiServiceProvider } from '../../../providers/api-service/api-service';
declare const swal: any;
@Injectable({
  providedIn: 'root'
})
export class EmployeeListService {
  
  constructor( public authService: ApiServiceProvider) {
    
   }
  resEmp: any;
  dataEmp: any;
  
  getData(res){
    //swal("getdata","","");
    this.authService.postData([], "employee/list").then((result) => {
      this.resEmp = result;
      //swal(JSON.stringify(this.resEmp.data[0]),"","success");
      this.dataEmp = this.resEmp.data;
      res("success");
    }, (err) => {
      swal("ผิดพลาด "+err,"","danger");
    });
  }
}
