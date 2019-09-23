import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BASE_URL } from 'src/app/config/config.constants';
import { Usuarios } from './usuarios.model';
import { FuncoesService } from 'src/app/shared/utils/funcoes.service';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor(
    private http: HttpClient,
    private funcoesService: FuncoesService
  ) { }

  public get(): Observable<Usuarios[]> {
    return this.http.get<Usuarios[]>(`${BASE_URL()}/usuarios`);
  }

  public getById(id: number): Observable<Usuarios> {
    return this.http.get<Usuarios>(`${BASE_URL()}/usuarios/${id}`);
  }

  public create(data: Usuarios): Observable<Usuarios> {
    return this.http.post<Usuarios>(`${BASE_URL()}/usuarios/create`, data);
  }

  public update(data: Usuarios): Observable<Usuarios> {
    return this.http.put<Usuarios>(`${BASE_URL()}/usuarios/${data.id}/update`, data);
  }

  public delete(data: Usuarios): Observable<Usuarios> {
    return this.http.delete<Usuarios>(`${BASE_URL()}/usuarios/${data.id}/delete`);
  }

  public createOrUpdate(data: Usuarios): Observable<Usuarios> {
    if (this.funcoesService.isUndefinedOrNull(data.id)) {
      return this.create(data);
    } else {
      return this.update(data);
    }
  }
}
