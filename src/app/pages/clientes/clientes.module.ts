import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientesRoutingModule } from './clientes-routing.module';
import { ClientesIndexComponent } from './clientes-index/clientes-index.component';
import { ClientesFormComponent } from './clientes-form/clientes-form.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [ClientesIndexComponent, ClientesFormComponent],
  imports: [
    SharedModule,
    ClientesRoutingModule
  ]
})
export class ClientesModule { }
