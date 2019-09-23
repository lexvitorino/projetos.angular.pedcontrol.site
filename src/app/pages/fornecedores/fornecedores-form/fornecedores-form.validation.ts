import { MessageService } from 'src/app/shared/utils/messge.service';
import { Fornecedores } from '../fornecedores.model';
import { FuncoesService } from 'src/app/shared/utils/funcoes.service';

export class FornecedoresFormValidation {

    constructor(
        public messageService: MessageService,
        public funcoesService: FuncoesService
    ) { }

    public getValidations(data: Fornecedores): any[] {
        const r: any[] = [];
        r.push(this.razaoSocialObrigatoria({"razaoSocial": data.razaoSocial}));
        r.push(this.cnpjObrigatoria({"cnpj": data.cnpj}));
        r.push(this.emailObrigatoria({"email": data.email}));
        return r.filter(v => v["isValid"] === false);
    }

    public razaoSocialObrigatoria(params: any, showError: boolean = false): any {
        const r: any = { "isValid": true, "message": "" };
        if (this.funcoesService.stringService.isNotEmpty(params.razaoSocial)) {
            return r;
        }
        r.isValid = false;
        r.message = "Razão Social não informado.";
        if (!r.isValid && showError) {
            this.messageService.warning("Cadastro de Fornecedores", r.message);
        }
        return r;
    }

    public cnpjObrigatoria(params: any, showError: boolean = false): any {
        const r: any = { "isValid": true, "message": "" };
        if (this.funcoesService.stringService.isNotEmpty(params.cnpj)) {
            return r;
        }
        r.isValid = false;
        r.message = "CNPJ não informado.";
        if (!r.isValid && showError) {
            this.messageService.warning("Cadastro de Fornecedores", r.message);
        }
        return r;
    }

    public emailObrigatoria(params: any, showError: boolean = false): any {
        const r: any = { "isValid": true, "message": "" };
        if (this.funcoesService.stringService.isNotEmpty(params.email)) {
            return r;
        }
        r.isValid = false;
        r.message = "E-mail não informado.";
        if (!r.isValid && showError) {
            this.messageService.warning("Cadastro de Fornecedores", r.message);
        }
        return r;
    }
}
