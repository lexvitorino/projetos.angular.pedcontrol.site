import { Component, OnInit, ViewChild } from '@angular/core';
import { ClientesService } from '../clientes.service';
import { Clientes } from '../clientes.model';
import { DatatablesService } from 'src/app/shared/utils/datatables.service';
import { Router } from '@angular/router';
import { FuncoesService } from 'src/app/shared/utils/funcoes.service';
import { MessageService } from 'src/app/shared/utils/messge.service';

declare var $;

@Component({
  selector: 'app-clientes-index',
  templateUrl: './clientes-index.component.html'
})
export class ClientesIndexComponent implements OnInit {

  @ViewChild('dataTable', { static: true }) table;
  private dataTable: {};

  public dados: Clientes[];
  public data = new Clientes();

  constructor(
    private router: Router,
    private clientesService: ClientesService,
    private datatablesService: DatatablesService,
    private funcoesService: FuncoesService,
    private messageService: MessageService
  ) { }

  ngOnInit() {
    this.clientesService.get().subscribe(resp => {
      if (this.funcoesService.isNotUndefinedOrNull(resp['error'])) {
        this.messageService.error('Cadastro de Clientes', resp['error']);
      }
      this.dados = resp['data'];
      const columns = [
        this.datatablesService.getDataID(),
        this.datatablesService.getDataString('nome', 'Nome'),
        this.datatablesService.getDataString('cpfCnpj', 'CPF/CNPJ'),
        this.datatablesService.getDataString('documento', 'Documento', '10%'),
        this.datatablesService.getDataStringFormat('telefone', 'Telefone', '10%', /(\d{2})(\d{4})(\d{4})/g, "\($1) \$2-\$3"),
        this.datatablesService.getDataString('email', 'E-mail', '20%')
      ];
      this.dataTable = $(this.table.nativeElement);
      this.datatablesService.monta(this.dataTable, columns, this.dados, aData => {
        this.data = aData;
      });
    });
  }

  public create() {
    this.router.navigate(['pages/clientes/create']);
  }

  public edit() {
    this.selectedRow(() => {
      this.router.navigate([`pages/clientes/edit/${this.data.id}`])
    });
  }

  public delete() {
    this.selectedRow(() => {
      this.messageService.removeConfirm(() => {
        this.clientesService.delete(this.data).subscribe(resp => {
          if (this.funcoesService.isNotUndefinedOrNull(resp['error'])) {
            this.messageService.error('Cadastro de Clientes', resp['error']);
          } else {
            this.messageService.info('Cadastro de Clientes', 'Registro removido com sucesso');
            $(`.table .info`).remove();
          }
        });
      });
    });
  }

  private selectedRow(callback) {
    if (this.funcoesService.isUndefinedOrNull(this.data.id)) {
      this.messageService.warning('Cadastro de Clientes', 'Selecione um registro');
    } else {
      callback();
    }
  }

}
