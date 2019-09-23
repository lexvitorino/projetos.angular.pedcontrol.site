import { Component, OnInit, Input, Output, ViewEncapsulation, EventEmitter } from '@angular/core';
import { PedCondsPagto } from './pedidos-cond-pagtos.model';
import { Pedidos } from '../pedidos.model';
import { MessageService } from 'src/app/shared/utils/messge.service';
import { FuncoesService } from 'src/app/shared/utils/funcoes.service';

@Component({
  selector: "app-pedidos-cond-pagtos",
  templateUrl: "./pedidos-cond-pagtos.component.html",
  encapsulation: ViewEncapsulation.None
})
export class PedidosCondsPagtoComponent implements OnInit {

  @Input() dados: PedCondsPagto[];
  @Input() pedidos: Pedidos;

  @Output() dataResult = new EventEmitter();

  public data = new PedCondsPagto();
  public dataAux = new PedCondsPagto();
  public controleAddVisivel = false;
  private isDoCheck = false;
  private hasDados: boolean;

  constructor(
    private messageService: MessageService,
    public funcoesService: FuncoesService
  ) {
  }

  public ngOnInit() {
    this.dataAux = new PedCondsPagto();
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
    this.loadForm(new PedCondsPagto());
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

    this.data = new PedCondsPagto();
    this.dataResult.emit(this.dados);
    this.back();
  }

  private loadForm(obj: PedCondsPagto) {
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
