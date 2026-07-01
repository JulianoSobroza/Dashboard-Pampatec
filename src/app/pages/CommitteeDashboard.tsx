import { useEffect, useMemo, useState } from "react";
import { Header } from "../components/Header";
import { StatusBadge } from "../components/StatusBadge";
import { PrototypeNote } from "../components/PrototypeNote";
import { AlertTriangle, FileCheck2, Gavel, MessageSquareWarning, Scale, Send } from "lucide-react";
import {
  listCommitteeQueue,
  registerDeliberation,
  requestComplementation,
  statusLabel,
  statusVariant,
  type CommitteeProposalApi,
  type EvaluationApi,
} from "../lib/api";

function scoreAverage(evaluation: EvaluationApi) {
  if (evaluation.pontuacao_total !== null && evaluation.pontuacao_total !== undefined) return Number(evaluation.pontuacao_total);
  if (!evaluation.scores.length) return 0;
  return evaluation.scores.reduce((sum, item) => sum + Number(item.nota), 0) / evaluation.scores.length;
}

function scoreFor(evaluation: EvaluationApi, criterionId: string) {
  return evaluation.scores.find((item) => item.criterio_id === criterionId)?.nota;
}

export function CommitteeDashboard() {
  const [items, setItems] = useState<CommitteeProposalApi[]>([]);
  const [selectedId, setSelectedId] = useState("");
  const [justification, setJustification] = useState("");
  const [complementText, setComplementText] = useState("");
  const [deadline, setDeadline] = useState("");
  const [decision, setDecision] = useState("approve");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    setError("");
    try {
      const data = await listCommitteeQueue();
      setItems(data);
      setSelectedId((current) => current || data[0]?.proposal_id || "");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Falha ao carregar propostas da comissão.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  const proposal = items.find((item) => item.proposal_id === selectedId) || items[0];
  const concluded = proposal?.evaluations.filter((item) => item.status === "concluida") ?? [];
  const pendingComplement = proposal?.complementations.find((item) => item.status === "pendente");
  const average = useMemo(() => {
    if (!concluded.length) return 0;
    return concluded.reduce((sum, item) => sum + scoreAverage(item), 0) / concluded.length;
  }, [concluded]);

  const maxDivergence = useMemo(() => {
    if (!proposal || concluded.length < 2) return 0;
    let max = 0;
    for (const criterion of proposal.criterios) {
      const values = concluded.map((evaluation) => Number(scoreFor(evaluation, criterion.id) ?? 0));
      max = Math.max(max, Math.max(...values) - Math.min(...values));
    }
    return max;
  }, [proposal, concluded]);

  async function handleComplementation() {
    if (!proposal) return;
    setError("");
    setSuccess("");
    if (!complementText.trim()) {
      setError("Informe o que precisa ser complementado antes de enviar a solicitação.");
      return;
    }
    try {
      await requestComplementation(proposal.proposal_id, { descricao: complementText, prazo: deadline || undefined });
      setComplementText("");
      setDeadline("");
      setSuccess("Solicitação enviada ao empreendedor.");
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Falha ao solicitar complementação.");
    }
  }

  async function handleDeliberation() {
    if (!proposal) return;
    setError("");
    setSuccess("");
    if (pendingComplement) {
      setError("Há uma complementação pendente. Aguarde a resposta antes de deliberar.");
      return;
    }
    if (!justification.trim()) {
      setError("A justificativa da decisão é obrigatória.");
      return;
    }
    try {
      await registerDeliberation(proposal.proposal_id, { aprovada: decision === "approve", justificativa: justification });
      setJustification("");
      setSuccess("Decisão registrada e resultado preliminar atualizado.");
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Falha ao registrar decisão.");
    }
  }

  return (
    <div className="min-h-screen bg-[#fafafa]">
      <Header />
      <main className="mx-auto max-w-[1200px] px-6 py-8">
        <div className="flex items-start justify-between mb-8 gap-4">
          <div>
            <h1 className="text-[#1a4d2e] mb-2">Painel da Comissão Técnica</h1>
            <p className="text-[#4f6f52]">Acompanhe avaliações concluídas, solicite complementações e registre a decisão da comissão.</p>
          </div>
          {proposal && <StatusBadge status={statusLabel(proposal.estado)} variant={statusVariant(proposal.estado)} />}
        </div>

        {error && <div className="mb-4 border border-red-200 bg-red-50 p-3 text-sm text-red-800">{error}</div>}
        {success && <div className="mb-4 border border-green-200 bg-green-50 p-3 text-sm text-green-800">{success}</div>}
        {loading && <div className="mb-4 border border-[#1a4d2e]/10 bg-white p-3 text-sm text-[#4f6f52]">Carregando dados...</div>}

        <div className="mb-6 bg-white border border-[#1a4d2e]/10 p-4 shadow-sm">
          <label className="block text-sm text-[#4a4a4a] mb-2">Proposta em análise</label>
          <select value={proposal?.proposal_id ?? ""} onChange={(e) => setSelectedId(e.target.value)} className="w-full border border-[#4f6f52]/30 px-3 py-2 bg-white">
            {items.map((item) => <option key={item.proposal_id} value={item.proposal_id}>{item.titulo} • {item.protocolo ?? "sem protocolo"}</option>)}
          </select>
        </div>

        {!proposal && !loading ? (
          <section className="bg-white border border-[#1a4d2e]/10 p-8 shadow-sm">
            <h2 className="text-[#1a4d2e] mb-2">Nenhuma proposta em análise</h2>
            <p className="text-[#4f6f52]">Quando o gestor encaminhar uma proposta para avaliação, ela aparecerá aqui após as avaliações dos pareceristas.</p>
          </section>
        ) : proposal && (
          <>
            <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-6 mb-6">
              <section className="bg-white border border-[#1a4d2e]/10 p-6 shadow-sm">
                <h2 className="text-[#1a4d2e] mb-2 flex items-center gap-2"><Scale className="h-5 w-5" /> Consolidação das avaliações</h2>
                <p className="text-sm text-[#4f6f52] mb-5">{proposal.titulo} • {proposal.protocolo ?? "sem protocolo"}</p>

                {maxDivergence > 3 && (
                  <div className="mb-5 flex items-start gap-2 border border-amber-200 bg-amber-50 p-3 text-sm text-amber-800">
                    <AlertTriangle className="h-4 w-4 mt-0.5" />
                    <span>Há divergência relevante entre notas dos avaliadores. A comissão deve registrar uma justificativa clara antes da decisão.</span>
                  </div>
                )}

                <div className="overflow-x-auto mb-6">
                  <table className="w-full text-sm border border-[#1a4d2e]/10">
                    <thead className="bg-[#f4f1e8] text-[#1a4d2e]">
                      <tr>
                        <th className="text-left p-3 border-b">Avaliador</th>
                        {proposal.criterios.map((criterion) => <th key={criterion.id} className="text-left p-3 border-b">{criterion.nome}</th>)}
                        <th className="text-left p-3 border-b">Pontuação</th>
                        <th className="text-left p-3 border-b">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {proposal.evaluations.map((evaluation) => (
                        <tr key={evaluation.id} className="border-b border-[#1a4d2e]/10">
                          <td className="p-3 font-medium text-[#4a4a4a]">{evaluation.avaliador_id.slice(0, 8)}</td>
                          {proposal.criterios.map((criterion) => <td key={criterion.id} className="p-3">{scoreFor(evaluation, criterion.id) ?? "—"}</td>)}
                          <td className="p-3">{scoreAverage(evaluation).toFixed(1)}</td>
                          <td className="p-3"><StatusBadge status={evaluation.status === "concluida" ? "Concluída" : "Rascunho"} variant={evaluation.status === "concluida" ? "success" : "warning"} /></td>
                        </tr>
                      ))}
                      {!proposal.evaluations.length && <tr><td className="p-3 text-[#4f6f52]" colSpan={proposal.criterios.length + 3}>Nenhuma avaliação registrada.</td></tr>}
                    </tbody>
                  </table>
                </div>

                <div className="grid md:grid-cols-3 gap-4 mb-6">
                  <div className="border border-[#1a4d2e]/10 p-4 bg-[#fafafa]"><div className="text-xs text-[#4f6f52] mb-1">Avaliações concluídas</div><div className="text-2xl text-[#1a4d2e] font-semibold">{concluded.length}/{proposal.evaluations.length}</div></div>
                  <div className="border border-[#1a4d2e]/10 p-4 bg-[#fafafa]"><div className="text-xs text-[#4f6f52] mb-1">Média consolidada</div><div className="text-2xl text-[#1a4d2e] font-semibold">{average.toFixed(1)}</div></div>
                  <div className="border border-[#1a4d2e]/10 p-4 bg-[#fafafa]"><div className="text-xs text-[#4f6f52] mb-1">Divergência máxima</div><div className="text-2xl text-amber-700 font-semibold">{maxDivergence.toFixed(1)}</div></div>
                </div>
              </section>

              <section className="bg-white border border-[#1a4d2e]/10 p-6 shadow-sm">
                <h2 className="text-[#1a4d2e] mb-5 flex items-center gap-2"><Gavel className="h-5 w-5" /> Registrar decisão</h2>
                {proposal.deliberation ? (
                  <div className="border border-green-200 bg-green-50 p-4 text-sm text-green-800">
                    <strong>Decisão já registrada.</strong>
                    <p className="mt-2">Resultado: {proposal.deliberation.aprovada ? "Classificada" : "Não classificada"}</p>
                    <p>Pontuação consolidada: {proposal.deliberation.pontuacao_consolidada ?? "—"}</p>
                    <p className="mt-2">{proposal.deliberation.justificativa}</p>
                  </div>
                ) : (
                  <>
                    <label className="block text-sm text-[#4a4a4a] mb-2">Decisão <span className="text-red-700">*</span></label>
                    <select value={decision} onChange={(event) => setDecision(event.target.value)} className="w-full border border-[#4f6f52]/30 px-3 py-2 bg-white mb-4">
                      <option value="approve">Classificar para resultado preliminar</option>
                      <option value="reject">Não classificar</option>
                    </select>

                    <label className="block text-sm text-[#4a4a4a] mb-2">Justificativa da comissão <span className="text-red-700">*</span></label>
                    <textarea value={justification} onChange={(event) => setJustification(event.target.value)} className="w-full min-h-32 border border-[#4f6f52]/30 px-3 py-2 mb-4" placeholder="Registre a fundamentação da decisão." />

                    <button onClick={handleDeliberation} className="inline-flex items-center gap-2 bg-[#1a4d2e] text-white px-4 py-2 hover:bg-[#4f6f52]"><Send className="h-4 w-4" /> Registrar decisão</button>
                  </>
                )}
              </section>
            </div>

            <section className="bg-white border border-[#1a4d2e]/10 p-6 shadow-sm mb-6">
              <h2 className="text-[#1a4d2e] mb-4 flex items-center gap-2"><MessageSquareWarning className="h-5 w-5" /> Solicitações de complementação</h2>
              <div className="grid md:grid-cols-[1fr_1fr] gap-5">
                <div>
                  <label className="block text-sm text-[#4a4a4a] mb-2">Mensagem ao empreendedor</label>
                  <textarea value={complementText} onChange={(event) => setComplementText(event.target.value)} className="w-full min-h-28 border border-[#4f6f52]/30 px-3 py-2 mb-3" placeholder="Descreva a informação ou documento adicional necessário." />
                  <label className="block text-sm text-[#4a4a4a] mb-2">Prazo orientativo</label>
                  <input value={deadline} onChange={(event) => setDeadline(event.target.value)} className="w-full border border-[#4f6f52]/30 px-3 py-2 mb-4" placeholder="Ex.: 5 dias úteis" />
                  <button onClick={handleComplementation} className="inline-flex items-center gap-2 border border-[#1a4d2e]/20 text-[#1a4d2e] px-4 py-2 hover:bg-[#f4f1e8]"><MessageSquareWarning className="h-4 w-4" /> Solicitar complementação</button>
                </div>
                <div className="space-y-3">
                  {proposal.complementations.map((item) => (
                    <div key={item.id} className="border border-[#1a4d2e]/10 p-3 text-sm">
                      <div className="flex items-center justify-between mb-2"><strong className="text-[#4a4a4a]">Solicitação</strong><StatusBadge status={item.status === "respondida" ? "Respondida" : "Pendente"} variant={item.status === "respondida" ? "success" : "warning"} /></div>
                      <p className="text-[#4f6f52]">{item.descricao}</p>
                      {item.prazo && <p className="text-xs text-[#4f6f52] mt-1">Prazo: {item.prazo}</p>}
                      {item.resposta && <div className="mt-2 bg-[#fafafa] border-l-2 border-[#1a4d2e] p-2 text-[#4a4a4a]">Resposta: {item.resposta}</div>}
                    </div>
                  ))}
                  {!proposal.complementations.length && <div className="text-sm text-[#4f6f52] border border-dashed border-[#1a4d2e]/20 p-4">Nenhuma solicitação registrada.</div>}
                </div>
              </div>
            </section>

            <section className="bg-white border border-[#1a4d2e]/10 p-6 shadow-sm">
              <h2 className="text-[#1a4d2e] mb-4 flex items-center gap-2"><FileCheck2 className="h-5 w-5" /> Estado da demonstração</h2>
              <PrototypeNote>
                Esta etapa já registra solicitações, respostas e decisões no sistema. Os comentários internos e pareceres da comissão ficam concentrados na área autorizada.
              </PrototypeNote>
            </section>
          </>
        )}
      </main>
    </div>
  );
}
