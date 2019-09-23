import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PagesComponent} from './pages.component';

const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      {
        path: 'notfound',
        data: {breadcrumb: 'NotFound'},
        loadChildren: () => import('./not-found/not-found.module').then(m => m.NotFoundModule)
      },
      {
        path: 'dashboard',
        data: {breadcrumb: 'Dashboard'},
        loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: 'usuarios',
        data: {breadcrumb: 'Usuarios'},
        loadChildren: () => import('./usuarios/usuarios.module').then(m => m.UsuariosModule)
      },
      {
        path: 'clientes',
        data: {breadcrumb: 'Clientes'},
        loadChildren: () => import('./clientes/clientes.module').then(m => m.ClientesModule)
      },
      {
        path: 'fornecedores',
        data: {breadcrumb: 'Fornecedores'},
        loadChildren: () => import('./fornecedores/fornecedores.module').then(m => m.FornecedoresModule)
      },
      {
        path: 'produtos',
        data: {breadcrumb: 'Produtos'},
        loadChildren: () => import('./produtos/produtos.module').then(m => m.ProdutosModule)
      },
      {
        path: 'pedidos',
        data: {breadcrumb: 'Pedidos'},
        loadChildren: () => import('./pedidos/pedidos.module').then(m => m.PedidosModule)
      },
      {
        path: 'contasReceber',
        data: {breadcrumb: 'Contas Receber'},
        loadChildren: () => import('./contas-receber/contas-receber.module').then(m => m.ContasReceberModule)
      },
      {
        path: 'contasPagar',
        data: {breadcrumb: 'Contas Pagar'},
        loadChildren: () => import('./contas-pagar/contas-pagar.module').then(m => m.ContasPagarModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule {
}
