import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DatetimeService {

  constructor() {
  }

  private isUndefinedOrNull(obj: any): boolean {
    if (obj === undefined || obj === null) {
      return true;
    }
    return false;
  }

  public sqlToJsDate(sqlDate) {
    const sqlDateArr = sqlDate.split(' ');
    const data = sqlDateArr[0].split('-');
    const sYear = data[0];
    const sMonth = (Number(data[1]) - 1);
    const sDay = data[2];
    const hora = sqlDateArr[1].split(':');
    const sHour = hora[0];
    const sMinute = hora[1];
    const sSecond = hora[2];
    return new Date(sYear, sMonth, sDay, sHour, sMinute, sSecond, 0);
  }

  public checkDatas(datainicial, datafinal): boolean {
    const data1 = datainicial;
    const data2 = datafinal;
    if (data1 > data2) {
        return false;
    } else {
        return true;
    }
}

}
