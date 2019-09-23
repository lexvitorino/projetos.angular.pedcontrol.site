export class ContasReceber {
    id: string;
    data: Date;
    numero: string;
    parcela: string;
    idCliente: string;
    status: string;
    valor: string;
    dataVencimento: Date;
    dataLiquidacao?: Date;
    desconto?: any;
    juros?: any;
    valorPago?: any;
    criadoPor?: any;
    criadoEm?: any;
    alteradoPor?: any;
    alteradoEm?: any;

    constructor() {
        this.status = 'A';
        this.parcela = '001/001';
    }
}
