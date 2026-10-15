import React, { createContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Importa as funções e os DTOs do seu arquivo de serviços
import { 
  login as apiLogin, 
  registrar as apiRegistrar 
} from '../services/api'; // Ajuste o caminho do seu arquivo de chamadas API
import { LoginInput, RegistrarInput, LoginOutput, RegistrarOutput } from  '../services/dto/user-dto';

// Chaves para salvar dados no dispositivo
const TOKEN_KEY = '@app:token';
const USER_KEY = '@app:user';

// Tipagem para os dados retornados no contexto
interface AuthContextData {
  userToken: string | null;
  userData: any | null; // Se você tiver um tipo User (ex: UserEntity), substitua 'any' por 'User'
  loading: boolean;
  signIn: (credentials: LoginInput) => Promise<LoginOutput>;
  signUp: (data: RegistrarInput) => Promise<RegistrarOutput>;
  signOut: () => Promise<void>;
}

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [userToken, setUserToken] = useState<string | null>(null);
  const [userData, setUserData] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // 1. Carrega o token e dados do usuário salvos no armazenamento local
  useEffect(() => {
    async function loadStorageData() {
      try {
        const storedToken = await AsyncStorage.getItem(TOKEN_KEY);
        const storedUser = await AsyncStorage.getItem(USER_KEY);

        if (storedToken) {
          setUserToken(storedToken);
        }
        if (storedUser) {
          setUserData(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error('Erro ao carregar token do AsyncStorage:', error);
      } finally {
        setLoading(false);
      }
    }

    loadStorageData();
  }, []);

  // 2. Função de Login
  const signIn = async (credentials: LoginInput): Promise<LoginOutput> => {
    // Executa a requisição da API
    const response = await apiLogin(credentials);

    // Ajuste aqui conforme a propriedade exata que sua API retorna no LoginOutput (ex: response.token ou response.accessToken)
    const { token, usuario } = response as any; 

    if (token) {
      setUserToken(token);
      await AsyncStorage.setItem(TOKEN_KEY, token);
    }

    if (usuario) {
      setUserData(usuario);
      await AsyncStorage.setItem(USER_KEY, JSON.stringify(usuario));
    }

    return response;
  };

  // 3. Função de Cadastro
  const signUp = async (data: RegistrarInput): Promise<RegistrarOutput> => {
    const response = await apiRegistrar(data);
    
    // Caso sua API faça o login automaticamente após o registro, trate o token aqui:
    const { token, usuario } = response as any;
    if (token) {
      setUserToken(token);
      await AsyncStorage.setItem(TOKEN_KEY, token);
      if (usuario) {
        setUserData(usuario);
        await AsyncStorage.setItem(USER_KEY, JSON.stringify(usuario));
      }
    }

    return response;
  };

  // 4. Função de Logout
  const signOut = async () => {
    await AsyncStorage.removeItem(TOKEN_KEY);
    await AsyncStorage.removeItem(USER_KEY);
    setUserToken(null);
    setUserData(null);
  };

  return (
    <AuthContext.Provider
      value={{
        userToken,
        userData,
        loading,
        signIn,
        signUp,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};