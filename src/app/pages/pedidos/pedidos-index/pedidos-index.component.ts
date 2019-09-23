import { Component, OnInit, ViewChild } from '@angular/core';
import { PedidosService } from '../pedidos.service';
import { Pedidos } from '../pedidos.model';
import { DatatablesService } from 'src/app/shared/utils/datatables.service';
import { Router } from '@angular/router';
import { FuncoesService } from 'src/app/shared/utils/funcoes.service';
import { MessageService } from 'src/app/shared/utils/messge.service';
import { BASE_URL } from 'src/app/config/config.constants';

declare var $;

@Component({
  selector: 'app-pedidos-index',
  templateUrl: './pedidos-index.component.html'
})
export class PedidosIndexComponent implements OnInit {

  @ViewChild('dataTable', { static: true }) table;
  private dataTable: {};

  public dados: Pedidos[];
  public data = new Pedidos();

  constructor(
    private router: Router,
    private pedidosService: PedidosService,
    private datatablesService: DatatablesService,
    private funcoesService: FuncoesService,
    private messageService: MessageService
  ) { }

  ngOnInit() {
    this.pedidosService.get().subscribe(resp => {
      if (this.funcoesService.isNotUndefinedOrNull(resp['error'])) {
        this.messageService.error('Cadastro de Pedidos', resp['error']);
      }
      this.dados = resp['data'];
      const columns = [
        this.datatablesService.getDataID(),
        this.datatablesService.getDataDateTime('data', 'Data', 'DD/MM/YYYY', '10%'),
        this.datatablesService.getDataString('numero', 'Número', '10%'),
        this.datatablesService.getDataString('cliente', 'Cliente'),
        this.datatablesService.getDataString('prazoEntrega', 'Pazo Entrega', '10%'),
        this.datatablesService.getDataString('prazoColocacao', 'Prazo Colocação', '10%')
      ];
      this.dataTable = $(this.table.nativeElement);
      this.datatablesService.monta(this.dataTable, columns, this.dados, aData => {
        this.data = aData;
      });
    });
  }

  public create() {
    this.router.navigate(['pages/pedidos/create']);
  }

  public edit() {
    this.selectedRow(() => {
      this.router.navigate([`pages/pedidos/edit/${this.data.id}`])
    });
  }

  public delete() {
    this.selectedRow(() => {
      this.messageService.removeConfirm(() => {
        this.pedidosService.delete(this.data).subscribe(resp => {
          if (this.funcoesService.isNotUndefinedOrNull(resp['error'])) {
            this.messageService.error('Cadastro de Pedidos', resp['error']);
          } else {
            this.messageService.info('Cadastro de Pedidos', 'Registro removido com sucesso');
            $(`.table .info`).remove();
          }
        });
      });
    });
  }

  private selectedRow(callback) {
    if (this.funcoesService.isUndefinedOrNull(this.data.id)) {
      this.messageService.warning('Cadastro de Pedidos', 'Selecione um registro');
    } else {
      callback();
    }
  }

  public print() {
    this.selectedRow(() => {
      window.open(BASE_URL() + "/report/" + this.data.id, "_blank");
    });
  }

}
