import { NgModule } from '@angular/core';

import { UsuariosRoutingModule } from './usuarios-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { UsuariosIndexComponent } from './usuarios-index/usuarios-index.component';
import { UsuariosFormComponent } from './usuarios-form/usuarios-form.component';

@NgModule({
  declarations: [UsuariosIndexComponent, UsuariosFormComponent],
  imports: [
    SharedModule,
    UsuariosRoutingModule
  ]
})
export class UsuariosModule { }
