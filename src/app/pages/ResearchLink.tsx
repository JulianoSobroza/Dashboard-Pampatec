import { useState } from "react";
import { Link, useParams } from "react-router";
import { Header } from "../components/Header";
import { PrototypeNote } from "../components/PrototypeNote";
import { StatusBadge } from "../components/StatusBadge";
import { ArrowLeft, FlaskConical } from "lucide-react";

export function ResearchLink() {
  const { id } = useParams();
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="min-h-screen bg-[#fafafa]">
      <Header />
      <main className="mx-auto max-w-[980px] px-6 py-8">
        <Link to="/pesquisador" className="inline-flex items-center gap-2 text-sm text-[#4f6f52] hover:text-[#1a4d2e] mb-4"><ArrowLeft className="h-4 w-4" /> Voltar às oportunidades</Link>
        <div className="flex items-start justify-between gap-4 mb-8"><div><h1 className="text-[#1a4d2e] mb-2">Vincular projeto de P&D ou cooperação técnica</h1><p className="text-[#4f6f52]">Proposta autorizada: {id ?? "PROP-2024-041"} • Sistema de Irrigação Inteligente com IoT</p></div><StatusBadge status={submitted ? "Vinculação registrada" : "Em preenchimento"} variant={submitted ? "success" : "warning"} /></div>
        <PrototypeNote>Formulário demonstrativo de vinculação previsto no RF-16/UC-16. O objetivo é registrar a proposta de interação universidade–empresa no contexto do processo seletivo.</PrototypeNote>

        <section className="bg-white border border-[#1a4d2e]/10 p-6 shadow-sm mt-6">
          <h2 className="text-[#1a4d2e] mb-6 flex items-center gap-2"><FlaskConical className="h-5 w-5" /> Dados da vinculação</h2>
          <div className="space-y-5">
            <div><label className="block text-sm text-[#4a4a4a] mb-2">Título do projeto *</label><input defaultValue="Validação de modelos preditivos para irrigação de precisão no bioma Pampa" className="w-full border border-[#4f6f52]/30 px-3 py-2" /></div>
            <div><label className="block text-sm text-[#4a4a4a] mb-2">Resumo *</label><textarea rows={4} defaultValue="Projeto de P&D voltado à validação de sensores e modelos preditivos em condições climáticas e produtivas da Fronteira Oeste." className="w-full border border-[#4f6f52]/30 px-3 py-2" /></div>
            <div className="grid md:grid-cols-2 gap-5">
              <div><label className="block text-sm text-[#4a4a4a] mb-2">Responsabilidades da UNIPAMPA *</label><textarea rows={5} defaultValue="Disponibilizar orientação científica, apoio metodológico e acesso autorizado à infraestrutura laboratorial prevista no plano de trabalho." className="w-full border border-[#4f6f52]/30 px-3 py-2" /></div>
              <div><label className="block text-sm text-[#4a4a4a] mb-2">Responsabilidades da organização *</label><textarea rows={5} defaultValue="Disponibilizar protótipo, dados operacionais, equipe técnica e recursos materiais necessários aos testes de campo." className="w-full border border-[#4f6f52]/30 px-3 py-2" /></div>
            </div>
            <div><label className="block text-sm text-[#4a4a4a] mb-2">Plano de trabalho *</label><textarea rows={6} defaultValue="1. Planejamento experimental; 2. Instrumentação e coleta de dados; 3. Validação dos modelos; 4. Análise dos resultados; 5. Relatório técnico e definição de próximos passos." className="w-full border border-[#4f6f52]/30 px-3 py-2" /></div>
            <div><label className="block text-sm text-[#4a4a4a] mb-2">Justificativa da interação com a UNIPAMPA</label><textarea rows={4} defaultValue="A parceria permite validar a solução com apoio de competências acadêmicas e infraestrutura compatíveis com o domínio tecnológico da proposta." className="w-full border border-[#4f6f52]/30 px-3 py-2" /></div>
          </div>
          {submitted && <div className="mt-5 border border-green-200 bg-green-50 p-3 text-sm text-green-800">Vinculação registrada na demonstração e disponibilizada ao gestor e à Comissão Técnica.</div>}
          <div className="flex justify-end mt-6"><button onClick={() => setSubmitted(true)} className="bg-[#1a4d2e] text-white px-6 py-3 hover:bg-[#4f6f52]">Registrar vinculação</button></div>
        </section>
      </main>
    </div>
  );
}
