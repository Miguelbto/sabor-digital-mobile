import React, { useState } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';
import { useAuth } from '../hook/useAuth';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const { signIn } = useAuth();

  const handleLogin = async () => {
    try {
      // Passa o objeto correspondente a LoginInput
      await signIn({ email, senha });
      // O AppRoutes detectará a mudança no userToken e trocará para a Tab Bar automaticamente
    } catch (error: any) {
      Alert.alert('Erro ao entrar', error.message || 'Verifique seus dados.');
    }
  };

  return (
    <View>
      <TextInput placeholder="E-mail" value={email} onChangeText={setEmail} autoCapitalize="none" />
      <TextInput placeholder="Senha" value={senha} onChangeText={setSenha} secureTextEntry />
      <Button title="Entrar" onPress={handleLogin} />
    </View>
  );
}