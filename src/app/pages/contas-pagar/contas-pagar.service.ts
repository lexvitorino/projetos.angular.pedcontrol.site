import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BASE_URL } from 'src/app/config/config.constants';
import { ContasPagar } from './contas-pagar.model';
import { FuncoesService } from 'src/app/shared/utils/funcoes.service';

@Injectable({
  providedIn: 'root'
})
export class ContasPagarService {

  constructor(
    private http: HttpClient,
    private funcoesService: FuncoesService
  ) { }

  public get(): Observable<ContasPagar[]> {
    return this.http.get<ContasPagar[]>(`${BASE_URL()}/contasPagar`);
  }

  public getById(id: number): Observable<any> {
    return this.http.get<any>(`${BASE_URL()}/contasPagar/${id}`);
  }

  public create(data: ContasPagar): Observable<ContasPagar> {
    return this.http.post<ContasPagar>(`${BASE_URL()}/contasPagar/create`, data);
  }

  public update(data: ContasPagar): Observable<ContasPagar> {
    return this.http.put<ContasPagar>(`${BASE_URL()}/contasPagar/${data.id}/update`, data);
  }

  public delete(data: ContasPagar): Observable<ContasPagar> {
    return this.http.delete<ContasPagar>(`${BASE_URL()}/contasPagar/${data.id}/delete`);
  }

  public createOrUpdate(data: ContasPagar): Observable<any> {
    if (this.funcoesService.isUndefinedOrNull(data.id)) {
      return this.create(data);
    } else {
      return this.update(data);
    }
  }
}
