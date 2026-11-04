# GameStore

Aplicacao React com Vite para consultar e gerenciar jogos armazenados no Supabase. A navegacao entre as paginas e feita com React Router, sem recarregar o documento.

## Requisitos

- Node.js e npm
- Um projeto Supabase com a tabela `games`

## Configuracao

Instale as dependencias:

```bash
npm install
```

Crie um arquivo `.env` na raiz do projeto com a URL do projeto Supabase e uma chave **publishable**:

```env
VITE_SUPABASE_URL=https://SEU-PROJETO.supabase.co
VITE_SUPABASE_ANON_KEY=sua-chave-sb_publishable
```

Obtenha esses valores nas configuracoes de API do projeto Supabase. O cliente em `src/services/supabase.js` usa essas variaveis; a consulta a tabela e feita com `.from('games')`.

O `.env` e ignorado pelo Git. As variaveis com prefixo `VITE_` sao incluidas no codigo enviado ao navegador: use somente a chave publishable, nunca uma chave `sb_secret` ou `service_role`. Configure politicas RLS no Supabase para permitir apenas as operacoes apropriadas para os usuarios da aplicacao.

Se alterar o `.env` com o servidor em execucao, reinicie o Vite para carregar os valores.

## Executar

```bash
npm run dev
```

O Vite informa no terminal o endereco local para abrir no navegador.

Para gerar e visualizar a versao de producao:

```bash
npm run build
npm run preview
```

## Paginas e rotas

| Rota | Pagina | Funcionalidade |
| --- | --- | --- |
| `/` | Inicio | Apresenta a GameStore e direciona para a biblioteca. |
| `/registros` | Jogos | Consulta a tabela `games`; permite cadastrar, editar, excluir e abrir detalhes. |
| `/registros/:id` | Detalhes | Busca um jogo pelo identificador da URL e mostra suas informacoes. |

O menu e os links dos registros usam `Link`. A pagina de detalhes obtem `id` com `useParams`. As consultas usam `useState`, `useEffect` e o Supabase Client; carregamento, erro, lista vazia e registro nao encontrado possuem estados especificos.

## Estrutura principal

- `src/main.jsx`: inicializa React e `BrowserRouter`.
- `src/AppRoutes.jsx`: menu e definicao das rotas.
- `src/pages/Inicio.jsx`: pagina inicial.
- `src/pages/ListaJogos.jsx`: listagem e operacoes de cadastro.
- `src/pages/DetalheJogo.jsx`: consulta individual por `id`.
- `src/services/supabase.js`: configuracao do cliente Supabase.
- `src/App.css` e `src/index.css`: estilos da aplicacao.

## Scripts

- `npm run dev`: inicia o servidor de desenvolvimento.
- `npm run build`: compila a aplicacao para producao.
- `npm run preview`: serve localmente a compilacao de producao.
- `npm run lint`: executa o ESLint.
