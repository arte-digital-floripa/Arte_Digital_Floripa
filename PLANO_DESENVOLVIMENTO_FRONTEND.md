# Guia Completo de Desenvolvimento - Trilha A (Leo - Componentes e Interface)

Projeto: Arte Digital Floripa - Frontend
Branch de trabalho do Leo: `feat/componentes-base`
Branch de trabalho do Mateus: `feat/dados-paginas`
Branch de integracao da equipe: `feat/nova-arquitetura-front`

Ultima revisao: 28/10/2026

---

## 1. Como funciona a divisao de trabalho entre voce e o Mateus

Para que voces dois possam programar ao mesmo tempo sem que o Git de conflito, o projeto foi dividido em duas trilhas independentes:

- **Trilha A - Leo (Voce):** Constroi todos os componentes visuais (`src/components/`), os layouts (`src/layouts/`) e o CSS (`src/styles/`). Nenhum dos seus componentes precisa buscar dados no banco de dados. Eles recebem todas as informacoes prontas atraves de **props** (parametros).
- **Trilha B - Mateus:** Conecta o frontend com o banco de dados (`src/services/` e `src/hooks/`), configura as rotas (`src/routes/`) e monta as paginas (`src/pages/`). O Mateus pega os dados do banco e entrega para os seus componentes desenharem na tela.

### Regra de ouro para nao ter conflito no Git

| Pasta / Arquivo | Quem edita | Regra para voce (Leo) |
| :--- | :--- | :--- |
| `src/components/` | **Leo** | Voce tem liberdade total aqui |
| `src/styles/` | **Leo** | Voce tem liberdade total aqui |
| `src/layouts/` | **Leo** | Voce tem liberdade total aqui |
| `public/img/` | **Leo** | Imagens e logos estaticos do layout |
| `src/pages/` | Mateus | **Nao commitar alteracoes aqui** (evita conflito) |
| `src/hooks/` | Mateus | Nao mexer |
| `src/services/` | Mateus | Nao mexer |
| `src/routes/` | Mateus | Nao mexer |

---

## 2. Guia rapido de React (Conceitos essenciais para consulta)

Como esta e a sua primeira disciplina de frontend com React, consulte esta secao sempre que tiver duvida sobre algum comando do codigo.

### 2.1 Diferenca entre HTML comum e JSX (o HTML do React)
No React, escrevemos HTML dentro de arquivos JavaScript (`.jsx`). Existem 3 diferencas principais para o HTML comum:

1. **`className` em vez de `class`:** Como a palavra `class` ja existe no JavaScript, no React sempre escrevemos `<div className="meu-card">` em vez de `<div class="meu-card">`.
2. **Atributos com duas palavras usam camelCase:** No HTML comum escrevemos `stroke-width="2"` ou `onclick="..."`. No React, tiramos o traco e colocamos a segunda palavra com letra maiuscula: `strokeWidth="2"`, `onClick={...}`, `strokeLinecap="round"`.
3. **Toda tag precisa ser fechada:** Tags que no HTML ficam abertas, como `<img>`, `<br>`, `<hr>` e `<input>`, no React **obrigatoriamente** precisam de uma barra no final: `<img />`, `<br />`, `<hr />`, `<input />`.

### 2.2 O que sao `props` (Propriedades)?
Imagine que um componente React e uma forma de bolo, e as `props` sao os ingredientes.
Quando o Mateus usa o seu componente la na pagina dele assim:
```jsx
<MetricBadge value="18" label="Artistas Catalogados" />
```
O seu componente recebe `value` e `label` dentro dos parenteses da funcao usando chaves `{ }`:
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
Repare que dentro do HTML usamos chaves `{value}` sempre que queremos mostrar o valor de uma variavel JavaScript na tela.

### 2.3 Valores padrao (`=`) nas props
Se voce escrever `{ variant = "primary" }` nos parenteses da funcao, significa: *"Se ninguem informar qual e o `variant`, use `'primary'` como padrao"*. Isso evita que o componente fique sem classe CSS caso uma prop seja esquecida.

### 2.4 A prop especial `children`
Tudo o que e colocado entre a abertura e o fechamento de uma tag vira automaticamente a prop `children`:
- Quando alguem escreve `<Button>Salvar</Button>`, dentro do arquivo `Button.jsx` a variavel `{children}` vale `"Salvar"`.

### 2.5 Como evitar a "Tela Branca" quando um dado demora ou vem vazio (`?.` e `||`)
No React, se voce tentar ler `artist.name`, mas a variavel `artist` ainda estiver vazia (`undefined`), o site inteiro trava e fica com a tela branca.
Para proteger o seu componente, usamos dois operadores:
- **Ponto de interrogacao `?.` (Encadeamento opcional):** `artist?.name` diz ao JavaScript: *"So tente ler `.name` se `artist` existir. Se nao existir, nao trave o site"*.
- **Duas barras `||` (Valor reserva):** `artist?.name || "Nome do Artista"` diz: *"Mostre o nome do artista; se estiver vazio, mostre o texto 'Nome do Artista'"*.
- **Desestruturacao segura:** `const { id, name, bio, photo_url } = artist || {};` extrai as propriedades de `artist`, mas se `artist` vier vazio, usa um objeto vazio `{}` para nao dar erro.

### 2.6 Links no React: `<Link>` vs `<a>` (E por que nunca colocar `<button>` dentro de `<Link>`)
- **Nunca use `<a href="/artistas">`** para navegar entre paginas do site, pois a tag `<a>` recarrega o navegador inteiro.
- **Sempre use `<Link to="/artistas">`** do pacote `react-router-dom`. Ele troca de pagina instantaneamente.
- **Regra importante de HTML:** O `<Link>` ja vira uma tag `<a>` no navegador. Nunca coloque um `<button>` dentro de um `<Link>` (como `<Link><button>Texto</button></Link>`), pois colocar um botao dentro de um link e invalido no HTML e falha no celular. Se quiser que um link tenha aparencia de botao, basta colocar a classe do botao direto no `<Link>`:
  ```jsx
  <Link to="/artistas" className="btn btn-primary">
    Explorar Acervo
  </Link>
  ```

### 2.7 Como repetir elementos de uma lista com `.map()` e `key`
Quando recebemos uma lista (array) de obras ou artistas, usamos `.map()` para desenhar um card para cada item da lista.
**Regra obrigatoria do React:** O primeiro elemento dentro do `.map()` precisa ter o atributo `key={...}` com um valor unico (como `item.id`), para o React saber identificar cada card:
```jsx
{artworks.map((work) => (
  <ArtworkCard key={work.id} artwork={work} />
))}
```

---

## 3. O que voce ja fez e a ordem das proximas etapas

### Status atual das suas entregas
- [x] `Header.jsx` (Barra de navegacao superior com logo e links)
- [x] `Footer.jsx` (Rodape global com logo, iniciativa, parceiro e icones sociais)
- [x] Estilos de Header, Footer, Buttons, FilterTag, SearchInput, ArtistCard e ArtworkCard em `src/styles/components.css`
- [ ] Pequenos ajustes no Header e Footer atuais (Etapa 1)
- [ ] Cards: `ArtistCard` e `ArtworkCard` (Etapa 2 - Prioridade de hoje as 13h)
- [ ] Componentes Base em `src/components/common/` (Etapa 3)
- [ ] CSS complementar das secoes em `src/styles/components.css` (Etapa 4)
- [ ] Secoes das paginas: Artistas, Detalhe do Artista, Detalhe da Obra e Home (Etapas 5 a 8)

### Resumo de tempo estimado por etapa

| Etapa | Escopo | Quantidade de arquivos | Tempo estimado |
| :--- | :--- | :---: | :---: |
| **Etapa 1** | Ajustes finos no Header e Footer ja criados | 3 arquivos | 20 min |
| **Etapa 2** | Cards (`ArtistCard` e `ArtworkCard`) | 2 arquivos | 45 min |
| **Etapa 3** | Componentes Base (`common/`) | 5 arquivos | 50 min |
| **Etapa 4** | Colar CSS das secoes no `components.css` | 1 arquivo | 10 min |
| **Etapa 5** | Secoes da pagina de Artistas (`sections/artists/`) | 3 arquivos | 35 min |
| **Etapa 6** | Secoes da pagina do Artista (`sections/artist-detail/`) | 3 arquivos | 45 min |
| **Etapa 7** | Secoes da pagina da Obra (`sections/artwork-detail/`) | 3 arquivos | 45 min |
| **Etapa 8** | Secoes da pagina Home (`sections/home/`) | 5 arquivos | 1h 15min |

---

## 4. Passo a passo detalhado por etapa

---

### Etapa 1 - Ajustes finos no Header e Footer que voce ja criou

O seu `Header.jsx` e `Footer.jsx` ficaram muito bons. Existem apenas 3 detalhes tecnicos para corrigir antes de avancar para os Cards:

#### 1.1 Corrigir os atributos SVG no `src/components/layout/Footer/Footer.jsx`
No seu `Footer.jsx` (linhas 52, 53, 54, 60, 69, 70, 71, 85, 86, 87), os SVGs estao com nomes em HTML comum (`stroke-width`, `stroke-linecap`, `stroke-linejoin`). No React, isso gera avisos vermelhos no console do navegador.
Basta trocar nos 3 icones SVG:
- `stroke-width` por `strokeWidth`
- `stroke-linecap` por `strokeLinecap`
- `stroke-linejoin` por `strokeLinejoin`

#### 1.2 Simplificar o caminho da logo no `Header.jsx` e `Footer.jsx`
Como voce colocou a imagem em `frontend/public/img/logo-arte-digital-provisorio.png`, no Vite toda imagem dentro da pasta `public/` pode ser usada direto pelo caminho `"/img/logo-arte-digital-provisorio.png"`, sem precisar de `import logo from "../../../../public/..."`.
E voce pode apagar os dois arquivos antigos `src/components/layout/Header/logo-mock.png` e `src/components/layout/Footer/logo-mock.png` que nao estao mais sendo usados.

#### 1.3 Evitar que o Header fique por cima do titulo das paginas internas
No arquivo `src/styles/components.css` (linha 150), o `.navbar-header` esta com `position: absolute` e `mix-blend-mode: difference`. Isso faz com que a barra flutue por cima dos primeiros 104px de todas as paginas.
Para que o Header seja uma barra escura fixa no topo sem cobrir o titulo da pagina de Artistas ou da Obra, ajuste a regra `.navbar-header` (linha 149 de `src/styles/components.css`) para:
```css
.navbar-header {
  position: sticky;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 100;
  background-color: var(--color-surface-charcoal);
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  transition: all 0.3s ease;
}
```
*(E remova o `mix-blend-mode: normal` das linhas 221 e 226).*

---

### Etapa 2 - Cards (`src/components/cards/`) [Prioridade das 13h]

O Mateus ja conectou a pagina `/artistas` e a pagina `/artistas/:id` ao banco de dados. Assim que voce salvar estes dois arquivos, os artistas e as obras ja vao aparecer estilizados e clicaveis no navegador.

As classes CSS `.artist-card` e `.artwork-card` **ja estao prontas** no seu arquivo `src/styles/components.css` (linhas 396 a 546).

#### 2.1 Componente `ArtistCard`
- **Arquivo para editar:** `src/components/cards/ArtistCard/ArtistCard.jsx`
- **O que o Mateus vai passar para ele (props):**
  - `artist`: Objeto vindo do banco com `{ id, name, bio, photo_url, artworks }`.
  - `variant`: Texto `"compact"` (card menor para grade, padrao) ou `"featured"` (card largo para destaques na Home).
- **O que o componente deve fazer:**
  1. Envolver todo o card com `<Link to={`/artistas/${id || ""}`} className={`artist-card ${variant}`}>` para que o card inteiro seja clicavel e leve para a pagina daquele artista.
  2. Exibir a foto (`photo_url`). Se o artista nao tiver foto ou o link quebrar (`onError`), exibir uma imagem reserva (`FALLBACK_ARTIST_IMG`).
  3. Exibir o nome (`name`), a biografia resumida em 2 linhas (`bio`) e o texto de explorar obras na base.

**Codigo para colocar em `src/components/cards/ArtistCard/ArtistCard.jsx`:**
```jsx
import { Link } from "react-router-dom";

const FALLBACK_ARTIST_IMG =
  "https://placehold.co/600x400/16191E/FFFFFF?text=Arte+Digital+Floripa";

export default function ArtistCard({
  artist,
  variant = "compact",
  className = "",
}) {
  const { id, name, bio, photo_url, artworks } = artist || {};

  const worksText =
    Array.isArray(artworks) && artworks.length > 0
      ? `${artworks.length} obra(s) catalogada(s)`
      : "Explorar obras do artista";

  return (
    <Link
      to={`/artistas/${id || ""}`}
      className={`artist-card ${variant} ${className}`.trim()}
    >
      <div className="artist-card-artwork-wrapper">
        <img
          src={photo_url || FALLBACK_ARTIST_IMG}
          alt={name || "Retrato do artista"}
          className="artist-card-artwork"
          loading="lazy"
          onError={(e) => {
            e.currentTarget.src = FALLBACK_ARTIST_IMG;
          }}
        />
      </div>

      <div className="artist-card-content">
        <div>
          <h3 className="artist-card-name">{name || "Artista Convidado"}</h3>
          <p className="artist-card-summary">
            {bio || "Biografia em catalogacao pelo acervo Arte Digital Floripa."}
          </p>
        </div>
        <span className="artist-card-works">{worksText}</span>
      </div>
    </Link>
  );
}
```

**Como testar agora mesmo:**
Com o servidor rodando, abra `http://localhost:5173/artistas`. Voce vera os 18 artistas do banco de dados dentro do seu `ArtistCard`, com foto, efeito de hover e clicaveis.

---

#### 2.2 Componente `ArtworkCard`
- **Arquivo para editar:** `src/components/cards/ArtworkCard/ArtworkCard.jsx`
- **O que o Mateus vai passar para ele (props):**
  - `artwork`: Objeto vindo do banco com `{ id, artist_id, title, date, category, medium, remote_url, largura, altura }`.
  - `artistName` (opcional): Nome do artista caso a pagina queira exibir.
- **O que o componente deve fazer:**
  1. Envolver todo o card com `<Link to={`/obras/${id || ""}`} className="artwork-card">` para abrir a pagina daquela obra ao clicar.
  2. Calcular a proporcao da imagem (`aspectRatio`) caso `largura` e `altura` venham do banco, ou usar o padrao do CSS.
  3. Exibir a imagem da obra (`remote_url`) com imagem reserva no `onError`.
  4. Exibir o titulo (`title`), o nome do artista (se disponivel) e o ano junto com a tecnica (`date` e `medium`).

**Codigo para colocar em `src/components/cards/ArtworkCard/ArtworkCard.jsx`:**
```jsx
import { Link } from "react-router-dom";

const FALLBACK_ARTWORK_IMG =
  "https://placehold.co/600x450/F3F2EE/7E6664?text=Obra+de+Arte";

export default function ArtworkCard({
  artwork,
  artistName = "",
  className = "",
}) {
  const { id, title, remote_url, date, medium, largura, altura, artists } =
    artwork || {};

  const displayArtist = artistName || artists?.name || "";
  const subtitleDetails = [date, medium].filter(Boolean).join(" - ");

  const aspectStyle =
    largura && altura ? { aspectRatio: `${largura} / ${altura}` } : {};

  return (
    <Link
      to={`/obras/${id || ""}`}
      className={`artwork-card ${className}`.trim()}
    >
      <div className="artwork-card-image-wrapper" style={aspectStyle}>
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
        <h4 className="artwork-card-title">{title || "Obra sem titulo"}</h4>
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

### Etapa 3 - Componentes Base (`src/components/common/`)

Estes 5 componentes pequenos sao usados dentro das secoes maiores. As classes CSS dos 3 primeiros ja estao prontas no inicio do seu `src/styles/components.css`.

#### 3.1 Componente `Button`
- **Arquivo para editar:** `src/components/common/Button/Button.jsx`
- **Explicacao:** Recebe `variant` (`"primary"`, `"outline"` ou `"dark"`), monta a classe CSS `btn btn-primary` e repassa qualquer outro atributo (`onClick`, `type`, `disabled`) usando `...props`.

```jsx
export default function Button({
  children,
  variant = "primary",
  className = "",
  ...props
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

#### 3.2 Componente `FilterTag`
- **Arquivo para editar:** `src/components/common/FilterTag/FilterTag.jsx`
- **Explicacao:** E a pilula de filtro (ex: "Todos", "Pintura", "Escultura"). Quando a prop `active` e `true`, adiciona a classe `"active"`, que pinta o botao de laranja terracota.

```jsx
export default function FilterTag({
  label,
  active = false,
  onClick,
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

#### 3.3 Componente `SearchInput`
- **Arquivo para editar:** `src/components/common/SearchInput/SearchInput.jsx`
- **Explicacao:** Barra de pesquisa usada na pagina de Artistas. Usa um `<form>` para que o usuario possa tanto clicar no botao "Buscar" quanto apertar a tecla Enter no teclado. O `event.preventDefault()` impede que a pagina recarregue ao apertar Enter.

```jsx
export default function SearchInput({
  value,
  onChange,
  onSearch,
  placeholder = "Buscar artistas...",
  className = "",
}) {
  const handleSubmit = (event) => {
    event.preventDefault();
    if (onSearch) {
      onSearch(value);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`search-container ${className}`.trim()}
    >
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

#### 3.4 Componente `MetricBadge`
- **Arquivo para editar:** `src/components/common/MetricBadge/MetricBadge.jsx`
- **Explicacao:** Mostra um numero grande em destaque (`value`) e uma legenda abaixo (`label`). Usado nas estatisticas da Home e no perfil do artista.

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

#### 3.5 Componente `SectionDivider`
- **Arquivo para editar:** `src/components/common/SectionDivider/SectionDivider.jsx`
- **Explicacao:** Linha horizontal divisoria entre secoes.

```jsx
export default function SectionDivider({ className = "" }) {
  return <hr className={`section-divider ${className}`.trim()} />;
}
```

---

### Etapa 4 - Adicionar o CSS das Secoes no `src/styles/components.css`

Antes de criar as secoes das Etapas 5, 6, 7 e 8, abra o arquivo `src/styles/components.css`, va ate a **ultima linha** (depois da linha 546) e cole o bloco abaixo. Ele contem todas as classes de layout das secoes:

```css
/* --------------------------------------------------------------------------
   9. UTILITARIOS GERAIS DE SECAO, METRIC BADGE E DIVIDER
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
  color: var(--color-text-primary);
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
   10. SECOES DA HOME E ARTISTAS
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
  background: linear-gradient(
    90deg,
    rgba(13, 13, 11, 0.88) 0%,
    rgba(13, 13, 11, 0.45) 100%
  );
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
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
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

.artists-hero-section {
  background-color: var(--color-surface-secondary);
  border-bottom: 1px solid var(--color-divider-metrics);
}

.artists-search-section .section-container,
.artists-filter-band .section-container {
  padding-top: 24px;
  padding-bottom: 12px;
}

/* --------------------------------------------------------------------------
   11. PERFIL DO ARTISTA E PALCO DA OBRA (ARTWORK STAGE)
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

.timeline-horizontal-scroll {
  display: flex;
  gap: 24px;
  overflow-x: auto;
  padding-bottom: 16px;
}

.timeline-item {
  min-width: 220px;
  max-width: 220px;
  text-decoration: none;
  color: var(--color-text-primary);
}

.timeline-thumb {
  width: 100%;
  height: 150px;
  object-fit: cover;
  border-radius: 6px;
  margin-bottom: 8px;
}

.timeline-year {
  font-size: 13px;
  color: var(--color-accent-primary);
  font-weight: 500;
}

.timeline-work-title {
  font-family: var(--font-serif-display);
  font-size: 16px;
  margin-top: 4px;
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

@media (max-width: 900px) {
  .section-container {
    padding: 40px 24px;
  }
  .artist-profile-grid {
    grid-template-columns: 1fr;
  }
  .hero-headline {
    font-size: 38px;
  }
}
```

---

### Etapa 5 - Secoes da Pagina de Artistas (`src/components/sections/artists/`)

Estes 3 componentes formam o cabecalho, a barra de busca e a barra de temas da pagina `/artistas`.

#### 5.1 `ArtistsHero.jsx`
- **Arquivo:** `src/components/sections/artists/ArtistsHero.jsx`
```jsx
export default function ArtistsHero() {
  return (
    <section className="artists-hero-section">
      <div className="section-container">
        <span className="hero-brand-label">Acervo Digital</span>
        <h1 className="section-title-large">Artistas do Acervo</h1>
        <p className="section-subtitle">
          Pesquise por nome, periodo historico ou vertente artistica.
        </p>
      </div>
    </section>
  );
}
```

#### 5.2 `ArtistsSearchBar.jsx`
- **Arquivo:** `src/components/sections/artists/ArtistsSearchBar.jsx`
- **Props recebidas do Mateus:** `searchTerm` (texto digitado), `onSearchChange` (funcao chamada a cada letra digitada) e `onSearchSubmit`.
```jsx
import SearchInput from "../../common/SearchInput/SearchInput";

export default function ArtistsSearchBar({
  searchTerm,
  onSearchChange,
  onSearchSubmit,
}) {
  return (
    <section className="artists-search-section">
      <div className="section-container">
        <SearchInput
          value={searchTerm}
          onChange={(e) => onSearchChange && onSearchChange(e.target.value)}
          onSearch={onSearchSubmit}
          placeholder="Buscar artista por nome..."
        />
      </div>
    </section>
  );
}
```

#### 5.3 `ArtistsFilterThemeBar.jsx`
- **Arquivo:** `src/components/sections/artists/ArtistsFilterThemeBar.jsx`
- **Props recebidas do Mateus:** `themes` (lista de temas), `activeTheme` (tema selecionado) e `onSelectTheme` (funcao chamada ao clicar em um tema).
```jsx
import FilterTag from "../../common/FilterTag/FilterTag";

const DEFAULT_THEMES = [
  "Todos",
  "Manezinho",
  "Contemporaneo",
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

### Etapa 6 - Secoes da Pagina do Artista (`src/components/sections/artist-detail/`)

Estes 3 componentes montam a pagina `/artistas/:id` (ex: `/artistas/franklin-cascaes`).

#### 6.1 `ArtistProfileHero.jsx`
- **Arquivo:** `src/components/sections/artist-detail/ArtistProfileHero.jsx`
- **Props recebidas do Mateus:** `artist` (objeto do artista) e `artworksCount` (numero de obras dele).
```jsx
import MetricBadge from "../../common/MetricBadge/MetricBadge";

const FALLBACK_PORTRAIT =
  "https://placehold.co/500x600/16191E/FFFFFF?text=Artista";

export default function ArtistProfileHero({ artist, artworksCount = 0 }) {
  const { name, bio, photo_url } = artist || {};

  return (
    <section className="artist-profile-hero">
      <div className="section-container artist-profile-grid">
        <div className="artist-portrait-wrapper">
          <img
            src={photo_url || FALLBACK_PORTRAIT}
            alt={name || "Artista"}
            className="artist-portrait-img"
            onError={(e) => {
              e.currentTarget.src = FALLBACK_PORTRAIT;
            }}
          />
        </div>

        <div className="artist-profile-details">
          <h1 className="artist-profile-name">{name || "Nome do Artista"}</h1>
          <p className="artist-profile-bio">
            {bio || "Biografia detalhada em atualizacao no acervo."}
          </p>

          <div className="artist-profile-metrics">
            <MetricBadge value={artworksCount} label="Obras Cadastradas" />
            <MetricBadge value="1" label="Exposicoes Virtuais" />
            <MetricBadge value="-" label="Murais Publicos" />
          </div>
        </div>
      </div>
    </section>
  );
}
```

#### 6.2 `ArtistGalleryGrid.jsx`
- **Arquivo:** `src/components/sections/artist-detail/ArtistGalleryGrid.jsx`
- **Props recebidas do Mateus:** `artworks` (array de obras do artista) e `artistName`.
```jsx
import ArtworkCard from "../../cards/ArtworkCard/ArtworkCard";

export default function ArtistGalleryGrid({ artworks = [], artistName = "" }) {
  return (
    <section className="artist-gallery-section">
      <div className="section-container">
        <h2 className="section-title">Obras no Acervo ({artworks.length})</h2>
        {artworks.length === 0 ? (
          <p className="section-subtitle">
            Nenhuma obra catalogada para este artista.
          </p>
        ) : (
          <div className="artworks-grid">
            {artworks.map((work) => (
              <ArtworkCard
                key={work.id}
                artwork={work}
                artistName={artistName}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
```

#### 6.3 `ArtistTimeline.jsx`
- **Arquivo:** `src/components/sections/artist-detail/ArtistTimeline.jsx`
- **Props recebidas do Mateus:** `artworks` (array de obras).
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
            <Link
              key={work.id}
              to={`/obras/${work.id}`}
              className="timeline-item"
            >
              <img
                src={work.remote_url}
                alt={work.title}
                className="timeline-thumb"
              />
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

---

### Etapa 7 - Secoes da Pagina da Obra (`src/components/sections/artwork-detail/`)

Estes 3 componentes formam a pagina `/obras/:id` (ex: `/obras/ufsc_150312` ou `/obras/cma-149112`).

#### 7.1 `ArtworkStage.jsx`
- **Arquivo:** `src/components/sections/artwork-detail/ArtworkStage.jsx`
- **Props recebidas do Mateus:** `artwork` (objeto da obra com `title`, `remote_url`, `largura`, `altura`).
```jsx
const FALLBACK_STAGE_IMG =
  "https://placehold.co/900x700/16191E/FFFFFF?text=Obra+Indisponivel";

export default function ArtworkStage({ artwork }) {
  const { title, remote_url, largura, altura } = artwork || {};
  const aspectRatioStyle =
    largura && altura ? { aspectRatio: `${largura} / ${altura}` } : {};

  return (
    <section className="artwork-stage-section">
      <div className="artwork-stage-frame">
        <img
          src={remote_url || FALLBACK_STAGE_IMG}
          alt={title || "Obra em destaque"}
          className="artwork-stage-image"
          style={aspectRatioStyle}
          onError={(e) => {
            e.currentTarget.src = FALLBACK_STAGE_IMG;
          }}
        />
      </div>
    </section>
  );
}
```

#### 7.2 `ArtworkDetailsInfo.jsx`
- **Arquivo:** `src/components/sections/artwork-detail/ArtworkDetailsInfo.jsx`
- **Props recebidas do Mateus:** `artwork` (objeto da obra) e `artist` (objeto do autor da obra).
```jsx
import { Link } from "react-router-dom";
import Button from "../../common/Button/Button";

export default function ArtworkDetailsInfo({ artwork, artist }) {
  const { title, date, category, medium, largura, altura, artist_id } =
    artwork || {};
  const artistName =
    artist?.name || artwork?.artists?.name || "Ver perfil do artista";
  const targetArtistId = artist?.id || artist_id;

  return (
    <section className="artwork-details-section">
      <div className="section-container artwork-details-card">
        <div className="artwork-details-header">
          <h1 className="artwork-title-heading">{title || "Obra sem titulo"}</h1>
          {targetArtistId ? (
            <Link
              to={`/artistas/${targetArtistId}`}
              className="artwork-artist-link"
            >
              {artistName}
            </Link>
          ) : (
            <p className="artwork-artist-link">{artistName}</p>
          )}
          <span className="artwork-year-text">
            {date || "Data nao informada"}
          </span>
        </div>

        <div className="artwork-technical-meta">
          {category && (
            <p>
              <strong>Categoria:</strong> {category}
            </p>
          )}
          {medium && (
            <p>
              <strong>Tecnica:</strong> {medium}
            </p>
          )}
          {largura && altura && (
            <p>
              <strong>Dimensoes digitais:</strong> {largura} x {altura} px
            </p>
          )}
        </div>

        <div className="artwork-action-buttons">
          {targetArtistId && (
            <Link
              to={`/artistas/${targetArtistId}`}
              className="btn btn-primary"
            >
              Ver galeria do artista
            </Link>
          )}
          <Button variant="outline">Ficha Curatorial</Button>
          <Button variant="dark">Audioguia</Button>
        </div>
      </div>
    </section>
  );
}
```

#### 7.3 `RelatedArtworksCarousel.jsx`
- **Arquivo:** `src/components/sections/artwork-detail/RelatedArtworksCarousel.jsx`
- **Props recebidas do Mateus:** `artworks` (lista de outras obras do mesmo artista).
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

### Etapa 8 - Secoes da Pagina Home (`src/components/sections/home/`)

Estes 5 componentes formam a pagina principal (`/`).

#### 8.1 `HomeHero.jsx`
- **Arquivo:** `src/components/sections/home/HomeHero.jsx`
```jsx
import { Link } from "react-router-dom";

export default function HomeHero({
  brandTitle = "Arte Digital Floripa",
  headline = "A memoria visual e contemporanea da Ilha de Santa Catarina",
  subdescription = "Explore obras, murais urbanos, trajetorias de artistas e exposicoes imersivas em 360 graus.",
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
            <Link to="/artistas" className="btn btn-primary">
              Explorar Acervo
            </Link>
            <Link to="/museu-virtual" className="btn btn-dark btn-icon-pill">
              Museu Virtual 360
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
```

#### 8.2 `CollectionStats.jsx`
- **Arquivo:** `src/components/sections/home/CollectionStats.jsx`
- **Props recebidas do Mateus:** `stats` (array de objetos `{ value, label }`).
```jsx
import MetricBadge from "../../common/MetricBadge/MetricBadge";

const DEFAULT_STATS = [
  { value: "18+", label: "Artistas Catalogados" },
  { value: "100+", label: "Obras Digitalizadas" },
  { value: "12", label: "Locais Culturais" },
  { value: "3", label: "Salas Virtuais 360" },
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

#### 8.3 `ExploreSection.jsx`
- **Arquivo:** `src/components/sections/home/ExploreSection.jsx`
- **Props recebidas do Mateus:** `artworks` (array de obras).
```jsx
import { useState } from "react";
import { Link } from "react-router-dom";
import FilterTag from "../../common/FilterTag/FilterTag";
import ArtworkCard from "../../cards/ArtworkCard/ArtworkCard";

const EXPLORE_TABS = ["Obras", "Pintura", "Escultura", "Desenho"];

export default function ExploreSection({ artworks = [] }) {
  const [activeTab, setActiveTab] = useState("Obras");

  return (
    <section className="explore-section">
      <div className="section-container">
        <div className="explore-header">
          <div>
            <h2 className="section-title">Explore a Colecao</h2>
            <p className="section-subtitle">
              Navegue pelas obras, tecnicas e expressoes artisticas do acervo.
            </p>
          </div>
          <Link to="/artistas" className="btn btn-outline">
            Ver acervo completo
          </Link>
        </div>

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

#### 8.4 `VirtualMuseumBanner.jsx`
- **Arquivo:** `src/components/sections/home/VirtualMuseumBanner.jsx`
```jsx
import { Link } from "react-router-dom";

export default function VirtualMuseumBanner() {
  return (
    <section className="virtual-museum-banner">
      <div className="section-container virtual-museum-banner-content">
        <span className="banner-eyebrow">Experiencia Imersiva 360</span>
        <h2 className="banner-title">Visite o Museu Virtual Arte Digital</h2>
        <p className="banner-description">
          Caminhe pelas galerias tridimensionais e contemple as obras em alta
          resolucao diretamente do seu navegador.
        </p>
        <Link to="/museu-virtual" className="btn btn-primary">
          Entrar no museu virtual
        </Link>
      </div>
    </section>
  );
}
```

#### 8.5 `FeaturedArtists.jsx`
- **Arquivo:** `src/components/sections/home/FeaturedArtists.jsx`
- **Props recebidas do Mateus:** `artists` (array de artistas).
```jsx
import ArtistCard from "../../cards/ArtistCard/ArtistCard";

export default function FeaturedArtists({ artists = [] }) {
  const featuredList = artists.slice(0, 3);

  return (
    <section className="featured-artists-section">
      <div className="section-container">
        <h2 className="section-title">Artistas em Destaque</h2>
        <p className="section-subtitle">
          Conheca os mestres e artistas contemporaneos presentes em nosso acervo.
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

## 5. Como testar seus componentes sem dar conflito com o Mateus

Se voce quiser testar um componente novo na `HomePage.jsx` enquanto programa:

1. Edite `src/pages/HomePage.jsx` para importar e ver o seu componente no navegador (`http://localhost:5173`).
2. **Antes de fazer `git add` e `git commit`**, volte o arquivo `HomePage.jsx` ao estado original rodando:
   ```bash
   git checkout -- frontend/src/pages/HomePage.jsx
   ```
3. Dessa forma, os seus commits na branch `feat/componentes-base` terao **apenas** arquivos de `src/components/`, `src/styles/` e `src/layouts/`, garantindo zero conflitos quando o Mateus puxar o seu codigo.

---

## 6. Rotina de Git para subir cada etapa concluida

Sempre que terminar uma etapa (por exemplo, ao terminar a Etapa 2 dos Cards, avise o Mateus para ele ja plugar nas paginas):

```bash
# 1. Verifique quais arquivos voce modificou (confira se nao ha nada de src/pages/)
git status

# 2. Teste se o projeto compila sem erros de sintaxe
cd frontend
npm run build

# 3. Adicione seus arquivos, faca o commit e envie para a sua branch
git add .
git commit -m "feat(ui): implementa ArtistCard e ArtworkCard"
git push origin feat/componentes-base
```

---

## 7. Checklist de entrega da Trilha A (Leo)

### Etapa 1 - Ajustes Header e Footer
- [ ] Atributos SVG em camelCase no `Footer.jsx` (`strokeWidth`, `strokeLinecap`, `strokeLinejoin`)
- [ ] Header com fundo escuro fixo (`position: sticky`) sem cobrir o titulo das paginas

### Etapa 2 - Cards (Prioridade das 13h)
- [ ] `src/components/cards/ArtistCard/ArtistCard.jsx`
- [ ] `src/components/cards/ArtworkCard/ArtworkCard.jsx`

### Etapa 3 - Componentes Base (`common/`)
- [ ] `src/components/common/Button/Button.jsx`
- [ ] `src/components/common/FilterTag/FilterTag.jsx`
- [ ] `src/components/common/SearchInput/SearchInput.jsx`
- [ ] `src/components/common/MetricBadge/MetricBadge.jsx`
- [ ] `src/components/common/SectionDivider/SectionDivider.jsx`

### Etapa 4 - CSS das Secoes
- [ ] Bloco de estilos das secoes adicionado ao final de `src/styles/components.css`

### Etapa 5 - Secoes de Artistas
- [ ] `src/components/sections/artists/ArtistsHero.jsx`
- [ ] `src/components/sections/artists/ArtistsSearchBar.jsx`
- [ ] `src/components/sections/artists/ArtistsFilterThemeBar.jsx`

### Etapa 6 - Secoes do Detalhe do Artista
- [ ] `src/components/sections/artist-detail/ArtistProfileHero.jsx`
- [ ] `src/components/sections/artist-detail/ArtistGalleryGrid.jsx`
- [ ] `src/components/sections/artist-detail/ArtistTimeline.jsx`

### Etapa 7 - Secoes do Detalhe da Obra
- [ ] `src/components/sections/artwork-detail/ArtworkStage.jsx`
- [ ] `src/components/sections/artwork-detail/ArtworkDetailsInfo.jsx`
- [ ] `src/components/sections/artwork-detail/RelatedArtworksCarousel.jsx`

### Etapa 8 - Secoes da Home
- [ ] `src/components/sections/home/HomeHero.jsx`
- [ ] `src/components/sections/home/CollectionStats.jsx`
- [ ] `src/components/sections/home/ExploreSection.jsx`
- [ ] `src/components/sections/home/VirtualMuseumBanner.jsx`
- [ ] `src/components/sections/home/FeaturedArtists.jsx`
