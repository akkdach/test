import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
userData:any;
  constructor() { }

  ngOnInit() {
    this.getUserDetail();
  }

  getUserDetail()
  {
    this.userData= JSON.parse(localStorage.getItem("mee-login"));
    console.log("Load User Data");
    console.log(this.userData);
  }
}
