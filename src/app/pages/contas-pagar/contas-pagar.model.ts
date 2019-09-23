export class ContasPagar {
    id: string;
    data: Date;
    numero: string;
    parcela: string;
    idFornecedor: string;
    status: string;
    valor: string;
    dataVencimento: Date;
    dataLiquidacao?: Date;
    desconto?: any;
    juros?: any;
    valorPago?: any;
    criadoPor: string;
    criadoEm: string;
    alteradoPor?: any;
    alteradoEm?: any;

    constructor() {
        this.status = 'A';
        this.parcela = '001/001';
        this.data = new Date();
    }
}

