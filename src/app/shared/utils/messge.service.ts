import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import swal, { SweetAlertOptions } from "sweetalert2";

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(
    private toastrService: ToastrService
  ) { }

  public error(title: string, message: string) {
    this.toastrService.error(title, message, {
      timeOut: 3000
    });
  }

  public merror(title: string, messages: any[]) {
    messages.forEach(e => {
      this.toastrService.error(title, e, {
        timeOut: 4000
      });
    });
  }

  public warning(title: string, message: string) {
    this.toastrService.warning(title, message, {
      timeOut: 3000
    });
  }

  public mwarning(title: string, messages: any[]) {
    messages.forEach(e => {
      this.toastrService.warning(title, e, {
        timeOut: 4000
      });
    });
  }

  public info(title: string, message: string) {
    this.toastrService.info(title, message, {
      timeOut: 3000
    });
  }

  public success(title: string, message: string) {
    this.toastrService.success(title, message, {
      timeOut: 3000
    });
  }

  public getValidations(validations) {
    const mensagens = [];
    if (validations) {
      for (let i = 0; i < validations.length; i++) {
        mensagens.push(validations[i].message);
      }
    }
    return mensagens;
  }

  public removeConfirm(callback) {
    swal.fire({
      title: 'Você tem certeza?',
      text: "Você não poderá reverter isso!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim, exclua!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        callback();
      }
    })
  }

  public showCustom(content: string) {
    swal.fire({
      html: content,
      confirmButtonColor: "#3085d6",
      confirmButtonText: "OK"
    });
  }
}
