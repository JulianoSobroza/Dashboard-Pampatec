import { useEffect, useState } from "react";
import { Link } from "react-router";
import { Header } from "../components/Header";
import { StatusBadge } from "../components/StatusBadge";
import { PrototypeNote } from "../components/PrototypeNote";
import { CheckCircle2, Circle, Clock, FileText, Upload, Send, Eye } from "lucide-react";
import { answerComplementation, listMyComplementations, listMyProposals, statusLabel, statusVariant, type CommitteeProposalApi, type ProposalApi } from "../lib/api";

function formatDate(value?: string) {
  if (!value) return "-";
  return new Intl.DateTimeFormat("pt-BR", { dateStyle: "short", timeStyle: "short" }).format(new Date(value));
}

function latestJustification(proposal: ProposalApi) {
  const item = [...proposal.historico].reverse().find((h) => h.justificativa);
  return item?.justificativa;
}

export function EntrepreneurDashboard() {
  const [proposals, setProposals] = useState<ProposalApi[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [complementations, setComplementations] = useState<CommitteeProposalApi[]>([]);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [message, setMessage] = useState("");

  async function load() {
    setLoading(true);
    try {
      const [myProposals, pending] = await Promise.all([listMyProposals(), listMyComplementations().catch(() => [])]);
      setProposals(myProposals);
      setComplementations(pending);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Falha ao carregar propostas.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function sendComplementationAnswer(proposalId: string, complementationId: string) {
    setError(null);
    setMessage("");
    const resposta = answers[complementationId] || "";
    if (!resposta.trim()) {
      setError("Informe a resposta antes de enviar.");
      return;
    }
    try {
      await answerComplementation(proposalId, complementationId, resposta);
      setMessage("Resposta enviada para a comissão.");
      setAnswers((old) => ({ ...old, [complementationId]: "" }));
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Falha ao enviar resposta.");
    }
  }

  const current = proposals[0];

  return (
    <div className="min-h-screen bg-[#fafafa]">
      <Header />
      
      <main className="mx-auto max-w-[1080px] px-6 py-8">
        <div className="mb-8 flex items-start justify-between gap-4">
          <div>
            <h1 className="text-[#1a4d2e] mb-2">Olá, empreendedor</h1>
            <p className="text-[#4f6f52]">Acompanhe o status da sua proposta e complete as etapas necessárias</p>
          </div>
          <Link to="/submissao" className="inline-flex items-center gap-2 bg-[#1a4d2e] text-white px-5 py-3 hover:bg-[#4f6f52] transition-colors text-sm">
            <Send className="h-4 w-4" /> Nova manifestação
          </Link>
        </div>

        {error && <div className="mb-6 border border-red-200 bg-red-50 text-red-700 px-4 py-3 text-sm">{error}</div>}
        {message && <div className="mb-6 border border-green-200 bg-green-50 text-green-800 px-4 py-3 text-sm">{message}</div>}
        {loading && <div className="mb-6 border border-[#1a4d2e]/10 bg-white px-4 py-3 text-sm text-[#4f6f52]">Carregando propostas do backend...</div>}

        {current ? (
          <div className="grid grid-cols-3 gap-6 mb-8">
            <div className="col-span-2 border border-[#1a4d2e]/10 p-6 bg-white">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-[#4a4a4a] mb-2">{current.titulo}</h2>
                  <p className="text-sm text-[#4f6f52]">Protocolo: {current.protocolo ?? "Ainda não gerado"}</p>
                  <p className="text-xs text-[#4f6f52] mt-1">Criada em {formatDate(current.created_at)}</p>
                </div>
                <StatusBadge status={statusLabel(current.estado)} variant={statusVariant(current.estado)} />
              </div>

              <div className="border-t border-[#1a4d2e]/10 pt-4">
                <div className="flex items-center gap-2 text-sm mb-3">
                  <Clock className="h-4 w-4 text-[#4f6f52]" />
                  <span className="text-[#4a4a4a]">Status atual: {statusLabel(current.estado)}</span>
                </div>
                <div className="bg-[#e8dcc4]/30 p-4 border-l-2 border-[#4f6f52]">
                  <h4 className="text-sm text-[#4a4a4a] mb-2">Próximos passos:</h4>
                  <ul className="text-sm text-[#4f6f52] space-y-1">
                    {current.estado === "em_triagem" && <li>• Aguardar análise preliminar do gestor administrativo.</li>}
                    {current.estado === "aguardando_ajuste" && <li>• Corrigir a manifestação conforme justificativa registrada.</li>}
                    {current.estado === "aguardando_documentacao_formal" && <li>• Enviar a documentação formal exigida pelo edital.</li>}
                    {!["em_triagem", "aguardando_ajuste", "aguardando_documentacao_formal"].includes(current.estado) && <li>• Acompanhar as próximas notificações do processo seletivo.</li>}
                  </ul>
                </div>
              </div>

              <div className="mt-6 flex gap-3">
                <Link to="/submissao" className="inline-flex items-center gap-2 bg-[#1a4d2e] text-white px-6 py-3 hover:bg-[#4f6f52] transition-colors">
                  Continuar preenchimento
                </Link>
                <Link to={`/proposta/${current.id}`} className="inline-flex items-center gap-2 border border-[#1a4d2e]/20 text-[#1a4d2e] px-6 py-3 hover:bg-[#f4f1e8] transition-colors">
                  <Eye className="h-4 w-4" /> Ver detalhes
                </Link>
              </div>
            </div>

            <div className="border border-[#1a4d2e]/10 p-6 bg-white">
              <h3 className="text-[#4a4a4a] mb-4">Histórico e mensagens</h3>
              <div className="space-y-3">
                {latestJustification(current) && (
                  <div className="text-sm border-l-2 border-amber-500 pl-3 py-2">
                    <div className="text-[#4a4a4a] mb-1">Justificativa registrada</div>
                    <p className="text-[#4f6f52]">{latestJustification(current)}</p>
                  </div>
                )}
                {current.historico.slice(-4).reverse().map((item, index) => (
                  <div key={`${item.criado_em}-${index}`} className="text-sm border-l-2 border-[#8fbc8f] pl-3 py-2">
                    <div className="text-[#4a4a4a] mb-1">{formatDate(item.criado_em)}</div>
                    <p className="text-[#4f6f52]">Status alterado para {statusLabel(item.estado_novo)}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : !loading && (
          <div className="border border-[#1a4d2e]/10 p-8 bg-white mb-8">
            <h2 className="text-[#1a4d2e] mb-2">Nenhuma manifestação enviada</h2>
            <p className="text-[#4f6f52] mb-5">Envie sua manifestação de interesse para iniciar o fluxo do processo seletivo.</p>
            <Link to="/submissao" className="inline-flex items-center gap-2 bg-[#1a4d2e] text-white px-6 py-3 hover:bg-[#4f6f52] transition-colors">
              <Send className="h-4 w-4" /> Submeter manifestação
            </Link>
          </div>
        )}

        {complementations.length > 0 && (
          <div className="border border-amber-200 bg-amber-50 p-6 mb-6">
            <h2 className="text-amber-900 mb-4">Solicitação da comissão</h2>
            <div className="space-y-4">
              {complementations.flatMap((proposal) => proposal.complementations.filter((item) => item.status === "pendente").map((item) => (
                <div key={item.id} className="bg-white border border-amber-200 p-4">
                  <div className="flex items-center justify-between mb-2">
                    <strong className="text-[#4a4a4a]">{proposal.titulo}</strong>
                    <StatusBadge status="Aguardando resposta" variant="warning" />
                  </div>
                  <p className="text-sm text-[#4f6f52] mb-2">{item.descricao}</p>
                  {item.prazo && <p className="text-xs text-[#4f6f52] mb-3">Prazo: {item.prazo}</p>}
                  <textarea
                    value={answers[item.id] || ""}
                    onChange={(event) => setAnswers((old) => ({ ...old, [item.id]: event.target.value }))}
                    className="w-full min-h-24 border border-amber-300 px-3 py-2 mb-3 bg-white"
                    placeholder="Digite sua resposta para a comissão"
                  />
                  <button onClick={() => sendComplementationAnswer(proposal.proposal_id, item.id)} className="bg-[#1a4d2e] text-white px-4 py-2 hover:bg-[#4f6f52] text-sm">Enviar resposta</button>
                </div>
              )))}
            </div>
          </div>
        )}

        <div className="border border-[#1a4d2e]/10 p-6 bg-white mb-6">
          <h2 className="text-[#4a4a4a] mb-6">Checklist de etapas</h2>
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <CheckCircle2 className="h-6 w-6 text-[#8fbc8f] flex-shrink-0 mt-0.5" />
              <div className="flex-1"><div className="flex items-center justify-between mb-1"><h3 className="text-[#4a4a4a]">Manifestação de interesse</h3><StatusBadge status={current ? "Registrada" : "Pendente"} variant={current ? "success" : "warning"} /></div><p className="text-sm text-[#4f6f52]">Submissão inicial com geração de protocolo real no SQLite</p></div>
            </div>
            <div className="flex items-start gap-4">
              <Circle className="h-6 w-6 text-amber-500 flex-shrink-0 mt-0.5" />
              <div className="flex-1"><div className="flex items-center justify-between mb-1"><h3 className="text-[#4a4a4a]">Triagem preliminar</h3><StatusBadge status={current?.estado === "em_triagem" ? "Em andamento" : current ? "Conforme status" : "Aguardando"} variant={current?.estado === "em_triagem" ? "warning" : "default"} /></div><p className="text-sm text-[#4f6f52]">Análise do gestor administrativo</p></div>
            </div>
            <div className="flex items-start gap-4">
              <Circle className="h-6 w-6 text-[#4f6f52]/30 flex-shrink-0 mt-0.5" />
              <div className="flex-1"><div className="flex items-center justify-between mb-1"><h3 className="text-[#4a4a4a]">Documentação formal</h3><StatusBadge status="Disponível" variant="default" /></div><p className="text-sm text-[#4f6f52]">Envio e validação documental integrados ao sistema</p><Link to="/documentos" className="text-sm text-[#1a4d2e] hover:underline mt-2 inline-block">Ir para documentação →</Link></div>
            </div>
          </div>
        </div>

        <div className="border border-[#1a4d2e]/10 p-6 bg-white">
          <h3 className="text-[#4a4a4a] mb-3">Estado da integração</h3>
          <PrototypeNote>
            Demonstração integrada: a manifestação é salva no sistema, o protocolo é gerado automaticamente, o histórico é mantido e o gestor consegue realizar a triagem.
          </PrototypeNote>
        </div>
      </main>
    </div>
  );
}
