import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BASE_URL } from 'src/app/config/config.constants';
import { Produtos } from './produtos.model';
import { FuncoesService } from 'src/app/shared/utils/funcoes.service';

@Injectable({
  providedIn: 'root'
})
export class ProdutosService {

  constructor(
    private http: HttpClient,
    private funcoesService: FuncoesService
  ) { }

  public get(): Observable<Produtos[]> {
    return this.http.get<Produtos[]>(`${BASE_URL()}/produtos`);
  }

  public getById(id: number): Observable<Produtos> {
    return this.http.get<Produtos>(`${BASE_URL()}/produtos/${id}`);
  }

  public create(data: Produtos): Observable<Produtos> {
    return this.http.post<Produtos>(`${BASE_URL()}/produtos/create`, data);
  }

  public update(data: Produtos): Observable<Produtos> {
    return this.http.put<Produtos>(`${BASE_URL()}/produtos/${data.id}/update`, data);
  }

  public delete(data: Produtos): Observable<Produtos> {
    return this.http.delete<Produtos>(`${BASE_URL()}/produtos/${data.id}/delete`);
  }

  public createOrUpdate(data: Produtos): Observable<Produtos> {
    if (this.funcoesService.isUndefinedOrNull(data.id)) {
      return this.create(data);
    } else {
      return this.update(data);
    }
  }
}
