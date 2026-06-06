# Pokédex

Aplicação Pokédex desenvolvida com React, TypeScript e Vite. O projeto consome a API pública da PokéAPI para exibir dados de pokémons, comparar status, gerenciar favoritos e montar times personalizados.

## Tecnologias

- React 19
- TypeScript
- Vite
- Axios
- React Router DOM
- Lucide React
- Framer Motion
- Capacitor Android
- ESLint

## Documentação DeepWiki

**Documentação** [https://deepwiki.com/Vitallzin/lies-of-P-wiki](https://deepwiki.com/Vitallzin/Pokedex)

## Visão geral do projeto

A aplicação está organizada em pages, components, contexts, services e utils.

- **Pages**: telas principais como Pokédex, Detalhes, Comparação, Favoritos, Equipes e Configurações.
- **Components**: UI reutilizável e componentes específicos de pokémon.
- **Contexts**: estado global para autenticação, favoritos, times e tema.
- **Services**: abstração das chamadas à PokéAPI e mock de autenticação.
- **Utils**: funções auxiliares para formatação, cálculos de fraqueza e análise de batalha.

## Estrutura principal

- `src/main.tsx` — registra os providers e renderiza a aplicação.
- `src/App.tsx` — monta o `BrowserRouter` e o layout principal.
- `src/routes/AppRoutes.tsx` — define as rotas públicas e privadas.
- `src/components/layout/MainLayout/index.tsx` — layout com header, sidebar e barra inferior.

## Contextos

### `AuthContext`

Responsável por autenticação e gerenciamento de usuário.

- armazena o usuário atual (`user`)
- controla estado de carregamento (`isLoading`)
- fornece métodos: `login`, `register`, `updateUser`, `logout`
- utiliza `authService` para persistência em `localStorage`

### `FavoritesContext`

Gerencia a lista de pokémons favoritos do usuário.

- armazena `favorites` no estado
- sincroniza favoritos por usuário em `localStorage`
- fornece `toggleFavorite` e `isFavorite`

### `TeamContext`

Gerencia times de pokémons personalizados.

- armazena `teams` do usuário
- permite criar e deletar times
- adiciona e remove pokémons por time
- mantém persistência por usuário em `localStorage`

### `ThemeContext`

Gerencia o tema da interface.

- mantém `light` ou `dark`
- salva o tema em `localStorage`
- aplica `data-theme` no elemento `html`

## Services

### `authService`

Mock de autenticação usando `localStorage`.

- `login(email, password)` — simula login com delay, cria novo usuário se necessário.
- `register(name, email, password)` — cria novo usuário simulado.
- `updateUser(userData)` — atualiza dados do usuário com delay.
- `logout()` — remove usuário do armazenamento.

### `pokemonService`

Abstrai chamadas à PokéAPI.

- `getPokemonList(limit, offset)` — lista pokémons com detalhes completos em paralelo.
- `getPokemonDetail(nameOrId)` — obtém pokémon e dados de espécie + cadeia evolutiva.
- `getAllPokemons()` — lista básica de todos os pokémons para busca rápida.
- `getPokemonsByType(type)` — busca pokémons similares por tipo.

## Utilitários

- `src/utils/formatPokemonId.ts` — formata IDs como `#001`.
- `src/utils/calculateWeakness.ts` — calcula fraquezas combinadas para pokémons de um ou dois tipos.
- `src/utils/compareStats.ts` — lógica de análise de batalha entre dois pokémons.
- `src/utils/typeAdvantages.ts` — tabela de efetividade entre tipos.
- `src/utils/typeColors.ts` — lista de tipos, cores e traduções.

## Pages

### `Pokedex`

- busca com debounce
- listagem paginada e carregamento infinito
- evita duplicação de pokémons ao carregar novas páginas
- usa `pokemonService.getAllPokemons()` para busca local rápida

### `PokemonDetails`

- mostra dados completos do pokémon
- exibe cadeia evolutiva e pokémons similares
- permite favoritar e adicionar a um time

### `Comparison`

- permite selecionar dois pokémons com autocomplete
- calcula análise de tipos e comparação de stats
- exibe veredicto e resumo técnico

### `Favorites`

- lista pokémons favoritados do usuário autenticado

### `Teams`

- cria, remove e gerencia times de até 6 pokémons
- exibe slots do time e permite remoção de membros

### `Settings`

- alterna tema claro/escuro
- abre modal de edição de perfil
- confirma logout

## Componentes chave

### Layout

- `Header` — cabeçalho com menu, título e caixa de usuário.
- `Sidebar` — menu lateral com navegação e ações de conta.
- `BottomNavbar` — navegação inferior para mobile.
- `Modal` — componente de modal reutilizável.

### Comuns

- `Card` — container reutilizável com padding e hover.
- `Button` — botão com variantes e estado `loading`.
- `Input` — campo com label, ícone e mensagem de erro.
- `AutocompleteInput` — input com sugestões dinâmicas.
- `Loader` — spinner de carregamento.

### Pokémons

- `PokemonCard` — exibe pokémon em lista com favorito.
- `PokemonTypes` — renderiza badges de tipo.
- `PokemonStats` — mostra stats com barras.
- `PokemonWeakness` — lista fraquezas.
- `EvolutionChain` — transforma cadeia evolutiva em sequência.
- `SimilarPokemons` — lista pokémons do mesmo tipo.
- `PokemonAnimation` — exibe sprite animado com fallback.

### Comparação

- `CompareCard` — cartão de pokémon na comparação.
- `CompareStats` — comparação lado a lado de atributos.
- `BattleAnalysis` — análise de vantagem por tipo e stats.

### Perfil e time

- `UserAvatar` — avatar do usuário com fallback.
- `AccountMenu` — menu dropdown de perfil.
- `AccountDetailsModal` — edição de perfil.
- `LoginModal` — modal de login/registro.
- `LogoutConfirmModal` — confirmação de logout.
- `TeamCard` — exibe um time com seus slots.
- `TeamPokemonCard` — adiciona ou remove pokémons de time.
- `TeamSlot` — display de slot vago ou preenchido.

## Executando o projeto

Instale dependências:

```bash
npm install
```

Inicie em modo de desenvolvimento:

```bash
npm run dev
```

Construa para produção:

```bash
npm run build
```

Visualize o build:

```bash
npm run preview
```

Execute lint:

```bash
npm run lint
```

## Observações

- O aplicativo utiliza `localStorage` para persistir usuário, tema, favoritos e times.
- O `authService` é um mock simples que simula login e registro sem backend.
- O projeto tem integração com Capacitor Android (`android/`) para builds mobile.

## Arquitetura e Decisões de Projeto

### Ausência da pasta `hooks`
Diferente de grandes aplicações comerciais, este projeto acadêmico optou por **não utilizar uma pasta `hooks` separada**. 

**Por que essa decisão?**
- **Simplicidade:** Para um protótipo educacional, centralizar a lógica diretamente nos Contextos torna o fluxo de dados mais visível e fácil de explicar.
- **Redução de Intermediários:** Ao exportar os hooks (como `useAuth`, `useFavorites`, etc.) diretamente de dentro dos arquivos de Contexto, eliminamos uma camada de abstração que poderia dificultar o entendimento imediato da aplicação.
- **Foco na Funcionalidade:** A lógica de manipulação de estado, persistência no `localStorage` e integração com serviços está contida nos Providers, garantindo que os componentes consumam dados de forma direta e eficiente.

## Estrutura de pasta principal

- `src/components` — componentes reutilizáveis e específicos.
- `src/pages` — telas da aplicação.
- `src/contexts` — estado global via React Context.
- `src/services` — lógica de acesso a dados.
- `src/utils` — funções auxiliares.
- `src/routes` — rotas da aplicação.

---

Esse README descreve o funcionamento atual do código e a organização do projeto. Você pode expandir com instruções de design, roteiro de testes ou detalhes do ambiente Android se desejar.
