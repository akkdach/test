import { Component, OnInit } from '@angular/core';
import { DynamicScriptLoaderService } from './../../services/dynamic-script-loader.service';
declare const $: any;
@Component({
  selector: 'app-editable-table',
  templateUrl: './editable-table.component.html',
  styleUrls: ['./editable-table.component.scss']
})
export class EditableTableComponent implements OnInit {
data=[];
  constructor(private dynamicScriptLoader: DynamicScriptLoaderService) { }

  ngOnInit() {
    'use strict';
    this.startScript();
    this.  generatedDat();
  }

  async startScript() {
    await this.dynamicScriptLoader.load('editable-table').then(data => {
      this.loadData();
    }).catch(error => console.log(error));
  }

  private loadData() {
    $('#mainTable').editableTableWidget();
  }

  generatedDat()
  {

    this.data=
    [{name:"car",cost:100,profit:200,fun:0},
    {name:"bike",cost:330,profit:240,fun:0},
    {name:"plane",cost:430,profit:540,fun:2},
    {name:"yatch",cost:100,profit:200,fun:0},
    {name:"yatch",cost:100,profit:200,fun:0},
    {name:"Segway",cost:330,profit:240,fun:1}];
  }

}

