import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FornecedoresFormComponent } from './fornecedores-form/fornecedores-form.component';
import { FornecedoresIndexComponent } from './fornecedores-index/fornecedores-index.component';

const routes: Routes = [
  {path: '', component: FornecedoresIndexComponent},
  {path: 'create', component: FornecedoresFormComponent},
  {path: 'edit/:id', component: FornecedoresFormComponent}
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FornecedoresRoutingModule { }
