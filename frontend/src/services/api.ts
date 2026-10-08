import { apiClient } from './apiClient';

// Auth / Usuários
import {
    RegistrarInput,
    RegistrarOutput,
    LoginInput,
    LoginOutput,
} from './dto/user-dto';

import { Produto, Cardapio, Pedido, StatusPedido, MensagemResposta } from './entity'

// Produtos
import {
    CriarProdutoInput,
    AtualizarProdutoInput,
} from './dto/product-dto';

// Cardápios
import {
    CriarCardapioInput,
} from './dto/menu-dto';

// Pedidos
import {
    CriarPedidoInput,
} from './dto/order-dto';

// ==========================================
// 1. AUTENTICAÇÃO (AUTH)
// ==========================================

export async function registrar(dados: RegistrarInput): Promise<RegistrarOutput> {
    return apiClient<RegistrarOutput>('/auth/registrar', {
        method: 'POST',
        body: dados,
    });
}

export async function login(dados: LoginInput): Promise<LoginOutput> {
    return apiClient<LoginOutput>('/auth/login', {
        method: 'POST',
        body: dados,
    });
}

// ==========================================
// 2. PRODUTOS
// ==========================================

export async function listarProdutos(): Promise<Produto[]> {
    return apiClient<Produto[]>('/produtos');
}

export async function buscarProdutoPorId(id: number | string): Promise<Produto> {
    return apiClient<Produto>(`/produtos/${id}`);
}

export async function criarProduto(dados: CriarProdutoInput, token: string): Promise<Produto> {
    const formData = new FormData();
    formData.append('nome', dados.nome);
    formData.append('descricao', dados.descricao);
    formData.append('preco', String(dados.preco));
    formData.append('categoria', dados.categoria);
    formData.append('disponivel', String(dados.disponivel));
    formData.append('imagem', dados.imagem);

    return apiClient<Produto>('/produtos', {
        method: 'POST',
        body: formData,
        token,
    });
}

export async function atualizarProduto(
    id: number | string,
    dados: AtualizarProdutoInput,
    token: string
): Promise<Produto> {
    const formData = new FormData();

    if (dados.nome !== undefined) formData.append('nome', dados.nome);
    if (dados.descricao !== undefined) formData.append('descricao', dados.descricao);
    if (dados.preco !== undefined) formData.append('preco', String(dados.preco));
    if (dados.categoria !== undefined) formData.append('categoria', dados.categoria);
    if (dados.disponivel !== undefined) formData.append('disponivel', String(dados.disponivel));
    if (dados.imagem !== undefined) formData.append('imagem', dados.imagem);

    return apiClient<Produto>(`/produtos/${id}`, {
        method: 'PUT',
        body: formData,
        token,
    });
}

export async function removerProduto(id: number | string, token: string): Promise<MensagemResposta> {
    return apiClient<MensagemResposta>(`/produtos/${id}`, {
        method: 'DELETE',
        token,
    });
}

// ==========================================
// 3. CARDÁPIOS
// ==========================================

export async function listarCardapios(): Promise<Cardapio[]> {
    return apiClient<Cardapio[]>('/cardapios');
}

export async function buscarCardapioPorId(id: number | string): Promise<Cardapio> {
    return apiClient<Cardapio>(`/cardapios/${id}`);
}

export async function criarCardapio(dados: CriarCardapioInput, token?: string): Promise<Cardapio> {
    return apiClient<Cardapio>('/cardapios', {
        method: 'POST',
        body: dados,
        token,
    });
}

export async function removerCardapio(id: number | string, token?: string): Promise<MensagemResposta> {
    return apiClient<MensagemResposta>(`/cardapios/${id}`, {
        method: 'DELETE',
        token,
    });
}

// ==========================================
// 4. PEDIDOS
// ==========================================

export async function criarPedido(dados: CriarPedidoInput): Promise<Pedido> {
    return apiClient<Pedido>('/pedidos', {
        method: 'POST',
        body: dados,
    });
}

export async function listarPedidos(): Promise<Pedido[]> {
    return apiClient<Pedido[]>('/pedidos');
}

export async function buscarPedidoPorId(id: number | string): Promise<Pedido> {
    return apiClient<Pedido>(`/pedidos/${id}`);
}

export async function atualizarStatusPedido(
    id: number | string,
    status: StatusPedido,
    token?: string
): Promise<Pedido> {
    return apiClient<Pedido>(`/pedidos/${id}/status`, {
        method: 'PATCH',
        body: { status },
        token,
    });
}

export async function removerPedido(id: number | string, token?: string): Promise<MensagemResposta> {
    return apiClient<MensagemResposta>(`/pedidos/${id}`, {
        method: 'DELETE',
        token,
    });
}