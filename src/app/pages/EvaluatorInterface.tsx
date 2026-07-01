import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router";
import { Header } from "../components/Header";
import { FileText, Save, CheckCircle, ArrowLeft } from "lucide-react";
import { listAssignedEvaluations, saveEvaluationDraft, submitEvaluation, type AssignedProposalApi } from "../lib/api";

export function EvaluatorInterface() {
  const { id } = useParams();
  const [item, setItem] = useState<AssignedProposalApi | null>(null);
  const [scores, setScores] = useState<Record<string, number>>({});
  const [justifications, setJustifications] = useState<Record<string, string>>({});
  const [parecer, setParecer] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  async function load() {
    setError(null);
    const assigned = await listAssignedEvaluations();
    const found = assigned.find((p) => p.proposal_id === id) ?? null;
    setItem(found);
    if (found?.evaluation) {
      const nextScores: Record<string, number> = {};
      const nextJustifications: Record<string, string> = {};
      found.evaluation.scores.forEach((s) => {
        nextScores[s.criterio_id] = Number(s.nota);
        nextJustifications[s.criterio_id] = s.justificativa ?? "";
      });
      setScores(nextScores);
      setJustifications(nextJustifications);
      setParecer(found.evaluation.parecer_geral ?? "");
    }
  }

  useEffect(() => { load().catch((err) => setError(err instanceof Error ? err.message : "Falha ao carregar avaliação.")); }, [id]);

  const weightedScore = useMemo(() => {
    if (!item || Object.keys(scores).length === 0) return null;
    return item.criterios.reduce((acc, c) => acc + (scores[c.id] ?? 0) * Number(c.peso), 0);
  }, [item, scores]);

  function payload() {
    return {
      parecer_geral: parecer,
      scores: item?.criterios
        .filter((c) => scores[c.id] !== undefined)
        .map((c) => ({ criterio_id: c.id, nota: scores[c.id], justificativa: justifications[c.id] || undefined })) ?? [],
    };
  }

  async function handleSave() {
    if (!item) return;
    setSaving(true); setMessage(null); setError(null);
    try {
      await saveEvaluationDraft(item.proposal_id, payload());
      setMessage("Rascunho salvo com sucesso.");
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Falha ao salvar rascunho.");
    } finally { setSaving(false); }
  }

  async function handleSubmit() {
    if (!item) return;
    setSaving(true); setMessage(null); setError(null);
    try {
      await submitEvaluation(item.proposal_id, payload());
      setMessage("Avaliação enviada com sucesso.");
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Falha ao enviar avaliação.");
    } finally { setSaving(false); }
  }

  if (!item) {
    return <div className="min-h-screen bg-[#fafafa]"><Header /><main className="mx-auto max-w-[1080px] px-6 py-8"><div className="bg-white border border-[#1a4d2e]/10 p-8 text-[#4f6f52]">{error ?? "Carregando avaliação..."}</div></main></div>;
  }

  const concluded = item.evaluation?.status === "concluida";

  return (
    <div className="min-h-screen bg-[#fafafa]">
      <Header />
      <main className="mx-auto max-w-[1080px] px-6 py-8">
        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <Link to="/avaliador" className="inline-flex items-center gap-2 text-sm text-[#4f6f52] hover:text-[#1a4d2e] mb-3"><ArrowLeft className="h-4 w-4" />Voltar ao painel</Link>
            <h1 className="text-[#1a4d2e] mb-2">Avaliação de proposta</h1>
            <p className="text-[#4f6f52]">{item.titulo} • Protocolo {item.protocolo ?? "em geração"}</p>
          </div>
          {concluded && <span className="inline-flex items-center gap-2 bg-[#1a4d2e]/10 text-[#1a4d2e] px-3 py-2 text-sm"><CheckCircle className="h-4 w-4" />Avaliação concluída</span>}
        </div>

        {message && <div className="mb-6 border border-[#1a4d2e]/20 bg-[#1a4d2e]/5 text-[#1a4d2e] px-4 py-3 text-sm">{message}</div>}
        {error && <div className="mb-6 border border-red-200 bg-red-50 text-red-700 px-4 py-3 text-sm">{error}</div>}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-6">
            <div className="bg-white border border-[#1a4d2e]/10 p-6">
              <h2 className="text-[#4a4a4a] mb-4">Resumo da proposta</h2>
              <div className="space-y-4 text-sm">
                <div><h3 className="text-[#4a4a4a] mb-1">Título</h3><p className="text-[#4f6f52]">{item.titulo}</p></div>
                <div><h3 className="text-[#4a4a4a] mb-1">Edital</h3><p className="text-[#4f6f52]">{item.edital_titulo}</p></div>
                <div><h3 className="text-[#4a4a4a] mb-1">Orientação</h3><p className="text-[#4f6f52]">Atribua notas de acordo com cada critério e registre uma justificativa clara para apoiar a análise da comissão.</p></div>
              </div>
            </div>

            <div className="bg-white border border-[#1a4d2e]/10 p-6">
              <h3 className="text-[#4a4a4a] mb-3">Documentos anexos</h3>
              <div className="space-y-2">
                {['Plano de negócio', 'Documento jurídico', 'Currículo dos responsáveis'].map((name) => <button key={name} className="w-full flex items-center gap-3 p-3 border border-[#1a4d2e]/10 hover:bg-[#e8dcc4] text-left"><FileText className="h-5 w-5 text-[#4f6f52]" /><span className="text-sm text-[#4a4a4a]">{name}</span></button>)}
              </div>
            </div>
          </div>

          <div className="bg-white border border-[#1a4d2e]/10 p-6">
            <h2 className="text-[#4a4a4a] mb-6">Rubrica de avaliação</h2>
            <div className="space-y-6">
              {item.criterios.map((criterion) => (
                <div key={criterion.id} className="border-b border-[#1a4d2e]/10 pb-6 last:border-0">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-[#4a4a4a] flex-1">{criterion.nome}</h3>
                    <span className="text-xs text-[#4f6f52] bg-[#e8dcc4] px-2 py-1 ml-2">Peso: {Number(criterion.peso).toFixed(1)}</span>
                  </div>
                  <label className="block text-sm text-[#4a4a4a] mb-2">Nota ({criterion.escala_min}-{criterion.escala_max})</label>
                  <div className="flex gap-2 flex-wrap mb-3">
                    {Array.from({ length: criterion.escala_max - criterion.escala_min + 1 }, (_, i) => i + criterion.escala_min).map((score) => <button key={score} disabled={concluded} onClick={() => setScores({ ...scores, [criterion.id]: score })} className={`w-10 h-10 border disabled:opacity-70 ${scores[criterion.id] === score ? "bg-[#1a4d2e] text-white border-[#1a4d2e]" : "border-[#4f6f52]/30 text-[#4a4a4a] hover:bg-[#e8dcc4]"}`}>{score}</button>)}
                  </div>
                  <label className="block text-sm text-[#4a4a4a] mb-2">Justificativa qualitativa</label>
                  <textarea disabled={concluded} rows={2} value={justifications[criterion.id] || ""} onChange={(e) => setJustifications({ ...justifications, [criterion.id]: e.target.value })} placeholder="Justifique a nota atribuída..." className="w-full px-3 py-2 border border-[#4f6f52]/30 bg-white text-sm disabled:bg-[#fafafa]" />
                </div>
              ))}
            </div>

            <div className="mt-6 pt-6 border-t border-[#1a4d2e]/10">
              <label className="block text-sm text-[#4a4a4a] mb-2">Parecer geral</label>
              <textarea disabled={concluded} rows={4} value={parecer} onChange={(e) => setParecer(e.target.value)} placeholder="Registre o parecer geral da proposta..." className="w-full px-3 py-2 border border-[#4f6f52]/30 bg-white text-sm disabled:bg-[#fafafa] mb-4" />
              <div className="bg-[#e8dcc4]/30 p-4 mb-4"><div className="flex items-center justify-between"><span className="text-sm text-[#4a4a4a]">Pontuação ponderada</span><span className="text-2xl text-[#1a4d2e]">{weightedScore === null ? "—" : weightedScore.toFixed(1)}</span></div></div>
              <div className="flex gap-3">
                <button disabled={saving || concluded} onClick={handleSave} className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 border border-[#4f6f52]/30 text-[#4a4a4a] hover:bg-[#e8dcc4] disabled:opacity-50"><Save className="h-4 w-4" />Salvar rascunho</button>
                <button disabled={saving || concluded} onClick={handleSubmit} className="flex-1 px-6 py-3 bg-[#1a4d2e] text-white hover:bg-[#4f6f52] disabled:opacity-50">Enviar avaliação</button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
