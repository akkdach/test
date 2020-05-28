import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { ArchwizardModule } from 'angular-archwizard';
import { ReactiveFormsModule } from '@angular/forms';

import { DeductionRoutingModule } from './deduction-routing.module';
import { LoanComponent } from './loan/loan.component';
import { SalaryAdvanceComponent } from './salary-advance/salary-advance.component';


import { CustomFormsModule } from 'ng2-validation';

@NgModule({
  declarations: [LoanComponent, SalaryAdvanceComponent],
  imports: [
    CommonModule,
    DeductionRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxDatatableModule,
    CustomFormsModule,
    CKEditorModule
  ]
})
export class DeductionModule { }
