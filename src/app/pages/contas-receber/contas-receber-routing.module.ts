import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContasReceberIndexComponent } from './contas-receber-index/contas-receber-index.component';
import { ContasReceberFormComponent } from './contas-receber-form/contas-receber-form.component';

const routes: Routes = [
  {path: '', component: ContasReceberIndexComponent},
  {path: 'create', component: ContasReceberFormComponent},
  {path: 'edit/:id', component: ContasReceberFormComponent}
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContasReceberRoutingModule { }
