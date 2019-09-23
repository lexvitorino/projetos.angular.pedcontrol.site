import { MessageService } from 'src/app/shared/utils/messge.service';
import { Clientes } from '../clientes.model';
import { FuncoesService } from 'src/app/shared/utils/funcoes.service';

export class ClientesFormValidation {

    constructor(
        public messageService: MessageService,
        public funcoesService: FuncoesService
    ) { }

    public getValidations(data: Clientes): any[] {
        const r: any[] = [];
        r.push(this.nomeObrigatoria({"nome": data.nome}));
        r.push(this.cpfCnpjObrigatoria({"cpfCnpj": data.cpfCnpj}));
        return r.filter(v => v["isValid"] === false);
    }

    public nomeObrigatoria(params: any, showError: boolean = false): any {
        const r: any = { "isValid": true, "message": "" };
        if (this.funcoesService.stringService.isNotEmpty(params.nome)) {
            return r;
        }
        r.isValid = false;
        r.message = "Nome não informado.";
        if (!r.isValid && showError) {
            this.messageService.warning("Cadastro de Clientes", r.message);
        }
        return r;
    }

    public cpfCnpjObrigatoria(params: any, showError: boolean = false): any {
        const r: any = { "isValid": true, "message": "" };
        if (this.funcoesService.stringService.isNotEmpty(params.cpfCnpj)) {
            return r;
        }
        r.isValid = false;
        r.message = "CPF/CNPJ não informado.";
        if (!r.isValid && showError) {
            this.messageService.warning("Cadastro de Clientes", r.message);
        }
        return r;
    }
}
