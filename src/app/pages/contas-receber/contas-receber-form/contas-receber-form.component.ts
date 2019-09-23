import { Component, OnInit } from '@angular/core';
import { Form } from '@angular/forms';
import { ContasReceberService } from '../contas-receber.service';
import { FuncoesService } from 'src/app/shared/utils/funcoes.service';
import { ContasReceber } from '../contas-receber.model';
import { MessageService } from 'src/app/shared/utils/messge.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ContasReceberFormValidation } from './contas-receber-form.validation';

@Component({
  selector: 'app-contas-receber-form',
  templateUrl: './contas-receber-form.component.html'
})
export class ContasReceberFormComponent implements OnInit {

  public data = new ContasReceber();
  public validacoes: string[];

  private validation: ContasReceberFormValidation;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private contasReceberService: ContasReceberService,
    private funcoesService: FuncoesService,
    private messageService: MessageService
  ) {
    this.validation = new ContasReceberFormValidation(messageService, funcoesService);
  }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get("id");
    if (id) {
      this.contasReceberService.getById(+id).subscribe(resp => {
        if (this.funcoesService.isNotUndefinedOrNull(resp['error'])) {
          this.messageService.error('Cadastro de ContasReceber', resp['error']);
          this.back();
        } else if (this.funcoesService.isUndefinedOrNull(resp['data'])) {
          this.messageService.error('Cadastro de ContasReceber', 'Dados não retornados');
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
    this.contasReceberService.createOrUpdate(this.data).subscribe(
      resp => {
        if (this.funcoesService.isNotUndefinedOrNull(resp['error'])) {
          if (this.funcoesService.isNotUndefinedOrNull(resp['error']['dataError'])) {
            this.messageService.mwarning('Cadastro de ContasReceber', resp['error']['dataError']);
          } else {
            this.messageService.error('Cadastro de ContasReceber', resp['error']);
          }
        } else {
          this.data = resp['data'];
          this.messageService.success('Cadastro de ContasReceber', 'Salvo com sucesso!');
          if (create) {
            this.data = new ContasReceber();
            this.router.navigate(['pages/contasReceber/create']);
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
    this.router.navigate(['pages/contasReceber']);
  }

}
