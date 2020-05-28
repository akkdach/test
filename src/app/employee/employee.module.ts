import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeeRoutingModule } from './employee-routing.module';
import { SalaryComponent } from './salary/salary.component';
import { InfoComponent } from './info/info.component';
import { ImportDataComponent } from './import-data/import-data.component';
import { InstallmentComponent } from './installment/installment.component';

import { DropzoneModule } from 'ngx-dropzone-wrapper';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { ReactiveFormsModule } from '@angular/forms';
import { CustomFormsModule } from 'ng2-validation';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';


@NgModule({
  declarations: [SalaryComponent, InfoComponent, ImportDataComponent, InstallmentComponent],
  imports: [
    CommonModule,
    EmployeeRoutingModule,
    DropzoneModule,
    CKEditorModule,
    ReactiveFormsModule,
    CustomFormsModule,
    NgxDatatableModule
  ]
})
export class EmployeeModule { }