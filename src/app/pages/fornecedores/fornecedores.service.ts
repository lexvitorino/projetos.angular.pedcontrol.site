import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BASE_URL } from 'src/app/config/config.constants';
import { Fornecedores } from './fornecedores.model';
import { FuncoesService } from 'src/app/shared/utils/funcoes.service';

@Injectable({
  providedIn: 'root'
})
export class FornecedoresService {

  constructor(
    private http: HttpClient,
    private funcoesService: FuncoesService
  ) { }

  public get(): Observable<Fornecedores[]> {
    return this.http.get<Fornecedores[]>(`${BASE_URL()}/fornecedores`);
  }

  public getById(id: number): Observable<Fornecedores> {
    return this.http.get<Fornecedores>(`${BASE_URL()}/fornecedores/${id}`);
  }

  public create(data: Fornecedores): Observable<Fornecedores> {
    return this.http.post<Fornecedores>(`${BASE_URL()}/fornecedores/create`, data);
  }

  public update(data: Fornecedores): Observable<Fornecedores> {
    return this.http.put<Fornecedores>(`${BASE_URL()}/fornecedores/${data.id}/update`, data);
  }

  public delete(data: Fornecedores): Observable<Fornecedores> {
    return this.http.delete<Fornecedores>(`${BASE_URL()}/fornecedores/${data.id}/delete`);
  }

  public createOrUpdate(data: Fornecedores): Observable<Fornecedores> {
    if (this.funcoesService.isUndefinedOrNull(data.id)) {
      return this.create(data);
    } else {
      return this.update(data);
    }
  }
}
