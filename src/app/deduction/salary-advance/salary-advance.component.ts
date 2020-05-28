import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';

import { DynamicScriptLoaderService } from './../../services/dynamic-script-loader.service';
import {EmployeeListService} from '../../employee/service/employee-list.service';

declare const $: any;
declare const M: any;
declare const swal: any;
@Component({
  selector: 'app-salary-advance',
  templateUrl: './salary-advance.component.html',
  styleUrls: ['./salary-advance.component.sass']
})
export class SalaryAdvanceComponent implements OnInit {
  @ViewChild('roleTemplate', { static: true }) roleTemplate: TemplateRef<any>;
  @ViewChild(DatatableComponent, { static: false }) table: DatatableComponent;
  @ViewChild(DatatableComponent, { static: false }) tableEMP: DatatableComponent;


  rows = [];
  selectedName: string = "";
  formData = [];
  imgPath: string = "";
  selectedRowData: selectRowInterface;
  newUserImg = "assets/images/user/user1.jpg";
  userInfo :any;

  columns = [
    { name: 'First Name' }, { name: 'Last Name' }, { name: 'Gender' }, { name: 'Phone' }, { name: 'Email' }, { name: 'Address' }
  ];

  allColumns = [{ name: 'First Name' }, { name: 'Last Name' }, { name: 'Gender' }, { name: 'Phone' }, { name: 'Email' }, { name: 'Address' }];

  columnsEMP = [
    { name: 'cutCode' }, { name: 'fullName' }, { name: 'custPhone' }, { name: 'cutType' }, { name: 'custStatus' }
  ];

  data = [];
  dataEmp=[];
  filteredData = [];
  filteredDataEmp = [];
  basicForm: FormGroup;

  addRowForm: FormGroup;

  constructor(private dynamicScriptLoader: DynamicScriptLoaderService, private fb: FormBuilder, private empList : EmployeeListService) {

    this.addRowForm = this.fb.group({
      wdCode : new FormControl(),
      empCode : new FormControl(),
      docDate : new FormControl(),
      capital: new FormControl(),
      saveBy: new FormControl(),
    });
  }

  ngOnInit() {
    this.userInfo = JSON.parse(localStorage.getItem('mee-login'));
    this.empList.getData(res=>{
      this.dataEmp = this.empList.dataEmp;
      this.filteredDataEmp = this.dataEmp;
    });
    $('select').formSelect();
    /*
    this.fetch((data) => {
      this.data = data;
      // copy over dataset to empty object
      this.filteredData = data;
    });
    */
   this.startScript();
   this.data= this.generateDat();
   this.filteredData = this.data;
   this.addRowForm.patchValue({
    saveBy: this.userInfo.name,
   });

  }

  async startScript() {
    //console.log(JSON.stringify(this.addRowForm));
		await this.dynamicScriptLoader.load('form.min', 'bootstrap-colorpicker').then(data => {
			this.loadData();
		}).catch(error => console.log(error));
  }
  
  selectedEmp(row){
    $('#empModal').modal('hide');
    this.addRowForm.patchValue({
      empCode: row.cutCode,
     });
  }
/*
  editRow(row) {
    this.basicForm.patchValue({
      id: row.id,
      firstName: row.firstName,
      lastName: row.lastName,
      phone: row.phone,
      email: row.email,
      address: row.address,
      img: row.img
    });
    this.selectedRowData = row;

    M.updateTextFields();
  }

  addRow() {
    this.addRowForm.patchValue({
      id: this.getId(10, 100),
      img: this.newUserImg
    });
    M.updateTextFields();
  }


  deleteRow(row) {
    // console.log(row.id);
    this.data = this.arrayRemove(this.data, row.id)
    this.showNotification("bg-red", "Delete Record Successfully", "bottom", "right", "animated fadeInRight", "animated fadeOutRight")
  }

  arrayRemove(array, id) {
    return array.filter(function (element) {
      return element.id != id;
    });

  }

  onEditSave(form: FormGroup) {
    this.data = this.data.filter((value, key) => {
      if (value.id == form.value.id) {
        value.firstName = form.value.firstName;
        value.lastName = form.value.lastName;
        value.phone = form.value.phone;
        value.email = form.value.email;
        value.address = form.value.address;
      }
      $('#editModal').modal('hide');

      return true;
    });
    this.showNotification("bg-black", "Edit Record Successfully", "bottom", "right", "animated fadeInRight", "animated fadeOutRight")
  }

  onAddRowSave(form: FormGroup) {
    this.data.push(form.value);
    this.data = [...this.data];
    // console.log(this.data);
    form.reset();
    $('#addModal').modal('hide');
    this.showNotification("bg-green", "Add Record Successfully", "bottom", "right", "animated fadeInRight", "animated fadeOutRight")
  }

  fetch(cb) {
    const req = new XMLHttpRequest();
    req.open('GET', 'assets/data/adv-tbl-data.json');

    req.onload = () => {
      const data = JSON.parse(req.response);
      cb(data);
    };

    req.send();
  }
  */

  filterDatatable(event) {
    // get the value of the key pressed and make it lowercase
    let val = event.target.value.toLowerCase();
    // get the amount of columns in the table
    let colsAmt = this.columns.length;
    // get the key names of each column in the dataset
    let keys = Object.keys(this.filteredData[0]);
    // assign filtered matches to the active datatable
    this.data = this.filteredData.filter(function (item) {
      // iterate through each row's column data
      for (let i = 0; i < colsAmt; i++) {
        // check for a match
        if (item[keys[i]].toString().toLowerCase().indexOf(val) !== -1 || !val) {
          // found match, return true to add to result set
          return true;
        }
      }
    });
    // whenever the filter changes, always go back to the first page
    this.table.offset = 0;
  }

  filterDatatableEMP(event) {
    
    // get the value of the key pressed and make it lowercase
    let val = event.target.value.toLowerCase();
    // get the amount of columns in the table
    let colsAmt = this.columnsEMP.length;
    //alert(colsAmt);
    // get the key names of each column in the dataset
    let keys = Object.keys(this.filteredDataEmp[0]);
    //alert(keys);
    // assign filtered matches to the active datatable
    this.dataEmp = this.filteredDataEmp.filter(function (item) {
      // iterate through each row's column data
      for (let i = 0; i < colsAmt; i++) {
        // check for a match
        if (item[keys[i]].toString().toLowerCase().indexOf(val) !== -1 || !val) {
          // found match, return true to add to result set
          return true;
        }
      }
    });
    // whenever the filter changes, always go back to the first page
    this.tableEMP.offset = 0;
  }

  getId(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
  showNotification(colorName, text, placementFrom, placementAlign, animateEnter, animateExit) {
    if (colorName === null || colorName === '') { colorName = 'bg-black'; }
    if (text === null || text === '') { text = 'Turning standard Bootstrap alerts'; }
    if (animateEnter === null || animateEnter === '') { animateEnter = 'animated fadeInDown'; }
    if (animateExit === null || animateExit === '') { animateExit = 'animated fadeOutUp'; }
    var allowDismiss = true;

    $.notify({
      message: text
    },
      {
        type: colorName,
        allow_dismiss: allowDismiss,
        newest_on_top: true,
        timer: 1000,
        placement: {
          from: placementFrom,
          align: placementAlign
        },
        animate: {
          enter: animateEnter,
          exit: animateExit
        },
        template: '<div data-notify="container" class="bootstrap-notify-container alert alert-dismissible {0} ' + (allowDismiss ? "p-r-35" : "") + '" role="alert">' +
          '<span data-notify="icon"></span> ' +
          '<span data-notify="title">{1}</span> ' +
          '<span data-notify="message">{2}</span>' +
          '<div class="progress" data-notify="progressbar">' +
          '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
          '</div>' +
          '<a href="{3}" target="{4}" data-notify="url"></a>' +
          '</div>'
      });
  }

  private loadData() {

		//autocomplete
		var elems = document.querySelector('.autocomplete');
		var instances = M.Autocomplete.init(elems);

		instances.updateData({
			"Apple": null,
			"Microsoft": null,
			"Google": 'https://placehold.it/250x250'
		});

		instances.open();


		$('.colorpicker').colorpicker();

    this.initBasicSelect();
    
		//Select2
		$(".select2").select2();

  }
  
  private initBasicSelect() {
		/* basic select start*/
		$('select').formSelect();
		$('#sel').formSelect();
		var data = [{ id: 1, name: "Option 1" }, { id: 2, name: "Option 2" }, { id: 3, name: "Option 3" }];

		var Options = "";
		$.each(data, function (i, val) {
			$('#sel').append("<option value='" + val.id + "'>" + val.name + "</option>");
			$('#sel').formSelect();
		});
		/* basic select end*/
	}


  generateDat()
  {
    return [
      {
          "id": 0,
          "img": "assets/images/user/user6.jpg",
          "firstName": "Darlene",
          "lastName": "Riggs",
          "gender": "female",
          "phone": "+1 (811) 538-3408",
          "email": "example@test.com",
          "age": 39,
          "address": "406 Mill Avenue"
      },
      {
          "id": 1,
          "img": "assets/images/user/user3.jpg",
          "firstName": "Head",
          "lastName": "Newton",
          "gender": "male",
          "phone": "+1 (847) 585-2042",
          "email": "example@test.com",
          "age": 34,
          "address": "316 Monitor Street"
      },
      {
          "id": 2,
          "img": "assets/images/user/user8.jpg",
          "firstName": "Desiree",
          "lastName": "Schneider",
          "gender": "female",
          "phone": "+1 (995) 549-2754",
          "email": "example@test.com",
          "age": 32,
          "address": "267 Pacific Street"
      },
      {
          "id": 3,
          "img": "assets/images/user/user5.jpg",
          "firstName": "Holman",
          "lastName": "Mann",
          "gender": "male",
          "phone": "+1 (975) 430-3063",
          "email": "example@test.com",
          "age": 20,
          "address": "268 Taaffe Place"
      },
      {
          "id": 4,
          "img": "assets/images/user/user3.jpg",
          "firstName": "Stephens",
          "lastName": "Vega",
          "gender": "male",
          "phone": "+1 (841) 561-3826",
          "email": "example@test.com",
          "age": 37,
          "address": "315 Dahl Court"
      },
      {
          "id": 5,
          "img": "assets/images/user/user10.jpg",
          "firstName": "Cassie",
          "lastName": "Abbott",
          "gender": "female",
          "phone": "+1 (874) 592-2349",
          "email": "example@test.com",
          "age": 27,
          "address": "944 Clark Street"
      },
      {
          "id": 6,
          "img": "assets/images/user/user9.jpg",
          "firstName": "Romero",
          "lastName": "Pierce",
          "gender": "male",
          "phone": "+1 (954) 511-2933",
          "email": "example@test.com",
          "age": 28,
          "address": "898 Irving Place"
      },
      {
          "id": 7,
          "img": "assets/images/user/user3.jpg",
          "firstName": "Juanita",
          "lastName": "Norris",
          "gender": "female",
          "phone": "+1 (914) 512-2265",
          "email": "example@test.com",
          "age": 40,
          "address": "474 Wakeman Place"
      },
      {
          "id": 8,
          "img": "assets/images/user/user6.jpg",
          "firstName": "Duke",
          "lastName": "Sargent",
          "gender": "male",
          "phone": "+1 (916) 556-3683",
          "email": "example@test.com",
          "age": 38,
          "address": "818 Bragg Street"
      },
      {
          "id": 9,
          "img": "assets/images/user/user9.jpg",
          "firstName": "Selena",
          "lastName": "West",
          "gender": "female",
          "phone": "+1 (878) 551-2618",
          "email": "example@test.com",
          "age": 25,
          "address": "364 Greenwood"
      },
      {
          "id": 10,
          "img": "assets/images/user/user3.jpg",
          "firstName": "Lane",
          "lastName": "Sims",
          "gender": "male",
          "phone": "+1 (868) 545-3934",
          "email": "example@test.com",
          "age": 20,
          "address": "293 Cove Lane"
      },
      {
          "id": 11,
          "img": "assets/images/user/user5.jpg",
          "firstName": "Alexandra",
          "lastName": "Carr",
          "gender": "female",
          "phone": "+1 (921) 557-3444",
          "email": "example@test.com",
          "age": 40,
          "address": "119 Wallabout Street"
      },
      {
          "id": 12,
          "img": "assets/images/user/user7.jpg",
          "firstName": "Tanner",
          "lastName": "Hoover",
          "gender": "male",
          "phone": "+1 (825) 406-2792",
          "email": "example@test.com",
          "age": 30,
          "address": "351 Ashland Place"
      },
      {
          "id": 13,
          "img": "assets/images/user/user3.jpg",
          "firstName": "Mathis",
          "lastName": "Harrell",
          "gender": "male",
          "phone": "+1 (856) 403-3786",
          "email": "example@test.com",
          "age": 40,
          "address": "950 Throop Avenue"
      },
      {
          "id": 14,
          "img": "assets/images/user/user8.jpg",
          "firstName": "Julia",
          "lastName": "Warren",
          "gender": "female",
          "phone": "+1 (939) 423-3321",
          "email": "example@test.com",
          "age": 24,
          "address": "460 Boardwalk "
      },
      {
          "id": 15,
          "img": "assets/images/user/user9.jpg",
          "firstName": "Jaclyn",
          "lastName": "Lawson",
          "gender": "female",
          "phone": "+1 (987) 565-3431",
          "email": "example@test.com",
          "age": 25,
          "address": "676 Harbor Lane"
      },
      {
          "id": 16,
          "img": "assets/images/user/user5.jpg",
          "firstName": "Paul",
          "lastName": "Chapman",
          "gender": "male",
          "phone": "+1 (864) 523-3163",
          "email": "example@test.com",
          "age": 38,
          "address": "148 Nichols Avenue"
      },
      {
          "id": 17,
          "img": "assets/images/user/user10.jpg",
          "firstName": "Aimee",
          "lastName": "Walters",
          "gender": "female",
          "phone": "+1 (995) 419-3671",
          "email": "example@test.com",
          "age": 31,
          "address": "403 Coles Street"
      },
      {
          "id": 18,
          "img": "assets/images/user/user5.jpg",
          "firstName": "Verna",
          "lastName": "Barlow",
          "gender": "female",
          "phone": "+1 (822) 553-3841",
          "email": "example@test.com",
          "age": 24,
          "address": "881 Montague Terrace"
      },
      {
          "id": 19,
          "img": "assets/images/user/user9.jpg",
          "firstName": "Beck",
          "lastName": "Singleton",
          "gender": "male",
          "phone": "+1 (895) 595-2333",
          "email": "example@test.com",
          "age": 39,
          "address": "805 Hinsdale Street"
      },
      {
          "id": 20,
          "img": "assets/images/user/user2.jpg",
          "firstName": "Baird",
          "lastName": "Stone",
          "gender": "male",
          "phone": "+1 (864) 583-3148",
          "email": "example@test.com",
          "age": 34,
          "address": "228 Opal Court"
      },
      {
          "id": 21,
          "img": "assets/images/user/user5.jpg",
          "firstName": "Helena",
          "lastName": "Best",
          "gender": "female",
          "phone": "+1 (930) 552-2302",
          "email": "example@test.com",
          "age": 23,
          "address": "311 Dorchester Road"
      },
      {
          "id": 22,
          "img": "assets/images/user/user5.jpg",
          "firstName": "Buck",
          "lastName": "Parrish",
          "gender": "male",
          "phone": "+1 (994) 565-2706",
          "email": "example@test.com",
          "age": 20,
          "address": "633 Emerson Place"
      },
      {
          "id": 23,
          "img": "assets/images/user/user2.jpg",
          "firstName": "Albert",
          "lastName": "English",
          "gender": "male",
          "phone": "+1 (824) 457-2870",
          "email": "example@test.com",
          "age": 35,
          "address": "551 Clarendon Road"
      },
      {
          "id": 24,
          "img": "assets/images/user/user6.jpg",
          "firstName": "Elinor",
          "lastName": "Waters",
          "gender": "female",
          "phone": "+1 (894) 487-2463",
          "email": "example@test.com",
          "age": 34,
          "address": "660 Lefferts Place"
      },
      {
          "id": 25,
          "img": "assets/images/user/user4.jpg",
          "firstName": "Sosa",
          "lastName": "Foster",
          "gender": "male",
          "phone": "+1 (994) 565-2578",
          "email": "example@test.com",
          "age": 38,
          "address": "532 Nixon Court"
      },
      {
          "id": 26,
          "img": "assets/images/user/user2.jpg",
          "firstName": "David",
          "lastName": "Perry",
          "gender": "male",
          "phone": "+1 (977) 485-2959",
          "email": "example@test.com",
          "age": 32,
          "address": "545 Macdougal Street"
      },
      {
          "id": 27,
          "img": "assets/images/user/user9.jpg",
          "firstName": "Imogene",
          "lastName": "Deleon",
          "gender": "female",
          "phone": "+1 (860) 492-2617",
          "email": "example@test.com",
          "age": 37,
          "address": "512 Chestnut Avenue"
      },
      {
          "id": 28,
          "img": "assets/images/user/user8.jpg",
          "firstName": "Fay",
          "lastName": "England",
          "gender": "female",
          "phone": "+1 (846) 595-3003",
          "email": "example@test.com",
          "age": 33,
          "address": "227 Seeley Street"
      },
      {
          "id": 29,
          "img": "assets/images/user/user4.jpg",
          "firstName": "Benita",
          "lastName": "Benson",
          "gender": "female",
          "phone": "+1 (917) 413-3569",
          "email": "example@test.com",
          "age": 39,
          "address": "577 Ryder Street"
      },
      {
          "id": 30,
          "img": "assets/images/user/user2.jpg",
          "firstName": "Thelma",
          "lastName": "Hale",
          "gender": "female",
          "phone": "+1 (950) 517-2905",
          "email": "example@test.com",
          "age": 38,
          "address": "630 Lott Street"
      },
      {
          "id": 31,
          "img": "assets/images/user/user7.jpg",
          "firstName": "Larson",
          "lastName": "Graham",
          "gender": "male",
          "phone": "+1 (902) 423-3030",
          "email": "example@test.com",
          "age": 35,
          "address": "825 Calyer Street"
      },
      {
          "id": 32,
          "img": "assets/images/user/user5.jpg",
          "firstName": "Kenya",
          "lastName": "Nguyen",
          "gender": "female",
          "phone": "+1 (913) 416-3912",
          "email": "example@test.com",
          "age": 35,
          "address": "163 Stuart Street"
      },
      {
          "id": 33,
          "img": "assets/images/user/user7.jpg",
          "firstName": "Richmond",
          "lastName": "Clements",
          "gender": "male",
          "phone": "+1 (880) 468-2272",
          "email": "example@test.com",
          "age": 22,
          "address": "830 Kosciusko Street"
      },
      {
          "id": 34,
          "img": "assets/images/user/user8.jpg",
          "firstName": "Garner",
          "lastName": "Wolf",
          "gender": "male",
          "phone": "+1 (817) 482-2274",
          "email": "example@test.com",
          "age": 23,
          "address": "471 Holmes Lane"
      },
      {
          "id": 35,
          "img": "assets/images/user/user2.jpg",
          "firstName": "Tammi",
          "lastName": "Goodwin",
          "gender": "female",
          "phone": "+1 (805) 550-3654",
          "email": "example@test.com",
          "age": 25,
          "address": "772 Stoddard Place"
      },
      {
          "id": 36,
          "img": "assets/images/user/user4.jpg",
          "firstName": "Autumn",
          "lastName": "Phelps",
          "gender": "female",
          "phone": "+1 (906) 580-2631",
          "email": "example@test.com",
          "age": 35,
          "address": "608 Lamont Court"
      },
      {
          "id": 37,
          "img": "assets/images/user/user10.jpg",
          "firstName": "Iris",
          "lastName": "Brown",
          "gender": "female",
          "phone": "+1 (800) 561-3799",
          "email": "example@test.com",
          "age": 22,
          "address": "538 Foster Avenue"
      },
      {
          "id": 38,
          "img": "assets/images/user/user3.jpg",
          "firstName": "Hudson",
          "lastName": "Robinson",
          "gender": "male",
          "phone": "+1 (961) 430-2999",
          "email": "example@test.com",
          "age": 36,
          "address": "566 Llama Court"
      },
      {
          "id": 39,
          "img": "assets/images/user/user9.jpg",
          "firstName": "Hood",
          "lastName": "Morse",
          "gender": "male",
          "phone": "+1 (848) 419-2983",
          "email": "example@test.com",
          "age": 29,
          "address": "489 Cobek Court"
      },
      {
          "id": 40,
          "img": "assets/images/user/user5.jpg",
          "firstName": "Sue",
          "lastName": "Smith",
          "gender": "female",
          "phone": "+1 (915) 551-3831",
          "email": "example@test.com",
          "age": 20,
          "address": "826 Alice Court"
      },
      {
          "id": 41,
          "img": "assets/images/user/user10.jpg",
          "firstName": "Silvia",
          "lastName": "Lancaster",
          "gender": "female",
          "phone": "+1 (880) 578-2923",
          "email": "example@test.com",
          "age": 26,
          "address": "981 Village Road"
      },
      {
          "id": 42,
          "img": "assets/images/user/user4.jpg",
          "firstName": "Summers",
          "lastName": "Christian",
          "gender": "male",
          "phone": "+1 (927) 479-3790",
          "email": "example@test.com",
          "age": 40,
          "address": "595 Livonia Avenue"
      },
      {
          "id": 43,
          "img": "assets/images/user/user3.jpg",
          "firstName": "Jacobs",
          "lastName": "Terrell",
          "gender": "male",
          "phone": "+1 (990) 491-3442",
          "email": "example@test.com",
          "age": 29,
          "address": "734 Scott Avenue"
      },
      {
          "id": 44,
          "img": "assets/images/user/user5.jpg",
          "firstName": "Howell",
          "lastName": "Lang",
          "gender": "male",
          "phone": "+1 (815) 542-3206",
          "email": "example@test.com",
          "age": 33,
          "address": "986 Coleman Street"
      },
      {
          "id": 45,
          "img": "assets/images/user/user7.jpg",
          "firstName": "Eve",
          "lastName": "Battle",
          "gender": "female",
          "phone": "+1 (828) 442-3156",
          "email": "example@test.com",
          "age": 33,
          "address": "235 Dare Court"
      },
      {
          "id": 46,
          "img": "assets/images/user/user7.jpg",
          "firstName": "Jeri",
          "lastName": "Moran",
          "gender": "female",
          "phone": "+1 (884) 490-2332",
          "email": "example@test.com",
          "age": 31,
          "address": "392 Cyrus Avenue"
      }
  ];
  }
}

export interface selectRowInterface {
  img: String;
  firstName: String;
  lastName: String;
}