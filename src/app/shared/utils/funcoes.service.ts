import { Injectable } from '@angular/core';
import { StringService } from './string.service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { NumberService } from './number.service';

@Injectable({
    providedIn: 'root'
})
export class FuncoesService {

    constructor(
        public stringService: StringService,
        public numberService: NumberService,
        public http: HttpClient
    ) { }

    public isUndefinedOrNull(obj: any): boolean {
        if (obj === undefined || obj == null || obj === "") {
            return true;
        }
        return false;
    }

    public isNotUndefinedOrNull(obj: any): boolean {
        return !this.isUndefinedOrNull(obj);
    }

    public getCep(cep: string): Observable<any> {
      return this.http.get<any>(`http://api.postmon.com.br/v1/cep/${cep}`);
    }
}
