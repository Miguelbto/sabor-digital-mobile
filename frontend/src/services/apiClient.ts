import { ApiError, ApiErrorResponse } from './ApiErro';

const BASE_URL = 'http://10.0.2.2:3000';

interface RequestOptions extends Omit<RequestInit, 'body'> {
    body?: unknown;
    token?: string;
}

export async function apiClient<T>(
    endpoint: string,
    options: RequestOptions = {}
): Promise<T> {
    const { body, token, headers: customHeaders, ...customOptions } = options;

    const headers = new Headers(customHeaders);

    // Adiciona o Token de Autenticação se for passado
    if (token) {
        headers.set('Authorization', `Bearer ${token}`);
    }

    // Se o body for FormData (upload de imagem), não define Content-Type
    // O próprio navegador/runtime define o boundary automaticamente.
    const isFormData = body instanceof FormData;
    if (body && !isFormData && !headers.has('Content-Type')) {
        headers.set('Content-Type', 'application/json');
    }

    const config: RequestInit = {
        ...customOptions,
        headers,
        body: isFormData ? (body as FormData) : body ? JSON.stringify(body) : undefined,
    };

    try {
        const response = await fetch(`${BASE_URL}${endpoint}`, config);

        if (!response.ok) {
            let errorData: ApiErrorResponse | undefined;

            try {
                errorData = (await response.json()) as ApiErrorResponse;
            } catch {
                // Trata respostas sem corpo JSON
            }

            throw new ApiError(
                response.status,
                errorData?.mensagem || `Erro na requisição: ${response.statusText}`,
                errorData
            );
        }

        // Trata respostas 204 No Content (como em operações DELETE)
        if (response.status === 204) {
            return {} as T;
        }

        return (await response.json()) as T;
    } catch (error) {
        if (error instanceof ApiError) {
            throw error;
        }

        throw new ApiError(0, 'Erro de rede ou servidor indisponível', {
            mensagem: (error as Error)?.message || 'Erro desconhecido',
        });
    }
}