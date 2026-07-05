import { useState } from "react";
import { Link } from "react-router";
import { Header } from "../components/Header";
import { PrototypeNote } from "../components/PrototypeNote";
import { StatusBadge } from "../components/StatusBadge";
import { ArrowLeft, CheckCircle2, Megaphone, Send } from "lucide-react";

export function PublicationManagement() {
  const [preliminary, setPreliminary] = useState(false);
  const [finalPublished, setFinalPublished] = useState(false);
  const [convoked, setConvoked] = useState(false);

  return (
    <div className="min-h-screen bg-[#fafafa]">
      <Header />
      <main className="mx-auto max-w-[1080px] px-6 py-8">
        <Link to="/gestor" className="inline-flex items-center gap-2 text-sm text-[#4f6f52] hover:text-[#1a4d2e] mb-4"><ArrowLeft className="h-4 w-4" /> Voltar ao painel</Link>
        <div className="mb-8"><h1 className="text-[#1a4d2e] mb-2">Publicação de resultados e convocação</h1><p className="text-[#4f6f52]">Representação das ações finais do gestor no processo seletivo.</p></div>
        <PrototypeNote>Os botões abaixo simulam a publicação do resultado preliminar, do resultado final e o registro da convocação. Nenhuma comunicação externa real é enviada.</PrototypeNote>

        <div className="space-y-6 mt-6">
          <section className="bg-white border border-[#1a4d2e]/10 p-6 shadow-sm">
            <div className="flex items-start justify-between gap-4 mb-5"><div><h2 className="text-[#1a4d2e] flex items-center gap-2"><Megaphone className="h-5 w-5" /> Resultado preliminar</h2><p className="text-sm text-[#4f6f52] mt-2">6 propostas deliberadas e prontas para divulgação inicial.</p></div><StatusBadge status={preliminary ? "Publicado" : "Pronto para publicação"} variant={preliminary ? "success" : "warning"} /></div>
            <div className="grid md:grid-cols-3 gap-3 mb-5 text-sm"><div className="border p-3">Classificadas: <strong>3</strong></div><div className="border p-3">Não classificadas: <strong>3</strong></div><div className="border p-3">Prazo de recurso: <strong>3 dias úteis</strong></div></div>
            <button onClick={() => setPreliminary(true)} className="bg-[#1a4d2e] text-white px-5 py-2.5 hover:bg-[#4f6f52]">Publicar resultado preliminar</button>
          </section>

          <section className="bg-white border border-[#1a4d2e]/10 p-6 shadow-sm">
            <div className="flex items-start justify-between gap-4 mb-5"><div><h2 className="text-[#1a4d2e] flex items-center gap-2"><CheckCircle2 className="h-5 w-5" /> Resultado final</h2><p className="text-sm text-[#4f6f52] mt-2">Todos os recursos demonstrativos foram julgados. Classificação consolidada disponível.</p></div><StatusBadge status={finalPublished ? "Publicado" : "Aguardando publicação"} variant={finalPublished ? "success" : "default"} /></div>
            <button onClick={() => setFinalPublished(true)} className="bg-[#1a4d2e] text-white px-5 py-2.5 hover:bg-[#4f6f52]">Publicar resultado final</button>
          </section>

          <section className="bg-white border border-[#1a4d2e]/10 p-6 shadow-sm">
            <div className="flex items-start justify-between gap-4 mb-5"><div><h2 className="text-[#1a4d2e] flex items-center gap-2"><Send className="h-5 w-5" /> Convocação dos aprovados</h2><p className="text-sm text-[#4f6f52] mt-2">Registre as orientações formais para os próximos trâmites externos ao sistema.</p></div><StatusBadge status={convoked ? "Convocados" : "Pendente"} variant={convoked ? "success" : "warning"} /></div>
            <textarea rows={5} defaultValue="Os empreendedores aprovados deverão acompanhar as orientações institucionais para formalização dos trâmites externos ao processo seletivo." className="w-full border border-[#4f6f52]/30 px-3 py-2 mb-4" />
            <button onClick={() => setConvoked(true)} className="bg-[#1a4d2e] text-white px-5 py-2.5 hover:bg-[#4f6f52]">Registrar convocação</button>
          </section>
        </div>
      </main>
    </div>
  );
}
