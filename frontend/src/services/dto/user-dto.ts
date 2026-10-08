import { MensagemResposta, Usuario, PapelUsuario } from '../entity'


// --- AUTH ---
export interface RegistrarInput {
    nome: string;
    email: string;
    senha: string;
    papel: PapelUsuario;
}

export type RegistrarOutput = Usuario | MensagemResposta;

export interface LoginInput {
    email: string;
    senha: string;
}

export interface LoginOutput {
    token: string;
    usuario: Usuario;
}