import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BASE_URL } from 'src/app/config/config.constants';
import { ContasReceber } from './contas-receber.model';
import { FuncoesService } from 'src/app/shared/utils/funcoes.service';

@Injectable({
  providedIn: 'root'
})
export class ContasReceberService {

  constructor(
    private http: HttpClient,
    private funcoesService: FuncoesService
  ) { }

  public get(): Observable<ContasReceber[]> {
    return this.http.get<ContasReceber[]>(`${BASE_URL()}/contasReceber`);
  }

  public getById(id: number): Observable<any> {
    return this.http.get<any>(`${BASE_URL()}/contasReceber/${id}`);
  }

  public create(data: ContasReceber): Observable<any> {
    return this.http.post<any>(`${BASE_URL()}/contasReceber/create`, data);
  }

  public update(data: ContasReceber): Observable<any> {
    return this.http.put<any>(`${BASE_URL()}/contasReceber/${data.id}/update`, data);
  }

  public delete(data: ContasReceber): Observable<ContasReceber> {
    return this.http.delete<ContasReceber>(`${BASE_URL()}/contasReceber/${data.id}/delete`);
  }

  public createOrUpdate(data: ContasReceber): Observable<any> {
    if (this.funcoesService.isUndefinedOrNull(data.id)) {
      return this.create(data);
    } else {
      return this.update(data);
    }
  }
}
