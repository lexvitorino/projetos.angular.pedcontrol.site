import { MessageService } from 'src/app/shared/utils/messge.service';
import { Produtos } from '../produtos.model';
import { FuncoesService } from 'src/app/shared/utils/funcoes.service';

export class ProdutosFormValidation {

    constructor(
        public messageService: MessageService,
        public funcoesService: FuncoesService
    ) { }

    public getValidations(data: Produtos): any[] {
        const r: any[] = [];
        r.push(this.descricaoObrigatoria({"descricao": data.descricao}));
        return r.filter(v => v["isValid"] === false);
    }

    public descricaoObrigatoria(params: any, showError: boolean = false): any {
        const r: any = { "isValid": true, "message": "" };
        if (this.funcoesService.stringService.isNotEmpty(params.descricao)) {
            return r;
        }
        r.isValid = false;
        r.message = "Descrição não informada.";
        if (!r.isValid && showError) {
            this.messageService.warning("Cadastro de Produtos", r.message);
        }
        return r;
    }
}
