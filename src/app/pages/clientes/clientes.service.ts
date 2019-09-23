import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BASE_URL } from 'src/app/config/config.constants';
import { Clientes } from './clientes.model';
import { FuncoesService } from 'src/app/shared/utils/funcoes.service';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  constructor(
    private http: HttpClient,
    private funcoesService: FuncoesService
  ) { }

  public get(): Observable<Clientes[]> {
    return this.http.get<Clientes[]>(`${BASE_URL()}/clientes`);
  }

  public getById(id: number): Observable<Clientes> {
    return this.http.get<Clientes>(`${BASE_URL()}/clientes/${id}`);
  }

  public create(data: Clientes): Observable<Clientes> {
    return this.http.post<Clientes>(`${BASE_URL()}/clientes/create`, data);
  }

  public update(data: Clientes): Observable<Clientes> {
    return this.http.put<Clientes>(`${BASE_URL()}/clientes/${data.id}/update`, data);
  }

  public delete(data: Clientes): Observable<Clientes> {
    return this.http.delete<Clientes>(`${BASE_URL()}/clientes/${data.id}/delete`);
  }

  public createOrUpdate(data: Clientes): Observable<Clientes> {
    if (this.funcoesService.isUndefinedOrNull(data.id)) {
      return this.create(data);
    } else {
      return this.update(data);
    }
  }
}
