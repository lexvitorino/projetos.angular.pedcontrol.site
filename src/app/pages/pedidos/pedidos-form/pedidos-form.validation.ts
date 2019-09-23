import { MessageService } from 'src/app/shared/utils/messge.service';
import { FuncoesService } from 'src/app/shared/utils/funcoes.service';
import { Pedidos } from '../pedidos.model';

export class PedidosFormValidation {

  constructor(
    public messageService: MessageService,
    public funcoesService: FuncoesService
  ) { }

  public getValidations(data: Pedidos): any[] {
    const r: any[] = [];
    //r.push(this.dataVencimentoObrigatoria({ "dataVencimento": data.dataVencimento }));
    return r.filter(v => v["isValid"] === false);
  }

  public dataObrigatoria(params: any, showError: boolean = false): any {
    const r: any = { "isValid": true, "message": "" };
    if (this.funcoesService.isNotUndefinedOrNull(params.data)) {
      return r;
    }
    r.isValid = false;
    r.message = "Data não informada.";
    if (!r.isValid && showError) {
      this.messageService.warning("Cadastro de Contas Receber", r.message);
    }
    return r;
  }
}
