import { PedItens } from './pedidos-itens/pedidos-itens.model';
import { PedCondsPagto } from './pedidos-cond-pagtos/pedidos-cond-pagtos.model';

export class Pedidos {
  id: any;
  data: any;
  numero: any;
  idCliente: any;
  cliente: string;
  prazoEntrega: any;
  prazoColocacao: any;
  tipoFrete: any;
  desconto: any;
  vendedor: any;
  valorAdiant: any;
  tipoAdiant: any;
  bancoAdiant: any;
  agenciaAdiant: any;
  contaAdiant: any;
  assAdiant: any;
  assinatura: any;
  descontoTotal: any;
  valorTotal: any;
  fatCep?: any;
  fatRua?: any;
  fatNumero?: any;
  fatComplemento?: any;
  fatBairro?: any;
  fatCidade?: any;
  fatEstado?: any;
  fatTelefone?: any;
  entCep?: any;
  entRua?: any;
  entNumero?: any;
  entComplemento?: any;
  entBairro?: any;
  entCidade?: any;
  entEstado?: any;
  entTelefone?: any;
  entReferencia?: any;
  pedItens: PedItens[];
  pedCondsPagto: PedCondsPagto[];
  criadoPor: any;
  criadoEm: any;
  alteradoPor: any;
  alteradoEm: any;
  contructor() {
    this.pedItens = [];
    this.pedCondsPagto = [];
    this.tipoAdiant = "";
  }
}

export class TipoFrete {
  public get: any = [
    { id: 'D', descricao: "DAN'ART" },
    { id: 'C', descricao: 'Cliente' },
    { id: 'M', descricao: 'Misto' }
  ];
}

export class TipoAdiantamento {
  public get: any = [
    { id: 'D', descricao: 'Dinheiro' },
    { id: 'C', descricao: 'Cheque' }
  ];
}
