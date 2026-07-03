import type { RoleKey } from "../data/pampatecMock";
import { mockUsers } from "../data/pampatecMock";

export const API_BASE_URL = "mock://pampatec-demo";

export const backendRoleToFrontend: Record<string, RoleKey> = {
  empreendedor: "empreendedor",
  gestor_administrativo: "gestor",
  avaliador_externo: "avaliador",
  comissao_tecnica: "comissao",
  professor_pesquisador: "pesquisador",
  administrador_sistema: "admin",
};

export const frontendRoleToBackend: Record<RoleKey, string> = {
  empreendedor: "empreendedor",
  gestor: "gestor_administrativo",
  avaliador: "avaliador_externo",
  comissao: "comissao_tecnica",
  pesquisador: "professor_pesquisador",
  admin: "administrador_sistema",
};

function wait<T>(value: T, ms = 180): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), ms));
}

function now() {
  return new Date().toISOString();
}

export function getToken() {
  return localStorage.getItem("pampatec.token") ?? "";
}

export function saveSession(payload: { access_token: string; user?: unknown; active_role?: string; roles?: string[] }) {
  localStorage.setItem("pampatec.token", payload.access_token);
  localStorage.setItem("pampatec.session", JSON.stringify(payload));
}

export async function loginWithBackend(email: string, password: string, role?: RoleKey) {
  const user = mockUsers.find((item) => item.email === email && item.password === password);
  if (!user) throw new Error("Credenciais inválidas para a demonstração.");
  if (!user.active) throw new Error("Usuário inativo na demonstração.");
  const activeRole = role ?? user.roles[0];
  if (!user.roles.includes(activeRole)) throw new Error("Este perfil não está disponível para o usuário selecionado.");
  return wait({
    access_token: `demo-token-${activeRole}`,
    active_role: activeRole,
    roles: user.roles,
    demo: true,
    user: {
      email: user.email,
      full_name: user.email.split("@")[0],
      active_role: activeRole,
      roles: user.roles,
      is_active: true,
    },
  });
}

export type EditalApi = {
  id: string;
  titulo: string;
  modalidade: string;
  status: string;
  versao: number;
  abertura: string | null;
  encerramento: string | null;
  prazo_recurso_dias: number;
  criterios: unknown[];
  documentos_exigidos: unknown[];
};

export type ProposalApi = {
  id: string;
  edital_id: string;
  edital_versao: number;
  responsavel_id: string;
  titulo: string;
  resumo: string;
  protocolo: string | null;
  estado: string;
  created_at: string;
  updated_at: string;
  historico: Array<{ estado_anterior: string | null; estado_novo: string; justificativa: string | null; criado_em: string }>;
};

export type DocumentRequirementApi = {
  documento_exigido: { id: string; nome: string; obrigatorio: boolean };
  documento: {
    id: string;
    proposal_id: string;
    documento_exigido_id: string;
    status: "pendente" | "aceito" | "recusado";
    versions: Array<{ id: string; numero: number; storage_path: string; enviado_por_id: string; enviado_em: string; justificativa_recusa?: string | null }>;
  } | null;
  status: string;
  versao_atual: number;
  justificativa_recusa?: string | null;
};

export type EvaluatorUserApi = { id: string; email: string; full_name: string };
export type CriterionApi = { id: string; nome: string; descricao: string; escala_min: number; escala_max: number; peso: number; justificativa_obrigatoria: boolean };
export type EvaluationScoreApi = { criterio_id: string; nota: number; justificativa?: string | null };
export type EvaluationApi = {
  id: string;
  proposal_id: string;
  avaliador_id: string;
  etapa: string;
  status: string;
  parecer_geral?: string | null;
  pontuacao_total?: number | null;
  scores: EvaluationScoreApi[];
  created_at: string;
  updated_at: string;
};
export type AssignedProposalApi = {
  proposal_id: string;
  titulo: string;
  protocolo?: string | null;
  estado: string;
  edital_titulo: string;
  criterios: CriterionApi[];
  evaluation?: EvaluationApi | null;
};
export type EvaluationSummaryApi = {
  proposal_id: string;
  titulo: string;
  protocolo?: string | null;
  estado: string;
  criterios: CriterionApi[];
  assignments: Array<{ id: string; proposal_id: string; avaliador_id: string; atribuida_por_id: string; ativa: boolean }>;
  evaluations: EvaluationApi[];
};
export type ComplementationApi = {
  id: string;
  proposal_id: string;
  descricao: string;
  prazo?: string | null;
  status: string;
  resposta?: string | null;
  created_at: string;
  updated_at: string;
};
export type DeliberationApi = {
  id: string;
  proposal_id: string;
  aprovada: boolean;
  justificativa: string;
  pontuacao_consolidada?: number | null;
  registrada_por_id: string;
  created_at: string;
  updated_at: string;
};
export type CommitteeProposalApi = {
  proposal_id: string;
  titulo: string;
  protocolo?: string | null;
  estado: string;
  criterios: CriterionApi[];
  evaluations: EvaluationApi[];
  complementations: ComplementationApi[];
  deliberation?: DeliberationApi | null;
};

