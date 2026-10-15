import React, { useContext } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { AuthContext } from '../context/AuthContexts';

// Telas de Autenticação (ajuste os caminhos se necessário)
import WelcomeScreen from '../App';
import LoginScreen from '../screens/Login';
import Register from '../screens/Register';

// Telas Internas (Tabs)
import HomeScreen from '../screens/Home';
import ProfileScreen from '../screens/Profile';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// 1. Pilha de Autenticação (Deslogado)
function AuthStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="Welcome" 
        component={WelcomeScreen} 
        options={{ headerShown: false }} 
      />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={Register} />
    </Stack.Navigator>
  );
}

// 2. Navegador por Abas (Logado)
function MainTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen 
        name="HomeTab" 
        component={HomeScreen} 
        options={{ title: 'Início' }} 
      />
      <Tab.Screen 
        name="ProfileTab" 
        component={ProfileScreen} 
        options={{ title: 'Perfil' }} 
      />
    </Tab.Navigator>
  );
}

// 3. Roteador Principal Condicional
export default function AppRoutes() {
  const { userToken, loading } = useContext(AuthContext);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  // Alterna dinamicamente a estrutura de telas com base no token
  return userToken ? <MainTabs /> : <AuthStack />;
}