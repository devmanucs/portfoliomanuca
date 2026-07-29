# project.md — Portfólio Manuca (Monorepo)

> Documento vivo de escopo. Atualize os checkboxes conforme o trabalho avança — este arquivo é o ponto de retomada caso o trabalho seja interrompido a qualquer momento.

## 1. O que é este projeto

Monorepo (pnpm + turbo) com:

- **`apps/web`** — Next.js 16 (App Router, RSC) + React 19 + Tailwind v4 (CSS-first, sem `tailwind.config`). Portfólio público (landing) em `/` e painel administrativo em `/admin/**`.
- **`apps/api`** — NestJS + Prisma (Postgres). REST API com auth JWT via cookie `access_token`. Recursos: `profile`, `skills`, `projects`, `experiences`, `education`, `interests`, `resume`, `site-theme`, `auth`.
- **`packages/types`** — tipos compartilhados (`IProfile`, `ISkill`, `IProject`, `IExperience`, `IEducation`, `IInterest`, `IResume`, `ISiteTheme`), consumidos por `web` e `api` como `@portfoliomanuca/types`.

A landing page é a identidade pública da Manuella (portfólio). O admin é a ferramenta interna para editar todo o conteúdo que a landing exibe (perfil, skills, projetos, experiências, currículo) e para customizar o tema visual do site.

## 2. Stack relevante para UI

- Next.js 16 / React 19, RSC por padrão.
- Tailwind v4 (tokens via CSS custom properties + `@theme inline`, não via `tailwind.config`).
- `react-hook-form` + `zod` + `@hookform/resolvers` nos formulários.
- `@tanstack/react-query` + `axios` para os dados do admin (`apps/web/src/hooks/use-crud.ts`).
- `recharts` (via `components/ui/chart.tsx`) para gráficos.
- Radix UI (primitivas individuais) + `class-variance-authority` + `tailwind-merge` — shadcn/ui, style **`new-york`** (`apps/web/components.json`).
- Fontes: Inter (`--font-sans`), Bricolage Grotesque (`--font-heading`), JetBrains Mono (`--font-mono`) — identidade de marca, definidas em `apps/web/src/app/layout.tsx` e conectadas em `globals.css`.
- `next-themes` para o toggle light/dark do admin (independente do sistema de presets de cor).

## 3. Sistema de tema — como funciona hoje

Arquivo real de tokens: **`apps/web/src/app/globals.css`** (importado por `layout.tsx`). Há um arquivo órfão **`apps/web/styles/globals.css`** que não é importado em lugar nenhum — código morto, removido durante este trabalho.

Fluxo do customizador de tema (`/admin/aparencia`):

1. `apps/web/src/features/admin/theme/presets.ts` define grupos de tokens (`TOKEN_GROUPS`) e presets pré-computados via `buildPresetTokens`.
2. `theme-customizer-sheet.tsx` (um `Sheet`) deixa escolher preset, radius, e editar tokens individualmente via `oklch-color-field.tsx` (sliders L/C/H + campo raw + reset).
3. `use-theme-draft-cache.ts` persiste o rascunho em `localStorage` (`pm:theme-draft`) para sobreviver a reloads antes de salvar.
4. Ao salvar: PATCH `/site-theme` → `apps/api/src/site-theme/*` → Prisma (linha única, JSON `tokens.light`/`tokens.dark`).
5. `apps/web/src/app/layout.tsx` busca `GET /site-theme` com `cache: "no-store"` em toda request e injeta um `<style id="theme-overrides">` — por isso o tema já é "ao vivo" (sem rebuild) tanto no admin quanto na landing.

### Decisão de arquitetura desta rodada de trabalho — escopo do admin

Até aqui, o preset salvo valia para o **site inteiro** (`:root`/`.dark` globais), o que misturava a paleta de marca (espresso/copper/bronze, ver `DESIGN.md`/`PRODUCT.md`) usada na landing com qualquer mudança feita no customizador.

