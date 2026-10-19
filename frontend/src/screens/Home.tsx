import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  Animated,
  StatusBar,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { SafeAreaProvider } from 'react-native-safe-area-context'

// Paleta de Cores Fiéis ao Tema Material Design / Tailwind do HTML
const COLORS = {
  background: '#fcf9f8',
  surfaceLowest: '#ffffff',
  surfaceLow: '#f6f3f2',
  surfaceContainer: '#f0eded',
  surfaceHigh: '#eae7e7',
  surfaceHighest: '#e5e2e1',
  primary: '#b02f00',
  primaryContainer: '#ff5722',
  onPrimary: '#ffffff',
  onSurface: '#1b1b1c',
  onSurfaceVariant: '#5b4039',
  secondaryFixed: '#ffdad6',
  onSecondaryFixed: '#410002',
  tertiaryFixed: '#ffdf9e',
  onTertiaryFixed: '#261a00',
  onPrimaryFixed: '#3b0900',
  amberStar: '#f59e0b',
  toastBackground: '#303030',
  toastText: '#f3f0ef',
};

// Interface para os Itens do Cardápio
interface MenuItem {
  id: string;
  nome: string;
  descricao: string;
  preco: string;
  avaliacao: string;
  tempo: string;
  imagem: string;
  badge?: {
    texto?: string;
    icone?: keyof typeof MaterialIcons.glyphMap;
    corIcone?: string;
    bg?: string;
  };
}

const PRATOS_MOCK: MenuItem[] = [
  {
    id: '1',
    nome: 'Risoto de Cogumelos Trufado',
    descricao: 'Arroz arbóreo al dente, mix de shimeji, shiitake e azeite trufado finalizado com parmesão curado.',
    preco: 'R$ 54,90',
    avaliacao: '4.9',
    tempo: '20-30 min',
    imagem: 'https://images.unsplash.com/photo-1633964913295-ceb43826e7c9?auto=format&fit=crop&w=300&q=80',
    badge: { icone: 'eco', corIcone: '#2e7d32' },
  },
  {
    id: '2',
    nome: 'Picanha Grelhada com Farofa',
    descricao: 'Corte nobre na brasa, acompanha farofa crocante de mandioca tostada na manteiga e vinagrete fresco.',
    preco: 'R$ 68,00',
    avaliacao: '4.8',
    tempo: '25-35 min',
    imagem: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=300&q=80',
    badge: { texto: 'Chef', bg: COLORS.primaryContainer },
  },
  {
    id: '3',
    nome: 'Nhoque ao Pomodoro Rústico',
    descricao: 'Massa artesanal de batata suave, molho de tomates San Marzano assados e manjericão fresco.',
    preco: 'R$ 48,00',
    avaliacao: '4.7',
    tempo: '18-25 min',
    imagem: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=300&q=80',
    badge: { icone: 'favorite', corIcone: '#d97706' },
  },
  {
    id: '4',
    nome: 'Salmão Grelhado com Aspargos',
    descricao: 'Filé alto selado no ponto exato, mousseline de ervilha suave e aspargos salteados na flor de sal.',
    preco: 'R$ 64,50',
    avaliacao: '4.9',
    tempo: '22-30 min',
    imagem: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=300&q=80',
  },
];

const CATEGORIAS = ['Entradas', 'Principais', 'Bebidas', 'Sobremesas', 'Combos'];

export default function HomeScreen() {
  const [activeCategory, setActiveCategory] = useState('Principais')
  const [selectedFilters, setSelectedFilters] = useState<string[]>(['Mais Vendidos'])
  const [search, setSearch] = useState('')

  //Estado para Toast Feedback de adição ao carrinho
  const [toastMessage, setToastMessage] = useState<string | null>(null)
  const toastOpacity = useState(new Animated.Value(0))[0];

  const triggerToast = (itemNome: string) => {
    setToastMessage(`${itemNome} adicionado`!);
    Animated.sequence([
      Animated.timing(toastOpacity, {toValue: 1, duration: 250, useNativeDriver: true }),
      Animated.delay(1800),
      Animated.timing(toastOpacity, { toValue: 0, duration: 250, useNativeDriver: true}),
    ]).start(() => setToastMessage(null))
  }

  const toggleFilter = (filterName: string) => {
    if (selectedFilters.includes(filterName)){
      setSelectedFilters(selectedFilters.filter((f) => f !== filterName));
    } else {
      setSelectedFilters([...selectedFilters, filterName])
    }
  }

  return (
    <SafeAreaProvider style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />

      {/* Header Superior */}
      <View style={styles.header}>
        <View style={styles.brandContainer}>
          <View style={styles.logoCircle}>
            <MaterialIcons name="restaurant-menu" size={20} color={COLORS.primary} />
          </View>
          <View>
            <Text style={styles.brandTitle}>Sabor & Cia</Text>
            <Text style={styles.brandSubtitle}>Cardápio</Text>
          </View>
        </View>

        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.iconButton} activeOpacity={0.7}>
            <MaterialIcons name="notifications-none" size={22} color={COLORS.onSurfaceVariant} />
            <View style={styles.notificationBadge} />
          </TouchableOpacity>
          
          <TouchableOpacity activeOpacity={0.8}>
            <Image
              source={{ uri: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80' }}
              style={styles.avatar}
            />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* Barra de Busca e Abas Fixas */}
        <View style={styles.stickySearchWrapper}>
          <View style={styles.searchContainer}>
            <MaterialIcons name="search" size={20} color={COLORS.onSurfaceVariant} style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Buscar prato, ingrediente..."
              placeholderTextColor={COLORS.onSurfaceVariant}
              value={search}
              onChangeText={setSearch}
            />
            <TouchableOpacity style={styles.filterIconButton}>
              <MaterialIcons name="tune" size={20} color={COLORS.primaryContainer} />
            </TouchableOpacity>
          </View>

          {/* Carrossel de Categorias */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoriesContainer}>
            {CATEGORIAS.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <TouchableOpacity
                  key={cat}
                  style={styles.categoryTab}
                  onPress={() => setActiveCategory(cat)}
                  activeOpacity={0.7}
                >
                  <Text style={[styles.categoryTabText, isActive && styles.categoryTabTextActive]}>
                    {cat}
                  </Text>
                  <View style={[styles.tabIndicator, isActive && styles.tabIndicatorActive]} />
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>

        {/* Chips de Filtro Rápido */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chipsContainer}>
          {[
            { label: 'Mais Vendidos', icon: 'local-fire-department', color: COLORS.primaryContainer },
            { label: 'Destaque do Chef', icon: 'workspace-premium', color: COLORS.amberStar },
            { label: 'Vegetariano', icon: 'spa', color: '#2e7d32' },
            { label: 'Sem Glúten', icon: 'grain', color: '#d97706' },
          ].map((chip) => {
            const isSelected = selectedFilters.includes(chip.label);
            return (
              <TouchableOpacity
                key={chip.label}
                style={[styles.chipButton, isSelected && styles.chipButtonSelected]}
                onPress={() => toggleFilter(chip.label)}
                activeOpacity={0.8}
              >
                <MaterialIcons
                  name={chip.icon as any}
                  size={16}
                  color={isSelected ? COLORS.onPrimary : chip.color}
                />
                <Text style={[styles.chipText, isSelected && styles.chipTextSelected]}>
                  {chip.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* Cabeçalho da Seção de Pratos */}
        <View style={styles.sectionHeader}>
          <View style={styles.sectionHeaderLeft}>
            <Text style={styles.sectionTitle}>Pratos Principais</Text>
            <View style={styles.badgeCount}>
              <Text style={styles.badgeCountText}>8 opções</Text>
            </View>
          </View>
          <View style={styles.kitchenActive}>
            <MaterialIcons name="restaurant" size={14} color={COLORS.primary} />
            <Text style={styles.kitchenActiveText}>Cozinha ativa</Text>
          </View>
        </View>

        {/* Lista de Cards do Cardápio */}
        <View style={styles.menuList}>
          {PRATOS_MOCK.map((item) => (
            <View key={item.id} style={styles.card}>
              <View style={styles.cardImageContainer}>
                <Image source={{ uri: item.imagem }} style={styles.cardImage} />
                {item.badge && (
                  <View
                    style={[
                      styles.cardBadge,
                      item.badge.bg ? { backgroundColor: item.badge.bg } : styles.cardBadgeBlur,
                    ]}
                  >
                    {item.badge.icone && (
                      <MaterialIcons name={item.badge.icone} size={11} color={item.badge.corIcone || '#fff'} />
                    )}
                    {item.badge.texto && (
                      <Text style={styles.cardBadgeText}>{item.badge.texto}</Text>
                    )}
                  </View>
                )}
              </View>

              <View style={styles.cardContent}>
                <Text style={styles.cardTitle} numberOfLines={1}>
                  {item.nome}
                </Text>
                <Text style={styles.cardDescription} numberOfLines={2}>
                  {item.descricao}
                </Text>

                {/* Avaliação e Tempo */}
                <View style={styles.cardMetaRow}>
                  <View style={styles.metaBadge}>
                    <MaterialIcons name="star" size={13} color={COLORS.amberStar} />
                    <Text style={styles.metaText}>{item.avaliacao}</Text>
                  </View>
                  <View style={styles.metaBadge}>
                    <MaterialIcons name="schedule" size={13} color={COLORS.onSurfaceVariant} />
                    <Text style={styles.metaText}>{item.tempo}</Text>
                  </View>
                </View>

                {/* Preço e Botão Adicionar */}
                <View style={styles.cardFooter}>
                  <Text style={styles.cardPrice}>{item.preco}</Text>
                  <TouchableOpacity
                    style={styles.addButton}
                    onPress={() => triggerToast(item.nome)}
                    activeOpacity={0.8}
                  >
                    <MaterialIcons name="add" size={20} color={COLORS.onPrimary} />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))}
        </View>

        {/* Banner Promocional de Combo */}
        <View style={styles.promoBanner}>
          <View style={styles.promoGlow} />
          <View style={styles.promoContent}>
            <View style={styles.promoLeft}>
              <View style={styles.promoIconContainer}>
                <MaterialIcons name="local-bar" size={26} color={COLORS.tertiaryFixed} />
              </View>
              <View style={styles.promoTextContainer}>
                <View style={styles.promoTagsRow}>
                  <View style={styles.comboTag}>
                    <Text style={styles.comboTagText}>COMBO ESPECIAL</Text>
                  </View>
                  <Text style={styles.promoSavingsText}>Economize 20%</Text>
                </View>
                <Text style={styles.promoTitle}>Turbine seu prato com bebida!</Text>
                <Text style={styles.promoSubtitle}>Suco natural ou refrigerante artesanal</Text>
              </View>
            </View>

            <TouchableOpacity style={styles.promoButton} activeOpacity={0.85}>
              <Text style={styles.promoButtonText}>Ver</Text>
              <MaterialIcons name="arrow-forward" size={14} color={COLORS.primary} />
            </TouchableOpacity>
          </View>
        </View>

      </ScrollView>

      {/* Toast Notificação de Item Adicionado */}
      {toastMessage && (
        <Animated.View style={[styles.toastContainer, { opacity: toastOpacity }]}>
          <MaterialIcons name="check-circle" size={18} color={COLORS.primaryContainer} />
          <Text style={styles.toastText}>{toastMessage}</Text>
        </Animated.View>
      )}
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 32,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: COLORS.background,
  },
  brandContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  logoCircle: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: COLORS.secondaryFixed,
    justifyContent: 'center',
    alignItems: 'center',
  },
  brandTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.primary,
  },
  brandSubtitle: {
    fontSize: 11,
    color: COLORS.onSurfaceVariant,
    fontWeight: '500',
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.surfaceLow,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  notificationBadge: {
    position: 'absolute',
    top: 9,
    right: 9,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.primary,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
  },
  stickySearchWrapper: {
    marginTop: 4,
    gap: 12,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surfaceLow,
    borderRadius: 12,
    height: 48,
    paddingHorizontal: 12,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: COLORS.onSurface,
  },
  filterIconButton: {
    padding: 4,
  },
  categoriesContainer: {
    gap: 20,
    paddingVertical: 4,
  },
  categoryTab: {
    alignItems: 'center',
    paddingBottom: 6,
  },
  categoryTabText: {
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.onSurfaceVariant,
  },
  categoryTabTextActive: {
    color: COLORS.primaryContainer,
  },
  tabIndicator: {
    height: 3,
    width: '100%',
    backgroundColor: 'transparent',
    borderRadius: 2,
    marginTop: 4,
  },
  tabIndicatorActive: {
    backgroundColor: COLORS.primaryContainer,
  },
  chipsContainer: {
    gap: 8,
    paddingVertical: 12,
  },
  chipButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: COLORS.surfaceHigh,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  chipButtonSelected: {
    backgroundColor: COLORS.primaryContainer,
  },
  chipText: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.onSurface,
  },
  chipTextSelected: {
    color: COLORS.onPrimary,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 12,
  },
  sectionHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.onSurface,
  },
  badgeCount: {
    backgroundColor: COLORS.surfaceHighest,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
  },
  badgeCountText: {
    fontSize: 11,
    color: COLORS.onSurfaceVariant,
    fontWeight: '600',
  },
  kitchenActive: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  kitchenActiveText: {
    fontSize: 11,
    color: COLORS.onSurfaceVariant,
  },
  menuList: {
    gap: 12,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: COLORS.surfaceLowest,
    borderRadius: 16,
    padding: 10,
    gap: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
  },
  cardImageContainer: {
    width: 84,
    height: 84,
    borderRadius: 12,
    overflow: 'hidden',
    position: 'relative',
  },
  cardImage: {
    width: '100%',
    height: '100%',
  },
  cardBadge: {
    position: 'absolute',
    top: 4,
    left: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardBadgeBlur: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
  },
  cardBadgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#ffffff',
  },
  cardContent: {
    flex: 1,
    justifyContent: 'space-between',
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.onSurface,
  },
  cardDescription: {
    fontSize: 12,
    color: COLORS.onSurfaceVariant,
    marginTop: 2,
    lineHeight: 16,
  },
  cardMetaRow: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 6,
  },
  metaBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: COLORS.surfaceHigh,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
  },
  metaText: {
    fontSize: 11,
    fontWeight: '600',
    color: COLORS.onSurface,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  cardPrice: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.primary,
  },
  addButton: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: COLORS.primaryContainer,
    justifyContent: 'center',
    alignItems: 'center',
  },
  promoBanner: {
    marginTop: 24,
    backgroundColor: COLORS.primary,
    borderRadius: 16,
    padding: 14,
    overflow: 'hidden',
    position: 'relative',
  },
  promoGlow: {
    position: 'absolute',
    right: -20,
    top: -20,
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(255, 87, 34, 0.3)',
  },
  promoContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  promoLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flex: 1,
  },
  promoIconContainer: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  promoTextContainer: {
    flex: 1,
  },
  promoTagsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  comboTag: {
    backgroundColor: COLORS.tertiaryFixed,
    paddingHorizontal: 6,
    paddingVertical: 1,
    borderRadius: 4,
  },
  comboTagText: {
    fontSize: 9,
    fontWeight: '700',
    color: COLORS.onTertiaryFixed,
  },
  promoSavingsText: {
    fontSize: 11,
    color: COLORS.tertiaryFixed,
  },
  promoTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#ffffff',
    marginTop: 2,
  },
  promoSubtitle: {
    fontSize: 11,
    color: COLORS.secondaryFixed,
  },
  promoButton: {
    backgroundColor: COLORS.surfaceLowest,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  promoButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.primary,
  },
  toastContainer: {
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
    backgroundColor: COLORS.toastBackground,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  toastText: {
    color: COLORS.toastText,
    fontSize: 12,
    fontWeight: '600',
  },
});