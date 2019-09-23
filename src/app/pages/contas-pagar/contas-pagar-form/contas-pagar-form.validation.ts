import { MessageService } from 'src/app/shared/utils/messge.service';
import { FuncoesService } from 'src/app/shared/utils/funcoes.service';
import { ContasPagar } from '../contas-pagar.model';

export class ContasPagarFormValidation {

    constructor(
        public messageService: MessageService,
        public funcoesService: FuncoesService
    ) { }

    public getValidations(data: ContasPagar): any[] {
        const r: any[] = [];
        r.push(this.dataObrigatoria({"data": data.data}));
        r.push(this.numeroObrigatoria({"numero": data.numero}));
        r.push(this.parcelaObrigatoria({"parcela": data.parcela}));
        r.push(this.fornecedorObrigatoria({"idFornecedor": data.idFornecedor}));
        r.push(this.valorObrigatoria({"valor": data.valor}));
        r.push(this.dataVencimentoObrigatoria({"dataVencimento": data.dataVencimento}));
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
            this.messageService.warning("Cadastro de Contas Pagar", r.message);
        }
        return r;
    }

    public numeroObrigatoria(params: any, showError: boolean = false): any {
        const r: any = { "isValid": true, "message": "" };
        if (this.funcoesService.stringService.isNotEmpty(params.numero)) {
            return r;
        }
        r.isValid = false;
        r.message = "Número não informado.";
        if (!r.isValid && showError) {
            this.messageService.warning("Cadastro de Contas Pagar", r.message);
        }
        return r;
    }

    public parcelaObrigatoria(params: any, showError: boolean = false): any {
        const r: any = { "isValid": true, "message": "" };
        if (this.funcoesService.stringService.isNotEmpty(params.parcela)) {
            return r;
        }
        r.isValid = false;
        r.message = "Parcela não informado.";
        if (!r.isValid && showError) {
            this.messageService.warning("Cadastro de Contas Pagar", r.message);
        }
        return r;
    }

    public fornecedorObrigatoria(params: any, showError: boolean = false): any {
        const r: any = { "isValid": true, "message": "" };
        if (this.funcoesService.stringService.isNotEmpty(params.idFornecedor)) {
            return r;
        }
        r.isValid = false;
        r.message = "Fornecedor não informado.";
        if (!r.isValid && showError) {
            this.messageService.warning("Cadastro de Contas Pagar", r.message);
        }
        return r;
    }

    public valorObrigatoria(params: any, showError: boolean = false): any {
        const r: any = { "isValid": true, "message": "" };
        if (this.funcoesService.stringService.isNotEmpty(params.valor)) {
            return r;
        }
        r.isValid = false;
        r.message = "Valor não informado.";
        if (!r.isValid && showError) {
            this.messageService.warning("Cadastro de Contas Pagar", r.message);
        }
        return r;
    }

    public dataVencimentoObrigatoria(params: any, showError: boolean = false): any {
        const r: any = { "isValid": true, "message": "" };
        if (this.funcoesService.isNotUndefinedOrNull(params.dataVencimento)) {
            return r;
        }
        r.isValid = false;
        r.message = "Data Vencimento não informada.";
        if (!r.isValid && showError) {
            this.messageService.warning("Cadastro de Contas Pagar", r.message);
        }
        return r;
    }
}
