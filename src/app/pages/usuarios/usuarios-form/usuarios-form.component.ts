import { Component, OnInit } from '@angular/core';
import { Form } from '@angular/forms';
import { UsuariosService } from '../usuarios.service';
import { FuncoesService } from 'src/app/shared/utils/funcoes.service';
import { Usuarios } from '../usuarios.model';
import { MessageService } from 'src/app/shared/utils/messge.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuariosFormValidation } from './usuarios-form.validation';

@Component({
  selector: 'app-usuarios-form',
  templateUrl: './usuarios-form.component.html'
})
export class UsuariosFormComponent implements OnInit {

  public data = new Usuarios();
  public validacoes: string[];

  private validation: UsuariosFormValidation;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private usuariosService: UsuariosService,
    private funcoesService: FuncoesService,
    private messageService: MessageService
  ) {
    this.validation = new UsuariosFormValidation(messageService, funcoesService);
  }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get("id");
    if (id) {
      this.usuariosService.getById(+id).subscribe(resp => {
        if (this.funcoesService.isNotUndefinedOrNull(resp['error'])) {
          this.messageService.error('Cadastro de Usuário', resp['error']);
          this.back();
        } else if (this.funcoesService.isUndefinedOrNull(resp['data'])) {
          this.messageService.error('Cadastro de Usuário', 'Dados não retornados');
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
    this.usuariosService.createOrUpdate(this.data).subscribe(
      resp => {
        if (this.funcoesService.isNotUndefinedOrNull(resp['error'])) {
          if (this.funcoesService.isNotUndefinedOrNull(resp['error']['dataError'])) {
            this.messageService.mwarning('Cadastro de Usuário', resp['error']['dataError']);
          } else {
            this.messageService.error('Cadastro de Usuário', resp['error']);
          }
        } else {
          this.data = resp['data'];
          this.messageService.success('Cadastro de Usuário', 'Salvo com sucesso!');
          if (create) {
            this.data = new Usuarios();
            this.router.navigate(['pages/usuarios/create']);
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
    this.router.navigate(['pages/usuarios']);
  }

}