**Mudança**: introduzir um escopo `.admin-scope` / `.admin-scope.dark` em `globals.css`, aplicado no elemento raiz do admin (`app/admin/layout.tsx`). O customizador de tema e a paleta neutra (ver seção 4) agora vivem **somente** dentro desse escopo — a landing pública continua 100% na paleta de marca original, intocada.

## 4. Redesign do admin (em andamento)

### Objetivo

Dar ao painel admin uma identidade visual neutra e organizada, inspirada nos tokens e nos *blocks* de dashboard do **shadcn/ui** (`https://github.com/shadcn-ui/ui`), sem alterar a landing pública. Decisões já tomadas com o usuário:

- **Fontes**: mantidas as fontes de marca (Inter/Bricolage/JetBrains) — não trocar para Geist.
- **Navegação**: manter o topbar horizontal atual, só restilizado — sem migrar para sidebar lateral.
- **Cores**: preto/branco neutro (`chroma 0`), valores OKLCH idênticos ao preset "neutral" do shadcn (ver valores exatos abaixo), escopados a `.admin-scope`.
- **Layout**: parar de centralizar formulários numa coluna estreita com scroll desnecessário (ex.: página Perfil) — usar a largura disponível, grids multi-coluna, blocos (`Frame`) em vez de `Card` cru.
- **Forms**: sair de `Dialog` para `Sheet` nos CRUDs (Projetos, Experiências, Skills), com campos agrupados via `FormFields.Section` (`apps/web/src/components/shared/form-fields.tsx`).
- **Página Temas**: virar uma vitrine tipo os dashboards de exemplo do shadcn (stat cards, gráfico, tabela, preview ao vivo), não só os cards soltos atuais.
- **Dados dinâmicos**: edições no admin (skills, perfil, projetos, experiências) devem refletir na landing sem esperar os 60s do ISR atual.

### Valores neutros de referência (shadcn, `apps/v4/app/globals.css`)

```css
/* light */
--background: oklch(1 0 0);
--foreground: oklch(0% 0 0);
--card / --popover: oklch(1 0 0);
--primary: oklch(0% 0 0);
--primary-foreground: oklch(0.985 0 0);
--secondary / --muted / --accent: oklch(0.97 0 0);
--muted-foreground: oklch(0.556 0 0);
--border / --input: oklch(0.922 0 0);
--ring: oklch(0.708 0 0);
--sidebar: oklch(0.985 0 0);

/* dark */
--background: oklch(0.145 0 0);
--foreground: oklch(0.985 0 0);
--card / --popover: oklch(0.205 0 0);
--primary: oklch(0.922 0 0);
--primary-foreground: oklch(0.205 0 0);
--secondary / --muted: oklch(0.269 0 0);
--accent: oklch(0.371 0 0);
--border / --input: oklch(1 0 0 / 10%) / oklch(1 0 0 / 15%);
--ring: oklch(0.556 0 0);
```

`--destructive` e `--chart-1..5` mantêm leve matiz (não são cinza puro) — usados como referência, ajustados para passar no checador de contraste AA já existente (`apps/web/src/lib/oklch.ts`).

### Achados a corrigir durante o trabalho

- 5+ lugares com `className="bg-sage text-background hover:bg-sage/90"` hardcoded em botões primários (Projetos/Experiências/Skills/Perfil/Currículo) — ignoram o token `--primary`. Corrigir para variante semântica do `Button`, senão a nova paleta não se aplica de fato.
- `apps/web/styles/globals.css` — código morto, remover.

## 5. Checklist de execução

### Fase 0 — Documentação
- [x] 0.1 Criar este `project.md`.
- [ ] 0.2 Remover `apps/web/styles/globals.css` (código morto confirmado).

