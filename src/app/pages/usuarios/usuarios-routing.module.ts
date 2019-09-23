import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsuariosIndexComponent } from './usuarios-index/usuarios-index.component';
import { UsuariosFormComponent } from './usuarios-form/usuarios-form.component';

const routes: Routes = [
  {path: '', component: UsuariosIndexComponent},
  {path: 'create', component: UsuariosFormComponent},
  {path: 'edit/:id', component: UsuariosFormComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuariosRoutingModule { }
