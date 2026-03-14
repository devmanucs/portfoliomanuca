export type Project = {
  slug: string;
  title: string;
  category: string;
  description: string;
  detailedDescription: string;
  image: string;
  images: string[];
  tags: string[];
  liveUrl?: string;
  githubUrl?: string;
  figmaUrl?: string;
  featured: boolean;
};

export const projects: Project[] = [
  {
    slug: "dashboard-analytics",
    title: "Dashboard de Monitoramento de Queimadas",
    category: "Dashboard",
    description:
      "Dashboard de Big Data para monitorar focos de queimadas no Brasil, com análise geoespacial e temporal baseada em dados do INPE.",
    detailedDescription:
      "O projeto aplica Python em um cenário real, com etapas de ETL, processamento de dados com Pandas e análise exploratória (EDA). Os resultados são apresentados em visualizações interativas no Streamlit para facilitar a tomada de decisão.",
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
    description:
      "Aplicação em Next.js com gestão completa de usuários (CRUD), autenticação e interface responsiva.",
    detailedDescription:
      "Projeto full stack orientado a boas práticas de desenvolvimento. Inclui operações de criação, leitura, atualização e remoção de usuários, além de integração com API e organização de componentes para escalar o produto.",
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
    description:
      "Desenvolvimento de logotipos e manuais de identidade visual que combinam estética, consistência e aplicação prática.",
    detailedDescription:
      "O processo inclui criação de logotipos versáteis, definição de paleta de cores (HEX, RGB e CMYK), tipografia institucional e regras de uso. O objetivo é garantir unidade visual da marca em diferentes canais, evitando distorções e fortalecendo reconhecimento.",
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
    description:
      "MemoRider é um jogo corporativo criado para unir tecnologia, aprendizado e diversão em uma experiência interativa.",
    detailedDescription:
      "Projeto de UX com foco em aprendizado gamificado. Inclui definição da proposta visual, estrutura de navegação e fluxos de uso para diferentes perfis de colaboradores no contexto corporativo.",
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
    description:
      "Prototipação de landing pages no Figma com manual de marca e aplicação das principais estéticas da empresa em wireframes.",
    detailedDescription:
      "Estudo de design orientado à conversão, com levantamento de requisitos junto ao cliente. O trabalho combina consistência visual, hierarquia de informação e validação de layouts em alta fidelidade para landing pages institucionais.",
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