const criterios: CriterionApi[] = [
  { id: "crit-inovacao", nome: "Inovação", descricao: "Grau de originalidade e diferencial tecnológico.", escala_min: 0, escala_max: 10, peso: 3, justificativa_obrigatoria: true },
  { id: "crit-tecnica", nome: "Viabilidade técnica", descricao: "Condições técnicas para desenvolvimento e implantação.", escala_min: 0, escala_max: 10, peso: 2, justificativa_obrigatoria: true },
  { id: "crit-mercado", nome: "Potencial de mercado", descricao: "Clareza do problema, público-alvo e oportunidade comercial.", escala_min: 0, escala_max: 10, peso: 2, justificativa_obrigatoria: true },
  { id: "crit-impacto", nome: "Impacto regional", descricao: "Contribuição para o ecossistema local de inovação.", escala_min: 0, escala_max: 10, peso: 2, justificativa_obrigatoria: true },
];

let editais: EditalApi[] = [
  {
    id: "EDITAL-2026-01",
    titulo: "Edital de Incubação PampaTec 2026/1",
    modalidade: "fluxo_continuo",
    status: "publicado",
    versao: 1,
    abertura: "2026-08-01T00:00:00",
    encerramento: "2026-11-30T23:59:00",
    prazo_recurso_dias: 5,
    criterios,
    documentos_exigidos: [
      { id: "doc-plano", nome: "Plano de negócio", obrigatorio: true },
      { id: "doc-juridico", nome: "Documento jurídico", obrigatorio: true },
      { id: "doc-curriculo", nome: "Currículo dos responsáveis", obrigatorio: true },
      { id: "doc-declaracao", nome: "Declaração de responsabilidade", obrigatorio: true },
    ],
  },
];

let proposals: ProposalApi[] = [
  makeProposal("PROP-010", "PMP-2026-0010", "AgroSense Pampa", "em_triagem", "Sistema IoT para monitoramento em tempo real de variáveis do solo para agricultura de precisão no bioma Pampa."),
  makeProposal("PROP-020", "PMP-2026-0020", "Campo Limpo Circular", "aguardando_ajuste", "Solução para rastreabilidade e reaproveitamento de resíduos rurais.", "Ajustar o resumo executivo e complementar dados dos responsáveis."),
  makeProposal("PROP-030", "PMP-2026-0030", "BioSolo Analytics", "aguardando_documentacao_formal", "Análise microbiológica de solo para apoio à decisão agronômica."),
  makeProposal("PROP-040", "PMP-2026-0040", "EcoPlast Pampa", "apta_para_avaliacao_tecnica", "Reaproveitamento de polímeros para aplicações produtivas regionais."),
  makeProposal("PROP-050", "PMP-2026-0050", "HealthTrack Rural", "em_avaliacao", "Acompanhamento remoto de indicadores básicos de saúde em comunidades rurais."),
  makeProposal("PROP-060", "PMP-2026-0060", "PampaFoods Lab", "aguardando_apresentacao", "Alimentos funcionais com cadeia produtiva regional.", "Pitch agendado para a próxima rodada de avaliação."),
  makeProposal("PROP-070", "PMP-2026-0070", "EducaTec Fronteira", "em_deliberacao", "Plataforma educacional para formação tecnológica aplicada."),
  makeProposal("PROP-080", "PMP-2026-0080", "LogPampa", "resultado_preliminar_publicado", "Sistema para otimização logística em pequenos negócios."),
  makeProposal("PROP-090", "PMP-2026-0090", "AquaPampa Sensores", "em_recurso", "Monitoramento de qualidade da água em propriedades rurais.", "Recurso recebido dentro do prazo previsto no edital."),
  makeProposal("PROP-100", "PMP-2026-0100", "InovaLã", "convocada", "Novo processo para beneficiamento de lã e agregação de valor regional.", "Proposta aprovada e convocada para próxima etapa institucional."),
];

