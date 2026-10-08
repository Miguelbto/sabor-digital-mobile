import { MensagemResposta, Cardapio } from '../entity'


// --- CARDÁPIOS ---
export interface CriarCardapioInput {
    nome: string;
    descricao?: string;
    disponivel?: boolean;
    produtos: number[];
}

export type GetCardapiosOutput = Cardapio[];
export type GetCardapioByIdOutput = Cardapio;
export type CriarCardapioOutput = Cardapio;
export type DeletarCardapioOutput = MensagemResposta | void;
