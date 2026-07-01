import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router";
import { Header } from "../components/Header";
import { ClipboardList, Clock, CheckCircle, Search, ChevronRight } from "lucide-react";
import { listAssignedEvaluations, statusLabel, type AssignedProposalApi } from "../lib/api";

export function EvaluatorDashboard() {
  const [items, setItems] = useState<AssignedProposalApi[]>([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function load() {
    setLoading(true);
    setError(null);
    try {
      setItems(await listAssignedEvaluations());
    } catch (err) {
      setError(err instanceof Error ? err.message : "Falha ao carregar propostas atribuídas.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, []);

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    return items.filter((item) =>
      item.titulo.toLowerCase().includes(q) || (item.protocolo ?? "").toLowerCase().includes(q)
    );
  }, [items, query]);

  const completed = items.filter((item) => item.evaluation?.status === "concluida").length;
  const pending = items.length - completed;

  return (
    <div className="min-h-screen bg-[#fafafa]">
      <Header />
      <main className="mx-auto max-w-[1080px] px-6 py-8">
        <div className="mb-8">
          <h1 className="text-[#1a4d2e] mb-2">Painel do Avaliador</h1>
          <p className="text-[#4f6f52]">Acompanhe as propostas atribuídas a você e registre avaliações técnicas.</p>
        </div>

        {error && <div className="mb-6 border border-red-200 bg-red-50 text-red-700 px-4 py-3 text-sm">{error}</div>}
        {loading && <div className="mb-6 border border-[#1a4d2e]/10 bg-white px-4 py-3 text-sm text-[#4f6f52]">Carregando avaliações...</div>}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white border border-[#1a4d2e]/10 p-6 flex items-center gap-4"><div className="h-12 w-12 bg-[#e8dcc4]/50 flex items-center justify-center rounded-full"><ClipboardList className="h-6 w-6 text-[#1a4d2e]" /></div><div><p className="text-sm text-[#4a4a4a]">Total atribuídas</p><p className="text-2xl text-[#1a4d2e] font-semibold">{items.length}</p></div></div>
          <div className="bg-white border border-[#1a4d2e]/10 p-6 flex items-center gap-4"><div className="h-12 w-12 bg-[#e8dcc4]/50 flex items-center justify-center rounded-full"><Clock className="h-6 w-6 text-[#1a4d2e]" /></div><div><p className="text-sm text-[#4a4a4a]">Pendentes</p><p className="text-2xl text-[#1a4d2e] font-semibold">{pending}</p></div></div>
          <div className="bg-white border border-[#1a4d2e]/10 p-6 flex items-center gap-4"><div className="h-12 w-12 bg-[#1a4d2e]/10 flex items-center justify-center rounded-full"><CheckCircle className="h-6 w-6 text-[#1a4d2e]" /></div><div><p className="text-sm text-[#4a4a4a]">Concluídas</p><p className="text-2xl text-[#1a4d2e] font-semibold">{completed}</p></div></div>
        </div>

        <div className="bg-white border border-[#1a4d2e]/10">
          <div className="p-6 border-b border-[#1a4d2e]/10 flex flex-col md:flex-row justify-between items-center gap-4">
            <h2 className="text-[#4a4a4a] text-lg">Propostas para avaliação</h2>
            <div className="relative w-full md:w-64">
              <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Buscar por protocolo..." className="w-full pl-9 pr-4 py-2 border border-[#4f6f52]/30 text-sm focus:outline-none focus:border-[#1a4d2e]" />
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-[#4f6f52]" />
            </div>
          </div>
          <div className="divide-y divide-[#1a4d2e]/10">
            {filtered.map((proposal) => {
              const isDone = proposal.evaluation?.status === "concluida";
              return (
                <div key={proposal.proposal_id} className="p-6 hover:bg-[#fafafa] transition-colors flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-[#1a4d2e] font-medium">{proposal.protocolo ?? proposal.proposal_id}</span>
                      <span className={`px-2 py-1 text-xs ${isDone ? "bg-[#e8dcc4] text-[#1a4d2e]" : "bg-[#1a4d2e]/10 text-[#1a4d2e]"}`}>{isDone ? "Concluída" : proposal.evaluation ? "Rascunho" : "Pendente"}</span>
                    </div>
                    <h3 className="text-lg text-[#4a4a4a] mb-1">{proposal.titulo}</h3>
                    <div className="flex items-center gap-4 text-sm text-[#4f6f52]">
                      <span>{proposal.edital_titulo}</span>
                      <span>{statusLabel(proposal.estado)}</span>
                      {isDone && <span><CheckCircle className="inline h-3 w-3 mr-1" />Nota final: {Number(proposal.evaluation?.pontuacao_total ?? 0).toFixed(1)}</span>}
                    </div>
                  </div>
                  <Link to={`/avaliador/avaliacao/${proposal.proposal_id}`} className={`flex items-center gap-2 px-4 py-2 border transition-colors ${isDone ? "border-[#4f6f52]/30 text-[#4a4a4a] hover:bg-[#e8dcc4]" : "border-[#1a4d2e] text-[#1a4d2e] hover:bg-[#1a4d2e] hover:text-white"}`}>
                    {isDone ? "Ver avaliação" : proposal.evaluation ? "Continuar" : "Avaliar"}<ChevronRight className="h-4 w-4" />
                  </Link>
                </div>
              );
            })}
            {filtered.length === 0 && <div className="p-8 text-center text-[#4f6f52]">Nenhuma proposta atribuída até o momento.</div>}
          </div>
        </div>
      </main>
    </div>
  );
}