### Fase 1 — Paleta neutra escopada ao admin ✅
- [x] 1.1 Adicionado `.admin-scope` / `.dark .admin-scope` em `globals.css` com os valores neutros do shadcn (nota: dark usa seletor descendente `.dark .admin-scope`, não composto, já que o `.dark` fica na `<html>`).
- [x] 1.2 Classe `admin-scope` aplicada no root do `AdminShell` (inclusive na tela de login).
- [x] 1.3 `presets.ts` reescrito: `neutral` (tokens vazios = usa os defaults do `.admin-scope`) agora é o preset índice 0/default; `espresso` virou preset selecionável com valores concretos; `PRIMARY_FOREGROUND`/`FIXED_DESTRUCTIVE`/`FIXED_SUCCESS` atualizados para os valores neutros.
- [x] 1.4 Injeção de overrides do site-theme qualificada (`app/layout.tsx` e `aparencia/page.tsx` geram `.admin-scope { } .dark .admin-scope { }`).
- [x] 1.5 8 botões com `bg-sage` hardcoded (skills/projetos/experiências/perfil/currículo) agora usam a variante default do `Button` (`bg-primary`).
- [x] 1.6 Verificado no browser: light = fundo `oklch(1 0 0)`/texto `oklch(0% 0 0)`; dark = fundo `oklch(0.145 0 0)`/texto `oklch(0.985 0 0)`; landing (`/`) continua com a paleta espresso, sem `.admin-scope`. `pnpm typecheck` limpo.

### Fase 2 — Layout full-width das páginas ✅
- [x] 2.1 Removido o `max-w-2xl` que forçava coluna estreita; páginas agora usam a largura útil do `<main className="max-w-7xl">` do `AdminShell`.
- [x] 2.2 `Card` cru trocado por `Frame`/`FrameHeader`/`FrameTitle`/`FrameDescription`/`FramePanel` no Dashboard e Currículo; listas de Skills/Projetos/Experiências também usam `Frame`.
- [x] 2.3 Perfil refeito como settings multi-coluna: `FormFields.Section` "Identidade" (2 col) + "Contato" lado a lado em `xl:grid-cols-3`, "Redes & Links" em linha própria.
- [x] 2.4 Skills (`sm:grid-cols-2 xl:grid-cols-3`), Projetos/Experiências (`xl:grid-cols-2`) e Dashboard/Currículo usando grids largos em vez de coluna única.

### Fase 3 — Forms em Sheet ✅
- [x] 3.1 `AdminFormSheet` criado em `apps/web/src/components/shared/admin-form-sheet.tsx` (substitui `Dialog`, mesmo padrão visual do `theme-customizer-sheet.tsx`).
- [x] 3.2 Projetos → Sheet (`sm:max-w-2xl`) + `FormFields.Section` (Básico, Conteúdo do case, Galeria & Currículo). Também corrigido: campo `impact` (obrigatório no schema/tipo) agora tem input — antes existia no schema mas nunca era editável.
- [x] 3.3 Experiências → Sheet + Sections (Cargo, Período, Descrição).
- [x] 3.4 Skills → Sheet + Section única (Detalhes).
- [x] 3.5 `use-modal.ts`/`use-crud.ts` não foram alterados — toasts/invalidations seguem via `onSuccess: () => modal.onClose()`, confirmado no browser (abrir/editar/cancelar funcionando em Skills e Projetos).

### Fase 4 — Vitrine da página Temas ✅
- [x] 4.1 `theme-preview-showcase.tsx` expandido: linha de stat cards (com trend), `AreaChart` "Visão geral", `Table` "Projetos recentes", + os 4 cards originais (Ações/Formulário/Dados/Cartão) agora em `Frame`. Tudo reage ao draft de tokens via `.admin-scope`.
- [x] 4.2 `AparenciaPage` em 2 colunas (`xl:grid-cols-[320px_1fr]`): painel "Configurar" (sticky) à esquerda com preset picker, raio, badges de contraste AA e Salvar/Descartar; preview full-bleed à direita. `ThemeCustomizerSheet` foi simplificado para conter só o editor avançado por token (preset/raio/contraste saíram do Sheet, que agora só abre para customização avançada).
- [x] 4.3 Preset `neutral` é o primeiro da lista e o default (tokens vazios = usa `.admin-scope` base).
- [x] `RADIUS_OPTIONS` movido para `presets.ts` (compartilhado entre a página e o Sheet). Verificado no browser: troca de preset atualiza o preview ao vivo, badges de contraste mostram AA ✓ para texto e primária no preset Neutral.

