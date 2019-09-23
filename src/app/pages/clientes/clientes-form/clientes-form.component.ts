import { Component, OnInit } from '@angular/core';
import { Form } from '@angular/forms';
import { ClientesService } from '../clientes.service';
import { FuncoesService } from 'src/app/shared/utils/funcoes.service';
import { Clientes } from '../clientes.model';
import { MessageService } from 'src/app/shared/utils/messge.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientesFormValidation } from './clientes-form.validation';
import { Estados } from 'src/app/config/enum.enumerable';

@Component({
  selector: 'app-clientes-form',
  templateUrl: './clientes-form.component.html'
})
export class ClientesFormComponent implements OnInit {

  public data = new Clientes();
  public validacoes: string[];
  public estados = new Estados();

  private validation: ClientesFormValidation;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private clientesService: ClientesService,
    private funcoesService: FuncoesService,
    private messageService: MessageService
  ) {
    this.validation = new ClientesFormValidation(messageService, funcoesService);
  }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get("id");
    if (id) {
      this.clientesService.getById(+id).subscribe(resp => {
        if (this.funcoesService.isNotUndefinedOrNull(resp['error'])) {
          this.messageService.error('Cadastro de Clientes', resp['error']);
          this.back();
        } else if (this.funcoesService.isUndefinedOrNull(resp['data'])) {
          this.messageService.error('Cadastro de Clientes', 'Dados não retornados');
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
    this.clientesService.createOrUpdate(this.data).subscribe(
      resp => {
        if (this.funcoesService.isNotUndefinedOrNull(resp['error'])) {
          if (this.funcoesService.isNotUndefinedOrNull(resp['error']['dataError'])) {
            this.messageService.mwarning('Cadastro de Clientes', resp['error']['dataError']);
          } else {
            this.messageService.error('Cadastro de Clientes', resp['error']);
          }
        } else {
          this.data = resp['data'];
          this.messageService.success('Cadastro de Clientes', 'Salvo com sucesso!');
          if (create) {
            this.data = new Clientes();
            this.router.navigate(['pages/clientes/create']);
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
    this.router.navigate(['pages/clientes']);
  }

  public getCepFat() {
    this.funcoesService.getCep(this.data.fatCep).subscribe(cep => {
      this.data.fatBairro = cep.bairro;
      this.data.fatCidade = cep.cidade;
      this.data.fatEstado = cep.estado;
      this.data.fatRua = cep.logradouro;
    });
  }

  public getCepEnt() {
    this.funcoesService.getCep(this.data.entCep).subscribe(cep => {
      this.data.entBairro = cep.bairro;
      this.data.entCidade = cep.cidade;
      this.data.entEstado = cep.estado;
      this.data.entRua = cep.logradouro;
    });
  }

}
