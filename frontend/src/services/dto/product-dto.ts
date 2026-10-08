import { MensagemResposta, Produto } from '../entity'


// --- PRODUTOS ---
export interface CriarProdutoInput {
    nome: string;
    descricao: string;
    preco: number;
    categoria: string;
    disponivel: boolean;
    imagem: File;
}

export type AtualizarProdutoInput = Partial<CriarProdutoInput>;

export type GetProdutosOutput = Produto[];
export type GetProdutoByIdOutput = Produto;
export type CriarProdutoOutput = Produto;
export type AtualizarProdutoOutput = Produto;
export type DeletarProdutoOutput = MensagemResposta | void;