function makeProposal(id: string, protocolo: string, titulo: string, estado: string, resumo: string, justificativa: string | null = null): ProposalApi {
  return {
    id,
    edital_id: "EDITAL-2026-01",
    edital_versao: 1,
    responsavel_id: "USR-EMP-001",
    titulo,
    resumo,
    protocolo,
    estado,
    created_at: "2026-06-28T09:00:00",
    updated_at: now(),
    historico: [
      { estado_anterior: null, estado_novo: "manifestacao_submetida", justificativa: null, criado_em: "2026-06-28T09:00:00" },
      { estado_anterior: "manifestacao_submetida", estado_novo: estado, justificativa, criado_em: now() },
    ],
  };
}

let documentsByProposal: Record<string, DocumentRequirementApi[]> = {};
function docsFor(proposalId: string): DocumentRequirementApi[] {
  if (!documentsByProposal[proposalId]) {
    documentsByProposal[proposalId] = (editais[0].documentos_exigidos as Array<{ id: string; nome: string; obrigatorio: boolean }>).map((doc, index) => ({
      documento_exigido: doc,
      documento: index < 2 ? {
        id: `${proposalId}-${doc.id}`,
        proposal_id: proposalId,
        documento_exigido_id: doc.id,
        status: proposalId === "PROP-030" && index === 1 ? "pendente" : "aceito",
        versions: [{ id: `${proposalId}-${doc.id}-v1`, numero: 1, storage_path: `${doc.nome}.pdf`, enviado_por_id: "USR-EMP-001", enviado_em: now() }],
      } : null,
      status: index < 2 ? (proposalId === "PROP-030" && index === 1 ? "pendente" : "aceito") : "não enviado",
      versao_atual: index < 2 ? 1 : 0,
      justificativa_recusa: proposalId === "PROP-030" && index === 1 ? "Arquivo ilegível. Reenviar versão atualizada." : null,
    }));
  }
  return documentsByProposal[proposalId];
}

const avaliadores: EvaluatorUserApi[] = [
  { id: "AV-001", email: "avaliador1@pampatec.com.br", full_name: "Avaliador 1" },
  { id: "AV-002", email: "avaliador2@pampatec.com.br", full_name: "Avaliador 2" },
  { id: "AV-003", email: "avaliador3@pampatec.com.br", full_name: "Avaliador 3" },
];

let evaluationsByProposal: Record<string, EvaluationApi[]> = {
  "PROP-050": [makeEval("PROP-050", "AV-001", "rascunho", [8, 7, 7, 8], "Boa aderência ao edital, com ajustes pendentes na estratégia de implantação.")],
  "PROP-070": [
    makeEval("PROP-070", "AV-001", "concluida", [9, 8, 7, 8], "Proposta consistente e aderente ao ecossistema regional."),
    makeEval("PROP-070", "AV-002", "concluida", [6, 7, 6, 7], "Há potencial, mas o modelo de sustentação exige esclarecimentos."),
    makeEval("PROP-070", "AV-003", "rascunho", [7, 7, 6, 8], "Parecer em elaboração."),
  ],
  "PROP-080": [
    makeEval("PROP-080", "AV-001", "concluida", [8, 8, 8, 7], "Classificável para resultado preliminar."),
    makeEval("PROP-080", "AV-002", "concluida", [7, 7, 8, 7], "Boa viabilidade e clareza de mercado."),
  ],
};

