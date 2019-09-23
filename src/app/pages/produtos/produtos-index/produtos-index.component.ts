import { Component, OnInit, ViewChild } from '@angular/core';
import { ProdutosService } from '../produtos.service';
import { Produtos, TiposProduto } from '../produtos.model';
import { DatatablesService } from 'src/app/shared/utils/datatables.service';
import { Router } from '@angular/router';
import { FuncoesService } from 'src/app/shared/utils/funcoes.service';
import { MessageService } from 'src/app/shared/utils/messge.service';

declare var $;

@Component({
  selector: 'app-produtos-index',
  templateUrl: './produtos-index.component.html'
})
export class ProdutosIndexComponent implements OnInit {

  @ViewChild('dataTable', { static: true }) table;
  private dataTable: {};

  public dados: Produtos[];
  public data = new Produtos();

  constructor(
    private router: Router,
    private produtosService: ProdutosService,
    private datatablesService: DatatablesService,
    private funcoesService: FuncoesService,
    private messageService: MessageService
  ) { }

  ngOnInit() {
    this.produtosService.get().subscribe(resp => {
      if (this.funcoesService.isNotUndefinedOrNull(resp['error'])) {
        this.messageService.error('Cadastro de Produtos', resp['error']);
      }
      this.dados = resp['data'];
      const columns = [
        this.datatablesService.getDataID(),
        this.datatablesService.getDataString('descricao', 'Descrição'),
        this.datatablesService.getDataSelect('tipo', 'Tipo', new TiposProduto(), '10%'),
        this.datatablesService.getDataDouble('valor', 'Valor', 2, '10%')
      ];
      this.dataTable = $(this.table.nativeElement);
      this.datatablesService.monta(this.dataTable, columns, this.dados, aData => {
        this.data = aData;
      });
    });
  }

  public create() {
    this.router.navigate(['pages/produtos/create']);
  }

  public edit() {
    this.selectedRow(() => {
      this.router.navigate([`pages/produtos/edit/${this.data.id}`])
    });
  }

  public delete() {
    this.selectedRow(() => {
      this.messageService.removeConfirm(() => {
        this.produtosService.delete(this.data).subscribe(resp => {
          if (this.funcoesService.isNotUndefinedOrNull(resp['error'])) {
            this.messageService.error('Cadastro de Produtos', resp['error']);
          } else {
            this.messageService.info('Cadastro de Produtos', 'Registro removido com sucesso');
            $(`.table .info`).remove();
          }
        });
      });
    });
  }

  private selectedRow(callback) {
    if (this.funcoesService.isUndefinedOrNull(this.data.id)) {
      this.messageService.warning('Cadastro de Produtos', 'Selecione um registro');
    } else {
      callback();
    }
  }

}
