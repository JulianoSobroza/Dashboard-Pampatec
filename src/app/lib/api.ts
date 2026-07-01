import type { RoleKey } from "../data/pampatecMock";

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8000";

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

export function getToken() {
  return localStorage.getItem("pampatec.token") ?? "";
}

export function saveSession(payload: { access_token: string; user?: unknown; active_role?: string; roles?: string[] }) {
  localStorage.setItem("pampatec.token", payload.access_token);
  localStorage.setItem("pampatec.session", JSON.stringify(payload));
}

export async function loginWithBackend(email: string, password: string, role?: RoleKey) {
  const response = await fetch(`${API_BASE_URL}/auth/login-json`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password, role: role ? frontendRoleToBackend[role] : undefined }),
  });
  if (!response.ok) {
    const detail = await response.json().catch(() => ({}));
    throw new Error(detail.detail || "Falha ao autenticar no backend.");
  }
  return response.json();
}

export async function apiFetch<T>(path: string, options: RequestInit = {}): Promise<T> {
  const token = getToken();
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers || {}),
    },
  });
  if (!response.ok) {
    const detail = await response.json().catch(() => ({}));
    throw new Error(detail.detail || `Erro HTTP ${response.status}`);
  }
  return response.json();
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

export async function listPublishedEditais() {
  return apiFetch<EditalApi[]>("/editais/publicados");
}

export async function createProposal(payload: { edital_id: string; titulo: string; resumo: string }) {
  return apiFetch<ProposalApi>("/proposals", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function listMyProposals() {
  return apiFetch<ProposalApi[]>("/proposals/minhas");
}

export async function listAllProposals() {
  return apiFetch<ProposalApi[]>("/proposals");
}

export async function triageProposal(id: string, payload: { action: "aprovar" | "solicitar_ajuste" | "indeferir"; justificativa?: string }) {
  return apiFetch<ProposalApi>(`/proposals/${id}/triage`, {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function statusLabel(estado: string) {
  const labels: Record<string, string> = {
    em_preenchimento: "Em preenchimento",
    manifestacao_submetida: "Manifestação submetida",
    em_triagem: "Em triagem",
    aguardando_ajuste: "Aguardando ajuste",
    aguardando_documentacao_formal: "Aguardando documentação formal",
    aguardando_regularizacao_documental: "Aguardando regularização documental",
    apta_para_avaliacao_tecnica: "Apta para avaliação técnica",
    em_avaliacao: "Em avaliação",
    aguardando_complementacao: "Aguardando complementação",
    pre_classificada: "Pré-classificada",
    aguardando_apresentacao: "Aguardando apresentação",
    em_deliberacao: "Em deliberação",
    resultado_preliminar_publicado: "Resultado preliminar publicado",
    em_recurso: "Em recurso",
    aprovada: "Aprovada",
    reprovada: "Reprovada",
    homologada: "Homologada",
    convocada: "Convocada",
    encerrada: "Encerrada",
  };
  return labels[estado] ?? estado;
}

export function statusVariant(estado: string): "success" | "warning" | "danger" | "default" {
  if (["aprovada", "homologada", "convocada", "apta_para_avaliacao_tecnica", "aguardando_documentacao_formal"].includes(estado)) return "success";
  if (["aguardando_ajuste", "aguardando_regularizacao_documental", "aguardando_complementacao", "em_recurso"].includes(estado)) return "warning";
  if (["reprovada", "encerrada"].includes(estado)) return "danger";
  return "default";
}

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

export function getSessionRole(): string {
  try {
    const session = JSON.parse(localStorage.getItem("pampatec.session") || "{}");
    return session.active_role || "";
  } catch {
    return "";
  }
}

export async function uploadProposalDocument(proposalId: string, requiredDocumentId: string, file: File) {
  const token = getToken();
  const formData = new FormData();
  formData.append("file", file);
  const response = await fetch(`${API_BASE_URL}/proposals/${proposalId}/documents/${requiredDocumentId}/upload`, {
    method: "POST",
    headers: {
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: formData,
  });
  if (!response.ok) {
    const detail = await response.json().catch(() => ({}));
    throw new Error(detail.detail || `Erro HTTP ${response.status}`);
  }
  return response.json();
}

export async function listProposalDocuments(proposalId: string) {
  return apiFetch<DocumentRequirementApi[]>(`/proposals/${proposalId}/documents`);
}

export async function reviewProposalDocument(
  proposalId: string,
  documentId: string,
  payload: { action: "aceitar" | "marcar_pendente" | "recusar"; justificativa?: string }
) {
  return apiFetch(`/proposals/${proposalId}/documents/${documentId}/review`, {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

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

export async function listEvaluators() {
  return apiFetch<EvaluatorUserApi[]>("/evaluations/evaluators");
}

export async function assignEvaluators(proposalId: string, evaluatorIds: string[]) {
  return apiFetch(`/evaluations/assign/${proposalId}`, {
    method: "POST",
    body: JSON.stringify({ avaliador_ids: evaluatorIds }),
  });
}

export async function listEvaluationSummary() {
  return apiFetch<EvaluationSummaryApi[]>("/evaluations/summary");
}

export async function listAssignedEvaluations() {
  return apiFetch<AssignedProposalApi[]>("/evaluations/assigned");
}

export async function saveEvaluationDraft(proposalId: string, payload: { parecer_geral?: string; scores: EvaluationScoreApi[] }) {
  return apiFetch<EvaluationApi>(`/evaluations/${proposalId}/draft`, {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function submitEvaluation(proposalId: string, payload: { parecer_geral?: string; scores: EvaluationScoreApi[] }) {
  return apiFetch<EvaluationApi>(`/evaluations/${proposalId}/submit`, {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

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

export async function listCommitteeQueue() {
  return apiFetch<CommitteeProposalApi[]>("/committee/queue");
}

export async function requestComplementation(proposalId: string, payload: { descricao: string; prazo?: string }) {
  return apiFetch<ComplementationApi>(`/committee/${proposalId}/complementation`, {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function answerComplementation(proposalId: string, complementationId: string, resposta: string) {
  return apiFetch<ComplementationApi>(`/committee/${proposalId}/complementation/${complementationId}/answer`, {
    method: "POST",
    body: JSON.stringify({ resposta }),
  });
}

export async function registerDeliberation(proposalId: string, payload: { aprovada: boolean; justificativa: string }) {
  return apiFetch<DeliberationApi>(`/committee/${proposalId}/deliberation`, {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function listMyComplementations() {
  return apiFetch<CommitteeProposalApi[]>("/committee/my-complementations");
}