function makeEval(proposalId: string, avaliadorId: string, status: string, notas: number[], parecer: string): EvaluationApi {
  const scores = criterios.map((criterio, index) => ({ criterio_id: criterio.id, nota: notas[index], justificativa: `Nota atribuída ao critério ${criterio.nome}.` }));
  const total = scores.reduce((sum, score) => sum + score.nota, 0) / scores.length;
  return {
    id: `${proposalId}-${avaliadorId}`,
    proposal_id: proposalId,
    avaliador_id: avaliadorId,
    etapa: "avaliacao_tecnica",
    status,
    parecer_geral: parecer,
    pontuacao_total: Number(total.toFixed(1)),
    scores,
    created_at: now(),
    updated_at: now(),
  };
}

let complementationsByProposal: Record<string, ComplementationApi[]> = {
  "PROP-070": [{ id: "COMP-070-1", proposal_id: "PROP-070", descricao: "Apresentar evidências adicionais sobre equipe técnica e cronograma de entrega.", prazo: "5 dias úteis", status: "respondida", resposta: "Cronograma e composição da equipe complementados para deliberação.", created_at: now(), updated_at: now() }],
};
let deliberationsByProposal: Record<string, DeliberationApi> = {};

export async function apiFetch<T>(path: string, options: RequestInit = {}): Promise<T> {
  if (path === "/editais" && options.method === "POST") {
    const payload = JSON.parse(String(options.body ?? "{}"));
    const edital: EditalApi = { id: `EDITAL-${Date.now()}`, titulo: payload.titulo, modalidade: payload.modalidade, status: "rascunho", versao: 1, abertura: payload.abertura, encerramento: payload.encerramento, prazo_recurso_dias: payload.prazo_recurso_dias ?? 5, criterios: payload.criterios ?? criterios, documentos_exigidos: payload.documentos_exigidos ?? [] };
    editais = [edital, ...editais];
    return wait(edital as T);
  }
  if (path.startsWith("/editais/") && path.endsWith("/publish")) {
    const id = path.split("/")[2];
    const edital = editais.find((item) => item.id === id) ?? editais[0];
    edital.status = "publicado";
    return wait(edital as T);
  }
  throw new Error("Operação simulada não mapeada no protótipo.");
}

export async function listPublishedEditais() {
  return wait(editais.filter((edital) => edital.status === "publicado"));
}

export async function createProposal(payload: { edital_id: string; titulo: string; resumo: string }) {
  const next = proposals.length + 1;
  const proposal = makeProposal(`PROP-${String(100 + next).padStart(3, "0")}`, `PMP-2026-${String(100 + next).padStart(4, "0")}`, payload.titulo, "em_triagem", payload.resumo);
  proposals = [proposal, ...proposals];
  return wait(proposal);
}

export async function listMyProposals() {
  return wait(proposals.filter((p) => ["PROP-010", "PROP-020", "PROP-030", "PROP-080", "PROP-090", "PROP-100"].includes(p.id) || p.id.startsWith("PROP-1")));
}

export async function listAllProposals() {
  return wait([...proposals]);
}

export async function triageProposal(id: string, payload: { action: "aprovar" | "solicitar_ajuste" | "indeferir"; justificativa?: string }) {
  const proposal = proposals.find((p) => p.id === id);
  if (!proposal) throw new Error("Proposta não encontrada na demonstração.");
  const old = proposal.estado;
  proposal.estado = payload.action === "aprovar" ? "aguardando_documentacao_formal" : payload.action === "solicitar_ajuste" ? "aguardando_ajuste" : "reprovada";
  proposal.updated_at = now();
  proposal.historico.push({ estado_anterior: old, estado_novo: proposal.estado, justificativa: payload.justificativa ?? null, criado_em: now() });
  return wait(proposal);
}

export async function uploadProposalDocument(proposalId: string, requiredDocumentId: string, file: File) {
  const docs = docsFor(proposalId);
  const item = docs.find((doc) => doc.documento_exigido.id === requiredDocumentId);
  if (!item) throw new Error("Documento não encontrado.");
  item.documento = { id: `${proposalId}-${requiredDocumentId}`, proposal_id: proposalId, documento_exigido_id: requiredDocumentId, status: "pendente", versions: [{ id: `${proposalId}-${requiredDocumentId}-v${Date.now()}`, numero: (item.versao_atual || 0) + 1, storage_path: file.name, enviado_por_id: "USR-EMP-001", enviado_em: now() }] };
  item.status = "pendente";
  item.versao_atual += 1;
  return wait(item);
}