### Fase 5 — Reflexo ao vivo na landing ✅
- [x] 5.1 `serverFetch` (`apps/web/src/lib/api-server.ts`) agora aceita `tags?: string[]` e usa `next: { revalidate: 3600, tags }` (fallback de 1h + tag por recurso). `content.ts` tageia cada loader: `profile`, `projects` (lista e por slug), `skills`, `experiences`, `education`, `interests`.
- [x] 5.2 Route handler `apps/web/src/app/api/revalidate/route.ts`: POST `{ tags: string[] }`, chama `revalidateTag(tag, "max")` (Next 16 exige um 2º argumento de cache-life profile; "max" invalida independente do profile). Protegido pela mesma checagem do cookie `access_token` usada pelo `middleware.ts` — sem secret extra.
- [x] 5.3 Novo `apps/web/src/lib/revalidate-client.ts` (`triggerRevalidate`, best-effort). Integrado em `use-crud.ts` (`revalidateTags` nas 3 mutações, chamado em `onSettled`) e usado por Projetos/Experiências/Skills (`revalidateTags: ["projects"|"experiences"|"skills"]`) e diretamente no `onSuccess` do `useMutation` bruto da página Perfil (`["profile"]`).
- [x] 5.4 Testado no browser: renomeei uma skill via admin, o POST para `/api/revalidate` retornou 200, e a landing (`/`) refletiu o novo nome já no próximo load — sem esperar o fallback de 1h. Revertido o dado de teste ao final.

### Fase 6 — Cleanup & QA ✅
- [x] 6.1 Revisão visual no browser: light (`oklch(1 0 0)`/`oklch(0% 0 0)`) e dark (`oklch(0.145 0 0)`/`oklch(0.985 0 0)`) do admin com paleta neutra confirmados em várias páginas; landing (`/`) confirmada sem `.admin-scope`, paleta espresso intacta.
- [x] 6.2 QA de fluxos no browser: Skills/Projetos/Experiências (Sheet abre, edita, salva, cancela), Perfil (grid multi-coluna, dados carregam e salvam), Currículo (toggles + preview + Frame, layout íntegro), Aparência (presets, radius, contraste AA, preview dashboard, discard).
- [x] 6.3 Checklist deste arquivo atualizado a cada fase.
- [x] `pnpm --filter @portfoliomanuca/web typecheck` limpo em todas as fases tocadas. `pnpm lint` não roda no projeto (falta `eslint.config.js` -- pré-existente, fora do escopo deste trabalho).

## 8. Rodada 2 — correções via `/impeccable` (pós-QA do usuário)

Depois da Fase 6, o usuário testou e apontou 3 problemas reais + pediu uma reconstrução maior da página Temas. Resolvidos nesta ordem:

