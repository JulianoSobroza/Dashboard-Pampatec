import { Header } from "../components/Header";
import { User, Shield, ClipboardList, Clock, FileOutput } from "lucide-react";

const phases = [
  {
    id: 1,
    name: "Manifestação de interesse",
    description: "Empreendedor expressa interesse na incubação (plano com validade de até 6 meses)",
    actors: ["Empreendedor"],
    duration: "Contínuo",
    outputs: "Cadastro inicial no sistema",
  },
  {
    id: 2,
    name: "Triagem preliminar e negociação",
    description: "Verificação de aderência básica e alinhamento com a UNIPAMPA, especialmente para organização associada",
    actors: ["Gestor PampaTec", "Empreendedor"],
    duration: "Definido em edital",
    outputs: "Parecer de triagem e orientações",
  },
  {
    id: 3,
    name: "Submissão formal completa",
    description: "Preenchimento completo do plano de negócio e envio de todos os documentos",
    actors: ["Empreendedor"],
    duration: "Até 15 dias p/ documentação",
    outputs: "Proposta completa + documentação",
  },
  {
    id: 4,
    name: "Análise de propostas assíncrona",
    description: "Avaliação técnica por comissão de avaliadores usando rubricas padronizadas",
    actors: ["Avaliador/Comissão"],
    duration: "Conforme calendário",
    outputs: "Pareceres individuais + notas",
  },
  {
    id: 5,
    name: "Pré-classificação para pitch",
    description: "Consolidação das avaliações e definição de quais projetos avançam para a defesa",
    actors: ["Avaliador/Comissão", "Gestor PampaTec"],
    duration: "Pré-evento",
    outputs: "Lista de convocados para o pitch",
  },
  {
    id: 6,
    name: "Apresentação / pitch",
    description: "Apresentação presencial ou virtual da proposta para a banca avaliadora",
    actors: ["Empreendedor", "Avaliador/Comissão"],
    duration: "Até 10 dias após resultado da triagem",
    outputs: "Nota de apresentação",
  },
  {
    id: 7,
    name: "Deliberação e ranqueamento",
    description: "Reunião de consenso para decisão final e ranqueamento das propostas com base nas notas",
    actors: ["Gestor PampaTec", "Avaliador/Comissão"],
    duration: "Até 10 dias após entrevista",
    outputs: "Ranqueamento e classificação preliminar",
  },
  {
    id: 8,
    name: "Divulgação de resultados",
    description: "Publicação oficial do resultado preliminar do processo de seleção",
    actors: ["Gestor PampaTec"],
    duration: "Imediato após deliberação",
    outputs: "Edital de resultado preliminar",
  },
  {
    id: 9,
    name: "Gestão de recursos",
    description: "Prazo para interposição pelo empreendedor e análise pela comissão recursal",
    actors: ["Empreendedor", "Avaliador/Comissão"],
    duration: "Conforme edital",
    outputs: "Decisões sobre recursos",
  },
  {
    id: 10,
    name: "Homologação e convocação",
    description: "Publicação do resultado final definitivo e convocação para formalização",
    actors: ["Gestor PampaTec"],
    duration: "Até 5 dias úteis (após doc.)",
    outputs: "Termo de incubação / Contratação",
  },
];

const getActorIcon = (actor: string) => {
  if (actor === "Empreendedor") return <User className="h-3.5 w-3.5 text-[#1a4d2e]" />;
  if (actor === "Gestor PampaTec") return <Shield className="h-3.5 w-3.5 text-[#4f6f52]" />;
  if (actor === "Avaliador/Comissão") return <ClipboardList className="h-3.5 w-3.5 text-[#8fbc8f]" />;
  return null;
};

const columns = [
  {
    title: "1. Inscrição e Submissão",
    phases: phases.slice(0, 3),
    bg: "bg-[#e8dcc4]/20",
    headerBg: "bg-[#e8dcc4]/60",
    borderColor: "border-[#e8dcc4]",
  },
  {
    title: "2. Avaliação e Seleção",
    phases: phases.slice(3, 7),
    bg: "bg-[#4f6f52]/5",
    headerBg: "bg-[#4f6f52]/20",
    borderColor: "border-[#4f6f52]/30",
  },
  {
    title: "3. Resultados e Contratação",
    phases: phases.slice(7, 10),
    bg: "bg-[#1a4d2e]/5",
    headerBg: "bg-[#1a4d2e]/10",
    borderColor: "border-[#1a4d2e]/20",
  }
];

