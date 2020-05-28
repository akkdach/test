import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SalaryAdvanceComponent } from './salary-advance/salary-advance.component';


const routes: Routes = [
  {
    path: 'loan',
    loadChildren: () => import('./loan/loan.component').then(m => m.LoanComponent)
  },
  {
    path: 'advance',
    component: SalaryAdvanceComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DeductionRoutingModule { }
