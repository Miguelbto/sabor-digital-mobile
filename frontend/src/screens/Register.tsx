import React, { useContext, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { MaterialIcons, FontAwesome } from '@expo/vector-icons';
import { AuthContext } from '../context/AuthContexts'; // Ajuste o caminho do seu AuthContext/useAuth

// Cores base extraídas do tema Tailwind da página HTML


export default function Register({ navigation }: any) {
        const { signUp } = useContext(AuthContext)

        //Estados dos inputs
        const [nome, setNome] = useState('')
        const [email, setEmail] = useState('')
        const [telefone, setTelefone] = useState('')
        const [senha, setSenha] = useState('')
        const [showPassword, setShowPassword] = useState(false)
        const [acceptedTerms, setAcceptedTerms] = useState(false)
        const [loading, setLoading] = useState(false)

        //Calculo de força de senha(0 a 4)
        const getPasswordScore = (pass: string) => {
            let score = 0;
            if (pass.length >= 8 ) score++;
            if (/[A-Z]/.test(pass)) score++;
            if (/[0-9]/.test(pass)) score++;
            if (/[^A-Za-z0-9]/.test(pass)) score++;
            return score
        }

        const passwordScore = getPasswordScore(senha)

        //informações de feedback de força de senha
        const getPasswordFeedback = () => {
            if (senha.length === 0) {
                return { text: 'Dica: use letras maiúsculas, minusculas e números', color: COLORS.textVariant}
            }
            if (passwordScore <= 1)if (passwordScore <= 1) {
                return { text: 'Senha fraca (mínimo 8 dígitos com variedade)', color: COLORS.error };
            }
            if (passwordScore <= 2) {
                return { text: 'Senha razoável', color: COLORS.warning };
            }
            if (passwordScore <= 3) {
            return { text: 'Senha boa!', color: COLORS.primary };
            }

            return { text: 'Execelente! senha forte e segura', color:COLORS.success }
        }

        const feedback = getPasswordFeedback();

        //Submissão do fomulário
        const handleRegister = async () => {
            if (!nome.trim() || !email.trim() || !senha.trim()) {
                Alert.alert('Atenção', 'Porfavor, preencha todos os campos obrigatórios')
                return
            }

            if(!acceptedTerms) {
                Alert.alert('Termos de Uso', 'Você precisa aceitar os Termos de Uso para prosseguir.');
                return;
            }

            try {
                setLoading(true)
                //Conecta com a função AuthContext / ApiService
                await signUp({
                    nome,
                    email,
                    senha,
                    telefone,

                } as any)
                Alert.alert('Sucesso', 'Conta criada com sucesso!');
            } catch (error: any) {
                Alert.alert('Erro no cadastro', error.message || 'Falha ao registrar usuário')
            } finally {
                setLoading(false)
            }
        }

        return (
    <SafeAreaProvider style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* Cabeçalho */}
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton} 
            onPress={() => navigation?.goBack()}
            activeOpacity={0.7}
          >
            <MaterialIcons name="arrow-back" size={22} color={COLORS.textOnSurface} />
          </TouchableOpacity>

          <View style={styles.badgeStep}>
            <Text style={styles.badgeStepText}>1/2</Text>
          </View>
        </View>

        {/* Tag Promocional e Títulos */}
        <View style={styles.heroSection}>
          <View style={styles.promoTag}>
            <MaterialIcons name="card-giftcard" size={16} color="#b7131a" />
            <Text style={styles.promoTagText}>PRESENTE DE BOAS-VINDAS</Text>
          </View>

          <Text style={styles.title}>Crie sua conta</Text>
          <Text style={styles.subtitle}>
            Cadastre-se e ganhe <Text style={styles.highlightText}>15% OFF</Text> no seu primeiro pedido gourmet!
          </Text>
        </View>

        {/* Formulário */}
        <View style={styles.form}>
          
          {/* Nome Completo */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Nome Completo</Text>
            <View style={styles.inputContainer}>
              <MaterialIcons name="person-outline" size={20} color={COLORS.outline} style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Seu nome e sobrenome"
                placeholderTextColor="#999"
                value={nome}
                onChangeText={setNome}
              />
            </View>
          </View>

          {/* E-mail */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>E-mail</Text>
            <View style={styles.inputContainer}>
              <MaterialIcons name="mail-outline" size={20} color={COLORS.outline} style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="seu.email@exemplo.com"
                placeholderTextColor="#999"
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
              />
            </View>
          </View>

          {/* Celular / WhatsApp */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Celular / WhatsApp</Text>
            <View style={styles.inputContainer}>
              <MaterialIcons name="phone" size={20} color={COLORS.outline} style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="(11) 99999-9999"
                placeholderTextColor="#999"
                keyboardType="phone-pad"
                value={telefone}
                onChangeText={setTelefone}
              />
            </View>
          </View>

          {/* Senha */}
          <View style={styles.inputGroup}>
            <View style={styles.labelRow}>
              <Text style={styles.label}>Criar Senha</Text>
              <Text style={styles.subLabel}>Mín. 8 caracteres</Text>
            </View>
            <View style={styles.inputContainer}>
              <MaterialIcons name="lock-outline" size={20} color={COLORS.outline} style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="••••••••"
                placeholderTextColor="#999"
                secureTextEntry={!showPassword}
                value={senha}
                onChangeText={setSenha}
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeIcon}>
                <MaterialIcons 
                  name={showPassword ? "visibility-off" : "visibility"} 
                  size={20} 
                  color={COLORS.outline} 
                />
              </TouchableOpacity>
            </View>

            {/* Barra de Força de Senha */}
            <View style={styles.strengthContainer}>
              <View style={styles.strengthBars}>
                {[1, 2, 3, 4].map((index) => {
                  let barColor = COLORS.surfaceContainer;
                  if (passwordScore >= index) {
                    if (passwordScore <= 1) barColor = COLORS.error;
                    else if (passwordScore <= 2) barColor = COLORS.warning;
                    else if (passwordScore <= 3) barColor = COLORS.primary;
                    else barColor = COLORS.success;
                  }
                  return (
                    <View 
                      key={index} 
                      style={[styles.strengthBar, { backgroundColor: barColor }]} 
                    />
                  );
                })}
              </View>
              <Text style={[styles.feedbackText, { color: feedback.color }]}>
                {feedback.text}
              </Text>
            </View>
          </View>

          {/* Checkbox de Termos */}
          <TouchableOpacity 
            style={styles.termsRow} 
            activeOpacity={0.8}
            onPress={() => setAcceptedTerms(!acceptedTerms)}
          >
            <View style={[styles.checkbox, acceptedTerms && styles.checkboxChecked]}>
              {acceptedTerms && <MaterialIcons name="check" size={14} color="#fff" />}
            </View>
            <Text style={styles.termsText}>
              Li e concordo com os{' '}
              <Text style={styles.linkText}>Termos de Uso</Text> e{' '}
              <Text style={styles.linkText}>Política de Privacidade</Text>.
            </Text>
          </TouchableOpacity>

          {/* Botão Cadastrar */}
          <TouchableOpacity 
            style={styles.submitButton} 
            onPress={handleRegister} 
            disabled={loading}
            activeOpacity={0.9}
          >
            {loading ? (
              <ActivityIndicator color="#ffffff" />
            ) : (
              <View style={styles.submitButtonContent}>
                <Text style={styles.submitButtonText}>Cadastrar e Saborear</Text>
                <MaterialIcons name="arrow-forward" size={20} color="#ffffff" />
              </View>
            )}
          </TouchableOpacity>

        </View>

        {/* Divisor Login Social */}
        <View style={styles.dividerContainer}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>ou cadastre-se com</Text>
          <View style={styles.dividerLine} />
        </View>

        {/* Botões Sociais */}
        <View style={styles.socialContainer}>
          <TouchableOpacity style={styles.socialButton} activeOpacity={0.8}>
            <FontAwesome name="google" size={18} color="#EA4335" />
            <Text style={styles.socialText}>Google</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.socialButton} activeOpacity={0.8}>
            <FontAwesome name="apple" size={20} color="#000000" />
            <Text style={styles.socialText}>Apple</Text>
          </TouchableOpacity>
        </View>

        {/* Botão de Ir para o Login */}
        <View style={styles.footerLinkContainer}>
          <Text style={styles.footerText}>
            Já possui uma conta?{' '}
            <Text 
              style={styles.loginLink}
              onPress={() => navigation?.navigate('Login')}
            >
              Fazer Login
            </Text>
          </Text>
        </View>

      </ScrollView>
    </SafeAreaProvider>
  );
}


