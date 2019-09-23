import { NgModule } from '@angular/core';

import { PedidosRoutingModule } from './pedidos-routing.module';
import { PedidosIndexComponent } from './pedidos-index/pedidos-index.component';
import { PedidosFormComponent } from './pedidos-form/pedidos-form.component';
import { SharedModule } from '../../shared/shared.module';
import { PedidosItensComponent } from './pedidos-itens/pedidos-itens.component';
import { PedidosCondsPagtoComponent } from './pedidos-cond-pagtos/pedidos-cond-pagtos.component';

@NgModule({
  declarations: [PedidosIndexComponent, PedidosFormComponent, PedidosItensComponent, PedidosCondsPagtoComponent],
  exports: [PedidosItensComponent, PedidosCondsPagtoComponent],
  imports: [
    SharedModule,
    PedidosRoutingModule
  ]
})
export class PedidosModule { }
