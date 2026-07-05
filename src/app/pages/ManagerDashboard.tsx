import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router";
import { Header } from "../components/Header";
import { StatusBadge } from "../components/StatusBadge";
import { PrototypeNote } from "../components/PrototypeNote";
import { AlertTriangle, Clock, CheckCircle, Users, Filter, MoreVertical, ChevronDown } from "lucide-react";
import { assignEvaluators, listAllProposals, listEvaluators, statusLabel, statusVariant, triageProposal, type EvaluatorUserApi, type ProposalApi } from "../lib/api";

type ColumnId = "em_triagem" | "aguardando_ajuste" | "aguardando_documentacao_formal" | "apta_para_avaliacao_tecnica" | "em_avaliacao" | "pitch" | "em_deliberacao" | "resultado_preliminar" | "concluido";

const kanbanColumns: Array<{ id: ColumnId; title: string; headerBg: string; headerText: string; colBg: string; border: string }> = [
  { id: "em_triagem", title: "Triagem", headerBg: "bg-[#d4c4a8]", headerText: "text-[#1a4d2e]", colBg: "bg-[#e8dcc4]/50", border: "border-[#c4b498]" },
  { id: "aguardando_ajuste", title: "Ajustes", headerBg: "bg-amber-400", headerText: "text-amber-900", colBg: "bg-amber-100/40", border: "border-amber-400" },
  { id: "aguardando_documentacao_formal", title: "Documentação", headerBg: "bg-[#8fbc8f]", headerText: "text-[#1a4d2e]", colBg: "bg-[#8fbc8f]/20", border: "border-[#7ab07a]" },
  { id: "apta_para_avaliacao_tecnica", title: "Apta", headerBg: "bg-[#4f6f52]", headerText: "text-white", colBg: "bg-[#4f6f52]/15", border: "border-[#4f6f52]/60" },
  { id: "em_avaliacao", title: "Avaliação", headerBg: "bg-[#1a4d2e]", headerText: "text-white", colBg: "bg-[#1a4d2e]/10", border: "border-[#1a4d2e]/40" },
  { id: "pitch", title: "Pitch", headerBg: "bg-violet-700", headerText: "text-white", colBg: "bg-violet-50", border: "border-violet-300" },
  { id: "em_deliberacao", title: "Deliberação", headerBg: "bg-[#0f3420]", headerText: "text-white", colBg: "bg-[#1a4d2e]/15", border: "border-[#1a4d2e]/50" },
  { id: "resultado_preliminar", title: "Resultado preliminar", headerBg: "bg-slate-700", headerText: "text-white", colBg: "bg-slate-50", border: "border-slate-300" },
  { id: "concluido", title: "Final", headerBg: "bg-[#0a2012]", headerText: "text-white", colBg: "bg-[#1a4d2e]/15", border: "border-[#1a4d2e]" },
];

function columnFor(estado: string): ColumnId {
  if (["pre_classificada", "aguardando_apresentacao"].includes(estado)) return "pitch";
  if (["resultado_preliminar_publicado", "em_recurso"].includes(estado)) return "resultado_preliminar";
  if (["aprovada", "reprovada", "homologada", "convocada", "encerrada"].includes(estado)) return "concluido";
  if (estado === "manifestacao_submetida") return "em_triagem";
  if (estado in Object.fromEntries(kanbanColumns.map((c) => [c.id, true]))) return estado as ColumnId;
  return "em_triagem";
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("pt-BR", { dateStyle: "short" }).format(new Date(value));
}

