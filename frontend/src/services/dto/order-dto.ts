import { MensagemResposta, Pedido, StatusPedido } from '../entity'

// --- PEDIDOS ---
export interface ItemPedidoInput {
    produto_id: number;
    quantidade: number;
}

export interface CriarPedidoInput {
    cliente: string;
    itens: ItemPedidoInput[];
}

export interface AtualizarStatusPedidoInput {
    status: StatusPedido;
}

export type GetPedidosOutput = Pedido[];
export type GetPedidoByIdOutput = Pedido;
export type CriarPedidoOutput = Pedido;
export type AtualizarStatusPedidoOutput = Pedido;
export type DeletarPedidoOutput = MensagemResposta | void;