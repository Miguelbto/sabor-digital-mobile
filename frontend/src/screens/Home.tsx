import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Platform,
} from 'react-native';
import Svg, { Path, Rect, Circle, Defs, LinearGradient as SvgLinearGradient, Stop, G, Text as SvgText, TSpan } from 'react-native-svg';
import { LinearGradient } from 'expo-linear-gradient';

export default function Home() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#FAF9F6" />
      
      <ScrollView 
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.content}>
          
          {/* BEGIN: BrandLogoHeader */}
          <View style={styles.header}>
            <View style={styles.logoContainer}>
              <Svg height="48" width="160" viewBox="0 0 240 60">
                <Defs>
                  <SvgLinearGradient id="brandGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <Stop offset="0%" stopColor="#FF5722" />
                    <Stop offset="100%" stopColor="#FF8A65" />
                  </SvgLinearGradient>
                </Defs>
                <G>
                  <Rect x="4" y="6" width="48" height="48" rx="14" fill="url(#brandGrad)" />
                  <Path d="M28 17 C22 17 17 22 17 28 L39 28 C39 22 34 17 28 17 Z" fill="#FFFFFF" />
                  <Circle cx="28" cy="15" r="2.5" fill="#FFD54F" />
                  <Rect x="15" y="30" width="26" height="3" rx="1.5" fill="#FFFFFF" />
                  <Path d="M22 36 Q28 41 34 36" fill="none" stroke="#FFFFFF" strokeLinecap="round" strokeWidth="2.5" />
                </G>
                <SvgText x="62" y="31" fill="#1E1E1E" fontSize="20" fontWeight="bold" letterSpacing="-0.5">
                  Sabor<TSpan fill="#FF5722">.</TSpan>
                </SvgText>
                <SvgText x="125" y="31" fill="#FFC107" fontSize="20" fontWeight="bold">
                  & Cia
                </SvgText>
                <SvgText x="63" y="44" fill="#757575" fontSize="9.5" fontWeight="bold" letterSpacing="1.2">
                  DELIVERY GOURMET
                </SvgText>
              </Svg>
            </View>
          </View>
          {/* END: BrandLogoHeader */}

          {/* BEGIN: CategoryBadge */}
          <View style={styles.badgeContainer}>
            <Svg width="14" height="14" fill="none" stroke="#7A2E1E" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
              <Path d="M18 2l-4 4-2-2-4 4 4 4 6-6" />
              <Path d="M6 18l4-4" />
              <Path d="M14.5 9.5L5 19" />
              <Path d="M3 21l3-3" />
            </Svg>
            <Text style={styles.badgeText}>ALTA GASTRONOMIA</Text>
          </View>
          {/* END: CategoryBadge */}

          {/* BEGIN: HeroHeadings */}
          <View style={styles.heroContainer}>
            <Text style={styles.heroTitle}>O melhor sabor,{"\n"}entregue na sua porta.</Text>
            <Text style={styles.heroSubtitle}>
              Experiência culinária incomparável de chefs renomados para sua mesa.
            </Text>
          </View>
          {/* END: HeroHeadings */}

          {/* BEGIN: FeatureCard */}
          <View style={styles.card}>
            <View style={styles.cardImageContainer}>
              <Image 
                source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD8-Uhqz0xR2rOHaFg5GyrUBCsZxu-K_n1O-KplR3VmqefC1kzJZ0L9xIbAbOOW2-a9J6HtsX2Fabkzgo72grb75FIEtXWWP691iUv6mt8SBDRvaaU8TMDRrUrDpfKeI48W1sxriEXZPNEUcoBGf2W09Z_SUxwJUPGisIGyKWEFf_IBZeWA5saEok6LV7JqnBb1HRc_vU032XkJLBk-_6AXiiATGV4FzuIrVTE89UavSaeF7C63TTcI7Q' }} 
                style={styles.cardImage} 
              />
              
              <View style={styles.freshBadge}>
                <Svg width="14" height="14" fill="none" stroke="#059669" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <Path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
                  <Path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
                </Svg>
                <Text style={styles.freshBadgeText}>100% Fresco</Text>
              </View>

              <LinearGradient 
                colors={['transparent', 'rgba(0,0,0,0.4)', 'rgba(0,0,0,0.8)']} 
                style={styles.cardGradient}
              >
                <View style={styles.premiumTag}>
                  <Text style={styles.premiumTagText}>QUALIDADE PREMIUM</Text>
                </View>
                <Text style={styles.premiumTitle}>Ingredientes Selecionados</Text>
              </LinearGradient>
            </View>

            <View style={styles.cardBody}>
              <Text style={styles.cardDescription}>
                Pratos autorais feitos com ingredientes criteriosamente frescos, orgânicos locais e cortes nobres preparados por mestres da alta gastronomia.
              </Text>
            </View>
          </View>
          {/* END: FeatureCard */}

          {/* BEGIN: CarouselIndicators */}
          <View style={styles.carouselIndicators}>
            <View style={[styles.dot, styles.activeDot]} />
            <View style={styles.dot} />
            <View style={styles.dot} />
          </View>
          {/* END: CarouselIndicators */}

          {/* BEGIN: SocialProofPill */}
          <View style={styles.socialProof}>
            <Svg width="14" height="14" viewBox="0 0 20 20" fill="#FBBF24">
              <Path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </Svg>
            <Text style={styles.socialText}>
              <Text style={styles.socialBold}>4.9 </Text>
              (mais de <Text style={styles.socialBold}>35 mil</Text> clientes satisfeitos)
            </Text>
          </View>
          {/* END: SocialProofPill */}

        </View>
      </ScrollView>

      {/* BEGIN: ActionButtons */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.primaryButton} activeOpacity={0.8}>
          <Text style={styles.primaryButtonText}>Criar Conta</Text>
          <Svg width="18" height="18" fill="none" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
            <Path d="M5 12h14" />
            <Path d="M12 5l7 7-7 7" />
          </Svg>
        </TouchableOpacity>

        <TouchableOpacity style={styles.secondaryButton} activeOpacity={0.6}>
          <Text style={styles.secondaryButtonText}>Já tenho uma conta / Entrar</Text>
        </TouchableOpacity>
      </View>
      {/* END: ActionButtons */}
      
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FAF9F6',
  },
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingTop: 32,
    paddingBottom: 20,
    alignItems: 'center',
  },
  content: {
    width: '100%',
    maxWidth: 420,
    alignItems: 'center',
  },
  header: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 24,
  },
  logoContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    paddingHorizontal: 24,
    paddingVertical: 8,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#F5F5F5',
    alignItems: 'center',
    justifyContent: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 3,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  badgeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FDEEE9',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
    marginBottom: 16,
    gap: 6,
  },
  badgeText: {
    color: '#7A2E1E',
    fontSize: 11,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  heroContainer: {
    alignItems: 'center',
    marginBottom: 24,
    paddingHorizontal: 8,
  },
  heroTitle: {
    fontSize: 26,
    fontWeight: '900',
    color: '#191919',
    textAlign: 'center',
    marginBottom: 10,
    lineHeight: 32,
    letterSpacing: -0.5,
  },
  heroSubtitle: {
    fontSize: 14,
    color: '#525252',
    textAlign: 'center',
    fontWeight: '500',
    lineHeight: 22,
    maxWidth: 320,
  },
  card: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 28,
    overflow: 'hidden',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#F5F5F5',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.08,
        shadowRadius: 24,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  cardImageContainer: {
    width: '100%',
    height: 220,
    position: 'relative',
    backgroundColor: '#F5F5F5',
  },
  cardImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  freshBadge: {
    position: 'absolute',
    top: 14,
    left: 14,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    gap: 6,
  },
  freshBadgeText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#262626',
  },
  cardGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingTop: 40,
    paddingBottom: 12,
    paddingHorizontal: 16,
  },
  premiumTag: {
    backgroundColor: '#FF5722',
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    marginBottom: 4,
  },
  premiumTagText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '900',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  premiumTitle: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: 'bold',
    letterSpacing: -0.3,
  },
  cardBody: {
    padding: 20,
  },
  cardDescription: {
    fontSize: 13.5,
    lineHeight: 22,
    color: '#525252',
    fontWeight: '500',
  },
  carouselIndicators: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 16,
  },
  dot: {
    width: 6,
    height: 6,
    backgroundColor: '#D4D4D4',
    borderRadius: 3,
  },
  activeDot: {
    width: 24,
    backgroundColor: '#FF5722',
  },
  socialProof: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(229, 229, 229, 0.6)',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
    gap: 6,
    marginBottom: 20,
  },
  socialText: {
    fontSize: 12,
    color: '#404040',
    fontWeight: '500',
  },
  socialBold: {
    fontWeight: 'bold',
    color: '#171717',
  },
  footer: {
    width: '100%',
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: Platform.OS === 'ios' ? 10 : 24,
    backgroundColor: '#FAF9F6',
    alignItems: 'center',
    gap: 14,
  },
  primaryButton: {
    width: '100%',
    maxWidth: 420,
    backgroundColor: '#FF5722',
    paddingVertical: 16,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    ...Platform.select({
      ios: {
        shadowColor: '#FF5722',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.4,
        shadowRadius: 25,
      },
      android: {
        elevation: 6,
      },
    }),
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  secondaryButton: {
    paddingVertical: 8,
  },
  secondaryButtonText: {
    fontSize: 13.5,
    fontWeight: 'bold',
    color: '#A72D00',
  },
});