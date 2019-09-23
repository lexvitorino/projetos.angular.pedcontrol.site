import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClientesIndexComponent } from './clientes-index/clientes-index.component';
import { ClientesFormComponent } from './clientes-form/clientes-form.component';

const routes: Routes = [
  {path: '', component: ClientesIndexComponent},
  {path: 'create', component: ClientesFormComponent},
  {path: 'edit/:id', component: ClientesFormComponent}
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientesRoutingModule { }
