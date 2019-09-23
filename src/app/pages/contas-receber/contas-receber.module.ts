import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContasReceberRoutingModule } from './contas-receber-routing.module';
import { ContasReceberIndexComponent } from './contas-receber-index/contas-receber-index.component';
import { ContasReceberFormComponent } from './contas-receber-form/contas-receber-form.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [ContasReceberIndexComponent, ContasReceberFormComponent],
  imports: [
    SharedModule,
    ContasReceberRoutingModule
  ]
})
export class ContasReceberModule { }
