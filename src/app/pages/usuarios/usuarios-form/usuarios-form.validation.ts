import { MessageService } from 'src/app/shared/utils/messge.service';
import { Usuarios } from '../usuarios.model';
import { FuncoesService } from 'src/app/shared/utils/funcoes.service';

export class UsuariosFormValidation {

    constructor(
        public messageService: MessageService,
        public funcoesService: FuncoesService
    ) { }

    public getValidations(data: Usuarios): any[] {
        const r: any[] = [];
        r.push(this.nomeObrigatoria({"nome": data.nome}));
        r.push(this.usuarioObrigatoria({"usuario": data.usuario}));
        r.push(this.emailObrigatoria({"email": data.email}));
        return r.filter(v => v["isValid"] === false);
    }

    public usuarioObrigatoria(params: any, showError: boolean = false): any {
        const r: any = { "isValid": true, "message": "" };
        if (this.funcoesService.stringService.isNotEmpty(params.usuario)) {
            return r;
        }
        r.isValid = false;
        r.message = "Usuário não informado.";
        if (!r.isValid && showError) {
            this.messageService.warning("Cadastro de Usuarios", r.message);
        }
        return r;
    }

    public nomeObrigatoria(params: any, showError: boolean = false): any {
        const r: any = { "isValid": true, "message": "" };
        if (this.funcoesService.stringService.isNotEmpty(params.nome)) {
            return r;
        }
        r.isValid = false;
        r.message = "Nome não informado.";
        if (!r.isValid && showError) {
            this.messageService.warning("Cadastro de Usuarios", r.message);
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
            this.messageService.warning("Cadastro de Usuarios", r.message);
        }
        return r;
    }
}
