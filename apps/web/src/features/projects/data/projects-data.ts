export type ProjectFocus = "design" | "development" | "hybrid";

export type Project = {
  slug: string;
  title: string;
  category: string;
  focus: ProjectFocus;
  description: string;
  impact: string;
  context: string;
  problem: string;
  process: string[];
  result: string;
  myRole: string;
  designDecisions?: string[];
  technicalHighlights?: string[];
  image: string;
  images: string[];
  tags: string[];
  liveUrl?: string;
  githubUrl?: string;
  figmaUrl?: string;
  featured: boolean;
};

export const focusLabels: Record<ProjectFocus, string> = {
  design: "ui/ux",
  development: "front-end",
  hybrid: "design + dev",
};

export const projects: Project[] = [
  {
    slug: "dashboard-analytics",
    title: "Dashboard de Monitoramento de Queimadas",
    category: "Dashboard",
    focus: "development",
    description:
      "Dashboard interativo para analisar focos de queimadas no Brasil com dados geoespaciais e temporais do INPE.",
    impact:
      "Dados brutos transformados em visualizações que permitem identificar padrões regionais em segundos.",
    context:
      "O INPE disponibiliza dados abertos sobre focos de queimada no Brasil, mas em formato bruto, difícil de interpretar para quem precisa tomar decisões rápidas. O desafio era tornar esses dados acessíveis e acionáveis.",
    problem:
      "Planilhas e relatórios estáticos não permitiam cruzar localização geográfica com sazonalidade — impossibilitando priorizar regiões e períodos críticos com agilidade.",
    process: [
      "Pipeline de ETL em Python para limpar e estruturar os dados do INPE.",
      "Análise exploratória (EDA) com Pandas para identificar picos sazonais e concentrações regionais.",
      "Escolha do Streamlit para prototipar visualizações interativas com baixo atrito de deploy.",
      "Design das visualizações priorizando leitura rápida: mapa geoespacial + filtros temporais.",
    ],
    result:
      "Dashboard funcional com filtros por região e período, permitindo explorar padrões de queimadas de forma interativa. Código disponível no GitHub para consulta e evolução.",
    myRole:
      "Desenvolvimento do pipeline de dados, escolha das visualizações e implementação da interface no Streamlit.",
    technicalHighlights: [
      "ETL com Python e processamento via Pandas.",
      "Visualizações geoespaciais e temporais com Matplotlib.",
      "Interface interativa no Streamlit com filtros dinâmicos.",
    ],
    image: "/assets/databurn1.png",
    images: [
      "/assets/databurn1.png",
      "/assets/databurn2.png",
      "/assets/databurn3.png",
      "/assets/databurn4.png",
    ],
    tags: ["Python", "Streamlit", "Pandas", "Matplotlib"],
    githubUrl: "https://github.com/Claud777/Projet_DataBurn_v1.0.1",
    featured: true,
  },
  {
    slug: "crud-usuarios-nextjs",
    title: "Modelo de CRUD de Usuários",
    category: "Web App",
    focus: "development",
    description:
      "Aplicação web com CRUD completo de usuários, autenticação e interface responsiva construída em Next.js.",
    impact:
      "Gestão de usuários centralizada com interface tipada, componentizada e pronta para escalar.",
    context:
      "Projetos web frequentemente precisam de uma base sólida de gestão de usuários antes de evoluir funcionalidades. O desafio era construir essa fundação seguindo boas práticas de front-end moderno.",
    problem:
      "Sem um CRUD estruturado, operações de criar, editar e remover usuários ficam espalhadas, inconsistentes e difíceis de manter conforme o produto cresce.",
    process: [
      "Arquitetura de componentes reutilizáveis com Shadcn UI e Tailwind CSS.",
      "Integração com API REST via Axios e Json-Server para simular backend.",
      "Tipagem completa com TypeScript para reduzir erros em tempo de desenvolvimento.",
      "Fluxos de formulário com validação e feedback visual claro para o usuário.",
    ],
    result:
      "Aplicação funcional com operações CRUD completas, autenticação e código organizado no GitHub — base reutilizável para projetos que exigem gestão de usuários.",
    myRole:
      "Desenvolvimento front-end completo: arquitetura de componentes, integração com API, formulários e interface responsiva.",
    technicalHighlights: [
      "Next.js com App Router e componentes React tipados.",
      "Shadcn UI + Tailwind para sistema de design consistente.",
      "Consumo de API REST com Axios e tratamento de estados.",
      "Organização de pastas preparada para escalar o produto.",
    ],
    image: "/assets/crud4.png",
    images: [
      "/assets/crud1.png",
      "/assets/crud2.png",
      "/assets/crud3.png",
      "/assets/crud4.png",
      "/assets/crud5.png",
    ],
    tags: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Shadcn UI",
      "Json-Server",
      "Axios",
    ],
    githubUrl: "https://github.com/devmanucs/users-crud",
    featured: false,
  },
  {
    slug: "criacao-branding-logos",
    title: "Criação de Branding e Logotipos",
    category: "UI/UX",
    focus: "design",
    description:
      "Identidades visuais completas com logotipos, paleta de cores e manual de marca para aplicação consistente.",
    impact:
      "Marcas com guia visual claro, aplicável em digital e impresso sem distorções.",
    context:
      "Marcas em formação precisam de mais do que um logo bonito — precisam de um sistema visual que funcione em site, redes sociais e materiais impressos. O desafio era criar identidades versáteis e fáceis de aplicar.",
    problem:
      "Sem regras de uso definidas, logos são distorcidos, cores variam entre canais e o reconhecimento da marca se perde.",
    process: [
      "Pesquisa de referências visuais do setor e definição de direção estética.",
      "Exploração de 3+ variações de logotipo antes de consolidar a versão final.",
      "Definição de paleta com valores HEX, RGB e CMYK para uso digital e impresso.",
      "Manual de marca com regras de área de respiro, versões e aplicações incorretas.",
    ],
    result:
      "Identidades visuais entregues com manual de uso, garantindo consistência em todos os pontos de contato da marca.",
    myRole:
      "Concepção visual, criação de logotipos, definição de paleta e tipografia, e documentação do manual de marca.",
    designDecisions: [
      "Logotipos versáteis com versão principal e simplificada para favicon e redes sociais.",
      "Paletas com contraste suficiente para acessibilidade em interfaces digitais.",
      "Tipografia institucional escolhida para legibilidade em títulos e corpo de texto.",
    ],
    image: "/assets/meuportf.png",
    images: [
      "/assets/meuportf.png",
      "/assets/flow1.png",
      "/assets/flow2.png",
      "/assets/mitica.png",
      "/assets/equali1.png",
    ],
    tags: ["Figma", "Canva", "Adobe Illustrator", "Photoshop"],
    featured: false,
  },
  {
    slug: "memorider-ui-ux",
    title: "MemoRider - UI/UX",
    category: "UI/UX",
    focus: "design",
    description:
      "Jogo corporativo gamificado para transformar treinamentos internos em uma experiência interativa e envolvente.",
    impact:
      "Conteúdo institucional denso reestruturado em fluxos lúdicos com progressão visual clara.",
    context:
      "MemoRider é um jogo corporativo que une tecnologia, aprendizado e diversão. O desafio de negócio era aumentar o engajamento em treinamentos internos que tradicionalmente têm baixa adesão.",
    problem:
      "Treinamentos corporativos em formato passivo geram abandono — colaboradores não completam os módulos porque a experiência não motiva nem recompensa o progresso.",
    process: [
      "Mapeamento de perfis de colaboradores (novo vs. veterano) para adaptar a complexidade dos fluxos.",
      "Priorização de onboarding curto para reduzir fricção na primeira interação.",
      "Gamificação do progresso com feedback visual imediato a cada etapa concluída.",
      "Protótipo de alta fidelidade no Figma com navegação testada entre telas principais.",
    ],
    result:
      "Protótipo completo com fluxos definidos para diferentes perfis, proposta visual coerente e estrutura de navegação validada para implementação.",
    myRole:
      "UI/UX: pesquisa de perfis, arquitetura de informação, definição da proposta visual e protótipo no Figma.",
    designDecisions: [
      "Onboarding em poucas telas para não sobrecarregar quem acessa pela primeira vez.",
      "Sistema de progresso visual que reforça conquistas e incentiva a continuidade.",
      "Hierarquia clara entre conteúdo educativo e elementos lúdicos sem competir pela atenção.",
    ],
    image: "/assets/memorider3.png",
    images: [
      "/assets/memorider3.png",
      "/assets/memorider2.png",
      "/assets/memorider1.png",
    ],
    tags: ["Figma"],
    featured: true,
  },
  {
    slug: "landing-pages-ui-ux",
    title: "Landing Pages - UI/UX",
    category: "Landing Page",
    focus: "hybrid",
    description:
      "Landing pages prototipadas no Figma com foco em conversão, hierarquia de informação e identidade visual da marca.",
    impact:
      "Estrutura de conversão reutilizável entre marcas distintas, com layout aprovado pelo cliente.",
    context:
      "Empresas como Equali e Nexystem precisavam de páginas institucionais que comunicassem valor rapidamente a visitantes que chegam sem contexto prévio. O desafio era converter atenção em interesse.",
    problem:
      "Sem uma landing page focada, visitantes não entendiam a proposta de valor nos primeiros segundos — e a inconsistência visual enfraquecia a credibilidade da marca.",
    process: [
      "Levantamento de requisitos com o cliente para definir mensagem principal e público-alvo.",
      "Wireframes com hierarquia clara: hero → benefícios → prova social → CTA.",
      "Aplicação do manual de marca com consistência tipográfica e cromática.",
      "Protótipos em alta fidelidade no Figma para validação antes da implementação.",
    ],
    result:
      "Layouts aprovados pelo cliente, com estrutura de conversão documentada e reutilizável em diferentes marcas mantendo identidade própria.",
    myRole:
      "UI/UX: requisitos com cliente, wireframes, protótipo de alta fidelidade e aplicação do manual de marca.",
    designDecisions: [
      "CTA visível acima da dobra com copy direto ao benefício principal.",
      "Hierarquia tipográfica que guia o olhar do visitante em menos de 5 segundos.",
      "Componentes reutilizáveis no Figma para acelerar variações entre marcas.",
    ],
    technicalHighlights: [
      "Estrutura de seções pensada para implementação responsiva em HTML/CSS.",
      "Componentes no Figma organizados com auto-layout para facilitar handoff.",
    ],
    image: "/assets/equali2.png",
    images: [
      "/assets/equali3.png",
      "/assets/equali1.png",
      "/assets/equali2.png",
      "/assets/nexystem-project.png",
      "/assets/nexys1.png",
      "/assets/nexys2.png",
      "/assets/nexys3.png",
    ],
    tags: ["Figma"],
    figmaUrl:
      "https://www.figma.com/design/ECMHxCmnFO0Q8pUmoxvhFD/Equali?node-id=9-2&t=l4wvx6SURd5BDj9e-1",
    featured: false,
  },
];

export function getProjectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug);
}
