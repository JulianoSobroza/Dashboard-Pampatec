import { useState } from "react";
import { Link } from "react-router";
import { Header } from "../components/Header";
import { PrototypeNote } from "../components/PrototypeNote";
import { StatusBadge } from "../components/StatusBadge";
import { ArrowLeft, CalendarDays, ClipboardCheck, MapPin, Users } from "lucide-react";

export function PitchManagement() {
  const [scheduled, setScheduled] = useState(true);
  const [evaluated, setEvaluated] = useState(false);
  const [notes, setNotes] = useState("");

  return (
    <div className="min-h-screen bg-[#fafafa]">
      <Header />
      <main className="mx-auto max-w-[1120px] px-6 py-8">
        <Link to="/gestor" className="inline-flex items-center gap-2 text-sm text-[#4f6f52] hover:text-[#1a4d2e] mb-4"><ArrowLeft className="h-4 w-4" /> Voltar ao painel</Link>
        <div className="flex items-start justify-between gap-4 mb-8">
          <div><h1 className="text-[#1a4d2e] mb-2">Gestão da etapa de pitch</h1><p className="text-[#4f6f52]">Agendamento da apresentação e registro da avaliação da banca.</p></div>
          <StatusBadge status={evaluated ? "Avaliação concluída" : scheduled ? "Pitch agendado" : "Aguardando agendamento"} variant={evaluated ? "success" : "warning"} />
        </div>
        <PrototypeNote>Fluxo visual de apoio ao RF-10/UC-10. O protótipo representa agendamento, comunicação das informações da apresentação e registro da avaliação do pitch.</PrototypeNote>

        <div className="grid lg:grid-cols-2 gap-6 mt-6">
          <section className="bg-white border border-[#1a4d2e]/10 p-6 shadow-sm">
            <h2 className="text-[#1a4d2e] mb-5 flex items-center gap-2"><CalendarDays className="h-5 w-5" /> Agendar apresentação</h2>
            <div className="mb-5 border border-[#1a4d2e]/10 bg-[#fafafa] p-4"><div className="text-sm text-[#4f6f52]">Proposta classificada</div><div className="text-[#4a4a4a] font-medium">PampaFoods Lab • PMP-2026-0060</div></div>
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div><label className="block text-sm text-[#4a4a4a] mb-2">Data *</label><input type="date" defaultValue="2026-07-10" className="w-full border border-[#4f6f52]/30 px-3 py-2" /></div>
              <div><label className="block text-sm text-[#4a4a4a] mb-2">Horário *</label><input type="time" defaultValue="14:00" className="w-full border border-[#4f6f52]/30 px-3 py-2" /></div>
            </div>
            <div className="mb-4"><label className="block text-sm text-[#4a4a4a] mb-2">Formato *</label><select className="w-full border border-[#4f6f52]/30 px-3 py-2 bg-white"><option>Presencial</option><option>Virtual</option></select></div>
            <div className="mb-4"><label className="block text-sm text-[#4a4a4a] mb-2">Local ou link *</label><div className="relative"><MapPin className="absolute left-3 top-3 h-4 w-4 text-[#4f6f52]" /><input defaultValue="Sala de reuniões PampaTec" className="w-full border border-[#4f6f52]/30 pl-9 pr-3 py-2" /></div></div>
            <div className="mb-5"><label className="block text-sm text-[#4a4a4a] mb-2">Banca *</label><div className="relative"><Users className="absolute left-3 top-3 h-4 w-4 text-[#4f6f52]" /><input defaultValue="AV-001, AV-002 e membro da Comissão Técnica" className="w-full border border-[#4f6f52]/30 pl-9 pr-3 py-2" /></div></div>
            <button onClick={() => setScheduled(true)} className="w-full bg-[#1a4d2e] text-white px-5 py-3 hover:bg-[#4f6f52]">Confirmar agendamento</button>
          </section>

          <section className="bg-white border border-[#1a4d2e]/10 p-6 shadow-sm">
            <h2 className="text-[#1a4d2e] mb-5 flex items-center gap-2"><ClipboardCheck className="h-5 w-5" /> Avaliação do pitch</h2>
            <div className="space-y-5">
              {["Clareza e domínio da proposta", "Viabilidade da defesa apresentada", "Capacidade da equipe em responder à banca"].map((criterion, index) => (
                <div key={criterion} className="border-b border-[#1a4d2e]/10 pb-5">
                  <div className="flex items-center justify-between mb-2"><label className="text-sm text-[#4a4a4a]">{criterion}</label><span className="text-xs text-[#4f6f52]">Peso {index === 0 ? "2.0" : "1.0"}</span></div>
                  <select className="w-full border border-[#4f6f52]/30 px-3 py-2 bg-white"><option>Selecione a nota</option>{[0,1,2,3,4,5,6,7,8,9,10].map((n) => <option key={n}>{n}</option>)}</select>
                </div>
              ))}
            </div>
            <label className="block text-sm text-[#4a4a4a] mb-2 mt-5">Observações da banca *</label>
            <textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={6} className="w-full border border-[#4f6f52]/30 px-3 py-2 mb-5" placeholder="Registre observações relevantes da apresentação e da entrevista." />
            <button disabled={!notes.trim()} onClick={() => setEvaluated(true)} className="w-full bg-[#1a4d2e] text-white px-5 py-3 hover:bg-[#4f6f52] disabled:opacity-50">Concluir avaliação do pitch</button>
          </section>
        </div>
      </main>
    </div>
  );
}