1. **Bug de arquitetura (prioridade máxima)**: os `Sheet`/`Dialog` de cadastro (Radix UI) usam Portal para `document.body`, **fora** da div `.admin-scope` — por isso saíam com a paleta espresso da marca, não a neutra. Corrigido aplicando `admin-scope` diretamente na `<html>`: um script bloqueante em `app/layout.tsx` (evita flash no load) + `apps/web/src/components/admin-scope-sync.tsx` (`usePathname` + `useEffect`, mantém sincronizado em navegações client-side do App Router). `globals.css` ganhou o seletor composto `.admin-scope.dark` (além do `.dark .admin-scope` existente) para cobrir os dois jeitos de aninhamento.
2. **Ícones**: `lucide-react` trocado por `@hugeicons/react` + `@hugeicons/core-free-icons` em todo o admin (nav, botões de ação, customizer de tema, login). `components.json` → `"iconLibrary": "hugeicons"`.
3. **"Card soup"**: listas de Skills/Projetos/Experiências (antes: grid de N `Frame`s idênticos) viraram **um único `Frame` com `Table`** (linhas densas), eliminando o padrão de "grid de cards idênticos" apontado como o problema central.
4. **Página Temas reconstruída** como réplica do customizador do shadcn/ui: menu lateral fixo (`Base Color`, `Chart Color` — agora desacoplado do Base Color —, `Radius`, `Heading`/`Font` com carregamento dinâmico de Google Fonts, `Icon Library`, `Style`) + preview cheio de widgets variados (stat cards, area chart, tabela, empty state, form com slider, lista de metas com progress, + as 4 vitrines originais) + botões `Open Preset`/`Shuffle`/`Get Code` (dialog com o CSS gerado, copiável).
   - Descoberta importante: `--font-heading`/`--font-sans` são variáveis do `@theme inline` do Tailwind v4, que são **inlined em build-time** nas classes `.font-heading`/`.font-sans` (o CSS compilado nunca referencia `var(--font-heading)` em runtime) — por isso sobrescrevê-las no `.admin-scope` não tinha efeito nenhum. Solução: tokens dedicados `--admin-font-heading`/`--admin-font-sans`, consumidos por regras próprias em `globals.css` (não pelas utilities do Tailwind), com fallback explícito para os valores atuais (Bricolage/Inter) para não regredir o default.
   - Novos arquivos: `apps/web/src/features/admin/theme/{use-google-font.ts,get-code-dialog.tsx}`. `presets.ts` ganhou `HEADING_FONT_OPTIONS`, `BODY_FONT_OPTIONS`, `CHART_KEYS`/`pickKeys`/`omitKeys`, `findActiveChartPreset` (Base Color e Chart Color detectados/aplicados independentemente).
   - Verificado no browser: decoupling Base Color × Chart Color, troca de fonte aplicando de fato (com fallback correto quando não há override), Get Code mostrando CSS real, landing page sem nenhuma regressão de fonte/cor.

Nota: durante essa rodada, vários arquivos do admin (`admin-shell.tsx`, `skills/projetos/experiencias/page.tsx`, `login-client.tsx`) foram editados concorrentemente por fora desta sessão (ex.: variantes de botão, remoção do parágrafo do login, simplificação do nav sem ícones) — o trabalho acima foi construído em cima do estado mais recente desses arquivos a cada edição, não revertendo essas mudanças.

## 9. Rodada 3 — feedback do usuário pós-reconstrução da Temas

- **Bug real corrigido**: `findActivePreset` (detecção de "Base Color" ativo) só ignorava `--chart-*`, não os tokens de fonte (`--admin-font-*`). Como o tema salvo sempre grava as fontes, o Base Color nunca "batia" com nenhum preset e caía em "Personalizado" -- o usuário viu isso e achou que a cor não estava aplicando. `CHART_KEYS`/`FONT_KEYS` agora vivem juntos em `presets.ts` como `INDEPENDENT_KEYS`, usados tanto por `findActivePreset` quanto pela UI.
- **Bug de sintaxe bobo**: um comentário JSDoc continha `--chart-*/font`, e a sequência `*/` fechava o comentário no meio da frase, quebrando o parse. Reescrito sem a sequência.
- **Base Color / Chart Color viraram `<Select>`** (com uma bolinha colorida + nome por opção), abandonando o grid de swatches -- muito mais parecido com o customizador do shadcn e elimina a confusão entre os dois controles quase idênticos.
- **Largura total do admin**: em vez do hack de "full-bleed" só na página Temas, o `<main>` do `AdminShell` (`apps/web/src/features/admin/components/admin-shell.tsx`) perdeu o `max-w-7xl mx-auto` -- agora **todas** as páginas do admin usam a largura da tela, não só Temas.
- **Fonte de heading nos títulos de seção**: `FrameTitle` (`apps/web/src/components/ui/frame.tsx`) ganhou o atributo `data-font-heading`, que o CSS já criado (`.admin-scope [data-font-heading]`) usa -- antes só o `<h1>` da página reagia ao seletor de "Heading" no customizador.
- **Confirmado (não era bug)**: a landing já busca dados reais da API -- validado via o link do WhatsApp no rodapé, que só existe com o telefone salvo no perfil do banco (o fallback estático não tem esse campo).
- **Galeria de projeto com múltiplas imagens/vídeo**: novo componente `apps/web/src/components/shared/media-list-field.tsx` (lista dinâmica de URLs via `useFieldArray`, com badge "Imagem"/"Vídeo" detectado automaticamente pela URL/extensão) substitui o textarea de "uma URL por linha" na seção "Conteúdo do case" de Projetos. Sem backend de upload ainda -- continua sendo URL, só que agora um item por vez, sem limite, misturando imagem e vídeo livremente. "Imagem de capa" (Básico) continua como campo único de texto, como pedido.

