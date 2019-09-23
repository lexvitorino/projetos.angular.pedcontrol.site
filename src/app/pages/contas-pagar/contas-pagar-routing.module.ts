import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContasPagarFormComponent } from './contas-pagar-form/contas-pagar-form.component';
import { ContasPagarIndexComponent } from './contas-pagar-index/contas-pagar-index.component';

const routes: Routes = [
  {path: '', component: ContasPagarIndexComponent},
  {path: 'create', component: ContasPagarFormComponent},
  {path: 'edit/:id', component: ContasPagarFormComponent}
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContasPagarRoutingModule { }
