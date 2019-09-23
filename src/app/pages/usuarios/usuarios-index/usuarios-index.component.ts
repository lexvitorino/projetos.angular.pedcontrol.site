import { Component, OnInit, ViewChild } from '@angular/core';
import { UsuariosService } from '../usuarios.service';
import { Usuarios } from '../usuarios.model';
import { DatatablesService } from 'src/app/shared/utils/datatables.service';
import { Router } from '@angular/router';
import { FuncoesService } from 'src/app/shared/utils/funcoes.service';
import { MessageService } from 'src/app/shared/utils/messge.service';

declare var $;

@Component({
  selector: 'app-usuarios-index',
  templateUrl: './usuarios-index.component.html'
})
export class UsuariosIndexComponent implements OnInit {

  @ViewChild('dataTable', { static: true }) table;
  private dataTable: {};

  public dados: Usuarios[];
  public data = new Usuarios();

  constructor(
    private router: Router,
    private usuariosService: UsuariosService,
    private datatablesService: DatatablesService,
    private funcoesService: FuncoesService,
    private messageService: MessageService
  ) { }

  ngOnInit() {
    this.usuariosService.get().subscribe(resp => {
      if (this.funcoesService.isNotUndefinedOrNull(resp['error'])) {
        this.messageService.error('Cadastro de Usuários', resp['error']);
      }
      this.dados = resp['data'];
      const columns = [
        this.datatablesService.getDataID(),
        this.datatablesService.getDataString('nome', 'Nome'),
        this.datatablesService.getDataString('email', 'E-mail', '20%'),
        this.datatablesService.getDataString('usuario', 'Usuário', '20%')
      ];
      this.dataTable = $(this.table.nativeElement);
      this.datatablesService.monta(this.dataTable, columns, this.dados, aData => {
        this.data = aData;
      });
    });
  }

  public create() {
    this.router.navigate(['pages/usuarios/create']);
  }

  public edit() {
    this.selectedRow(() => {
      this.router.navigate([`pages/usuarios/edit/${this.data.id}`])
    });
  }

  public delete() {
    this.selectedRow(() => {
      this.messageService.removeConfirm(() => {
        this.usuariosService.delete(this.data).subscribe(resp => {
          if (this.funcoesService.isNotUndefinedOrNull(resp['error'])) {
            this.messageService.error('Cadastro de Usuários', resp['error']);
          } else {
            this.messageService.info('Cadastro de Usuários', 'Registro removido com sucesso');
            $(`.table .info`).remove();
          }
        });
      });
    });
  }

  private selectedRow(callback) {
    if (this.funcoesService.isUndefinedOrNull(this.data.id)) {
      this.messageService.warning('Cadastro de Usuários', 'Selecione um registro');
    } else {
      callback();
    }
  }

}