## 10. Rodada 4 — draft/publish, upload de arquivo e paginação

- **"Projeto novo não aparece no portfólio"**: não era bug. O projeto de teste do usuário foi criado com status `Rascunho` (Draft) -- por design, `/projects` (rota pública) só retorna `PUBLISHED`. Confirmado ao trocar pra Publicado: apareceu na API pública e no HTML renderizado no servidor (`curl` direto). O navegador só não atualizou na hora por causa do Router Cache do App Router (cache client-side de rota já visitada) -- um reload real mostrou certinho. Nada a corrigir aqui, só reforça que Rascunho existe pra isso mesmo.
- **Get Code removido** da página Temas (`apps/web/src/features/admin/theme/get-code-dialog.tsx` apagado, botão e estado tirados de `aparencia/page.tsx`).
- **Upload de arquivo direto do PC** (imagem de capa e galeria de projeto), via Supabase Storage:
  - Backend novo: `apps/api/src/uploads/` (`uploads.controller.ts` + `uploads.service.ts` + `uploads.module.ts`), rota `POST /uploads` (multipart, protegida por `JwtAuthGuard`, usa `@supabase/supabase-js` com `SUPABASE_URL`/`SUPABASE_SERVICE_ROLE_KEY`/`SUPABASE_STORAGE_BUCKET`). Sem essas variáveis no `.env`, retorna erro claro pedindo pra configurar (testado e confirmado) -- instruções passo a passo adicionadas ao `README.md`.
  - Frontend novo: `apps/web/src/hooks/use-file-upload.ts` (fetch nativo pro endpoint, contorna o `Content-Type` fixo do axios), `apps/web/src/components/shared/image-upload-field.tsx` (campo único com preview + botão "Enviar do computador", ainda aceita colar URL), e `media-list-field.tsx` ganhou o mesmo botão de upload (múltiplos arquivos de uma vez) ao lado de "Adicionar URL".
  - **Pendente do lado do usuário**: criar um bucket público no Supabase (Storage → New bucket) e preencher `SUPABASE_URL`/`SUPABASE_SERVICE_ROLE_KEY` em `apps/api/.env` -- só assim o upload passa a funcionar de verdade (código já está pronto e testado até o ponto do erro esperado).
- **Paginação nas tabelas** (Skills, Projetos, Experiências): `apps/web/src/hooks/use-pagination.ts` (hook genérico, fatiamento client-side) + `apps/web/src/components/shared/table-pagination.tsx` (seletor de linhas por página 10/20/50, "X–Y de Z", primeira/anterior/próxima/última página). Testado com as 34 skills reais: pagina, muda tamanho de página e reseta pra página 1 corretamente.

## 11. Rodada 5 — corrida de revalidação e clareza do form de imagem