export function ManagerDashboard() {
  const [selectedProcess, setSelectedProcess] = useState("2026.1");
  const [proposals, setProposals] = useState<ProposalApi[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [justificativa, setJustificativa] = useState<Record<string, string>>({});
  const [updating, setUpdating] = useState<string | null>(null);
  const [evaluators, setEvaluators] = useState<EvaluatorUserApi[]>([]);

  async function load() {
    setLoading(true);
    setError(null);
    try {
      setProposals(await listAllProposals());
    } catch (err) {
      setError(err instanceof Error ? err.message : "Falha ao carregar propostas.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); listEvaluators().then(setEvaluators).catch(() => setEvaluators([])); }, []);

  const grouped = useMemo(() => {
    const empty = Object.fromEntries(kanbanColumns.map((c) => [c.id, []])) as Record<ColumnId, ProposalApi[]>;
    proposals.forEach((proposal) => empty[columnFor(proposal.estado)].push(proposal));
    return empty;
  }, [proposals]);

  const indicators = {
    recebidas: proposals.length,
    pendencias: proposals.filter((p) => ["aguardando_ajuste", "aguardando_regularizacao_documental"].includes(p.estado)).length,
    atrasos: proposals.filter((p) => p.estado === "em_triagem").length,
    recursos: proposals.filter((p) => p.estado === "em_recurso").length,
  };

  async function handleTriage(id: string, action: "aprovar" | "solicitar_ajuste" | "indeferir") {
    setUpdating(id);
    setError(null);
    try {
      await triageProposal(id, { action, justificativa: justificativa[id] });
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Falha ao executar triagem.");
    } finally {
      setUpdating(null);
    }
  }



  async function handleAssign(id: string) {
    if (!evaluators[0]) {
      setError("Nenhum avaliador cadastrado para receber a proposta.");
      return;
    }
    setUpdating(id);
    setError(null);
    try {
      await assignEvaluators(id, [evaluators[0].id]);
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Falha ao distribuir avaliação.");
    } finally {
      setUpdating(null);
    }
  }

  return (
    <div className="min-h-screen bg-[#fafafa]">
      <Header />
      
      <main className="mx-auto max-w-[1280px] px-6 py-8">
        <div className="flex items-start justify-between mb-8">
          <div>
            <h1 className="text-[#1a4d2e] mb-2">Dashboard do Gestor</h1>
            <p className="text-[#4f6f52]">Visão real das propostas registradas no SQLite e acompanhamento do processo seletivo PampaTec</p>
          </div>
          
          <div className="flex items-center gap-3 flex-wrap justify-end">
            <Link to="/gestor/editais" className="bg-[#1a4d2e] text-white px-4 py-2 hover:bg-[#4f6f52] text-sm">Configurar edital</Link>
            <Link to="/comissao" className="border border-[#1a4d2e]/20 text-[#1a4d2e] px-4 py-2 hover:bg-[#f4f1e8] text-sm">Comissão</Link>
            <Link to="/pitch" className="border border-[#1a4d2e]/20 text-[#1a4d2e] px-4 py-2 hover:bg-[#f4f1e8] text-sm">Pitch</Link>
            <Link to="/gestor/publicacoes" className="border border-[#1a4d2e]/20 text-[#1a4d2e] px-4 py-2 hover:bg-[#f4f1e8] text-sm">Resultados</Link>
            <span className="text-sm font-medium text-[#4a4a4a]">Processo Seletivo:</span>
            <div className="relative">
              <select value={selectedProcess} onChange={(e) => setSelectedProcess(e.target.value)} className="appearance-none bg-white border border-[#1a4d2e]/20 text-[#1a4d2e] font-semibold py-2 pl-4 pr-10 rounded-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-[#1a4d2e]/50 cursor-pointer">
                <option value="2026.1">Edital 2026.1 (Atual)</option>
                <option value="2025.2">Edital 2025.2</option>
                <option value="2025.1">Edital 2025.1</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#1a4d2e] pointer-events-none" />
            </div>
          </div>
        </div>

        {error && <div className="mb-6 border border-red-200 bg-red-50 text-red-700 px-4 py-3 text-sm">{error}</div>}
        {loading && <div className="mb-6 border border-[#1a4d2e]/10 bg-white px-4 py-3 text-sm text-[#4f6f52]">Carregando propostas demonstrativas...</div>}

        <div className="grid grid-cols-4 gap-4 mb-8">
          <div className="bg-white border-t-4 border-t-[#4f6f52] border-x border-b border-[#1a4d2e]/10 p-5 rounded-sm shadow-sm"><div className="flex items-center justify-between mb-2"><span className="text-sm font-medium text-[#4f6f52]">Propostas recebidas</span><Users className="h-5 w-5 text-[#4f6f52]" /></div><div className="text-3xl font-semibold text-[#1a4d2e]">{indicators.recebidas}</div></div>
          <div className="bg-white border-t-4 border-t-amber-500 border-x border-b border-[#1a4d2e]/10 p-5 rounded-sm shadow-sm"><div className="flex items-center justify-between mb-2"><span className="text-sm font-medium text-[#4f6f52]">Pendências</span><AlertTriangle className="h-5 w-5 text-amber-500" /></div><div className="text-3xl font-semibold text-amber-700">{indicators.pendencias}</div></div>
          <div className="bg-white border-t-4 border-t-red-500 border-x border-b border-[#1a4d2e]/10 p-5 rounded-sm shadow-sm"><div className="flex items-center justify-between mb-2"><span className="text-sm font-medium text-[#4f6f52]">Em triagem</span><Clock className="h-5 w-5 text-red-500" /></div><div className="text-3xl font-semibold text-red-700">{indicators.atrasos}</div></div>
          <div className="bg-white border-t-4 border-t-[#8fbc8f] border-x border-b border-[#1a4d2e]/10 p-5 rounded-sm shadow-sm"><div className="flex items-center justify-between mb-2"><span className="text-sm font-medium text-[#4f6f52]">Recursos abertos</span><CheckCircle className="h-5 w-5 text-[#8fbc8f]" /></div><div className="text-3xl font-semibold text-[#1a4d2e]">{indicators.recursos}</div></div>
        </div>

        <div className="mb-6">
          <PrototypeNote>
            Demonstração integrada: o kanban lê propostas reais do sistema e mantém o fluxo completo visível, incluindo triagem, documentação, avaliação, pitch, deliberação, resultado preliminar e finalização.
          </PrototypeNote>
        </div>

        <div className="bg-white border border-[#1a4d2e]/10 rounded-sm shadow-sm flex flex-col h-[760px]">
          <div className="p-4 border-b border-[#1a4d2e]/10 flex items-center justify-between bg-[#fafafa]">
            <div className="flex items-center gap-2"><Filter className="h-4 w-4 text-[#4f6f52]" /><h2 className="text-[#4a4a4a] font-semibold">Funil de Propostas • Kanban</h2></div>
            <button onClick={load} className="text-xs font-medium bg-white border border-[#1a4d2e]/10 px-3 py-1 rounded-full text-[#4f6f52] hover:bg-[#f4f1e8]">Atualizar</button>
          </div>
          
          <div className="flex-1 overflow-x-auto p-4">
            <div className="flex gap-4 min-w-max h-full">
              {kanbanColumns.map((col) => {
                const columnProposals = grouped[col.id];
              

  async function handleAssign(id: string) {
    if (!evaluators[0]) {
      setError("Nenhum avaliador cadastrado para receber a proposta.");
      return;
    }
    setUpdating(id);
    setError(null);
    try {
      await assignEvaluators(id, [evaluators[0].id]);
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Falha ao distribuir avaliação.");
    } finally {
      setUpdating(null);
    }
  }

  return (
                  <div key={col.id} className={`w-[300px] flex flex-col h-full rounded-sm border ${col.border} ${col.colBg}`}>
                    <div className={`p-3 border-b ${col.border} ${col.headerBg} flex items-center justify-between shadow-sm`}><h3 className={`font-bold text-[13px] uppercase tracking-wide ${col.headerText}`}>{col.title}</h3><span className="bg-white/90 text-[#1a4d2e] text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center shadow-sm">{columnProposals.length}</span></div>
                    <div className="flex-1 overflow-y-auto p-2 space-y-3">
                      {columnProposals.map((p) => (
                        <div key={p.id} className="block bg-white border rounded-sm p-3 shadow-sm hover:shadow-md transition-all border-[#1a4d2e]/15 relative group">
                          <div className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity"><MoreVertical className="h-4 w-4 text-[#4a4a4a]" /></div>
                          <Link to={`/proposta/${p.id}`}><h4 className="font-semibold text-[#1a4d2e] text-[14px] leading-tight mb-1 pr-5 hover:underline">{p.titulo}</h4></Link>
                          <span className="inline-block bg-[#fafafa] border border-[#1a4d2e]/5 text-[#4f6f52] text-[11px] px-2 py-0.5 rounded-sm mb-3">{p.protocolo ?? "sem protocolo"}</span>
                          <div className="space-y-1.5">
                            <StatusBadge status={statusLabel(p.estado)} variant={statusVariant(p.estado)} />
                            <div className="flex items-center gap-1 text-[11px] text-[#4f6f52] mt-2 pt-2 border-t border-[#1a4d2e]/5"><Clock className="h-3 w-3" /><span>Criada em {formatDate(p.created_at)}</span></div>
                          </div>
                          {p.estado === "apta_para_avaliacao_tecnica" && (
                            <div className="mt-3 pt-3 border-t border-[#1a4d2e]/10 space-y-2">
                              <div className="text-[11px] text-[#4f6f52]">Avaliador selecionado: {evaluators[0]?.full_name ?? "nenhum avaliador cadastrado"}</div>
                              <button disabled={updating === p.id || !evaluators[0]} onClick={() => handleAssign(p.id)} className="w-full text-[11px] bg-[#1a4d2e] text-white px-2 py-1 hover:bg-[#4f6f52] disabled:opacity-50">Encaminhar para avaliação</button>
                            </div>
                          )}
                          {p.estado === "em_triagem" && (
                            <div className="mt-3 pt-3 border-t border-[#1a4d2e]/10 space-y-2">
                              <textarea value={justificativa[p.id] ?? ""} onChange={(e) => setJustificativa((old) => ({ ...old, [p.id]: e.target.value }))} rows={2} placeholder="Justificativa para ajuste ou indeferimento" className="w-full text-xs px-2 py-1 border border-[#4f6f52]/30 bg-white" />
                              <div className="grid grid-cols-3 gap-1">
                                <button disabled={updating === p.id} onClick={() => handleTriage(p.id, "aprovar")} className="text-[11px] bg-[#1a4d2e] text-white px-2 py-1 hover:bg-[#4f6f52] disabled:opacity-50">Aprovar</button>
                                <button disabled={updating === p.id} onClick={() => handleTriage(p.id, "solicitar_ajuste")} className="text-[11px] bg-amber-500 text-white px-2 py-1 hover:bg-amber-600 disabled:opacity-50">Ajuste</button>
                                <button disabled={updating === p.id} onClick={() => handleTriage(p.id, "indeferir")} className="text-[11px] bg-red-600 text-white px-2 py-1 hover:bg-red-700 disabled:opacity-50">Indeferir</button>
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                      {columnProposals.length === 0 && <div className="h-24 flex items-center justify-center border-2 border-dashed border-[#1a4d2e]/10 rounded-sm"><span className="text-[13px] text-[#4a4a4a] italic">Vazio</span></div>}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
