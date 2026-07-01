import { useEffect, useMemo, useState } from "react";
import { Header } from "../components/Header";
import { StatusBadge } from "../components/StatusBadge";
import { PrototypeNote } from "../components/PrototypeNote";
import { Upload, FileText, CheckCircle, XCircle, Clock, History, AlertTriangle } from "lucide-react";
import {
  DocumentRequirementApi,
  getSessionRole,
  listAllProposals,
  listMyProposals,
  listProposalDocuments,
  ProposalApi,
  reviewProposalDocument,
  statusLabel,
  statusVariant,
  uploadProposalDocument,
} from "../lib/api";

function docVariant(status: string): "success" | "warning" | "danger" | "default" {
  if (status === "aceito") return "success";
  if (status === "recusado") return "danger";
  if (status === "pendente") return "warning";
  return "default";
}

function docLabel(status: string) {
  const labels: Record<string, string> = {
    aceito: "Aceito",
    recusado: "Recusado",
    pendente: "Pendente",
  };
  return labels[status] ?? status;
}

export function DocumentsUpload() {
  const [proposals, setProposals] = useState<ProposalApi[]>([]);
  const [selectedProposalId, setSelectedProposalId] = useState<string>("");
  const [docs, setDocs] = useState<DocumentRequirementApi[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [reviewText, setReviewText] = useState<Record<string, string>>({});
  const role = getSessionRole();
  const isManager = ["gestor_administrativo", "administrador_sistema"].includes(role);

  const selectedProposal = useMemo(
    () => proposals.find((p) => p.id === selectedProposalId),
    [proposals, selectedProposalId]
  );

  async function loadProposals() {
    setLoading(true);
    setError("");
    try {
      const data = isManager ? await listAllProposals() : await listMyProposals();
      const eligible = data.filter((p) =>
        ["aguardando_documentacao_formal", "aguardando_regularizacao_documental", "apta_para_avaliacao_tecnica"].includes(p.estado)
      );
      const list = eligible.length ? eligible : data;
      setProposals(list);
      setSelectedProposalId((current) => current || list[0]?.id || "");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Não foi possível carregar propostas.");
    } finally {
      setLoading(false);
    }
  }

  async function loadDocuments(proposalId: string) {
    if (!proposalId) return;
    setError("");
    try {
      const data = await listProposalDocuments(proposalId);
      setDocs(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Não foi possível carregar documentos.");
      setDocs([]);
    }
  }

  useEffect(() => {
    loadProposals();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isManager]);

  useEffect(() => {
    loadDocuments(selectedProposalId);
  }, [selectedProposalId]);

  async function handleUpload(requiredId: string, file?: File) {
    if (!file || !selectedProposalId) return;
    setMessage("");
    setError("");
    try {
      await uploadProposalDocument(selectedProposalId, requiredId, file);
      setMessage("Documento enviado e versionado com sucesso.");
      await loadDocuments(selectedProposalId);
      await loadProposals();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Falha no upload do documento.");
    }
  }

  async function handleReview(documentId: string, action: "aceitar" | "marcar_pendente" | "recusar") {
    if (!selectedProposalId) return;
    setMessage("");
    setError("");
    try {
      await reviewProposalDocument(selectedProposalId, documentId, {
        action,
        justificativa: reviewText[documentId],
      });
      setMessage(action === "aceitar" ? "Documento aceito." : "Pendência documental registrada com justificativa.");
      await loadDocuments(selectedProposalId);
      await loadProposals();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Falha na validação documental.");
    }
  }

  const accepted = docs.filter((d) => d.status === "aceito").length;
  const refused = docs.filter((d) => d.status === "recusado").length;
  const pending = docs.filter((d) => d.status === "pendente").length;
  const latestVersions = docs
    .filter((d) => d.documento?.versions?.length)
    .flatMap((d) =>
      (d.documento?.versions ?? []).map((v) => ({ ...v, nome: d.documento_exigido.nome }))
    )
    .sort((a, b) => String(b.enviado_em).localeCompare(String(a.enviado_em)))
    .slice(0, 5);

  return (
    <div className="min-h-screen bg-[#fafafa]">
      <Header />

      <main className="mx-auto max-w-[1080px] px-6 py-8">
        <div className="mb-8">
          <h1 className="text-[#1a4d2e] mb-2">Documentação formal</h1>
          <p className="text-[#4f6f52]">
            Envio, validação administrativa e versionamento dos documentos exigidos pelo edital.
          </p>
        </div>

        {message && <div className="mb-4 border border-[#8fbc8f] bg-[#8fbc8f]/10 px-4 py-3 text-[#1a4d2e]">{message}</div>}
        {error && <div className="mb-4 border border-red-200 bg-red-50 px-4 py-3 text-red-700">{error}</div>}

        <div className="mb-6 bg-white border border-[#1a4d2e]/10 p-5">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div className="flex-1">
              <label className="block text-sm text-[#4f6f52] mb-2">Proposta</label>
              <select
                value={selectedProposalId}
                onChange={(e) => setSelectedProposalId(e.target.value)}
                className="w-full border border-[#1a4d2e]/20 px-3 py-2 bg-white text-[#4a4a4a]"
              >
                {proposals.length === 0 && <option value="">Nenhuma proposta disponível</option>}
                {proposals.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.titulo} • {p.protocolo ?? "sem protocolo"}
                  </option>
                ))}
              </select>
            </div>
            {selectedProposal && (
              <div className="flex items-center gap-3">
                <span className="text-sm text-[#4f6f52]">Status</span>
                <StatusBadge status={statusLabel(selectedProposal.estado)} variant={statusVariant(selectedProposal.estado)} />
              </div>
            )}
          </div>
        </div>

        {loading ? (
          <div className="bg-white border border-[#1a4d2e]/10 p-8 text-[#4f6f52]">Carregando documentação...</div>
        ) : proposals.length === 0 ? (
          <div className="bg-white border border-[#1a4d2e]/10 p-8">
            <div className="flex items-center gap-3 text-[#4a4a4a]">
              <AlertTriangle className="h-5 w-5 text-amber-600" />
              Nenhuma proposta chegou à etapa de documentação formal. Primeiro o gestor precisa aprovar a manifestação na triagem.
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-6">
            <div className="col-span-2">
              <div className="bg-white border border-[#1a4d2e]/10 p-6 mb-6">
                <h2 className="text-[#4a4a4a] mb-6">Checklist de documentos exigidos</h2>

                <div className="space-y-3">
                  {docs.map((item) => {
                    const documentId = item.documento?.id;
                    return (
                      <div
                        key={item.documento_exigido.id}
                        className="p-4 border border-[#1a4d2e]/10 hover:bg-[#e8dcc4]/20 transition-colors"
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex items-start gap-3 flex-1">
                            <FileText className="h-5 w-5 text-[#4f6f52] mt-0.5" />
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <h3 className="text-[#4a4a4a]">{item.documento_exigido.nome}</h3>
                                {item.documento_exigido.obrigatorio && <span className="text-xs text-red-700">Obrigatório</span>}
                                <StatusBadge status={docLabel(item.status)} variant={docVariant(item.status)} />
                              </div>
                              <div className="flex items-center gap-4 text-xs text-[#4f6f52]">
                                <span>Versão atual: {item.versao_atual}</span>
                                <span>Formatos: PDF, DOC, DOCX, JPG ou PNG</span>
                                <span>Limite: 20 MB</span>
                              </div>
                              {item.justificativa_recusa && (
                                <div className="mt-2 text-sm text-red-700 bg-red-50 px-3 py-2 border-l-2 border-red-500">
                                  {item.justificativa_recusa}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>

                        {!isManager && selectedProposal?.estado !== "apta_para_avaliacao_tecnica" && (
                          <div className="mt-4 flex items-center gap-3">
                            <label className="px-4 py-2 bg-[#1a4d2e] text-white text-sm hover:bg-[#4f6f52] cursor-pointer">
                              {item.versao_atual > 0 ? "Enviar nova versão" : "Enviar documento"}
                              <input
                                type="file"
                                className="hidden"
                                accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
                                onChange={(e) => handleUpload(item.documento_exigido.id, e.target.files?.[0])}
                              />
                            </label>
                          </div>
                        )}

                        {isManager && documentId && (
                          <div className="mt-4 border-t border-[#1a4d2e]/10 pt-4">
                            <label className="block text-sm text-[#4f6f52] mb-2">
                              Justificativa para pendência ou recusa
                            </label>
                            <textarea
                              value={reviewText[documentId] ?? ""}
                              onChange={(e) => setReviewText({ ...reviewText, [documentId]: e.target.value })}
                              className="w-full border border-[#1a4d2e]/20 px-3 py-2 min-h-[72px] text-sm"
                              placeholder="Ex.: Arquivo ilegível; documento vencido; ausência de assinatura."
                            />
                            <div className="mt-3 flex flex-wrap gap-2">
                              <button
                                onClick={() => handleReview(documentId, "aceitar")}
                                className="px-4 py-2 bg-[#1a4d2e] text-white text-sm hover:bg-[#4f6f52]"
                              >
                                Aceitar
                              </button>
                              <button
                                onClick={() => handleReview(documentId, "marcar_pendente")}
                                className="px-4 py-2 border border-amber-300 text-amber-800 text-sm hover:bg-amber-50"
                              >
                                Marcar pendente
                              </button>
                              <button
                                onClick={() => handleReview(documentId, "recusar")}
                                className="px-4 py-2 border border-red-300 text-red-700 text-sm hover:bg-red-50"
                              >
                                Recusar
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="bg-white border border-[#1a4d2e]/10 p-6">
                <h3 className="text-[#4a4a4a] mb-4">Área de upload</h3>
                <div className="border-2 border-dashed border-[#4f6f52]/30 p-10 text-center">
                  <Upload className="h-12 w-12 text-[#4f6f52] mx-auto mb-4" />
                  <p className="text-[#4a4a4a] mb-2">Use o botão de envio em cada documento do checklist.</p>
                  <p className="text-sm text-[#4f6f52]">O reenvio cria uma nova versão e preserva o histórico anterior.</p>
                </div>
              </div>
            </div>

            <div className="col-span-1 space-y-6">
              <div className="bg-white border border-[#1a4d2e]/10 p-6">
                <h3 className="text-[#4a4a4a] mb-4">Resumo</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-[#8fbc8f]" />
                      <span className="text-[#4a4a4a]">Aceitos</span>
                    </div>
                    <span className="font-medium text-[#1a4d2e]">{accepted}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <XCircle className="h-4 w-4 text-red-500" />
                      <span className="text-[#4a4a4a]">Recusados</span>
                    </div>
                    <span className="font-medium text-red-700">{refused}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-amber-500" />
                      <span className="text-[#4a4a4a]">Pendentes</span>
                    </div>
                    <span className="font-medium text-amber-700">{pending}</span>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-[#1a4d2e]/10 p-6">
                <div className="flex items-center gap-2 mb-4">
                  <History className="h-5 w-5 text-[#4f6f52]" />
                  <h3 className="text-[#4a4a4a]">Histórico de versões</h3>
                </div>
                <div className="space-y-3 text-sm">
                  {latestVersions.length === 0 && <p className="text-[#4f6f52]">Nenhuma versão enviada.</p>}
                  {latestVersions.map((v) => (
                    <div key={v.id} className="border-l-2 border-[#1a4d2e] pl-3 py-1">
                      <div className="text-[#4a4a4a]">{v.nome}</div>
                      <div className="text-xs text-[#4f6f52]">
                        v{v.numero} • {new Date(v.enviado_em).toLocaleString("pt-BR")}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white border border-[#1a4d2e]/10 p-6">
                <PrototypeNote>
                  Esta etapa agora está integrada ao backend: arquivos são gravados em disco local,
                  versões são registradas no SQLite e a validação do gestor altera o status da proposta.
                </PrototypeNote>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
