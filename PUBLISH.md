# Publicar o Poker Club A2.1

O app e um site estatico. Nao precisa instalar nada no celular.
Depois de publicado, envie o mesmo link para todos.

iPhone, Android e computador abrem o mesmo endereco e usam o mesmo banco Supabase.

Cadastro e senha usam **Supabase Auth**. A senha nao vai para `clubs.payload` nem para o localStorage.

Ninguem vira administrador so por abrir o link. O primeiro admin usa um codigo secreto definido no SQL.

## 1. O que voce precisa ter

No Supabase (Project Settings > API):

- Project URL (`https://xxxx.supabase.co`)
- anon / publishable key

Nunca use a chave service_role.

## 2. SQL (uma vez)

No SQL Editor:

1. Execute `supabase/schema.sql`
2. Defina o codigo do primeiro admin (troque `SEU_CODIGO_SECRETO`):

```sql
update public.clubs
set admin_setup_hash = crypt('SEU_CODIGO_SECRETO', gen_salt('bf'))
where id = 'pokerclub';
```

Guarde esse codigo fora do site. Depois do primeiro admin, o hash e apagado.

Em Authentication > Providers > Email:

- Desative **Confirm email**

Em Authentication > URL configuration (e CORS, se houver):

- Adicione o link publico do site

## 3. Variaveis de ambiente (hospedagem)

| Variavel | Obrigatoria | Exemplo |
| --- | --- | --- |
| USER_SUPABASE_URL | sim | https://xxxx.supabase.co |
| USER_SUPABASE_ANON_KEY | sim | eyJhbGciOi... (anon) |
| USER_SUPABASE_CLUB_ID | nao | pokerclub |

Tambem aceita `SUPABASE_URL`, `SUPABASE_ANON_KEY` e `SUPABASE_CLUB_ID`.

Nao coloque service_role nem o codigo de admin nas variaveis do frontend.

No deploy, `scripts/write-config.js` grava `js/supabase-config.js` com URL e anon key.

## 4. Publicar na Netlify (recomendado)

1. Conta em https://app.netlify.com
2. Add new site > Import an existing project (Git) ou Deploy manually
3. Build command: `node scripts/write-config.js`
4. Publish directory: `.`
5. Site configuration > Environment variables: cole URL e anon key
6. Deploy

Link gerado: `https://SEU-SITE.netlify.app`

## 5. Publicar na Vercel

1. Conta em https://vercel.com
2. Add New > Project > envie a pasta ou o Git
3. Framework preset: Other
4. Build Command: `node scripts/write-config.js`
5. Output Directory: `.`
6. Environment Variables: as mesmas
7. Deploy

Link gerado: `https://SEU-SITE.vercel.app`

## 6. Publicar sem Git (Netlify Drop)

1. Preencha `js/supabase-config.js` com URL e anon key (copie de `js/supabase-config.example.js`)
2. Arraste a pasta do projeto em https://app.netlify.com/drop
3. Copie o endereco gerado

## 7. Primeiro acesso

1. Abra o link
2. Cadastrar usuario: nome + senha (entra como jogador)
3. Sou administrador: nome + senha + codigo secreto (so o primeiro)
4. Jogadores seguintes so cadastram nome e senha

- Admin: jogadores, torneios, relogio, caixa, Cash Pot, campeoes
- Jogador: ve o clube, relogio e rankings; nao altera dados
- Relogio funciona sem torneio criado

## 8. CORS no Supabase

Em Project Settings > API > CORS / Allowed origins (ou Authentication > URL configuration):

- Adicione o link publico (`https://seu-site.netlify.app`)

## 9. Conferir

- Ponto verde no topo = nuvem conectada
- Cadastro pelo link nao vira admin sem o codigo
- Dois aparelhos: altere um jogador e veja aparecer no outro
- Relogio: iniciar sem torneio em um, acompanhar no outro
- Jogador logado nao grava no clube (RLS)
