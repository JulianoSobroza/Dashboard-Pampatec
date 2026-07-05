import { useState } from "react";
import { Link } from "react-router";
import { Header } from "../components/Header";
import { PrototypeNote } from "../components/PrototypeNote";
import { StatusBadge } from "../components/StatusBadge";
import { ArrowLeft, FileText, Gavel, Paperclip } from "lucide-react";

const resource = {
  protocol: "REC-2026-001",
  proposal: "AquaPampa Sensores",
  proposalProtocol: "PMP-2026-0090",
  submittedAt: "03/07/2026, 14:32",
  reason: "Divergência significativa entre avaliadores",
  justification:
    "Solicitamos revisão do resultado porque a documentação técnica apresentada descreve evidências de validação que não foram consideradas no parecer resumido. O recurso pede exclusivamente a reanálise dos critérios de viabilidade técnica e potencial de mercado.",
};

export function ResourceJudgment() {
  const [decision, setDecision] = useState("defer");
  const [opinion, setOpinion] = useState("");
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  function submit() {
    if (!opinion.trim()) {
      setError("O parecer fundamentado é obrigatório para registrar o julgamento.");
      return;
    }
    setError("");
    setSaved(true);
  }

  return (
    <div className="min-h-screen bg-[#fafafa]">
      <Header />
      <main className="mx-auto max-w-[1080px] px-6 py-8">
        <div className="flex items-start justify-between gap-4 mb-8">
          <div>
            <Link to="/comissao" className="inline-flex items-center gap-2 text-sm text-[#4f6f52] hover:text-[#1a4d2e] mb-4">
              <ArrowLeft className="h-4 w-4" /> Voltar à comissão
            </Link>
            <h1 className="text-[#1a4d2e] mb-2">Julgamento de recurso</h1>
            <p className="text-[#4f6f52]">Analise a fundamentação apresentada e registre a decisão da Comissão Técnica.</p>
          </div>
          <StatusBadge status={saved ? "Julgado" : "Pendente"} variant={saved ? "success" : "warning"} />
        </div>

        <PrototypeNote>
          Fluxo demonstrativo de julgamento recursal. A tela representa a análise do recurso vinculado à proposta, a decisão de deferir ou indeferir e o parecer obrigatório.
        </PrototypeNote>

        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-6 mt-6">
          <section className="bg-white border border-[#1a4d2e]/10 p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-5">
              <FileText className="h-5 w-5 text-[#1a4d2e]" />
              <h2 className="text-[#1a4d2e]">Recurso {resource.protocol}</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-4 text-sm mb-6">
              <div><span className="text-[#4f6f52]">Proposta</span><div className="text-[#4a4a4a] font-medium">{resource.proposal}</div></div>
              <div><span className="text-[#4f6f52]">Protocolo da proposta</span><div className="text-[#4a4a4a] font-medium">{resource.proposalProtocol}</div></div>
              <div><span className="text-[#4f6f52]">Interposto em</span><div className="text-[#4a4a4a] font-medium">{resource.submittedAt}</div></div>
              <div><span className="text-[#4f6f52]">Motivo</span><div className="text-[#4a4a4a] font-medium">{resource.reason}</div></div>
            </div>
            <div className="border-l-2 border-[#1a4d2e] pl-4 py-2 mb-6">
              <h3 className="text-sm text-[#4a4a4a] mb-2">Fundamentação do empreendedor</h3>
              <p className="text-sm text-[#4f6f52] leading-relaxed">{resource.justification}</p>
            </div>
            <div className="border border-[#1a4d2e]/10 p-4 flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm text-[#4a4a4a]"><Paperclip className="h-4 w-4 text-[#4f6f52]" /> memorial-tecnico-recurso.pdf</div>
              <button className="text-sm text-[#1a4d2e] hover:underline">Visualizar</button>
            </div>
          </section>

          <section className="bg-white border border-[#1a4d2e]/10 p-6 shadow-sm">
            <h2 className="text-[#1a4d2e] mb-5 flex items-center gap-2"><Gavel className="h-5 w-5" /> Registrar julgamento</h2>
            {error && <div className="mb-4 border border-red-200 bg-red-50 p-3 text-sm text-red-800">{error}</div>}
            {saved && <div className="mb-4 border border-green-200 bg-green-50 p-3 text-sm text-green-800">Julgamento registrado na demonstração. O resultado fica disponível para composição do resultado final.</div>}
            <label className="block text-sm text-[#4a4a4a] mb-2">Decisão *</label>
            <select value={decision} onChange={(e) => setDecision(e.target.value)} className="w-full border border-[#4f6f52]/30 px-3 py-2 bg-white mb-5">
              <option value="defer">Deferir recurso</option>
              <option value="deny">Indeferir recurso</option>
            </select>
            <label className="block text-sm text-[#4a4a4a] mb-2">Parecer fundamentado *</label>
            <textarea value={opinion} onChange={(e) => setOpinion(e.target.value)} rows={9} className="w-full border border-[#4f6f52]/30 px-3 py-2 bg-white mb-5" placeholder="Registre os fundamentos da decisão e os critérios reavaliados." />
            <button onClick={submit} className="w-full bg-[#1a4d2e] text-white px-5 py-3 hover:bg-[#4f6f52]">Registrar julgamento</button>
          </section>
        </div>
      </main>
    </div>
  );
}
