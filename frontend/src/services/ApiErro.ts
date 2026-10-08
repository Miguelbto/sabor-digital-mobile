// Tratamento de erros

export interface ApiErrorResponse {
    mensagem: string;
    statusCode?: number;
    erros?: string[] | Record<string, string>
}

/** Classe para lançar/tratar erros no bloco catch */
export class ApiError extends Error {
    public status: number;
    public data?: ApiErrorResponse;

    constructor(status: number, message: string, data?: ApiErrorResponse) {
        super(message);
        this.name = 'ApiError';
        this.status = status;
        this.data = data;
    }
}

/** Tipo auxiliar para capturar qualquer exceção no catch */
export type CatchError = ApiError | Error | unknown;