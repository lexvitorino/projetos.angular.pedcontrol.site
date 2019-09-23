import { Component, OnInit, ViewChild } from '@angular/core';
import { FornecedoresService } from '../fornecedores.service';
import { Fornecedores } from '../fornecedores.model';
import { DatatablesService } from 'src/app/shared/utils/datatables.service';
import { Router } from '@angular/router';
import { FuncoesService } from 'src/app/shared/utils/funcoes.service';
import { MessageService } from 'src/app/shared/utils/messge.service';

declare var $;

@Component({
  selector: 'app-fornecedores-index',
  templateUrl: './fornecedores-index.component.html'
})
export class FornecedoresIndexComponent implements OnInit {

  @ViewChild('dataTable', { static: true }) table;
  private dataTable: {};

  public dados: Fornecedores[];
  public data = new Fornecedores();

  constructor(
    private router: Router,
    private fornecedoresService: FornecedoresService,
    private datatablesService: DatatablesService,
    private funcoesService: FuncoesService,
    private messageService: MessageService
  ) { }

  ngOnInit() {
    this.fornecedoresService.get().subscribe(resp => {
      if (this.funcoesService.isNotUndefinedOrNull(resp['error'])) {
        this.messageService.error('Cadastro de Fornecedores', resp['error']);
      }
      this.dados = resp['data'];
      const columns = [
        this.datatablesService.getDataID(),
        this.datatablesService.getDataString('razaoSocial', 'Razao Social'),
        this.datatablesService.getDataStringFormat('cnpj', 'CNPJ', '10%', /(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/g, "\$1.\$2.\$3/\$4-\$5"),
        this.datatablesService.getDataString('ie', 'IE', '10%'),
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
    this.router.navigate(['pages/fornecedores/create']);
  }

  public edit() {
    this.selectedRow(() => {
      this.router.navigate([`pages/fornecedores/edit/${this.data.id}`])
    });
  }

  public delete() {
    this.selectedRow(() => {
      this.messageService.removeConfirm(() => {
        this.fornecedoresService.delete(this.data).subscribe(resp => {
          if (this.funcoesService.isNotUndefinedOrNull(resp['error'])) {
            this.messageService.error('Cadastro de Fornecedores', resp['error']);
          } else {
            this.messageService.info('Cadastro de Forncedores', 'Registro removido com sucesso');
            $(`.table .info`).remove();
          }
        });
      });
    });
  }

  private selectedRow(callback) {
    if (this.funcoesService.isUndefinedOrNull(this.data.id)) {
      this.messageService.warning('Cadastro de Fornecedores', 'Selecione um registro');
    } else {
      callback();
    }
  }

}
