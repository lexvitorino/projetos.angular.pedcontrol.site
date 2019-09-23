import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StringService {

  constructor(
  ) { }

  public isEmpty(value: any) {
    const r = value === undefined || value === null || value === '';
    return r;
  }

  public isNotEmpty(value: any) {
    return !this.isEmpty(value);
  }

}
