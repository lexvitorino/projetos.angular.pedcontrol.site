import { NgModule } from '@angular/core';

import { ContasPagarRoutingModule } from './contas-pagar-routing.module';
import { ContasPagarIndexComponent } from './contas-pagar-index/contas-pagar-index.component';
import { ContasPagarFormComponent } from './contas-pagar-form/contas-pagar-form.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [ContasPagarIndexComponent, ContasPagarFormComponent],
  imports: [
    SharedModule,
    ContasPagarRoutingModule
  ]
})
export class ContasPagarModule { }
