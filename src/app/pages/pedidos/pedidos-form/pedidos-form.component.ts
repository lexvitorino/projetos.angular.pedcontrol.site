import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { Form } from '@angular/forms';
import { PedidosService } from '../pedidos.service';
import { FuncoesService } from 'src/app/shared/utils/funcoes.service';
import { Pedidos, TipoAdiantamento } from '../pedidos.model';
import { MessageService } from 'src/app/shared/utils/messge.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PedidosFormValidation } from './pedidos-form.validation';
import { SignaturePad } from 'angular2-signaturepad/signature-pad';
import { NO_IMAGE_B64 } from 'src/app/config/config.constants';
import { PedItens } from '../pedidos-itens/pedidos-itens.model';
import { PedCondsPagto } from '../pedidos-cond-pagtos/pedidos-cond-pagtos.model';
import { Estados } from 'src/app/config/enum.enumerable';
import { Clientes } from '../../clientes/clientes.model';

declare var $;

@Component({
  selector: 'app-pedidos-form',
  templateUrl: './pedidos-form.component.html'
})
export class PedidosFormComponent implements OnInit, AfterViewInit {

  @ViewChild('signaturePadPed', { static: true }) signaturePadPed: SignaturePad;
  @ViewChild('signaturePadRec', { static: true }) signaturePadRec: SignaturePad;

  public data = new Pedidos();
  public validacoes: string[];
  public signPed: string;
  public signRec: string;
  public estados = new Estados();
  public tipoAdiantamento = new TipoAdiantamento();
  public signaturePadOptions: Object = {
    'canvasWidth': 570,
    'canvasHeight': 300,
  };

  private validation: PedidosFormValidation;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private pedidosService: PedidosService,
    private funcoesService: FuncoesService,
    private messageService: MessageService
  ) {
    this.validation = new PedidosFormValidation(messageService, funcoesService);
    this.signPed = NO_IMAGE_B64;
    this.signRec = NO_IMAGE_B64;
  }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get("id");
    if (id) {
      this.pedidosService.getById(+id).subscribe(resp => {
        if (this.funcoesService.isNotUndefinedOrNull(resp['error'])) {
          this.messageService.error('Cadastro de Pedidos', resp['error']);
          this.back();
        } else if (this.funcoesService.isUndefinedOrNull(resp['data'])) {
          this.messageService.error('Cadastro de Pedidos', 'Dados não retornados');
          this.back();
        } else {
          this.data = resp['data'];
          this.signPed = this.data.assinatura === '' ? NO_IMAGE_B64 : this.data.assinatura;
          this.signRec = this.data.assAdiant === '' ? NO_IMAGE_B64 : this.data.assAdiant;
        }
      });
    }
  }

  ngAfterViewInit(): void {
    this.signaturePadPed.set('minWidth', 0.5);
    this.signaturePadPed.clear();

    this.signaturePadRec.set('minWidth', 0.5);
    this.signaturePadRec.clear();
  }

  public onSubmit(form: Form, create: boolean = false) {
    this.validacoes = this.messageService.getValidations(this.validation.getValidations(this.data));
    if (this.validacoes && this.validacoes.length > 0) {
      return;
    }
    this.pedidosService.createOrUpdate(this.data).subscribe(
      resp => {
        if (this.funcoesService.isNotUndefinedOrNull(resp['error'])) {
          if (this.funcoesService.isNotUndefinedOrNull(resp['error']['dataError'])) {
            this.messageService.mwarning('Cadastro de Pedidos', resp['error']['dataError']);
          } else {
            this.messageService.error('Cadastro de Pedidos', resp['error']);
          }
        } else {
          this.data = resp['data'];
          this.messageService.success('Cadastro de Pedidos', 'Salvo com sucesso!');
          if (create) {
            this.data = new Pedidos();
            this.router.navigate(['pages/pedidos/create']);
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
    this.router.navigate(['pages/pedidos']);
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

  public clearSignaturePed() {
    this.signaturePadPed.clear();
  }

  public clearSignatureRec() {
    this.signaturePadRec.clear();
  }

  public okSignaturePed() {
    this.data.assinatura = this.signaturePadPed.toDataURL();
    this.signPed = this.data.assinatura;
  }

  public okSignatureRec() {
    this.data.assAdiant = this.signaturePadRec.toDataURL();
    this.signRec = this.data.assAdiant;
  }

  public addItemResult(pedItens: PedItens[]) {
    this.data.pedItens = pedItens;
    this.data.valorTotal = 0;
    pedItens.forEach(e => {
      this.data.valorTotal += e.valorTotal;
    });
  }

  public addCondPagtosResult(pedCondsPagto: PedCondsPagto[]) {
    this.data.pedCondsPagto = pedCondsPagto;
  }

  public trataClientes(clientes: Clientes) {
    if (this.funcoesService.isNotUndefinedOrNull(clientes)) {
      if (this.funcoesService.stringService.isNotEmpty(clientes.entCep) &&
        this.funcoesService.stringService.isEmpty(this.data.entCep)) {
        this.data.entBairro = clientes.entBairro;
        this.data.entCep = clientes.entCep;
        this.data.entCidade = clientes.entCidade;
        this.data.entComplemento = clientes.entComplemento;
        this.data.entEstado = clientes.entEstado;
        this.data.entNumero = clientes.entNumero;
        this.data.entReferencia = clientes.entReferencia;
        this.data.entRua = clientes.entRua;
        this.data.entTelefone = clientes.entTelefone;
      }

      if (this.funcoesService.stringService.isNotEmpty(clientes.fatCep) &&
        this.funcoesService.stringService.isEmpty(this.data.fatCep)) {
        this.data.fatBairro = clientes.fatBairro;
        this.data.fatCep = clientes.fatCep;
        this.data.fatCidade = clientes.fatCidade;
        this.data.fatComplemento = clientes.fatComplemento;
        this.data.fatEstado = clientes.fatEstado;
        this.data.fatNumero = clientes.fatNumero;
        this.data.fatRua = clientes.fatRua;
        this.data.fatTelefone = clientes.fatTelefone;
      }
    }
  }

}