export async function listProposalDocuments(proposalId: string) {
  return wait(docsFor(proposalId));
}

export async function reviewProposalDocument(proposalId: string, documentId: string, payload: { action: "aceitar" | "marcar_pendente" | "recusar"; justificativa?: string }) {
  const docs = docsFor(proposalId);
  const item = docs.find((doc) => doc.documento?.id === documentId || doc.documento_exigido.id === documentId);
  if (!item || !item.documento) throw new Error("Documento não encontrado para validação.");
  item.documento.status = payload.action === "aceitar" ? "aceito" : payload.action === "recusar" ? "recusado" : "pendente";
  item.status = item.documento.status;
  item.justificativa_recusa = payload.justificativa ?? null;
  return wait(item);
}

export async function listEvaluators() {
  return wait(avaliadores);
}

export async function assignEvaluators(proposalId: string, evaluatorIds: string[]) {
  const proposal = proposals.find((p) => p.id === proposalId);
  if (proposal) proposal.estado = "em_avaliacao";
  evaluationsByProposal[proposalId] = evaluatorIds.map((id) => makeEval(proposalId, id, "rascunho", [0, 0, 0, 0], ""));
  return wait({ proposal_id: proposalId, avaliador_ids: evaluatorIds });
}

export async function listEvaluationSummary() {
  return wait(proposals.map((proposal) => ({
    proposal_id: proposal.id,
    titulo: proposal.titulo,
    protocolo: proposal.protocolo,
    estado: proposal.estado,
    criterios,
    assignments: (evaluationsByProposal[proposal.id] ?? []).map((evaluation) => ({ id: `ASS-${evaluation.id}`, proposal_id: proposal.id, avaliador_id: evaluation.avaliador_id, atribuida_por_id: "USR-GESTOR", ativa: true })),
    evaluations: evaluationsByProposal[proposal.id] ?? [],
  })));
}

export async function listAssignedEvaluations() {
  const assigned = proposals.filter((proposal) => ["em_avaliacao", "em_deliberacao", "resultado_preliminar_publicado"].includes(proposal.estado));
  return wait(assigned.map((proposal) => ({
    proposal_id: proposal.id,
    titulo: proposal.titulo,
    protocolo: proposal.protocolo,
    estado: proposal.estado,
    edital_titulo: editais[0].titulo,
    criterios,
    evaluation: (evaluationsByProposal[proposal.id] ?? [])[0] ?? null,
  })));
}

function updateEvaluation(proposalId: string, payload: { parecer_geral?: string; scores: EvaluationScoreApi[] }, status: string) {
  const scores = payload.scores;
  const total = scores.length ? scores.reduce((sum, score) => sum + Number(score.nota || 0), 0) / scores.length : 0;
  const evaluation: EvaluationApi = {
    id: `${proposalId}-AV-001`,
    proposal_id: proposalId,
    avaliador_id: "AV-001",
    etapa: "avaliacao_tecnica",
    status,
    parecer_geral: payload.parecer_geral ?? "",
    pontuacao_total: Number(total.toFixed(1)),
    scores,
    created_at: now(),
    updated_at: now(),
  };
  const current = evaluationsByProposal[proposalId] ?? [];
  evaluationsByProposal[proposalId] = [evaluation, ...current.filter((item) => item.avaliador_id !== "AV-001")];
  return evaluation;
}

export async function saveEvaluationDraft(proposalId: string, payload: { parecer_geral?: string; scores: EvaluationScoreApi[] }) {
  return wait(updateEvaluation(proposalId, payload, "rascunho"));
}

export async function submitEvaluation(proposalId: string, payload: { parecer_geral?: string; scores: EvaluationScoreApi[] }) {
  return wait(updateEvaluation(proposalId, payload, "concluida"));
}