const COLORS = {
  background: '#fcf9f8',
  surfaceLowest: '#ffffff',
  surfaceLow: '#f6f3f2',
  surfaceContainer: '#eae7e7',
  primary: '#ff5722',
  primaryDark: '#b02f00',
  secondaryFixed: '#ffdad6',
  onSecondaryFixed: '#410002',
  textOnSurface: '#1b1b1c',
  textVariant: '#5b4039',
  outline: '#907067',
  error: '#ba1a1a',
  warning: '#fabd00',
  success: '#2e7d32',
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.surfaceLow,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeStep: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: COLORS.secondaryFixed,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeStepText: {
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.onSecondaryFixed,
  },
  heroSection: {
    marginTop: 8,
    marginBottom: 16,
  },
  promoTag: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: COLORS.secondaryFixed,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 6,
    marginBottom: 12,
  },
  promoTagText: {
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.onSecondaryFixed,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: COLORS.textOnSurface,
  },
  subtitle: {
    fontSize: 14,
    color: COLORS.textVariant,
    marginTop: 4,
  },
  highlightText: {
    fontWeight: '700',
    color: COLORS.primary,
  },
  form: {
    gap: 16,
  },
  inputGroup: {
    gap: 6,
  },
  labelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.textOnSurface,
  },
  subLabel: {
    fontSize: 11,
    color: COLORS.textVariant,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surfaceLowest,
    borderRadius: 12,
    height: 48,
    paddingHorizontal: 12,
    elevation: 1, // Sombra Android
    shadowColor: '#000', // Sombra iOS
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: COLORS.textOnSurface,
  },
  eyeIcon: {
    padding: 4,
  },
  strengthContainer: {
    marginTop: 6,
    gap: 4,
  },
  strengthBars: {
    flexDirection: 'row',
    gap: 6,
  },
  strengthBar: {
    flex: 1,
    height: 4,
    borderRadius: 2,
  },
  feedbackText: {
    fontSize: 11,
  },
  termsRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    marginTop: 4,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 6,
    backgroundColor: COLORS.surfaceContainer,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 2,
  },
  checkboxChecked: {
    backgroundColor: COLORS.primary,
  },
  termsText: {
    flex: 1,
    fontSize: 12,
    color: COLORS.textVariant,
    lineHeight: 18,
  },
  linkText: {
    color: COLORS.primaryDark,
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
  submitButton: {
    backgroundColor: COLORS.primary,
    height: 52,
    borderRadius: 26,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
  },
  submitButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  submitButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 24,
    gap: 12,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: COLORS.surfaceContainer,
  },
  dividerText: {
    fontSize: 11,
    color: COLORS.textVariant,
  },
  socialContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  socialButton: {
    flex: 1,
    flexDirection: 'row',
    height: 48,
    borderRadius: 24,
    backgroundColor: COLORS.surfaceLowest,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  socialText: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.textOnSurface,
  },
  footerLinkContainer: {
    marginTop: 24,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    color: COLORS.textVariant,
  },
  loginLink: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.primary,
  },
});


