import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProdutosRoutingModule } from './produtos-routing.module';
import { ProdutosIndexComponent } from './produtos-index/produtos-index.component';
import { ProdutosFormComponent } from './produtos-form/produtos-form.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [ProdutosIndexComponent, ProdutosFormComponent],
  imports: [
    SharedModule,
    ProdutosRoutingModule
  ]
})
export class ProdutosModule { }