export async function listCommitteeQueue() {
  const queue = proposals.filter((proposal) => ["em_deliberacao", "resultado_preliminar_publicado", "em_recurso", "aguardando_apresentacao"].includes(proposal.estado));
  return wait(queue.map((proposal) => ({
    proposal_id: proposal.id,
    titulo: proposal.titulo,
    protocolo: proposal.protocolo,
    estado: proposal.estado,
    criterios,
    evaluations: evaluationsByProposal[proposal.id] ?? [],
    complementations: complementationsByProposal[proposal.id] ?? [],
    deliberation: deliberationsByProposal[proposal.id] ?? null,
  })));
}

export async function requestComplementation(proposalId: string, payload: { descricao: string; prazo?: string }) {
  const item: ComplementationApi = { id: `COMP-${Date.now()}`, proposal_id: proposalId, descricao: payload.descricao, prazo: payload.prazo ?? null, status: "pendente", resposta: null, created_at: now(), updated_at: now() };
  complementationsByProposal[proposalId] = [item, ...(complementationsByProposal[proposalId] ?? [])];
  return wait(item);
}

export async function answerComplementation(proposalId: string, complementationId: string, resposta: string) {
  const item = (complementationsByProposal[proposalId] ?? []).find((comp) => comp.id === complementationId);
  if (!item) throw new Error("Solicitação não encontrada.");
  item.status = "respondida";
  item.resposta = resposta;
  item.updated_at = now();
  return wait(item);
}

export async function registerDeliberation(proposalId: string, payload: { aprovada: boolean; justificativa: string }) {
  const evaluations = evaluationsByProposal[proposalId] ?? [];
  const concluded = evaluations.filter((item) => item.status === "concluida");
  const score = concluded.length ? concluded.reduce((sum, item) => sum + Number(item.pontuacao_total ?? 0), 0) / concluded.length : null;
  const deliberation: DeliberationApi = { id: `DELIB-${Date.now()}`, proposal_id: proposalId, aprovada: payload.aprovada, justificativa: payload.justificativa, pontuacao_consolidada: score ? Number(score.toFixed(1)) : null, registrada_por_id: "USR-COMISSAO", created_at: now(), updated_at: now() };
  deliberationsByProposal[proposalId] = deliberation;
  const proposal = proposals.find((p) => p.id === proposalId);
  if (proposal) proposal.estado = "resultado_preliminar_publicado";
  return wait(deliberation);
}

export async function listMyComplementations() {
  const items = await listCommitteeQueue();
  return items.filter((item) => item.complementations.length > 0);
}

export function getSessionRole(): string {
  try {
    const session = JSON.parse(localStorage.getItem("pampatec.session") || "{}");
    return session.active_role || "";
  } catch {
    return "";
  }
}

export function statusLabel(estado: string) {
  const labels: Record<string, string> = {
    em_preenchimento: "Em preenchimento",
    manifestacao_submetida: "Manifestação submetida",
    em_triagem: "Em triagem",
    aguardando_ajuste: "Ajustes solicitados",
    aguardando_documentacao_formal: "Documentação",
    aguardando_regularizacao_documental: "Documentação pendente",
    apta_para_avaliacao_tecnica: "Apta para avaliação",
    em_avaliacao: "Avaliação técnica",
    aguardando_complementacao: "Complementação solicitada",
    pre_classificada: "Pré-classificada",
    aguardando_apresentacao: "Pitch",
    em_deliberacao: "Deliberação da comissão",
    resultado_preliminar_publicado: "Resultado preliminar",
    em_recurso: "Recurso",
    aprovada: "Aprovada",
    reprovada: "Reprovada",
    homologada: "Resultado final",
    convocada: "Convocada",
    encerrada: "Encerrada",
  };
  return labels[estado] ?? estado;
}

export function statusVariant(estado: string): "success" | "warning" | "danger" | "default" {
  if (["aprovada", "homologada", "convocada", "apta_para_avaliacao_tecnica", "resultado_preliminar_publicado"].includes(estado)) return "success";
  if (["aguardando_ajuste", "aguardando_regularizacao_documental", "aguardando_complementacao", "em_recurso", "aguardando_documentacao_formal", "aguardando_apresentacao"].includes(estado)) return "warning";
  if (["reprovada", "encerrada"].includes(estado)) return "danger";
  return "default";
}
