import { Component, OnInit } from '@angular/core';
import { Form } from '@angular/forms';
import { FornecedoresService } from '../fornecedores.service';
import { FuncoesService } from 'src/app/shared/utils/funcoes.service';
import { Fornecedores } from '../fornecedores.model';
import { MessageService } from 'src/app/shared/utils/messge.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FornecedoresFormValidation } from './fornecedores-form.validation';
import { Estados } from 'src/app/config/enum.enumerable';

@Component({
  selector: 'app-fornecedores-form',
  templateUrl: './fornecedores-form.component.html'
})
export class FornecedoresFormComponent implements OnInit {

  public data = new Fornecedores();
  public validacoes: string[];
  public estados = new Estados();

  private validation: FornecedoresFormValidation;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private fornecedoresService: FornecedoresService,
    private funcoesService: FuncoesService,
    private messageService: MessageService
  ) {
    this.validation = new FornecedoresFormValidation(messageService, funcoesService);
  }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get("id");
    if (id) {
      this.fornecedoresService.getById(+id).subscribe(resp => {
        if (this.funcoesService.isNotUndefinedOrNull(resp['error'])) {
          this.messageService.error('Cadastro de Fornecedores', resp['error']);
          this.back();
        } else if (this.funcoesService.isUndefinedOrNull(resp['data'])) {
          this.messageService.error('Cadastro de Fornecedores', 'Dados não retornados');
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
    this.fornecedoresService.createOrUpdate(this.data).subscribe(
      resp => {
        if (this.funcoesService.isNotUndefinedOrNull(resp['error'])) {
          if (this.funcoesService.isNotUndefinedOrNull(resp['error']['dataError'])) {
            this.messageService.mwarning('Cadastro de Fornecedores', resp['error']['dataError']);
          } else {
            this.messageService.error('Cadastro de Fornecedores', resp['error']);
          }
        } else {
          this.data = resp['data'];
          this.messageService.success('Cadastro de Fornecedores', 'Salvo com sucesso!');
          if (create) {
            this.data = new Fornecedores();
            this.router.navigate(['pages/fornecedores/create']);
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
    this.router.navigate(['pages/fornecedores']);
  }

  public getCep() {
    this.funcoesService.getCep(this.data.cep).subscribe(cep => {
      this.data.bairro = cep.bairro;
      this.data.cidade = cep.cidade;
      this.data.estado = cep.estado;
      this.data.rua = cep.logradouro;
    });
  }

}
