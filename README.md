# Poker Club

Aplicativo web de gerenciamento de torneios de poquer, otimizado para iPhone.
Funciona no navegador em iPhone, Android e computador, com login Admin/Jogador
e sincronizacao opcional em tempo real via Supabase.

## Arquivos

- `index.html` — estrutura do app e navegacao
- `css/styles.css` — tema escuro inspirado em mesa de poquer
- `js/store.js` — dados, regras, usuarios e persistencia
- `js/cloud.js` — sincronizacao Supabase em tempo real
- `js/app.js` — telas, cronometro, backup, login e niveis de acesso
- `js/supabase-config.example.js` — modelo de configuracao da nuvem
- `js/supabase-config.js` — configuracao local (nao coloque a service_role)
- `supabase/schema.sql` — tabelas, RLS e Realtime para executar no Supabase
- `manifest.json` — PWA para adicionar a tela inicial
- `sw.js` — cache offline
- `icons/` — icones do aplicativo
- `tests/run.js` — testes das funcoes principais

## Como usar no celular

1. Publique a pasta do projeto em qualquer hospedagem estatica.
2. Abra o endereco no Safari do iPhone.
3. Toque em Compartilhar > Adicionar a Tela de Inicio.

Cadastre nome e senha. A senha fica no Supabase Auth; nao e gravada no clube nem no localStorage.
Sem Supabase, os dados ficam so neste aparelho (modo local).
Com Supabase, iPhone, Android e computador veem o mesmo clube em tempo real.
Cadastro pelo link entra como jogador. O primeiro admin usa o codigo secreto do SQL.

## Banco online (Supabase)

Informacoes que voce precisa fornecer (somente estas):

1. **Project URL** — em Project Settings > API, campo Project URL
   Exemplo: `https://xxxxxxxx.supabase.co`
2. **anon / publishable key** — em Project Settings > API, chave `anon` `public`
3. **ID do clube** (opcional) — padrao `pokerclub`

Nao envie e nao cole a chave **service_role**. Ela e secreta e so pode ficar no servidor.

Passos:

1. Crie um projeto em https://supabase.com
2. Abra SQL Editor e execute o arquivo `supabase/schema.sql`
3. Defina o codigo do primeiro admin (veja `PUBLISH.md`)
4. Authentication > Providers > Email: desative Confirm email
5. Confirme Realtime: Database > Replication, tabela `clubs` habilitada
6. Publique o site (Netlify ou Vercel) com as variaveis de ambiente.
   Passo a passo completo: `PUBLISH.md`

O ponto verde no topo indica nuvem sincronizada. Amarelo = modo local. Vermelho = offline.

## Link publico (mesmo clube em todos os aparelhos)

Nao instale nada nos celulares. Publique uma vez e envie o mesmo endereco:

`https://seu-clube.netlify.app` ou `https://seu-clube.vercel.app`

Cada jogador abre o link, cadastra nome e senha, e entra no mesmo Poker Club.
Admin altera dados. Jogador so visualiza. Relogio e rankings sincronizam em tempo real.

Como publicar: `PUBLISH.md`

## Como publicar de graca

Qualquer servico de site estatico serve. Opcoes comuns:

### Netlify Drop

1. Acesse https://app.netlify.com/drop
2. Arraste a pasta do projeto
3. Copie o endereco gerado

### Cloudflare Pages

1. Crie uma conta em https://pages.cloudflare.com
2. Envie a pasta ou conecte um repositorio Git
3. Build command: deixe vazio
4. Output directory: `/`

### GitHub Pages

1. Envie os arquivos para um repositorio GitHub
2. Em Settings > Pages, escolha a branch `main` e a pasta `/root`
3. O site ficara em `https://SEU_USUARIO.github.io/SEU_REPO/`

Nao e necessario Node, PHP ou a service_role do Supabase.

## Telas

- Inicio: proximo torneio, torneio ao vivo, cronometro, arrecadacao, campeoes e ranking
- Jogadores: cadastro, edicao, exclusao, busca e quantidade de torneios
- Torneios: criacao, inscritos, pagamentos manuais, eliminacoes e campeao
- Relogio: funciona com ou sem torneio; iniciar, pausar, reiniciar e tempo manual
- Caixa: entradas, saidas, totais automaticos, relatorio mensal e anual
- Cash Pot: Royal Flush, Straight Flush, Quadra e Premia, ranking e campeao da temporada
- Campeoes: hall da fama, filtro anual e titulos por jogador

## Testes

```bash
# Rodar a suíte de testes
node tests/run.js
```
