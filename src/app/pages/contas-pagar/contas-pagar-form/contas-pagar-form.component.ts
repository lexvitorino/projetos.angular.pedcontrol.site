import { Component, OnInit } from '@angular/core';
import { Form } from '@angular/forms';
import { ContasPagarService } from '../contas-pagar.service';
import { FuncoesService } from 'src/app/shared/utils/funcoes.service';
import { ContasPagar } from '../contas-pagar.model';
import { MessageService } from 'src/app/shared/utils/messge.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ContasPagarFormValidation } from './contas-pagar-form.validation';

@Component({
  selector: 'app-contas-pagar-form',
  templateUrl: './contas-pagar-form.component.html',
})
export class ContasPagarFormComponent implements OnInit {

  public data = new ContasPagar();
  public validacoes: string[];

  private validation: ContasPagarFormValidation;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private contasPagarService: ContasPagarService,
    private funcoesService: FuncoesService,
    private messageService: MessageService
  ) {
    this.validation = new ContasPagarFormValidation(messageService, funcoesService);
  }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get("id");
    if (id) {
      this.contasPagarService.getById(+id).subscribe(resp => {
        if (this.funcoesService.isNotUndefinedOrNull(resp['error'])) {
          this.messageService.error('Cadastro de ContasPagar', resp['error']);
          this.back();
        } else if (this.funcoesService.isUndefinedOrNull(resp['data'])) {
          this.messageService.error('Cadastro de ContasPagar', 'Dados não retornados');
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
    this.contasPagarService.createOrUpdate(this.data).subscribe(
      resp => {
        if (this.funcoesService.isNotUndefinedOrNull(resp['error'])) {
          if (this.funcoesService.isNotUndefinedOrNull(resp['error']['dataError'])) {
            this.messageService.mwarning('Cadastro de ContasPagar', resp['error']['dataError']);
          } else {
            this.messageService.error('Cadastro de ContasPagar', resp['error']);
          }
        } else {
          this.data = resp['data'];
          this.messageService.success('Cadastro de ContasPagar', 'Salvo com sucesso!');
          if (create) {
            this.data = new ContasPagar();
            this.router.navigate(['pages/contasPagar/create']);
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
    this.router.navigate(['pages/contasPagar']);
  }

}
