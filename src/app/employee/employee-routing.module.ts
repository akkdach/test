import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SalaryComponent } from './salary/salary.component';
import { ImportDataComponent } from './import-data/import-data.component';
import { InstallmentComponent } from './installment/installment.component';
import { Component } from '@fullcalendar/core';


const routes: Routes = [

  {
    path: 'salary',
    component: SalaryComponent
  },
  {
    path: 'import-data',
    component: ImportDataComponent
  },
  {
    path: 'installment',
    component: InstallmentComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule { }
