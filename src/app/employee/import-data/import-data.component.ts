import { Component, OnInit } from '@angular/core';
import { DropzoneConfigInterface } from 'ngx-dropzone-wrapper';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import * as XLSX from 'xlsx';
import { DynamicScriptLoaderService } from './../../services/dynamic-script-loader.service';
import { Router, ActivatedRoute } from '@angular/router';
import { asLiteral } from '@angular/compiler/src/render3/view/util';
import { ApiServiceProvider } from '../../../providers/api-service/api-service';

declare const $: any;
declare const M: any;
declare const flatpickr: any;
declare const swal: any;



@Component({
  selector: 'app-import-data',
  templateUrl: './import-data.component.html',
  styleUrls: ['./import-data.component.sass']
})


export class ImportDataComponent implements OnInit {
  basicForm: FormGroup;
  submitted = false;
  returnUrl: string;
  resposeData: any;

  datastring: any;
  dataCustString :any;
  dataWarString:any;
  dataCartString:any;
  // dragdrop file upload
  public config: DropzoneConfigInterface = {
    url: 'https://example.com/post',    //Change your upload url
    maxFiles: 10,
    clickable: true,
    uploadMultiple: true,
    acceptedFiles: 'image/*',
    createImageThumbnails: true
  };

  constructor(private dynamicScriptLoader: DynamicScriptLoaderService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    public authService: ApiServiceProvider,
    private router: Router
  ) { }


  ngOnInit() {

    this.basicForm = new FormGroup({
      txtFile: new FormControl(''),
    });

    this.startScript();

    // for labels overlapping prefilled content on floating label textitem
    M.updateTextFields();
  }

///////////////////////////
/////นำเข้าข้อมูลสัญญา///////
  onFileChange(ev) {
    let workBook = null;
    let jsonData = null;
    const reader = new FileReader();
    const file = ev.target.files[0];
    reader.onload = (event) => {
      const data = reader.result;
      workBook = XLSX.read(data, { type: 'binary' });
      jsonData = workBook.SheetNames.reduce((initial, name) => {
        const sheet = workBook.Sheets["templatePol"];
        initial[name] = XLSX.utils.sheet_to_json(sheet);
        return initial;
      }, {});
      this.datastring = JSON.stringify(jsonData.templatePol);
      let dts = this.datastring;
   //   document.getElementById('output').innerHTML = dts;
    }
    reader.readAsBinaryString(file);
  }

  postImport() {
    if (this.datastring.length > 0) {
      this.authService.postData({ data: this.datastring }, "customer/imports").then((result) => {
        this.resposeData = result;
        //   console.log(result);
        //swal("เกิดข้อผิดพลาด"+result, "", "error");
        if (this.resposeData.status == "success") {
          swal("นำเข้าข้อมูลสำเร็จ!", "", "success");
        }
        else {
          swal("เกิดข้อผิดพลาด", "", "error");
          return;
        }
      }, (err) => {

      });

    } else {
      swal("ไม่พบข้อมูลนำเข้า", "", "warning");
    }

  }


  
  ////////////////////
  ////นำเข้าข้อมูลลูกค้า///
  ////////////////////
  onCustFileChange(ev) {
    let workBook = null;
    let jsonData = null;
    const reader = new FileReader();
    const file = ev.target.files[0];
    reader.onload = (event) => {
      const data = reader.result;
      workBook = XLSX.read(data, { type: 'binary' });
      jsonData = workBook.SheetNames.reduce((initial, name) => {
        const sheet = workBook.Sheets["templateCust"];
        initial[name] = XLSX.utils.sheet_to_json(sheet);
        return initial;
      }, {});
      this.dataCustString = JSON.stringify(jsonData.templateCust);
      let dts = this.dataCustString;
     // document.getElementById('outputCust').innerHTML = dts;
    }
    reader.readAsBinaryString(file);
  }

  postCustImport() {
    if (this.dataCustString.length > 0) {
      this.authService.postData({ data: this.dataCustString }, "customer/importsCustomer").then((result) => {
        this.resposeData = result;
        //   console.log(result);
        //swal("เกิดข้อผิดพลาด"+result, "", "error");
        if (this.resposeData.status == "success") {
          swal("นำเข้าข้อมูลสำเร็จ!", "", "success");
        }
        else {
          swal("เกิดข้อผิดพลาด", "", "error");
          return;
        }
      }, (err) => {

      });

    } else {
      swal("ไม่พบข้อมูลนำเข้า", "", "warning");
    }

  }

    ////////////////////
  ////นำเข้าข้อมูลลูกรถ///
  ////////////////////
  onWarFileChange(ev) {
    let workBook = null;
    let jsonData = null;
    const reader = new FileReader();
    const file = ev.target.files[0];
    reader.onload = (event) => {
      const data = reader.result;
      workBook = XLSX.read(data, { type: 'binary' });
      jsonData = workBook.SheetNames.reduce((initial, name) => {
        const sheet = workBook.Sheets["templateWar"];
        initial[name] = XLSX.utils.sheet_to_json(sheet);
        return initial;
      }, {});
      this.dataWarString = JSON.stringify(jsonData.templateCar);
      //let dts = this.dataCartString;
     // document.getElementById('outputCust').innerHTML = dts;
    }
    reader.readAsBinaryString(file);
  }

  postWarImport() {
    if (this.dataWarString.length > 0) {
      this.authService.postData({ data: this.dataWarString }, "customer/importsWar").then((result) => {
        this.resposeData = result;
        //   console.log(result);
        //swal("เกิดข้อผิดพลาด"+result, "", "error");
        if (this.resposeData.status == "success") {
          swal("นำเข้าข้อมูลสำเร็จ!", "", "success");
        }
        else {
          swal("เกิดข้อผิดพลาด", "", "error");
          return;
        }
      }, (err) => {

      });

    } else {
      swal("ไม่พบข้อมูลนำเข้า", "", "warning");
    }

  }

  ////////////////////
  ////นำเข้าข้อมูลลูกรถ///
  ////////////////////
  onCarFileChange(ev) {
    let workBook = null;
    let jsonData = null;
    const reader = new FileReader();
    const file = ev.target.files[0];
    reader.onload = (event) => {
      const data = reader.result;
      workBook = XLSX.read(data, { type: 'binary' });
      jsonData = workBook.SheetNames.reduce((initial, name) => {
        const sheet = workBook.Sheets["templateCar"];
        initial[name] = XLSX.utils.sheet_to_json(sheet);
        return initial;
      }, {});
      this.dataCartString = JSON.stringify(jsonData.templateCar);
      //let dts = this.dataCartString;
     // document.getElementById('outputCust').innerHTML = dts;
    }
    reader.readAsBinaryString(file);
  }

  postCarImport() {
    if (this.dataCartString.length > 0) {
      this.authService.postData({ data: this.dataCartString }, "customer/importsCar").then((result) => {
        this.resposeData = result;
        //   console.log(result);
        //swal("เกิดข้อผิดพลาด"+result, "", "error");
        if (this.resposeData.status == "success") {
          swal("นำเข้าข้อมูลสำเร็จ!", "", "success");
        }
        else {
          swal("เกิดข้อผิดพลาด", "", "error");
          return;
        }
      }, (err) => {

      });

    } else {
      swal("ไม่พบข้อมูลนำเข้า", "", "warning");
    }

  }

  async startScript() {

  }

  private loadData() {



  }

}
