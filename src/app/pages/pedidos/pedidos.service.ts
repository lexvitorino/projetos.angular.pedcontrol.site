import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BASE_URL } from 'src/app/config/config.constants';
import { Pedidos } from './pedidos.model';
import { FuncoesService } from 'src/app/shared/utils/funcoes.service';

@Injectable({
  providedIn: 'root'
})
export class PedidosService {

  constructor(
    private http: HttpClient,
    private funcoesService: FuncoesService
  ) { }

  public get(): Observable<Pedidos[]> {
    return this.http.get<Pedidos[]>(`${BASE_URL()}/pedidos`);
  }

  public getById(id: number): Observable<Pedidos> {
    return this.http.get<Pedidos>(`${BASE_URL()}/pedidos/${id}`);
  }

  public create(data: Pedidos): Observable<Pedidos> {
    return this.http.post<Pedidos>(`${BASE_URL()}/pedidos/create`, data);
  }

  public update(data: Pedidos): Observable<Pedidos> {
    return this.http.put<Pedidos>(`${BASE_URL()}/pedidos/${data.id}/update`, data);
  }

  public delete(data: Pedidos): Observable<Pedidos> {
    return this.http.delete<Pedidos>(`${BASE_URL()}/pedidos/${data.id}/delete`);
  }

  public createOrUpdate(data: Pedidos): Observable<Pedidos> {
    if (this.funcoesService.isUndefinedOrNull(data.id)) {
      return this.create(data);
    } else {
      return this.update(data);
    }
  }
}
