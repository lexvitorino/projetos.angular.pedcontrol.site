import { Injectable } from "@angular/core";
import {
  HttpInterceptor,
  HttpHandler,
  HttpEvent,
  HttpResponse,
  HttpErrorResponse
} from "@angular/common/http";
import { HttpRequest } from "@angular/common/http";

import { map } from "rxjs/operators";
import { Observable } from "rxjs";

const XSSI_PREFIX = /^\)\]\}',?\n/;

@Injectable()
export class JsonInterceptor implements HttpInterceptor {
  /**
   * Custom http request interceptor
   * @public
   * @param {HttpRequest<any>} req
   * @param {HttpHandler} next
   * @returns {Observable<HttpEvent<any>>}
   * @memberof JsonInterceptor
   */
  public intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (req.responseType !== "json") {
      return next.handle(req);
    }

    if (req.url.indexOf('wspedcontrol') >= 0) {
      req = this.processJsonRequest(req);
      return next.handle(req).pipe(
        map(event => {
          if (!(event instanceof HttpResponse)) {
            return event;
          }
          return this.processJsonResponse(event);
        })
      );
    }
    return next.handle(req);
  }

  /**
   * Parse the json body using custom revivers.
   * @private
   * @param {HttpRequest<string>} res
   * @returns{HttpRequest<any>}
   * @memberof JsonInterceptor
   */
  private processJsonRequest(res: HttpRequest<string>): HttpRequest<any> {
    let body = res.body;
    if (typeof body === "object") {
      body = JSON.stringify(body);
    }
    if (typeof body === "string") {
      body = body.replace(XSSI_PREFIX, "");
      body = body !== "" ? JSON.parse(body, this.convertDateToDateSql) : null;
    }
    return res.clone({ body });
  }

  /**
   * Parse the json body using custom revivers.
   * @private
   * @param {HttpResponse<string>} res
   * @returns{HttpResponse<any>}
   * @memberof JsonInterceptor
   */
  private processJsonResponse(res: HttpResponse<string>): HttpResponse<any> {
    let body = res.body;
    if (typeof body === "object") {
      body = JSON.stringify(body);
    }
    if (typeof body === "string") {
      const originalBody = body;
      body = body.replace(XSSI_PREFIX, "");
      try {
        body = body !== "" ? JSON.parse(body, this.convertDateSqlToDate) : null;
      } catch (error) {
        throw new HttpErrorResponse({
          error: { error, text: originalBody },
          headers: res.headers,
          status: res.status,
          statusText: res.statusText,
          url: res.url || undefined
        });
      }
    }
    return res.clone({ body });
  }

  /**
   * Detect a date string and convert it to a date object.
   * @private
   * @param {*} key json property key.
   * @param {*} value json property value.
   * @returns {*} original value or the parsed date.
   * @memberof JsonInterceptor
   */
  public convertDateToDateSql(key, value) {
    if (typeof value !== "string") {
      return value;
    }
    if (value === "0001-01-01T00:00:00") {
      return null;
    }
    const matchD = /^(\d{4})-(\d{2})-(\d{2})/.exec(
      value
    );
    const matchDH = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})/.exec(
      value
    );
    if (!matchDH && !matchD) {
      return value;
    }
    const ano = "0000" + new Date(value).getFullYear().toString();
    const mes = "00" + (new Date(value).getMonth() + 1).toString();
    const dia = "00" + new Date(value).getDate().toString();
    const hra = "00" + new Date(value).getHours().toString();
    const min = "00" + new Date(value).getMinutes().toString();
    const seg = "00" + new Date(value).getSeconds().toString();
    const dt = [
      ano.substr(ano.length - 4),
      mes.substr(mes.length - 2),
      dia.substr(dia.length - 2)
    ];
    const hr = [
      hra.substr(hra.length - 2),
      min.substr(min.length - 2),
      seg.substr(seg.length - 2)
    ];
    return dt.join("-") + " " + hr.join(":");
  }

  /**
   * Detect a date string and convert it to a date object.
   * @private
   * @param {*} key json property key.
   * @param {*} value json property value.
   * @returns {*} original value or the parsed date.
   * @memberof JsonInterceptor
   */
  public convertDateSqlToDate(key, value) {
    if (typeof value !== "string") {
      return value;
    }
    value = key === "logChave" ? value : value.trim();
    if (value === "0001-01-01T00:00:00") {
      return null;
    }
    const matchD = /^(\d{4})-(\d{2})-(\d{2})/.exec(
      value
    );
    if (matchD && value.length === 10) {
      value = value + 'T00:00:00';
    }
    const matchDH = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})/.exec(
      value
    );
    if (!matchDH) {
      return value;
    }
    if (!value) {
      return "";
    }
    const data = value.substring(0, 10).split("-");
    const hora = value.substring(11, value.length).split(":");
    const t = new Date(
      +data[0],
      +data[1] - 1,
      +data[2],
      +hora[0],
      +hora[1],
      +hora[2].substr(0, 2)
    );
    return t;
  }
}
