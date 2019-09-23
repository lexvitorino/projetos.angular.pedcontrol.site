import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FornecedoresRoutingModule } from './fornecedores-routing.module';
import { FornecedoresIndexComponent } from './fornecedores-index/fornecedores-index.component';
import { FornecedoresFormComponent } from './fornecedores-form/fornecedores-form.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [FornecedoresIndexComponent, FornecedoresFormComponent],
  imports: [
    SharedModule,
    FornecedoresRoutingModule
  ]
})
export class FornecedoresModule { }
