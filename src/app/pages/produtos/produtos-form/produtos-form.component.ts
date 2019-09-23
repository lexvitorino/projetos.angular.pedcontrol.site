import { Component, OnInit } from '@angular/core';
import { Form } from '@angular/forms';
import { ProdutosService } from '../produtos.service';
import { FuncoesService } from 'src/app/shared/utils/funcoes.service';
import { Produtos, TiposProduto } from '../produtos.model';
import { MessageService } from 'src/app/shared/utils/messge.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ProdutosFormValidation } from './produtos-form.validation';

@Component({
  selector: 'app-produtos-form',
  templateUrl: './produtos-form.component.html'
})
export class ProdutosFormComponent implements OnInit {

  public data = new Produtos();
  public validacoes: string[];
  public tiposProduto = new TiposProduto();

  private validation: ProdutosFormValidation;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private produtosService: ProdutosService,
    private funcoesService: FuncoesService,
    private messageService: MessageService
  ) {
    this.validation = new ProdutosFormValidation(messageService, funcoesService);
  }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get("id");
    if (id) {
      this.produtosService.getById(+id).subscribe(resp => {
        if (this.funcoesService.isNotUndefinedOrNull(resp['error'])) {
          this.messageService.error('Cadastro de Produtos', resp['error']);
          this.back();
        } else if (this.funcoesService.isUndefinedOrNull(resp['data'])) {
          this.messageService.error('Cadastro de Produtos', 'Dados não retornados');
          this.back();
        } else {
          this.data = resp['data'];
        }
      });
    }
  }

  public onSubmit(form: Form, create: boolean = false) {
    this.validacoes = this.messageService.getValidations(this.validation.getValidations(this.data));
    if (this.validacoes && this.validacoes.length > 0) {
      return;
    }
    this.produtosService.createOrUpdate(this.data).subscribe(
      resp => {
        if (this.funcoesService.isNotUndefinedOrNull(resp['error'])) {
          if (this.funcoesService.isNotUndefinedOrNull(resp['error']['dataError'])) {
            this.messageService.mwarning('Cadastro de Produtos', resp['error']['dataError']);
          } else {
            this.messageService.error('Cadastro de Produtos', resp['error']);
          }
        } else {
          this.data = resp['data'];
          this.messageService.success('Cadastro de Produtos', 'Salvo com sucesso!');
          if (create) {
            this.data = new Produtos();
            this.router.navigate(['pages/produtos/create']);
          } else {
            this.back();
          }
        }
      }
    );
  }

  public onSaveAndCreate(form: Form) {
    this.onSubmit(form, true);
  }

  public back() {
    this.router.navigate(['pages/produtos']);
  }

}
