import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProdutosIndexComponent } from './produtos-index/produtos-index.component';
import { ProdutosFormComponent } from './produtos-form/produtos-form.component';

const routes: Routes = [
  {path: '', component: ProdutosIndexComponent},
  {path: 'create', component: ProdutosFormComponent},
  {path: 'edit/:id', component: ProdutosFormComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProdutosRoutingModule { }
