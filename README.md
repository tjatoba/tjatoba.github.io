# 🎬 Love & Rate Movies

Uma aplicação web interativa para amantes do cinema! Descubra, explore e avalie filmes usando a API do The Movie Database (TMDB).

## 🌟 Funcionalidades

- **Busca por título**: Encontre filmes específicos digitando o nome
- **Busca por ator**: Descubra filmes de seus atores favoritos
- **Filtros avançados**:
  - Filtro por gênero (Ação, Comédia, Drama, Terror, etc.)
  - Filtro por ano de lançamento (1900 até presente)
  - Filtro por idioma (Inglês, Português, Espanhol, etc.)
- **Visualização de detalhes**:
  - Poster do filme
  - Título e sinopse
  - Nota de avaliação com código de cores
  - Hover para ver sinopse completa
- **Interface responsiva** adaptada para diferentes dispositivos

## 🚀 Como usar

1. **Clone o repositório**:

   ```zsh
   git clone https://github.com/tjatoba/love-and-rate-movies.git
   cd love-and-rate-movies
   ```

2. **Abra o arquivo `index.html`** em seu navegador

3. **Explore os filmes**:

   - Use a barra de busca para encontrar filmes por título
   - Digite o nome de um ator para ver sua filmografia
   - Clique nos gêneros para filtrar
   - Use os filtros de ano e idioma para refinar sua busca

## 🎯 Funcionalidades Detalhadas

### Sistema de Busca

- **Por título**: Digite o nome do filme na primeira barra de busca
- **Por ator**: Digite o nome do ator na segunda barra de busca

### Filtros Interativos

- **Gêneros**: Clique nos botões de gênero para filtrar (múltipla seleção)
- **Ano**: Dropdown com anos de 1900 até o atual
- **Idioma**: Seleção entre os principais idiomas cinematográficos

### Sistema de Avaliação Visual

- 🟢 **Verde**: Filmes com nota ≥ 7.0 (Excelente)
- 🟠 **Laranja**: Filmes com nota entre 4.0-6.9 (Bom)
- 🔴 **Vermelho**: Filmes com nota < 4.0 (Regular)

## 🛠️ Tecnologias Utilizadas

- **HTML5**: Estrutura da aplicação
- **CSS3**: Estilização e layout responsivo
- **JavaScript ES6+**: Lógica da aplicação e integração com API
- **TMDB API**: Fonte de dados dos filmes
- **Google Fonts**: Tipografia (Poppins)

## 📱 Design Responsivo

A aplicação foi desenvolvida com design responsivo, adaptando-se a:

- 💻 Desktops
- 📱 Tablets  
- 📱 Smartphones

## 📂 Estrutura do Projeto

```text
love-and-rate-movies/
├── index.html          # Página principal
├── style.css           # Estilos da aplicação
├── script.js           # Lógica JavaScript
└── README.md           # Documentação
```

## 🌐 API Utilizada

Este projeto utiliza a [The Movie Database (TMDB) API](https://www.themoviedb.org/documentation/api) para:

- Buscar filmes populares
- Pesquisar por título
- Buscar informações de atores
- Filtrar por gênero, ano e idioma
- Obter imagens e avaliações


## 🤝 Contribuindo

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request


## 👨‍💻 Autor

Thiago Jatobá

- GitHub: [@tjatoba](https://github.com/tjatoba)

---

⭐ Se você gostou do projeto, não esqueça de dar uma estrela! 