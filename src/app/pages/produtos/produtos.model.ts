export class Produtos {
  id: string;
  descricao: string;
  tipo: string;
  valor: string;
  criadoPor: string;
  criadoEm: string;
  alteradoPor: string;
  alteradoEm: string;

  constructor() {
    this.tipo = 'F';
  }
}

export class TiposProduto {
  public get: any = [
    { id: 'M', descricao: 'Materia Prima' },
    { id: 'F', descricao: 'Produto Final' }
  ];
}
