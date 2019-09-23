import { Component, OnInit, Input, Output, ViewEncapsulation, EventEmitter } from '@angular/core';
import { PedItens } from './pedidos-itens.model';
import { Pedidos } from '../pedidos.model';
import { MessageService } from 'src/app/shared/utils/messge.service';
import { FuncoesService } from 'src/app/shared/utils/funcoes.service';
import { Produtos } from '../../produtos/produtos.model';

@Component({
  selector: "app-pedidos-itens",
  templateUrl: "./pedidos-itens.component.html",
  encapsulation: ViewEncapsulation.None
})
export class PedidosItensComponent implements OnInit {

  @Input() dados: PedItens[];
  @Input() pedidos: Pedidos;

  @Output() dataResult = new EventEmitter();

  public data = new PedItens();
  public dataAux = new PedItens();
  public controleAddVisivel = false;
  private isDoCheck = false;
  private hasDados: boolean;

  constructor(
    private messageService: MessageService,
    public funcoesService: FuncoesService
  ) {
  }

  public ngOnInit() {
    this.dataAux = new PedItens();
  }

  public ngDoCheck() {
    this.hasDados =
      this.dados &&
      this.dados.length > 0 &&
      this.dados.filter(v => {
        if (v["sitReg"] !== "E") {
          return true;
        }
        return false;
      }).length > 0;

    if (!this.isDoCheck) {
      if (this.dados) {
        for (let i = 1; i <= this.dados.length; i++) {
          this.dados[i - 1]["sequencia"] = i;
        }
        this.isDoCheck = true;
      }
    }
  }

  public create() {
    this.loadForm(new PedItens());
  }

  public back() {
    this.controleAddVisivel = false;
  }

  public edit() {
    this.loadForm(this.dataAux);
  }

  public delete() {
    this.data = this.dataAux;
    if (!this.funcoesService.isUndefinedOrNull(this.data.sequencia)) {
      this.messageService.removeConfirm(() => {
        const i = this.dados.findIndex(
          x => x.sequencia === this.data.sequencia
        );
        this.data["sitReg"] = "E";
        this.dados[i] = this.data;
      });
    }
  }

  public onSubmit(form) {
    this.data.valorTotal = this.data.valorUnitario * this.data.qtde;
    if (this.funcoesService.isNotUndefinedOrNull(this.dados) && this.data.sequencia && this.data.sequencia > 0) {
      const i = this.dados.findIndex(x => x.sequencia === this.data.sequencia);
      this.dados[i] = this.data;
    } else {
      if (this.funcoesService.isUndefinedOrNull(this.dados)) {
        this.dados = [];
      }
      this.setSequencia();
      this.dados.push(this.data);
    }

    this.data = new PedItens();
    this.dataResult.emit(this.dados);
    this.back();
  }

  public trataProdutos(produtos: Produtos) {
    if (this.funcoesService.isNotUndefinedOrNull(produtos)) {
      if (this.funcoesService.numberService.isPositive(produtos.valor) &&
        this.funcoesService.numberService.isNotPositive(this.data.valorUnitario)) {
        this.data.valorUnitario = produtos.valor;
        this.data.produto = produtos.descricao;
      }
    }
  }

  private loadForm(obj: PedItens) {
    this.controleAddVisivel = true;
    this.data = obj;
  }

  private setSequencia() {
    if (
      this.funcoesService.isUndefinedOrNull(this.data.id) || this.data.id === 0) {
      if (this.funcoesService.isNotUndefinedOrNull(this.dados)) {
        this.data.sequencia = this.dados.length + 1;
      } else {
        this.data.sequencia = 1;
      }
    } else {
      this.data.sequencia = this.data.sequencia;
    }
  }
}
