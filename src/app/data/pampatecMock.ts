export type RoleKey = "empreendedor" | "gestor" | "avaliador" | "comissao" | "pesquisador" | "admin";

export const roleLabels: Record<RoleKey, string> = {
  empreendedor: "Empreendedor",
  gestor: "Gestor Administrativo",
  avaliador: "Avaliador Externo",
  comissao: "Comissão Técnica",
  pesquisador: "Professor/Pesquisador",
  admin: "Administrador do Sistema",
};

export const mockUsers = [
  { email: "empreendedor@pampatec.com.br", password: "Senha@123", roles: ["empreendedor"] as RoleKey[], active: true },
  { email: "gestor@pampatec.com.br", password: "Senha@123", roles: ["gestor"] as RoleKey[], active: true },
  { email: "avaliador@pampatec.com.br", password: "Senha@123", roles: ["avaliador"] as RoleKey[], active: true },
  { email: "comissao@pampatec.com.br", password: "Senha@123", roles: ["comissao"] as RoleKey[], active: true },
  { email: "pesquisador@pampatec.com.br", password: "Senha@123", roles: ["pesquisador"] as RoleKey[], active: true },
  { email: "admin@pampatec.com.br", password: "Senha@123", roles: ["admin"] as RoleKey[], active: true },
  { email: "multi@pampatec.com.br", password: "Senha@123", roles: ["avaliador", "pesquisador"] as RoleKey[], active: true },
  { email: "inativo@pampatec.com.br", password: "Senha@123", roles: ["empreendedor"] as RoleKey[], active: false },
];

export const roleHome: Record<RoleKey, string> = {
  empreendedor: "/empreendedor",
  gestor: "/gestor",
  avaliador: "/avaliador",
  comissao: "/comissao",
  pesquisador: "/pesquisador",
  admin: "/admin",
};

export const officialStages = [
  "Manifestação de interesse",
  "Triagem preliminar",
  "Documentação formal",
  "Avaliação técnica",
  "Pitch",
  "Consolidação e deliberação",
  "Resultado preliminar",
  "Recurso",
  "Resultado final",
  "Convocação",
];

export const proposals = [
  {
    id: "PROP-050",
    name: "AgroSense Pampa",
    entrepreneur: "Maria Lopes",
    segment: "AgTech",
    status: "Aguardando regularização documental",
    protocol: "PMP-2026-0047",
    deadline: "15/07/2026",
    currentStage: 2,
    nextAction: "Reenviar certidão municipal legível e confirmar dados dos sócios.",
  },
  {
    id: "PROP-060",
    name: "BioSolo Analytics",
    entrepreneur: "Rafael Nunes",
    segment: "Biotecnologia",
    status: "Em avaliação",
    protocol: "PMP-2026-0060",
    deadline: "22/07/2026",
    currentStage: 3,
    nextAction: "Aguardando conclusão das avaliações externas.",
  },
  {
    id: "PROP-090",
    name: "EcoPlast Pampa",
    entrepreneur: "Larissa Prado",
    segment: "Sustentabilidade",
    status: "Em deliberação",
    protocol: "PMP-2026-0090",
    deadline: "25/07/2026",
    currentStage: 5,
    nextAction: "Comissão deve registrar deliberação fundamentada.",
  },
];

export const editalDraft = {
  title: "Edital de Incubação PampaTec 2026/1",
  mode: "Fluxo contínuo",
  status: "Rascunho",
  dates: "01/08/2026 a 30/11/2026",
  requiredDocuments: ["Plano de negócio", "Documento jurídico", "Currículo dos responsáveis", "Declaração de responsabilidade"],
  criteria: ["Inovação tecnológica", "Viabilidade técnica", "Viabilidade mercadológica", "Impacto regional", "Interação universidade-empresa"],
  appealDeadline: "5 dias corridos após resultado preliminar",
};

export const auditEvents = [
  { when: "28/06/2026 09:10", user: "gestor@pampatec.com.br", action: "Publicação de edital", object: "EDITAL-2026-01" },
  { when: "28/06/2026 09:35", user: "empreendedor@pampatec.com.br", action: "Submissão de manifestação", object: "PROP-050" },
  { when: "28/06/2026 10:20", user: "gestor@pampatec.com.br", action: "Pendência documental registrada", object: "PROP-050" },
  { when: "28/06/2026 11:05", user: "avaliador@pampatec.com.br", action: "Rascunho de avaliação salvo", object: "PROP-060" },
];

export const evaluations = [
  { evaluator: "AV-001", innovation: 9, technical: 8, market: 7, impact: 8, average: 8.0, status: "Concluída" },
  { evaluator: "AV-002", innovation: 4, technical: 7, market: 6, impact: 7, average: 6.0, status: "Concluída" },
  { evaluator: "AV-003", innovation: 0, technical: 0, market: 0, impact: 0, average: 0, status: "Pendente" },
];

export const statusVariant = (status: string) => {
  const s = status.toLowerCase();
  if (s.includes("aprov") || s.includes("aceit") || s.includes("conclu") || s.includes("publicado") || s.includes("homolog")) return "success" as const;
  if (s.includes("pend") || s.includes("aguard") || s.includes("recurso") || s.includes("rascunho")) return "warning" as const;
  if (s.includes("indefer") || s.includes("reprov") || s.includes("recus") || s.includes("negado")) return "danger" as const;
  if (s.includes("avalia") || s.includes("triagem") || s.includes("delib")) return "info" as const;
  return "default" as const;
};