- **Diagnóstico do "não está sendo publicado"**: reproduzi com um projeto real (editei a categoria do "Dashboard de Monitoramento"). O save ia pro banco e o `POST /api/revalidate` disparava certinho, mas o `onSettled` chamava `triggerRevalidate` sem `await` -- então o toast de sucesso (e o fechamento do sheet) aparecia ANTES da revalidação terminar no servidor. Quem checasse a landing nesse intervalo de ~1-3s via um reload rápido via encontrava o dado antigo e concluía (razoavelmente) que "não tava funcionando".
- **Correção**: em `apps/web/src/hooks/use-crud.ts` (`useCreate`/`useUpdate`/`useDelete`) e no `useMutation` bruto de `apps/web/src/app/admin/perfil/page.tsx`, o `await triggerRevalidate(...)` agora roda **dentro da `mutationFn`**, antes dela resolver -- ou seja, o toast de sucesso só aparece depois que a landing já foi invalidada no servidor. Testado de novo com edição real: o `grep`/`curl` direto na landing já mostrava o valor novo assim que a lista do admin atualizava, sem atraso perceptível.
- **"Não sei qual imagem é a de destaque"**: os dois campos de imagem agora têm legenda explícita -- "Imagem de capa" diz que é a que aparece no card da listagem; "Galeria do case" diz que aparece só na página de detalhe (e referencia de volta a capa). O switch "Destaque" (que na verdade é sobre destacar o *projeto*, não uma imagem) virou "Destacar projeto (selo especial na listagem)" pra não confundir com escolha de imagem. `image-upload-field.tsx` também ganhou fallback visual (ícone de alerta + "inválida") quando a URL não carrega, em vez do ícone de imagem quebrada do navegador.
- Confirmado que o projeto "teste" (status Rascunho) corretamente não aparece na landing -- não era bug, `/projects` público só retorna `PUBLISHED` por design.

## 12. Notas finais / itens conhecidos fora de escopo

- O projeto não tem `eslint.config.js` (ESLint 9 exige flat config) -- `pnpm lint` falha na raiz, não relacionado às mudanças desta rodada.
- `education`/`interests` já têm tag de revalidação pronta em `content.ts`, mas não têm página de CRUD no admin ainda (só listáveis/editáveis via API/seed) -- se um dia ganharem tela própria, basta usar `revalidateTags: ["education"]`/`["interests"]` no hook de mutação.
- Presets de cor "Espresso" e as demais cores (Slate/Rose/Blue/Teal/Green/Violet/Amber) continuam disponíveis no customizador do admin para quem quiser um visual diferente do neutro -- só o *default* mudou para Neutral.

## 6. Arquivos-chave

| Área | Arquivos |
|---|---|
| Tema/tokens | `apps/web/src/app/globals.css`, `apps/web/src/app/admin/layout.tsx`, `apps/web/src/features/admin/theme/{presets.ts,theme-customizer-sheet.tsx,theme-preview-showcase.tsx,use-theme-draft-cache.ts}`, `apps/web/src/lib/oklch.ts`, `apps/api/src/site-theme/*` |
| Layout/forms | `apps/web/src/app/admin/{perfil,projetos,experiencias,skills,curriculo}/page.tsx`, `apps/web/src/components/shared/form-fields.tsx`, `apps/web/src/components/ui/{sheet,frame,dialog}.tsx`, `apps/web/src/hooks/{use-modal.ts,use-crud.ts}` |
| Reflexo ao vivo | `apps/web/src/lib/{content.ts,api-server.ts}`, `apps/web/src/app/api/revalidate/route.ts` (novo) |

## 7. Como retomar o trabalho

1. Leia a seção 5 (checklist) para saber o que já está feito.
2. Abra o plano completo salvo em `C:\Users\manuella.santos\.claude\plans\linked-snacking-hamster.md` para o raciocínio detalhado de cada fase.
3. Rode `pnpm dev:web` e `pnpm dev:api` para ambiente local; admin em `http://localhost:3000/admin` (login com `ADMIN_EMAIL`/`ADMIN_PASSWORD` do `.env`).
4. Ao terminar uma fase, marque os itens no checklist acima antes de seguir para a próxima.
