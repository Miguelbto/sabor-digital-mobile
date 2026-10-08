export type PapelUsuario = 'admin' | 'cliente';

export type StatusPedido = 'pendente' | 'preparo' | 'pronto' | 'entregue';

export interface Usuario {
    id: number;
    nome: string;
    email: string;
    papel: PapelUsuario;
    criadoEm?: string;
}

export interface Produto {
    id: number;
    nome: string;
    descricao: string;
    preco: number;
    categoria: string;
    disponivel: boolean;
    imagemUrl?: string;
    criadoEm?: string;
}

export interface Cardapio {
    id: number;
    nome: string;
    descricao?: string;
    disponivel: boolean;
    produtos: Produto[];
    criadoEm?: string;
}

export interface ItemPedido {
    id?: number;
    produto_id: number;
    quantidade: number;
    produto?: Produto;
}

export interface Pedido {
    id: number;
    cliente: string;
    status: StatusPedido;
    itens: ItemPedido[];
    total?: number;
    criadoEm?: string;
}

export interface MensagemResposta {
    mensagem: string;
}