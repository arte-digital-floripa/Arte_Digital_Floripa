# Guia Completo e Passo a Passo de Desenvolvimento — Componentes React

> **Público-alvo deste guia:** Desenvolvedor(a) responsável pela criação dos componentes visuais (**Trilha A**).  
> Este documento explica **linha por linha** como construir cada componente do projeto, o porquê de cada comando do React e como testar tudo visualmente no navegador.

---

## Sumário Rápido da Divisão

* **Trilha A — Dev (Foco deste guia):** Construir todos os componentes visuais (`common`, `layout`, `cards` e `sections`). Nenhum desses componentes faz chamada direta para o banco de dados; todos recebem informações prontas através de **`props`**.
* **Trilha B — Mateus:** Configurar o proxy da API, criar os `services` e `hooks` que buscam os dados no backend Node/Prisma e conectar tudo nas páginas (`pages/`).

---

## 1. Conceitos Essenciais do React que Você Vai Usar Hoje

Antes de abrir o primeiro arquivo, entenda estes **5 conceitos** que aparecem em quase todos os componentes abaixo:

### 1.1 O que são `props` e Desestruturação `{ }`?
Em HTML comum, as tags não mudam sozinhas. No React, criamos funções que recebem dados chamados **props** (propriedades).  
Em vez de escrever `function MetricBadge(props)` e depois `props.value`, nós usamos chaves `{ value, label }` direto nos parênteses para extrair as variáveis que queremos:
```jsx
// "{ value, label }" extrai as propriedades enviadas por quem chamou o componente
export default function MetricBadge({ value, label }) {
  return (
    <div>
      <strong>{value}</strong> {/* As chaves {} dentro do HTML servem para exibir variáveis JS */}
      <span>{label}</span>
    </div>
  );
}
```

### 1.2 Valores Padrão (`=`) nas Props
Se alguém usar `<Button>Salvar</Button>` sem dizer qual é a cor (`variant`), podemos definir um valor padrão usando `=`:
```jsx
export default function Button({ children, variant = "primary" }) { ... }
```
Assim, se `variant` não for informada, ela será automaticamente `"primary"`.

### 1.3 O que é a prop especial `children`?
Tudo o que você coloca **entre a abertura e o fechamento** de um componente vira automaticamente a prop `children`:
* Quando você escreve `<Button>Explorar Acervo</Button>`, dentro do arquivo `Button.jsx` a variável `{children}` vale `"Explorar Acervo"`.

### 1.4 Como repetir elementos com `.map()` e por que usar `key`?
Quando temos uma lista (array) de filtros, artistas ou obras, usamos `.map()` para transformar cada item da lista em um componente visual.  
**Regra do React:** Todo item dentro de um `.map()` precisa do atributo `key={...}` com um identificador único (como `item.id` ou `tag`) para o React saber qual item é qual:
```jsx
{tags.map((tag) => (
  <FilterTag key={tag} label={tag} />
))}
```

### 1.5 Como evitar que o site trave se um dado ainda não chegou (`?.` e `||`)
* **`artist?.name` (Optional Chaining):** O ponto de interrogação diz ao JavaScript: *"Só tente ler `.name` se `artist` existir. Se `artist` for `undefined`, não trave o site!"*
* **`artist?.name || "Nome do Artista"`:** A barra dupla `||` define um texto substituto caso o dado esteja vazio.

---

## 2. Como Testar Seus Componentes Enquanto Programa

Você não precisa esperar as páginas ficarem prontas para ver seu trabalho!  
Deixe o terminal rodando `npm run dev` dentro da pasta `frontend` e abra `http://localhost:5173`.

Sempre que terminar um componente, abra o arquivo `src/pages/HomePage.jsx` e importe o componente lá dentro para testá-lo na tela. Veja o exemplo de bancada de testes:

```jsx
// Exemplo de como usar o HomePage.jsx como "laboratório de testes"
import Button from "../components/common/Button/Button";
import FilterTag from "../components/common/FilterTag/FilterTag";

export default function HomePage() {
  return (
    <div style={{ padding: "40px", display: "flex", gap: "16px", flexWrap: "wrap" }}>
      <Button variant="primary">Botão Primário</Button>
      <Button variant="outline">Botão Contorno</Button>
      <FilterTag label="Manezinho" active={true} />
      <FilterTag label="Pintura" active={false} />
    </div>
  );
}
```

---

## 3. Passo a Passo Detalhado — Etapa A1: Componentes Base (`common/`)

> **Importante sobre o CSS:** Você **não** precisa criar arquivos `.css` nas pastas dos componentes. Todas as classes (`.btn`, `.filter-tag`, `.search-container`, etc.) já estão prontas em `src/styles/components.css`!

---

### Componente 1: `Button`
* **Arquivo para editar:** `src/components/common/Button/Button.jsx`
* **Onde aparece no Figma:** Botões "Explorar Acervo", "Entrar no museu virtual", "Ficha Curatorial", "Audioguia".
* **Passo a passo do que o código faz:**
  1. Recebe `children` (o texto/ícone interno), `variant` (com padrão `"primary"`), `className` (com padrão `""`) e `...props` (que captura qualquer outro atributo como `onClick` ou `type="submit"`).
  2. Monta a classe combinando `"btn"` com `"btn-" + variant` (ex: vira `"btn btn-primary"` ou `"btn btn-outline"`).
  3. Usa `.trim()` no final apenas para remover espaços em branco extras.

**Código comentado para colocar em `Button.jsx`:**
```jsx
export default function Button({
  children,              // Conteúdo que vai dentro do botão (texto ou ícone)
  variant = "primary",   // Opções: "primary" (terracota), "outline" (borda), "dark" (escuro), "icon-pill" (arredondado)
  className = "",        // Permite adicionar classes extras se necessário
  ...props               // Captura onClick, type, disabled, etc. e repassa para a tag <button>
}) {
  return (
    <button
      className={`btn btn-${variant} ${className}`.trim()}
      {...props}
    >
      {children}
    </button>
  );
}
```

---

### Componente 2: `FilterTag`
* **Arquivo para editar:** `src/components/common/FilterTag/FilterTag.jsx`
* **Onde aparece no Figma:** Aba `FilterTag` e na barra de temas da página `Artists` (*"Manezinho"*, *"Contemporâneo"*, *"Pintura"*, *"Fotografia"*).
* **Passo a passo do que o código faz:**
  1. Recebe `label` (o texto da tag), `active` (booleano `true`/`false` dizendo se está selecionada) e `onClick` (função disparada ao clicar).
  2. Usa um operador ternário `active ? "active" : ""` dentro do `className`: quando `active` é `true`, o botão fica com `className="filter-tag active"` (fundo laranja terracota); quando `false`, fica apenas `className="filter-tag"` (fundo transparente com borda cinza).

**Código comentado para colocar em `FilterTag.jsx`:**
```jsx
export default function FilterTag({
  label,            // Texto exibido dentro da pílula (ex: "Manezinho")
  active = false,   // Se for true, aplica o estilo selecionado (cor terracota)
  onClick,          // Função executada quando o usuário clica na tag
  className = "",
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`filter-tag ${active ? "active" : ""} ${className}`.trim()}
    >
      {label}
    </button>
  );
}
```

---

### Componente 3: `SearchInput`
* **Arquivo para editar:** `src/components/common/SearchInput/SearchInput.jsx`
* **Onde aparece no Figma:** Barra de pesquisa no topo da tela `Artists`.
* **Passo a passo do que o código faz:**
  1. Usa uma tag `<form className="search-container">` envolvendo o `<input>` e o `<button type="submit">`. Isso é ótimo para acessibilidade: o usuário pode tanto clicar no botão "Buscar" quanto apertar a tecla **Enter** no teclado!
  2. Cria a função `handleSubmit(e)`: no HTML padrão, enviar um `<form>` recarrega a página inteira. O comando `e.preventDefault()` impede esse recarregamento e chama `onSearch(value)`.

**Código comentado para colocar em `SearchInput.jsx`:**
```jsx
export default function SearchInput({
  value,                              // Texto atual digitado no campo
  onChange,                           // Função que atualiza o texto quando o usuário digita
  onSearch,                           // Função chamada ao clicar em "Buscar" ou apertar Enter
  placeholder = "Buscar artistas...", // Texto de ajuda quando o campo está vazio
  className = "",
}) {
  // Função disparada quando o formulário é enviado
  const handleSubmit = (event) => {
    event.preventDefault(); // Impede que a página recarregue ao apertar Enter
    if (onSearch) {
      onSearch(value);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={`search-container ${className}`.trim()}>
      <input
        type="search"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="search-input"
      />
      <button type="submit" className="search-submit-btn">
        Buscar
      </button>
    </form>
  );
}
```

---

### Componente 4: `MetricBadge`
* **Arquivo para editar:** `src/components/common/MetricBadge/MetricBadge.jsx`
* **Onde aparece no Figma:** Na faixa de estatísticas da `Home` (`CollectionStats`) e nos números do perfil do artista (`Artist` screen: Obras cadastradas, Exposições virtuais, Murais públicos).
* **Passo a passo:**
  1. Exibe um número em destaque (`value`) com a fonte serifada `Jomolhari` e um rótulo descritivo (`label`) abaixo.

**Código comentado para colocar em `MetricBadge.jsx`:**
```jsx
export default function MetricBadge({ value, label }) {
  return (
    <div className="metric-badge">
      <strong className="metric-badge-value">{value}</strong>
      <span className="metric-badge-label">{label}</span>
    </div>
  );
}
```

---

### Componente 5: `SectionDivider`
* **Arquivo para editar:** `src/components/common/SectionDivider/SectionDivider.jsx`
* **Onde aparece no Figma:** Aba `Utilities` (linhas divisórias horizontais entre seções).

**Código comentado para colocar em `SectionDivider.jsx`:**
```jsx
export default function SectionDivider({ className = "" }) {
  return <hr className={`section-divider ${className}`.trim()} />;
}
```

---

## 4. Passo a Passo Detalhado — Etapa A2: Layout Global (`layout/`)

Estes dois componentes aparecem em **todas as páginas** porque estão dentro do `src/layouts/MainLayout.jsx`.

---

### Componente 6: `Header` (Barra de Navegação Global)
* **Arquivo para editar:** `src/components/layout/Header/Header.jsx`
* **Onde aparece no Figma:** Topo de todas as 4 telas (`Home`, `Artists`, `Artist`, `Artwork`).
* **Como funciona a navegação no React Router (`<Link>` vs `<NavLink>`):**
  * No React, **nunca usamos `<a href="/artistas">`** para links internos, porque a tag `<a>` recarrega o navegador inteiro.
  * Usamos `<Link to="/">` para a logo (leva para a Home sem recarregar).
  * Usamos `<NavLink to="/artistas">` para os itens do menu. O `<NavLink>` verifica sozinho a URL atual do navegador e nos passa `{ isActive }`: quando `isActive` é `true`, adicionamos a classe `"active"`, que desenha o **sublinhado laranja (`#F96F55`)** embaixo do link!

**Código comentado para colocar em `Header.jsx`:**
```jsx
import { NavLink, Link } from "react-router-dom";

export default function Header() {
  // Função auxiliar que o NavLink chama automaticamente:
  // Se a rota estiver ativa, retorna "nav-item-link active", senão apenas "nav-item-link"
  const getLinkClass = ({ isActive }) =>
    isActive ? "nav-item-link active" : "nav-item-link";

  return (
    <header className="navbar-header">
      <div className="navbar-container">
        {/* Bloco da Marca (BrandLockup) à esquerda */}
        <Link to="/" className="brand-lockup">
          <span className="brand-title-top">Arte Digital</span>
          <span className="brand-title-bottom">Floripa</span>
        </Link>

        {/* Lista de Links de Navegação à direita */}
        <nav aria-label="Navegação principal">
          <ul className="nav-links-list">
            <li>
              <NavLink to="/artistas" className={getLinkClass}>
                Artistas
              </NavLink>
            </li>
            <li>
              <NavLink to="/lugares" className={getLinkClass}>
                Lugares
              </NavLink>
            </li>
            <li>
              <NavLink to="/museu-virtual" className={getLinkClass}>
                Museu Virtual
              </NavLink>
            </li>
            <li>
              <NavLink to="/sobre" className={getLinkClass}>
                Sobre
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
```

---

### Componente 7: `Footer` (Rodapé Único Global)
* **Arquivo para editar:** `src/components/layout/Footer/Footer.jsx`
* **Onde aparece no Figma:** Base de todas as telas.
* **Passo a passo:**
  1. Cria um `<footer className="footer-global">` (fundo carvão `#16191E`).
  2. Divide o interior (`footer-container`) em 4 colunas (*Slots*): Marca, Iniciativa, Parceiros e Agradecimentos/Redes.
  3. Aceita props com textos padrão para funcionar mesmo que nenhuma prop seja passada.

**Código comentado para colocar em `Footer.jsx`:**
```jsx
export default function Footer({
  brandText = "Arte Digital Floripa",
  initiativeText = "Iniciativa de preservação e difusão do patrimônio artístico de Florianópolis.",
  partnerText = "Parceria acadêmica e cultural com a UNICESUSC.",
  acknowledgmentText = "Agradecimentos a todos os artistas, museus e acervos participantes.",
}) {
  return (
    <footer className="footer-global">
      <div className="footer-container">
        {/* Coluna 1: Marca */}
        <div className="footer-slot-brand">
          <h3 className="footer-brand-title">{brandText}</h3>
          <p className="footer-brand-desc">
            Galeria digital aberta e interativa celebrando as artes visuais catarinenses.
          </p>
        </div>

        {/* Coluna 2: Iniciativa */}
        <div className="footer-slot-initiative">
          <h4 className="footer-heading">Iniciativa</h4>
          <p className="footer-text">{initiativeText}</p>
        </div>

        {/* Coluna 3: Parceiros */}
        <div className="footer-slot-partner">
          <h4 className="footer-heading">Parceiros</h4>
          <p className="footer-text">{partnerText}</p>
        </div>

        {/* Coluna 4: Agradecimentos */}
        <div className="footer-slot-ack">
          <h4 className="footer-heading">Agradecimentos</h4>
          <p className="footer-text">{acknowledgmentText}</p>
        </div>
      </div>
    </footer>
  );
}
```

#### 🔧 Ajuste Rápido no `MainLayout.jsx`:
Abra `src/layouts/MainLayout.jsx` e deixe os nomes consistentes com `Header` e `Footer`:
```jsx
import { Outlet } from "react-router-dom";
import Header from "../components/layout/Header/Header";
import Footer from "../components/layout/Footer/Footer";

export default function MainLayout() {
  return (
    <div className="main-layout">
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
```

---

## 5. Passo a Passo Detalhado — Etapa A3: Cards (`cards/`)

---

### Componente 8: `ArtistCard`
* **Arquivo para editar:** `src/components/cards/ArtistCard/ArtistCard.jsx`
* **Onde aparece no Figma:** Aba `ArtistCard`, na seção `FeaturedArtists` da `Home` e no grid da página `Artists`.
* **Como funciona no Figma:**
  * Ele tem duas variantes de largura controladas pela prop `variant`:
    * `variant="featured"`: Card largo (~500px) usado para artistas em destaque.
    * `variant="compact"`: Card menor (~320px) usado no grid geral.
* **Estrutura do Objeto `artist` que vem do banco de dados:**
  ```js
  {
    id: "franklin-cascaes",
    name: "Franklin Cascaes",
    bio: "Folclorista, ceramista, antropólogo e gravurista catarinense.",
    photo_url: "https://...",
    artworks: [ ... ] // opcional
  }
  ```

**Código comentado para colocar em `ArtistCard.jsx`:**
```jsx
import { Link } from "react-router-dom";

const FALLBACK_ARTIST_IMG =
  "https://placehold.co/600x400/16191E/FFFFFF?text=Arte+Digital+Floripa";

export default function ArtistCard({
  artist,               // Objeto com { id, name, bio, photo_url, artworks }
  variant = "compact",  // "featured" (largo) ou "compact" (padrão)
  className = "",
}) {
  // Desestruturação segura: se "artist" for undefined, usa um objeto vazio {} para não dar erro
  const { id, name, bio, photo_url, artworks } = artist || {};

  // Se vier uma lista de obras dentro do artista, mostra a quantidade; senão mostra texto padrão
  const worksText = Array.isArray(artworks) && artworks.length > 0
    ? `${artworks.length} obra(s) catalogada(s)`
    : "Explorar obras do artista →";

  return (
    <Link
      to={`/artistas/${id || ""}`}
      className={`artist-card ${variant} ${className}`.trim()}
    >
      {/* Parte Superior: Imagem / Foto do Artista */}
      <div className="artist-card-artwork-wrapper">
        <img
          src={photo_url || FALLBACK_ARTIST_IMG}
          alt={name || "Retrato do artista"}
          className="artist-card-artwork"
          loading="lazy"
          onError={(e) => {
            // Se a URL da imagem der erro 404, troca automaticamente pela imagem reserva
            e.currentTarget.src = FALLBACK_ARTIST_IMG;
          }}
        />
      </div>

      {/* Parte Inferior: Textos (Nome, Bio e Obras) */}
      <div className="artist-card-content">
        <div>
          <h3 className="artist-card-name">{name || "Artista Convidado"}</h3>
          <p className="artist-card-summary">
            {bio || "Biografia em catalogação pelo acervo Arte Digital Floripa."}
          </p>
        </div>
        <span className="artist-card-works">{worksText}</span>
      </div>
    </Link>
  );
}
```

---

### Componente 9: `ArtworkCard`
* **Arquivo para editar:** `src/components/cards/ArtworkCard/ArtworkCard.jsx`
* **Onde aparece no Figma:** Na seção `ExploreSection` da `Home` e nas galerias de obras.
* **Estrutura do Objeto `artwork` que vem do banco de dados:**
  ```js
  {
    id: "cma-149112",
    artist_id: "ebbd33f3",
    title: "Church Street El",
    date: "1920",
    category: "Painting",
    medium: "oil on canvas",
    remote_url: "https://...",
    largura: 1069,
    altura: 893
  }
  ```

**Código comentado para colocar em `ArtworkCard.jsx`:**
```jsx
import { Link } from "react-router-dom";

const FALLBACK_ARTWORK_IMG =
  "https://placehold.co/600x450/F3F2EE/7E6664?text=Obra+de+Arte";

export default function ArtworkCard({
  artwork,          // Objeto da obra vindo da API
  artistName = "",  // Nome do artista (opcional)
  className = "",
}) {
  const { id, title, remote_url, date, medium, artists } = artwork || {};

  // Tenta pegar o nome do artista da prop "artistName" ou de dentro de "artwork.artists.name"
  const displayArtist = artistName || artists?.name || "";

  // Junta o ano e a técnica com um pontinho no meio (ex: "1920 · oil on canvas")
  const subtitleDetails = [date, medium].filter(Boolean).join(" · ");

  return (
    <Link
      to={`/obras/${id || ""}`}
      className={`artwork-card ${className}`.trim()}
    >
      <div className="artwork-card-image-wrapper">
        <img
          src={remote_url || FALLBACK_ARTWORK_IMG}
          alt={title || "Obra do acervo"}
          className="artwork-card-image"
          loading="lazy"
          onError={(e) => {
            e.currentTarget.src = FALLBACK_ARTWORK_IMG;
          }}
        />
      </div>

      <div className="artwork-card-info">
        <h4 className="artwork-card-title">{title || "Obra sem título"}</h4>
        {displayArtist && (
          <p className="artwork-card-artist">{displayArtist}</p>
        )}
        {subtitleDetails && (
          <span className="artwork-card-year">{subtitleDetails}</span>
        )}
      </div>
    </Link>
  );
}
```

---

## 6. Passo a Passo Detalhado — Etapa A4: Seções das Páginas (`sections/`)

As **seções** são os grandes blocos horizontais que formam cada página. Elas usam os componentes menores que você criou nas etapas A1, A2 e A3!

### 6.1 Seções da Home (`src/components/sections/home/`)

#### 1. `HomeHero.jsx`
* **Arquivo:** `src/components/sections/home/HomeHero.jsx`
* **O que tem nele (segundo o Figma):** Imagem de fundo da obra de Álvaro Mendes com máscara escura, título principal ("Arte Digital Floripa"), texto descritivo e dois botões: "Explorar Acervo" (leva para `/artistas`) e "Museu Virtual" (leva para `/museu-virtual`).
* **Código comentado:**
```jsx
import { Link } from "react-router-dom";
import Button from "../../common/Button/Button";

export default function HomeHero({
  brandTitle = "Arte Digital Floripa",
  headline = "A memória visual e contemporânea da Ilha de Santa Catarina",
  subdescription = "Explore obras, murais urbanos, trajetórias de artistas e exposições imersivas em 360°.",
  backgroundImage = "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=1600&q=80",
}) {
  return (
    <section
      className="hero-section"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="hero-overlay">
        <div className="hero-content-container">
          <span className="hero-brand-label">{brandTitle}</span>
          <h1 className="hero-headline">{headline}</h1>
          <p className="hero-subdescription">{subdescription}</p>

          <div className="hero-actions">
            <Link to="/artistas">
              <Button variant="primary">Explorar Acervo →</Button>
            </Link>
            <Link to="/museu-virtual">
              <Button variant="dark" className="btn-icon-pill">
                ▶ Museu Virtual 360°
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
```

#### 2. `CollectionStats.jsx`
* **Arquivo:** `src/components/sections/home/CollectionStats.jsx`
* **O que tem nele:** Uma faixa de cor clara (`#F5F2EF`) com 4 métricas lado a lado usando o componente `MetricBadge`.
* **Código comentado:**
```jsx
import MetricBadge from "../../common/MetricBadge/MetricBadge";

const DEFAULT_STATS = [
  { value: "18+", label: "Artistas Catalogados" },
  { value: "120+", label: "Obras Digitalizadas" },
  { value: "12", label: "Locais Culturais" },
  { value: "3", label: "Salas Virtuais 360°" },
];

export default function CollectionStats({ stats = DEFAULT_STATS }) {
  return (
    <section className="collection-stats-section">
      <div className="collection-stats-container">
        {stats.map((item, index) => (
          <MetricBadge
            key={item.label || index}
            value={item.value}
            label={item.label}
          />
        ))}
      </div>
    </section>
  );
}
```

#### 3. `ExploreSection.jsx`
* **Arquivo:** `src/components/sections/home/ExploreSection.jsx`
* **O que tem nele:** Título "Explore o Acervo", abas de filtro (`FilterTag`: Artistas, Obras, Técnicas, Locais) e um grid com até 4 `ArtworkCard`.
* **Código comentado:**
```jsx
import { useState } from "react";
import { Link } from "react-router-dom";
import FilterTag from "../../common/FilterTag/FilterTag";
import ArtworkCard from "../../cards/ArtworkCard/ArtworkCard";
import Button from "../../common/Button/Button";

const EXPLORE_TABS = ["Obras", "Artistas", "Técnicas", "Locais"];

export default function ExploreSection({ artworks = [] }) {
  // Guarda qual aba está clicada no momento (começa em "Obras")
  const [activeTab, setActiveTab] = useState("Obras");

  return (
    <section className="explore-section">
      <div className="section-container">
        <div className="explore-header">
          <div>
            <h2 className="section-title">Explore a Coleção</h2>
            <p className="section-subtitle">
              Navegue pelas obras, técnicas e expressões artísticas da ilha.
            </p>
          </div>
          <Link to="/artistas">
            <Button variant="outline">Ver acervo completo →</Button>
          </Link>
        </div>

        {/* Barra de Abas usando FilterTag */}
        <div className="explore-tabs-bar">
          {EXPLORE_TABS.map((tab) => (
            <FilterTag
              key={tab}
              label={tab}
              active={activeTab === tab}
              onClick={() => setActiveTab(tab)}
            />
          ))}
        </div>

        {/* Grid de Cards de Obras (mostra as primeiras 4 obras) */}
        <div className="explore-cards-grid">
          {artworks.slice(0, 4).map((artwork) => (
            <ArtworkCard key={artwork.id} artwork={artwork} />
          ))}
        </div>
      </div>
    </section>
  );
}
```

#### 4. `VirtualMuseumBanner.jsx`
* **Arquivo:** `src/components/sections/home/VirtualMuseumBanner.jsx`
* **O que tem nele:** Banner escuro convidando o visitante para entrar na experiência 3D em 360°.
* **Código comentado:**
```jsx
import { Link } from "react-router-dom";
import Button from "../../common/Button/Button";

export default function VirtualMuseumBanner() {
  return (
    <section className="virtual-museum-banner">
      <div className="section-container virtual-museum-banner-content">
        <span className="banner-eyebrow">Experiência Imersiva 360°</span>
        <h2 className="banner-title">Visite o Museu Virtual Arte Digital</h2>
        <p className="banner-description">
          Caminhe pelas galerias tridimensionais e contemple as obras em alta resolução diretamente do seu navegador ou óculos VR.
        </p>
        <Link to="/museu-virtual">
          <Button variant="primary">Entrar no museu virtual →</Button>
        </Link>
      </div>
    </section>
  );
}
```

#### 5. `FeaturedArtists.jsx`
* **Arquivo:** `src/components/sections/home/FeaturedArtists.jsx`
* **O que tem nele:** Seção "Artistas em Destaque" exibindo 2 cards no formato `featured` e 1 no formato `compact` (exatamente como no Figma).
* **Código comentado:**
```jsx
import ArtistCard from "../../cards/ArtistCard/ArtistCard";

export default function FeaturedArtists({ artists = [] }) {
  const featuredList = artists.slice(0, 3);

  return (
    <section className="featured-artists-section">
      <div className="section-container">
        <h2 className="section-title">Artistas em Destaque</h2>
        <p className="section-subtitle">
          Conheça os mestres e artistas contemporâneos que moldam a identidade cultural de Florianópolis.
        </p>

        <div className="featured-artists-grid">
          {featuredList.map((artist, index) => (
            <ArtistCard
              key={artist.id || index}
              artist={artist}
              variant={index < 2 ? "featured" : "compact"}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
```

---

### 6.2 Seções da Página de Artistas (`src/components/sections/artists/`)

#### 1. `ArtistsHero.jsx`
* **Arquivo:** `src/components/sections/artists/ArtistsHero.jsx`
```jsx
export default function ArtistsHero() {
  return (
    <section className="artists-hero-section">
      <div className="section-container">
        <span className="hero-brand-label">Acervo Digital</span>
        <h1 className="section-title-large">Artistas Catarinenses</h1>
        <p className="section-subtitle">
          Pesquise por nome, período histórico ou vertente artística.
        </p>
      </div>
    </section>
  );
}
```

#### 2. `ArtistsSearchBar.jsx`
* **Arquivo:** `src/components/sections/artists/ArtistsSearchBar.jsx`
```jsx
import SearchInput from "../../common/SearchInput/SearchInput";

export default function ArtistsSearchBar({ searchTerm, onSearchChange, onSearchSubmit }) {
  return (
    <section className="artists-search-section">
      <div className="section-container">
        <SearchInput
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          onSearch={onSearchSubmit}
          placeholder="Buscar artista por nome..."
        />
      </div>
    </section>
  );
}
```

#### 3. `ArtistsFilterThemeBar.jsx`
* **Arquivo:** `src/components/sections/artists/ArtistsFilterThemeBar.jsx`
```jsx
import FilterTag from "../../common/FilterTag/FilterTag";

const DEFAULT_THEMES = [
  "Todos",
  "Manezinho",
  "Contemporâneo",
  "Pintura",
  "Fotografia",
  "Escultura",
];

export default function ArtistsFilterThemeBar({
  themes = DEFAULT_THEMES,
  activeTheme = "Todos",
  onSelectTheme,
}) {
  return (
    <section className="artists-filter-band">
      <div className="section-container filter-tags-row">
        {themes.map((theme) => (
          <FilterTag
            key={theme}
            label={theme}
            active={activeTheme === theme}
            onClick={() => onSelectTheme && onSelectTheme(theme)}
          />
        ))}
      </div>
    </section>
  );
}
```

---

### 6.3 Seções do Detalhe do Artista (`src/components/sections/artist-detail/`)

#### 1. `ArtistProfileHero.jsx`
* **Arquivo:** `src/components/sections/artist-detail/ArtistProfileHero.jsx`
* **O que tem nele:** Retrato do artista (`photo_url`), nome (`name`), biografia (`bio`) e as 3 métricas (Obras cadastradas, Exposições virtuais e Murais públicos).
```jsx
import MetricBadge from "../../common/MetricBadge/MetricBadge";

export default function ArtistProfileHero({ artist, artworksCount = 0 }) {
  const { name, bio, photo_url } = artist || {};

  return (
    <section className="artist-profile-hero">
      <div className="section-container artist-profile-grid">
        <div className="artist-portrait-wrapper">
          <img
            src={photo_url || "https://placehold.co/500x600/16191E/FFF?text=Artista"}
            alt={name || "Artista"}
            className="artist-portrait-img"
          />
        </div>

        <div className="artist-profile-details">
          <h1 className="artist-profile-name">{name || "Nome do Artista"}</h1>
          <p className="artist-profile-bio">
            {bio || "Biografia detalhada em atualização no acervo."}
          </p>

          <div className="artist-profile-metrics">
            <MetricBadge value={artworksCount} label="Obras Cadastradas" />
            <MetricBadge value="1" label="Exposições Virtuais" />
            <MetricBadge value="—" label="Murais Públicos" />
          </div>
        </div>
      </div>
    </section>
  );
}
```

#### 2. `ArtistTimeline.jsx` e `ArtistGalleryGrid.jsx`
* **Arquivo 1:** `src/components/sections/artist-detail/ArtistTimeline.jsx`
```jsx
import { Link } from "react-router-dom";

export default function ArtistTimeline({ artworks = [] }) {
  if (!artworks.length) return null;

  return (
    <section className="artist-timeline-section">
      <div className="section-container">
        <h2 className="section-title">Linha do Tempo</h2>
        <div className="timeline-horizontal-scroll">
          {artworks.map((work) => (
            <Link key={work.id} to={`/obras/${work.id}`} className="timeline-item">
              <img src={work.remote_url} alt={work.title} className="timeline-thumb" />
              <span className="timeline-year">{work.date || "S/D"}</span>
              <p className="timeline-work-title">{work.title}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
```

* **Arquivo 2:** `src/components/sections/artist-detail/ArtistGalleryGrid.jsx`
```jsx
import ArtworkCard from "../../cards/ArtworkCard/ArtworkCard";

export default function ArtistGalleryGrid({ artworks = [], artistName = "" }) {
  return (
    <section className="artist-gallery-section">
      <div className="section-container">
        <h2 className="section-title">Obras no Acervo</h2>
        <div className="artworks-grid">
          {artworks.map((work) => (
            <ArtworkCard key={work.id} artwork={work} artistName={artistName} />
          ))}
        </div>
      </div>
    </section>
  );
}
```

---

### 6.4 Seções do Detalhe da Obra (`src/components/sections/artwork-detail/`)

#### 1. `ArtworkStage.jsx` (Palco da Obra com Proporção Dinâmica)
* **Arquivo:** `src/components/sections/artwork-detail/ArtworkStage.jsx`
* **Por que este componente é especial:** Obras de arte têm tamanhos variados (retratos verticais, paisagens horizontais). Usamos `object-fit: contain` e `max-height: 70vh` para nunca cortar nem distorcer a pintura!
```jsx
export default function ArtworkStage({ artwork }) {
  const { title, remote_url, largura, altura } = artwork || {};
  const aspectRatioStyle =
    largura && altura ? { aspectRatio: `${largura} / ${altura}` } : {};

  return (
    <section className="artwork-stage-section">
      <div className="artwork-stage-frame">
        <img
          src={remote_url || "https://placehold.co/900x700/16191E/FFF?text=Obra"}
          alt={title || "Obra em destaque"}
          className="artwork-stage-image"
          style={aspectRatioStyle}
        />
      </div>
    </section>
  );
}
```

#### 2. `ArtworkDetailsInfo.jsx`
* **Arquivo:** `src/components/sections/artwork-detail/ArtworkDetailsInfo.jsx`
* **O que tem nele:** Título da obra, nome do artista clicável, ano, técnica (`medium`), dimensões (`largura x altura`) e os 3 botões de ação do Figma (*Ficha Curatorial*, *Ver na Galeria Virtual* e *Audioguia*).
```jsx
import { Link } from "react-router-dom";
import Button from "../../common/Button/Button";

export default function ArtworkDetailsInfo({ artwork, artist }) {
  const { title, date, category, medium, largura, altura, artist_id } = artwork || {};
  const artistName = artist?.name || artwork?.artists?.name || "Artista do Acervo";
  const targetArtistId = artist?.id || artist_id;

  return (
    <section className="artwork-details-section">
      <div className="section-container artwork-details-card">
        <div className="artwork-details-header">
          <h1 className="artwork-title-heading">{title || "Obra sem título"}</h1>
          {targetArtistId ? (
            <Link to={`/artistas/${targetArtistId}`} className="artwork-artist-link">
              {artistName}
            </Link>
          ) : (
            <p className="artwork-artist-link">{artistName}</p>
          )}
          <span className="artwork-year-text">{date || "Data não informada"}</span>
        </div>

        <div className="artwork-technical-meta">
          {category && <p><strong>Categoria:</strong> {category}</p>}
          {medium && <p><strong>Técnica:</strong> {medium}</p>}
          {largura && altura && (
            <p><strong>Dimensões digitais:</strong> {largura} × {altura} px</p>
          )}
        </div>

        {/* Botões de Ação do Figma */}
        <div className="artwork-action-buttons">
          <Button variant="outline">📄 Ficha Curatorial</Button>
          <Link to="/museu-virtual">
            <Button variant="primary">🏛️ Ver na Galeria Virtual</Button>
          </Link>
          <Button variant="dark">🎧 Audioguia</Button>
        </div>
      </div>
    </section>
  );
}
```

#### 3. `RelatedArtworksCarousel.jsx`
* **Arquivo:** `src/components/sections/artwork-detail/RelatedArtworksCarousel.jsx`
```jsx
import ArtworkCard from "../../cards/ArtworkCard/ArtworkCard";

export default function RelatedArtworksCarousel({ artworks = [] }) {
  if (!artworks.length) return null;

  return (
    <section className="related-artworks-section">
      <div className="section-container">
        <h2 className="section-title">Explore Mais Obras</h2>
        <div className="explore-cards-grid">
          {artworks.slice(0, 4).map((item) => (
            <ArtworkCard key={item.id} artwork={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
```

---

## 7. CSS Complementar das Seções para Adicionar ao `src/styles/components.css`

Quando o Dev chegar na **Etapa A4 (Seções)**, basta colar este bloco no **final** do arquivo `src/styles/components.css` para estilizar todas as seções e utilitários:

```css
/* --------------------------------------------------------------------------
   9. UTILITÁRIOS GERAIS DE SEÇÃO, METRIC BADGE & DIVIDER
   -------------------------------------------------------------------------- */
.section-container {
  max-width: 1440px;
  margin: 0 auto;
  padding: 64px 56px;
}

.section-title {
  font-family: var(--font-serif-display);
  font-size: 38px;
  font-weight: 400;
  color: var(--color-text-primary);
  margin-bottom: 8px;
}

.section-title-large {
  font-family: var(--font-serif-display);
  font-size: 52px;
  font-weight: 400;
  margin-bottom: 12px;
}

.section-subtitle {
  font-family: var(--font-sans-primary);
  font-size: 18px;
  color: var(--color-text-secondary);
  margin-bottom: 32px;
}

.section-divider {
  border: none;
  border-top: 1px solid var(--color-divider-section);
  margin: 24px 0;
}

.metric-badge {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 16px 24px;
}

.metric-badge-value {
  font-family: var(--font-serif-display);
  font-size: 44px;
  font-weight: 400;
  color: var(--color-text-primary);
  line-height: 1.1;
}

.metric-badge-label {
  font-family: var(--font-sans-primary);
  font-size: 15px;
  color: var(--color-text-secondary);
  margin-top: 6px;
}

/* --------------------------------------------------------------------------
   10. SEÇÕES DA HOME & ARTISTAS
   -------------------------------------------------------------------------- */
.hero-section {
  position: relative;
  min-height: 540px;
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
}

.hero-overlay {
  width: 100%;
  min-height: 540px;
  background: linear-gradient(90deg, rgba(13, 13, 11, 0.88) 0%, rgba(13, 13, 11, 0.45) 100%);
  display: flex;
  align-items: center;
}

.hero-content-container {
  max-width: 1440px;
  width: 100%;
  margin: 0 auto;
  padding: 80px 56px;
  color: var(--color-surface-default);
}

.hero-brand-label {
  display: inline-block;
  font-family: var(--font-sans-primary);
  font-size: 14px;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: var(--color-accent-primary);
  margin-bottom: 12px;
}

.hero-headline {
  font-family: var(--font-serif-display);
  font-size: 56px;
  line-height: 1.1;
  max-width: 780px;
  margin-bottom: 20px;
}

.hero-subdescription {
  font-size: 20px;
  max-width: 620px;
  color: rgba(255, 255, 255, 0.85);
  margin-bottom: 36px;
  line-height: 1.5;
}

.hero-actions {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
}

.collection-stats-section {
  background-color: var(--color-surface-collection-stats);
  border-bottom: 1px solid var(--color-divider-metrics);
}

.collection-stats-container {
  max-width: 1440px;
  margin: 0 auto;
  padding: 36px 56px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
}

.explore-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  flex-wrap: wrap;
  gap: 16px;
  margin-bottom: 24px;
}

.explore-tabs-bar,
.filter-tags-row {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  margin-bottom: 36px;
}

.explore-cards-grid,
.artworks-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 28px;
}

.virtual-museum-banner {
  background-color: var(--color-surface-charcoal);
  color: var(--color-surface-default);
  text-align: center;
}

.virtual-museum-banner-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 760px;
}

.banner-eyebrow {
  color: var(--color-accent-primary);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  font-size: 14px;
  margin-bottom: 12px;
}

.banner-title {
  font-family: var(--font-serif-display);
  font-size: 42px;
  margin-bottom: 16px;
}

.banner-description {
  color: rgba(255, 255, 255, 0.8);
  font-size: 18px;
  line-height: 1.6;
  margin-bottom: 28px;
}

.featured-artists-section {
  background-color: var(--color-surface-secondary);
}

.featured-artists-grid {
  display: flex;
  gap: 28px;
  flex-wrap: wrap;
}

/* --------------------------------------------------------------------------
   11. PERFIL DO ARTISTA & PALCO DA OBRA (ARTWORK STAGE)
   -------------------------------------------------------------------------- */
.artist-profile-hero {
  background-color: var(--color-surface-artist);
}

.artist-profile-grid {
  display: grid;
  grid-template-columns: 360px 1fr;
  gap: 48px;
  align-items: center;
}

.artist-portrait-img {
  width: 100%;
  height: 420px;
  object-fit: cover;
  border-radius: 6px;
}

.artist-profile-name {
  font-family: var(--font-serif-display);
  font-size: 48px;
  margin-bottom: 16px;
}

.artist-profile-bio {
  font-size: 18px;
  line-height: 1.6;
  color: var(--color-text-secondary);
  margin-bottom: 32px;
}

.artist-profile-metrics {
  display: flex;
  gap: 32px;
  flex-wrap: wrap;
  border-top: 1px solid var(--color-divider-metrics);
  padding-top: 24px;
}

.artwork-stage-section {
  background-color: var(--color-surface-charcoal);
  padding: 48px 24px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.artwork-stage-frame {
  max-width: 1200px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.artwork-stage-image {
  max-height: 70vh;
  max-width: 100%;
  width: auto;
  height: auto;
  object-fit: contain;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5);
}

.artwork-details-section {
  background-color: var(--color-surface-work-detail);
}

.artwork-details-card {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.artwork-title-heading {
  font-family: var(--font-serif-display);
  font-size: 42px;
  margin-bottom: 6px;
}

.artwork-artist-link {
  font-size: 20px;
  color: var(--color-accent-primary);
  font-weight: 500;
}

.artwork-year-text {
  display: block;
  font-size: 16px;
  color: var(--color-text-secondary);
  margin-top: 4px;
}

.artwork-technical-meta {
  display: flex;
  gap: 32px;
  flex-wrap: wrap;
  padding: 16px 0;
  border-top: 1px solid var(--color-divider-metrics);
  border-bottom: 1px solid var(--color-divider-metrics);
}

.artwork-action-buttons {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
}
```


#### 2. `ArtistTimeline.jsx` e `ArtistGalleryGrid.jsx`
* **Arquivo 1:** `src/components/sections/artist-detail/ArtistTimeline.jsx`
```jsx
import { Link } from "react-router-dom";

export default function ArtistTimeline({ artworks = [] }) {
  if (!artworks.length) return null;

  return (
    <section className="artist-timeline-section">
      <div className="section-container">
        <h2 className="section-title">Linha do Tempo</h2>
        <div className="timeline-horizontal-scroll">
          {artworks.map((work) => (
            <Link key={work.id} to={`/obras/${work.id}`} className="timeline-item">
              <img src={work.remote_url} alt={work.title} className="timeline-thumb" />
              <span className="timeline-year">{work.date || "S/D"}</span>
              <p className="timeline-work-title">{work.title}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
```

* **Arquivo 2:** `src/components/sections/artist-detail/ArtistGalleryGrid.jsx`
```jsx
import ArtworkCard from "../../cards/ArtworkCard/ArtworkCard";

export default function ArtistGalleryGrid({ artworks = [], artistName = "" }) {
  return (
    <section className="artist-gallery-section">
      <div className="section-container">
        <h2 className="section-title">Obras no Acervo</h2>
        <div className="artworks-grid">
          {artworks.map((work) => (
            <ArtworkCard key={work.id} artwork={work} artistName={artistName} />
          ))}
        </div>
      </div>
    </section>
  );
}
```

---

### 6.4 Seções do Detalhe da Obra (`src/components/sections/artwork-detail/`)

#### 1. `ArtworkStage.jsx` (Palco da Obra com Proporção Dinâmica)
* **Arquivo:** `src/components/sections/artwork-detail/ArtworkStage.jsx`
* **Por que este componente é especial:** Obras de arte têm tamanhos variados (retratos verticais, paisagens horizontais). Usamos `object-fit: contain` e `max-height: 70vh` para nunca cortar nem distorcer a pintura!
```jsx
export default function ArtworkStage({ artwork }) {
  const { title, remote_url, largura, altura } = artwork || {};
  const aspectRatioStyle =
    largura && altura ? { aspectRatio: `${largura} / ${altura}` } : {};

  return (
    <section className="artwork-stage-section">
      <div className="artwork-stage-frame">
        <img
          src={remote_url || "https://placehold.co/900x700/16191E/FFF?text=Obra"}
          alt={title || "Obra em destaque"}
          className="artwork-stage-image"
          style={aspectRatioStyle}
        />
      </div>
    </section>
  );
}
```

#### 2. `ArtworkDetailsInfo.jsx`
* **Arquivo:** `src/components/sections/artwork-detail/ArtworkDetailsInfo.jsx`
* **O que tem nele:** Título da obra, nome do artista clicável, ano, técnica (`medium`), dimensões (`largura x altura`) e os 3 botões de ação do Figma (*Ficha Curatorial*, *Ver na Galeria Virtual* e *Audioguia*).
```jsx
import { Link } from "react-router-dom";
import Button from "../../common/Button/Button";

export default function ArtworkDetailsInfo({ artwork, artist }) {
  const { title, date, category, medium, largura, altura, artist_id } = artwork || {};
  const artistName = artist?.name || artwork?.artists?.name || "Artista do Acervo";
  const targetArtistId = artist?.id || artist_id;

  return (
    <section className="artwork-details-section">
      <div className="section-container artwork-details-card">
        <div className="artwork-details-header">
          <h1 className="artwork-title-heading">{title || "Obra sem título"}</h1>
          {targetArtistId ? (
            <Link to={`/artistas/${targetArtistId}`} className="artwork-artist-link">
              {artistName}
            </Link>
          ) : (
            <p className="artwork-artist-link">{artistName}</p>
          )}
          <span className="artwork-year-text">{date || "Data não informada"}</span>
        </div>

        <div className="artwork-technical-meta">
          {category && <p><strong>Categoria:</strong> {category}</p>}
          {medium && <p><strong>Técnica:</strong> {medium}</p>}
          {largura && altura && (
            <p><strong>Dimensões digitais:</strong> {largura} × {altura} px</p>
          )}
        </div>

        {/* Botões de Ação do Figma */}
        <div className="artwork-action-buttons">
          <Button variant="outline">📄 Ficha Curatorial</Button>
          <Link to="/museu-virtual">
            <Button variant="primary">🏛️ Ver na Galeria Virtual</Button>
          </Link>
          <Button variant="dark">🎧 Audioguia</Button>
        </div>
      </div>
    </section>
  );
}
```

