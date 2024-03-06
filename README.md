# Devflix

<p align='center'>
  <img src='https://github.com/elielgomes/react-kendo/assets/108281436/925513d2-fbf8-4cad-94ac-8880dfd2e5c8'/>
</p>

## 📌 Começando

Essas instruções permitirão que você obtenha uma cópia do projeto em operação na sua máquina local para fins de desenvolvimento e teste.

## 📋 Pré-requisitos

Node.js >= 18.0.0

## 🔧 Instalação

Clone o repositório do GitHub:

```bash
git clone https://github.com/seu-usuario/react-kendo.git
```

Navegue até o diretório do projeto:

```bash
cd react-kendo
```

Instale as dependências:

```bash
npm install
```

## 🚀 Iniciar

```bash
npm run start
```

⚙️ Executando os testes

```bash
npm run test
```

## ✏️ Descrição do Projeto

Todas as ideias de layout, funcionalidades e assets foram concebidas e implementadas por mim, garantindo uma abordagem única e personalizada para o projeto.

O projeto é uma aplicação web desenvolvida utilizando React, TypeScript, Kendo UI, Sass e Jest. Inspirado nos serviços de streaming de filmes, foi criada uma interface responsiva e harmoniosa para proporcionar uma experiência imersiva aos usuários.

Utilizando a API pública de filmes chamada TMDB, o projeto consome os dados dos filmes de forma assíncrona, permitindo a visualização de uma ampla variedade de títulos diretamente na plataforma.

Com uma integração fluida entre as tecnologias, os usuários podem navegar pela vasta biblioteca de filmes, realizar buscas dinâmicas e desfrutar de uma experiência de streaming de alta qualidade.

## 🛠️ Funcionalidades

### Lista de Filmes:
Na página principal, os usuários podem visualizar uma lista dos filmes mais populares. Esta lista é paginada para facilitar a navegação entre os diversos títulos disponíveis.

### Tema Dinâmico:
Para proporcionar uma experiência mais imersiva, o tema da aplicação é alterado dinamicamente com base na cor principal do filme em destaque. Essa cor é extraída automaticamente da imagem do filme e é alterada a cada atualização da página, garantindo uma experiência visual coesa e envolvente.

Além disso, a cor dos textos também é adaptada de acordo com o tema para garantir maior contraste e legibilidade. Isso permite que os usuários desfrutem de uma experiência de visualização confortável, independentemente do filme em destaque no momento.

### Detalhes do Filme:
Na página de detalhes de um filme, os usuários têm a opção de assistir ao trailer oficial. Caso a API pública forneça a chave do trailer oficial do YouTube, um modal é aberto ao clicar em "Trailer", permitindo que o usuário assista ao trailer sem sair da página. Se a chave do trailer não estiver disponível, o usuário será redirecionado para o YouTube com uma pesquisa pelo nome do filme, permitindo que encontre o trailer oficial facilmente.

### Busca de Filmes:
Os usuários podem buscar filmes pelo nome utilizando a funcionalidade de busca. Ao digitar na barra de busca, um custom hook chamado useDebounce é acionado, aguardando 2 segundos após o usuário parar de digitar para efetuar a busca.


### Grade de Filmes
Ao acessar a página inicial do aplicativo, os usuários encontram um botão "Ver todos", que os direciona para uma página dedicada à Grade de Filmes.

Na página da Grade de Filmes, os usuários encontram uma Datagrid que exibe uma visão geral de todos os filmes disponíveis com as seguintes funcionalidades: 

- Busca por Nome: Os usuários podem buscar filmes pelo nome utilizando a função de busca. Isso permite uma pesquisa rápida e eficiente entre os diversos títulos disponíveis.
- Paginação: A Datagrid é paginada para facilitar a navegação entre os filmes. Os usuários podem avançar e retroceder entre as páginas para explorar toda a lista de filmes.
- Filtragem por Gênero: Os usuários têm a opção de filtrar os filmes por gênero. Isso permite uma busca mais refinada, permitindo que os usuários encontrem filmes específicos dentro de determinadas categorias.
- Ordenação por Ano de Lançamento e Quantidade de Estrelas: Os usuários podem ordenar a lista de filmes por ano de lançamento ou quantidade de estrelas. Isso facilita a visualização dos filmes de acordo com suas preferências pessoais ou interesses específicos.

## 🔑 Acesso ao Projeto

 Clique [aqui](https://devflix-kendo.vercel.app/) ou acesse pelo link https://devflix-kendo.vercel.app/

 ## 👨🏻‍💻 Tecnologias utilizadas

- **React**: Biblioteca JavaScript para criar interfaces de usuário interativas.
- **TypeScript**: Superset do JavaScript que adiciona tipagem estática opcional ao código.
- **Git**: Sistema de controle de versão distribuído para rastreamento de alterações no código.
- **GitHub**: Plataforma de hospedagem de código-fonte que permite colaboração e gerenciamento de projetos com base em Git.
- **Jest**: Framework de teste de JavaScript com foco na simplicidade.
- **Sass**: Pré-processador CSS que estende a funcionalidade do CSS com características como variáveis, aninhamento e mixins.
- **Kendo UI**: Framework de UI que fornece componentes e widgets prontos para uso, facilitando o desenvolvimento de interfaces de usuário ricas e interativas.
  
## 📄 Licença
Este projeto está sob a licença MIT - veja o arquivo [LICENSE.md](https://github.com/elielgomes/react-kendo/blob/master/LICENSE.md) para detalhes.

## ✒️ Autor

feito por Eliel Gomes 😊