export function FlowMap() {
  return (
    <div className="min-h-screen bg-[#fafafa]">
      <Header />
      
      <main className="mx-auto max-w-[1080px] px-6 py-8">
        <div className="mb-8">
          <h1 className="text-[#1a4d2e] mb-2">Mapa geral do fluxo</h1>
          <p className="text-[#4f6f52]">
            Visão em colunas do ciclo de vida completo do processo seletivo da PampaTec
          </p>
        </div>

        {/* Legend */}
        <div className="bg-white border border-[#1a4d2e]/10 p-4 mb-8 rounded-sm flex flex-wrap items-center gap-x-8 gap-y-4">
          <span className="text-sm font-medium text-[#4a4a4a]">Legenda de atores:</span>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-[#fafafa] border border-[#1a4d2e]/20 flex items-center justify-center">
              <User className="h-3.5 w-3.5 text-[#1a4d2e]" />
            </div>
            <span className="text-sm text-[#4a4a4a]">Empreendedor</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-[#fafafa] border border-[#1a4d2e]/20 flex items-center justify-center">
              <Shield className="h-3.5 w-3.5 text-[#4f6f52]" />
            </div>
            <span className="text-sm text-[#4a4a4a]">Gestor PampaTec</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-[#fafafa] border border-[#1a4d2e]/20 flex items-center justify-center">
              <ClipboardList className="h-3.5 w-3.5 text-[#8fbc8f]" />
            </div>
            <span className="text-sm text-[#4a4a4a]">Avaliador/Comissão</span>
          </div>
        </div>

        {/* Board Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {columns.map((col, colIdx) => (
            <div key={colIdx} className={`rounded-sm border ${col.borderColor} ${col.bg} flex flex-col h-full`}>
              <div className={`p-4 ${col.headerBg} border-b ${col.borderColor}`}>
                <h2 className="text-[#1a4d2e] font-semibold text-lg">{col.title}</h2>
              </div>
              
              <div className="p-4 flex flex-col gap-4 flex-1">
                {col.phases.map((phase) => (
                  <div 
                    key={phase.id} 
                    className="bg-white p-5 border border-[#1a4d2e]/10 shadow-sm rounded-sm hover:shadow-md hover:border-[#1a4d2e]/30 transition-all group flex flex-col h-[320px]"
                  >
                    <div className="flex items-start gap-3 mb-3">
                      <div className="w-7 h-7 rounded-full bg-[#1a4d2e] text-white text-sm flex items-center justify-center flex-shrink-0 font-medium">
                        {phase.id}
                      </div>
                      <h3 className="text-[15px] font-semibold text-[#1a4d2e] leading-tight pt-1">
                        {phase.name}
                      </h3>
                    </div>
                    
                    <p className="text-[13px] text-[#4f6f52] mb-4 leading-relaxed">
                      {phase.description}
                    </p>
                    
                    <div className="space-y-2.5 mb-5 bg-[#fafafa] p-3 rounded-sm border border-[#1a4d2e]/5">
                      <div className="flex items-start gap-2.5 text-[13px] text-[#4a4a4a]">
                        <Clock className="h-4 w-4 text-[#4f6f52] flex-shrink-0 mt-0.5" />
                        <span className="leading-tight"><span className="font-medium">Prazo:</span> {phase.duration}</span>
                      </div>
                      <div className="flex items-start gap-2.5 text-[13px] text-[#4a4a4a]">
                        <FileOutput className="h-4 w-4 text-[#4f6f52] flex-shrink-0 mt-0.5" />
                        <span className="leading-tight"><span className="font-medium">Saída:</span> {phase.outputs}</span>
                      </div>
                    </div>
                    
                    <div className="mt-auto pt-4 border-t border-[#1a4d2e]/10 flex items-center justify-between">
                      <span className="text-[11px] uppercase tracking-wider text-[#4f6f52] font-semibold">Envolvidos</span>
                      <div className="flex -space-x-2">
                        {phase.actors.map((actor) => (
                          <div 
                            key={actor} 
                            title={actor} 
                            className="w-8 h-8 rounded-full bg-white border border-[#1a4d2e]/20 flex items-center justify-center relative hover:z-10 hover:-translate-y-1 shadow-sm transition-all"
                          >
                            {getActorIcon(actor)}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>        
      </main>
    </div>
  );
}