#### 3. `RelatedArtworksCarousel.jsx`
* **Arquivo:** `src/components/sections/artwork-detail/RelatedArtworksCarousel.jsx`
```jsx
import ArtworkCard from "../../cards/ArtworkCard/ArtworkCard";

export default function RelatedArtworksCarousel({ artworks = [] }) {
  if (!artworks.length) return null;

  return (
    <section className="related-artworks-section">
      <div className="section-container">
        <h2 className="section-title">Explore Mais Obras</h2>
        <div className="explore-cards-grid">
          {artworks.slice(0, 4).map((item) => (
            <ArtworkCard key={item.id} artwork={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
```

---

## 7. CSS Complementar das Seções para Adicionar ao `src/styles/components.css`

Quando o Dev chegar na **Etapa A4 (Seções)**, basta colar este bloco no **final** do arquivo `src/styles/components.css` para estilizar todas as seções e utilitários:

```css
/* --------------------------------------------------------------------------
   9. UTILITÁRIOS GERAIS DE SEÇÃO, METRIC BADGE & DIVIDER
   -------------------------------------------------------------------------- */
.section-container {
  max-width: 1440px;
  margin: 0 auto;
  padding: 64px 56px;
}

.section-title {
  font-family: var(--font-serif-display);
  font-size: 38px;
  font-weight: 400;
  color: var(--color-text-primary);
  margin-bottom: 8px;
}

.section-title-large {
  font-family: var(--font-serif-display);
  font-size: 52px;
  font-weight: 400;
  margin-bottom: 12px;
}

.section-subtitle {
  font-family: var(--font-sans-primary);
  font-size: 18px;
  color: var(--color-text-secondary);
  margin-bottom: 32px;
}

.section-divider {
  border: none;
  border-top: 1px solid var(--color-divider-section);
  margin: 24px 0;
}

.metric-badge {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 16px 24px;
}

.metric-badge-value {
  font-family: var(--font-serif-display);
  font-size: 44px;
  font-weight: 400;
  color: var(--color-text-primary);
  line-height: 1.1;
}

.metric-badge-label {
  font-family: var(--font-sans-primary);
  font-size: 15px;
  color: var(--color-text-secondary);
  margin-top: 6px;
}

/* --------------------------------------------------------------------------
   10. SEÇÕES DA HOME & ARTISTAS
   -------------------------------------------------------------------------- */
.hero-section {
  position: relative;
  min-height: 540px;
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
}

.hero-overlay {
  width: 100%;
  min-height: 540px;
  background: linear-gradient(90deg, rgba(13, 13, 11, 0.88) 0%, rgba(13, 13, 11, 0.45) 100%);
  display: flex;
  align-items: center;
}

.hero-content-container {
  max-width: 1440px;
  width: 100%;
  margin: 0 auto;
  padding: 80px 56px;
  color: var(--color-surface-default);
}

.hero-brand-label {
  display: inline-block;
  font-family: var(--font-sans-primary);
  font-size: 14px;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: var(--color-accent-primary);
  margin-bottom: 12px;
}

.hero-headline {
  font-family: var(--font-serif-display);
  font-size: 56px;
  line-height: 1.1;
  max-width: 780px;
  margin-bottom: 20px;
}

.hero-subdescription {
  font-size: 20px;
  max-width: 620px;
  color: rgba(255, 255, 255, 0.85);
  margin-bottom: 36px;
  line-height: 1.5;
}

.hero-actions {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
}

.collection-stats-section {
  background-color: var(--color-surface-collection-stats);
  border-bottom: 1px solid var(--color-divider-metrics);
}

.collection-stats-container {
  max-width: 1440px;
  margin: 0 auto;
  padding: 36px 56px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
}

.explore-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  flex-wrap: wrap;
  gap: 16px;
  margin-bottom: 24px;
}

.explore-tabs-bar,
.filter-tags-row {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  margin-bottom: 36px;
}

.explore-cards-grid,
.artworks-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 28px;
}

.virtual-museum-banner {
  background-color: var(--color-surface-charcoal);
  color: var(--color-surface-default);
  text-align: center;
}

.virtual-museum-banner-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 760px;
}

.banner-eyebrow {
  color: var(--color-accent-primary);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  font-size: 14px;
  margin-bottom: 12px;
}

.banner-title {
  font-family: var(--font-serif-display);
  font-size: 42px;
  margin-bottom: 16px;
}

.banner-description {
  color: rgba(255, 255, 255, 0.8);
  font-size: 18px;
  line-height: 1.6;
  margin-bottom: 28px;
}

.featured-artists-section {
  background-color: var(--color-surface-secondary);
}

.featured-artists-grid {
  display: flex;
  gap: 28px;
  flex-wrap: wrap;
}

/* --------------------------------------------------------------------------
   11. PERFIL DO ARTISTA & PALCO DA OBRA (ARTWORK STAGE)
   -------------------------------------------------------------------------- */
.artist-profile-hero {
  background-color: var(--color-surface-artist);
}

.artist-profile-grid {
  display: grid;
  grid-template-columns: 360px 1fr;
  gap: 48px;
  align-items: center;
}

.artist-portrait-img {
  width: 100%;
  height: 420px;
  object-fit: cover;
  border-radius: 6px;
}

.artist-profile-name {
  font-family: var(--font-serif-display);
  font-size: 48px;
  margin-bottom: 16px;
}

.artist-profile-bio {
  font-size: 18px;
  line-height: 1.6;
  color: var(--color-text-secondary);
  margin-bottom: 32px;
}

.artist-profile-metrics {
  display: flex;
  gap: 32px;
  flex-wrap: wrap;
  border-top: 1px solid var(--color-divider-metrics);
  padding-top: 24px;
}

.artwork-stage-section {
  background-color: var(--color-surface-charcoal);
  padding: 48px 24px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.artwork-stage-frame {
  max-width: 1200px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.artwork-stage-image {
  max-height: 70vh;
  max-width: 100%;
  width: auto;
  height: auto;
  object-fit: contain;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5);
}

.artwork-details-section {
  background-color: var(--color-surface-work-detail);
}

.artwork-details-card {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.artwork-title-heading {
  font-family: var(--font-serif-display);
  font-size: 42px;
  margin-bottom: 6px;
}

.artwork-artist-link {
  font-size: 20px;
  color: var(--color-accent-primary);
  font-weight: 500;
}

.artwork-year-text {
  display: block;
  font-size: 16px;
  color: var(--color-text-secondary);
  margin-top: 4px;
}

.artwork-technical-meta {
  display: flex;
  gap: 32px;
  flex-wrap: wrap;
  padding: 16px 0;
  border-top: 1px solid var(--color-divider-metrics);
  border-bottom: 1px solid var(--color-divider-metrics);
}

.artwork-action-buttons {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
}
```
```