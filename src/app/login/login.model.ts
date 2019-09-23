export class Login {
    public usuario: string;
    public senha: string;
    public nome: string;
    public email: string;
    public avatar: string;

    public exp: Date;
    public expFmt: string;

    constructor() {
        this.usuario = 'asousa';
        this.senha = '123456';
    }
}
