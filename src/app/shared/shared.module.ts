import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from './interceptor/auth.interceptor';
import { LayoutModule } from '../layout/layout.module';
import { RouterModule } from '@angular/router';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { SignaturePadModule } from 'angular2-signaturepad';
import { RemoveExcluidosPipe } from './pipes/remove-excluidos.pipe';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { NgxMaskModule, IConfig } from 'ngx-mask'
import { JsonInterceptor } from './interceptor/json.interceptor';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DataComponent } from './components/data/data.component';
import { ComboClientesComponent } from './components/combo-clientes/combo-clientes.component';
import { ComboFornecedoresComponent } from './components/combo-fornecedores/combo-fornecedores.component';
import { ComboProdutosComponent } from './components/combo-produtos/combo-produtos.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    FormsModule,
    LayoutModule,
    RouterModule,
    CurrencyMaskModule,
    SignaturePadModule,
    SweetAlert2Module.forRoot({
      buttonsStyling: false,
      customClass: 'modal-content',
      confirmButtonClass: 'btn btn-primary',
      cancelButtonClass: 'btn'
    }),
    NgxMaskModule.forRoot(),
    NgbModule
  ],
  declarations: [
    RemoveExcluidosPipe,
    DataComponent,
    ComboClientesComponent,
    ComboFornecedoresComponent,
    ComboProdutosComponent
  ],
  providers: [
    HttpClient,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: JsonInterceptor, multi: true }
  ],
  exports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    FormsModule,
    LayoutModule,
    RouterModule,
    CurrencyMaskModule,
    SignaturePadModule,
    RemoveExcluidosPipe,
    SweetAlert2Module,
    NgxMaskModule,
    NgbModule,
    DataComponent,
    ComboClientesComponent,
    ComboFornecedoresComponent,
    ComboProdutosComponent
  ]
})
export class SharedModule {
}
