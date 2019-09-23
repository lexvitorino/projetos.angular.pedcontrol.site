import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PedidosIndexComponent } from './pedidos-index/pedidos-index.component';
import { PedidosFormComponent } from './pedidos-form/pedidos-form.component';

const routes: Routes = [
  {path: '', component: PedidosIndexComponent},
  {path: 'create', component: PedidosFormComponent},
  {path: 'edit/:id', component: PedidosFormComponent}
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PedidosRoutingModule { }
