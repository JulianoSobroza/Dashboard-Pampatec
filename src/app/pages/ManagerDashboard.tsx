import { useState } from "react";
import { Link } from "react-router";
import { Header } from "../components/Header";
import { StatusBadge } from "../components/StatusBadge";
import { PrototypeNote } from "../components/PrototypeNote";
import { AlertTriangle, Clock, CheckCircle, Users, Filter, MoreVertical, ChevronDown } from "lucide-react";

type Proposal = {
  id: number;
  name: string;
  segment: string;
  days?: number;
  responsible?: string;
  pendency?: string;
  evaluators?: string;
  status?: string;
};

type ProcessData = {
  indicators: { recebidas: number; pendencias: number; atrasos: number; recursos: number };
  funnel: {
    interesse: Proposal[];
    triagem: Proposal[];
    documentacao: Proposal[];
    avaliacao: Proposal[];
    pitch: Proposal[];
    deliberacao: Proposal[];
    concluido: Proposal[];
  };
};

const processesData: Record<string, ProcessData> = {
  "2026.1": {
    indicators: { recebidas: 23, pendencias: 2, atrasos: 1, recursos: 0 },
    funnel: {
      interesse: [
        { id: 1, name: "Energia Sul", segment: "Energia renovável", days: 2 },
      ],
      triagem: [
        { id: 2, name: "BioSolo Analytics", segment: "Biotecnologia", days: 5, responsible: "Dr. Carlos" },
      ],
      documentacao: [
        { id: 3, name: "AgroSense Pampa", segment: "AgTech", days: 7, pendency: "Certidão municipal" },
        { id: 4, name: "AquaTrack IoT", segment: "IoT", days: 3, pendency: "Plano de negócio" },
      ],
      avaliacao: [
        { id: 5, name: "CodeCamp RS", segment: "EdTech", days: 12, evaluators: "3/5" },
        { id: 6, name: "MediSync", segment: "HealthTech", days: 10, evaluators: "5/5" },
      ],
      pitch: [],
      deliberacao: [
        { id: 7, name: "EcoPlast Pampa", segment: "Sustentabilidade", days: 1 },
      ],
      concluido: [
        { id: 8, name: "DroneMap Sul", segment: "Geotecnologia", days: 0, status: "Publicado" },
      ],
    }
  },
  "2025.2": {
    indicators: { recebidas: 45, pendencias: 0, atrasos: 0, recursos: 1 },
    funnel: {
      interesse: [],
      triagem: [],
      documentacao: [],
      avaliacao: [],
      pitch: [],
      deliberacao: [
        { id: 12, name: "AgriDrone", segment: "AgTech", days: 4 },
      ],
      concluido: [
        { id: 9, name: "FinPampa", segment: "FinTech", status: "Homologado" },
        { id: 10, name: "EducaTI", segment: "EdTech", status: "Homologado" },
        { id: 11, name: "NutriLife", segment: "HealthTech", status: "Recurso em Análise" },
      ],
    }
  },
  "2025.1": {
    indicators: { recebidas: 38, pendencias: 0, atrasos: 0, recursos: 0 },
    funnel: {
      interesse: [],
      triagem: [],
      documentacao: [],
      avaliacao: [],
      pitch: [],
      deliberacao: [],
      concluido: [
        { id: 21, name: "PampaBov", segment: "AgTech", status: "Homologado" },
        { id: 22, name: "CleanWater", segment: "Sustentabilidade", status: "Homologado" },
        { id: 23, name: "SmartCity RS", segment: "IoT", status: "Homologado" },
        { id: 24, name: "AutoLog", segment: "Logística", status: "Homologado" },
      ],
    }
  }
};

const kanbanColumns = [
  { id: "interesse", title: "Interesse", headerBg: "bg-[#e8dcc4]", headerText: "text-[#1a4d2e]", colBg: "bg-[#e8dcc4]/30", border: "border-[#d8ccb4]" },
  { id: "triagem", title: "Triagem", headerBg: "bg-[#d4c4a8]", headerText: "text-[#1a4d2e]", colBg: "bg-[#e8dcc4]/50", border: "border-[#c4b498]" },
  { id: "documentacao", title: "Documentação", headerBg: "bg-amber-400", headerText: "text-amber-900", colBg: "bg-amber-100/40", border: "border-amber-400" },
  { id: "avaliacao", title: "Avaliação", headerBg: "bg-[#8fbc8f]", headerText: "text-[#1a4d2e]", colBg: "bg-[#8fbc8f]/20", border: "border-[#7ab07a]" },
  { id: "pitch", title: "Pitch", headerBg: "bg-[#4f6f52]", headerText: "text-white", colBg: "bg-[#4f6f52]/15", border: "border-[#4f6f52]/60" },
  { id: "deliberacao", title: "Deliberação", headerBg: "bg-[#1a4d2e]", headerText: "text-white", colBg: "bg-[#1a4d2e]/10", border: "border-[#1a4d2e]/40" },
  { id: "concluido", title: "Concluído", headerBg: "bg-[#0a2012]", headerText: "text-white", colBg: "bg-[#1a4d2e]/15", border: "border-[#1a4d2e]" },
] as const;

export function ManagerDashboard() {
  const [selectedProcess, setSelectedProcess] = useState<keyof typeof processesData>("2026.1");
  const data = processesData[selectedProcess];

  return (
    <div className="min-h-screen bg-[#fafafa]">
      <Header />
      
      <main className="mx-auto max-w-[1280px] px-6 py-8">
        <div className="flex items-start justify-between mb-8">
          <div>
            <h1 className="text-[#1a4d2e] mb-2">Dashboard do Gestor</h1>
            <p className="text-[#4f6f52]">Visão geral e acompanhamento dos processos seletivos PampaTec</p>
          </div>
          
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-[#4a4a4a]">Processo Seletivo:</span>
            <div className="relative">
              <select 
                value={selectedProcess}
                onChange={(e) => setSelectedProcess(e.target.value as keyof typeof processesData)}
                className="appearance-none bg-white border border-[#1a4d2e]/20 text-[#1a4d2e] font-semibold py-2 pl-4 pr-10 rounded-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-[#1a4d2e]/50 cursor-pointer"
              >
                <option value="2026.1">Edital 2026.1 (Atual)</option>
                <option value="2025.2">Edital 2025.2</option>
                <option value="2025.1">Edital 2025.1</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#1a4d2e] pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Indicators */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          <div className="bg-white border-t-4 border-t-[#4f6f52] border-x border-b border-[#1a4d2e]/10 p-5 rounded-sm shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-[#4f6f52]">Propostas recebidas</span>
              <Users className="h-5 w-5 text-[#4f6f52]" />
            </div>
            <div className="text-3xl font-semibold text-[#1a4d2e]">{data.indicators.recebidas}</div>
          </div>
          <div className="bg-white border-t-4 border-t-amber-500 border-x border-b border-[#1a4d2e]/10 p-5 rounded-sm shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-[#4f6f52]">Pendências documentais</span>
              <AlertTriangle className="h-5 w-5 text-amber-500" />
            </div>
            <div className="text-3xl font-semibold text-amber-700">{data.indicators.pendencias}</div>
          </div>
          <div className="bg-white border-t-4 border-t-red-500 border-x border-b border-[#1a4d2e]/10 p-5 rounded-sm shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-[#4f6f52]">Avaliações em atraso</span>
              <Clock className="h-5 w-5 text-red-500" />
            </div>
            <div className="text-3xl font-semibold text-red-700">{data.indicators.atrasos}</div>
          </div>
          <div className="bg-white border-t-4 border-t-[#8fbc8f] border-x border-b border-[#1a4d2e]/10 p-5 rounded-sm shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-[#4f6f52]">Recursos abertos</span>
              <CheckCircle className="h-5 w-5 text-[#8fbc8f]" />
            </div>
            <div className="text-3xl font-semibold text-[#1a4d2e]">{data.indicators.recursos}</div>
          </div>
        </div>

        <div className="mb-6">
          <PrototypeNote>
            O quadro Kanban permite arrastar e soltar (drag & drop) as propostas entre as colunas nas fases em que o gestor tem permissão de movimentação manual.
          </PrototypeNote>
        </div>

        {/* Kanban Board */}
        <div className="bg-white border border-[#1a4d2e]/10 rounded-sm shadow-sm flex flex-col h-[700px]">
          <div className="p-4 border-b border-[#1a4d2e]/10 flex items-center justify-between bg-[#fafafa]">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-[#4f6f52]" />
              <h2 className="text-[#4a4a4a] font-semibold">Funil de Propostas • Kanban</h2>
            </div>
            <span className="text-xs font-medium bg-white border border-[#1a4d2e]/10 px-3 py-1 rounded-full text-[#4f6f52]">
              Arrastar e soltar ativado
            </span>
          </div>
          
          <div className="flex-1 overflow-x-auto p-4">
            <div className="flex gap-4 min-w-max h-full">
              {kanbanColumns.map((col) => {
                const columnProposals = data.funnel[col.id as keyof ProcessData['funnel']];
                
                return (
                  <div key={col.id} className={`w-[280px] flex flex-col h-full rounded-sm border ${col.border} ${col.colBg}`}>
                    {/* Column Header */}
                    <div className={`p-3 border-b ${col.border} ${col.headerBg} flex items-center justify-between shadow-sm`}>
                      <h3 className={`font-bold text-[13px] uppercase tracking-wide ${col.headerText}`}>
                        {col.title}
                      </h3>
                      <span className="bg-white/90 text-[#1a4d2e] text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center shadow-sm">
                        {columnProposals.length}
                      </span>
                    </div>

                    {/* Column Body / Cards Container */}
                    <div className="flex-1 overflow-y-auto p-2 space-y-3">
                      {columnProposals.map((p) => (
                        <Link
                          key={p.id}
                          to={`/proposta/${p.id}`}
                          className={`block bg-white border rounded-sm p-3 shadow-sm hover:shadow-md transition-all cursor-grab active:cursor-grabbing hover:-translate-y-0.5 relative group ${
                            p.pendency ? 'border-amber-300' : 'border-[#1a4d2e]/15'
                          }`}
                        >
                          <div className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <MoreVertical className="h-4 w-4 text-[#4a4a4a]" />
                          </div>
                          
                          <h4 className="font-semibold text-[#1a4d2e] text-[14px] leading-tight mb-1 pr-5">
                            {p.name}
                          </h4>
                          <span className="inline-block bg-[#fafafa] border border-[#1a4d2e]/5 text-[#4f6f52] text-[11px] px-2 py-0.5 rounded-sm mb-3">
                            {p.segment}
                          </span>
                          
                          {/* Conditional Tags based on state */}
                          <div className="space-y-1.5">
                            {p.status && (
                              <StatusBadge status={p.status} variant={p.status.includes('Recurso') ? 'warning' : 'success'} />
                            )}
                            
                            {p.pendency && (
                              <div className="flex items-start gap-1 text-[11px] text-amber-700 bg-amber-50 p-1.5 rounded-sm border border-amber-100">
                                <AlertTriangle className="h-3 w-3 flex-shrink-0 mt-0.5" />
                                <span className="leading-tight break-words">{p.pendency}</span>
                              </div>
                            )}
                            
                            {p.responsible && (
                              <div className="text-[11px] text-[#4a4a4a] flex items-center gap-1">
                                <span className="font-medium">Resp:</span> {p.responsible}
                              </div>
                            )}
                            
                            {p.evaluators && (
                              <div className="text-[11px] text-[#4a4a4a] flex items-center gap-1">
                                <span className="font-medium">Av:</span> {p.evaluators} respondidos
                              </div>
                            )}
                            
                            {p.days !== undefined && !p.status && (
                              <div className="flex items-center gap-1 text-[11px] text-[#4f6f52] mt-2 pt-2 border-t border-[#1a4d2e]/5">
                                <Clock className="h-3 w-3" />
                                <span>{p.days}d nesta etapa</span>
                              </div>
                            )}
                          </div>
                        </Link>
                      ))}

                      {columnProposals.length === 0 && (
                        <div className="h-24 flex items-center justify-center border-2 border-dashed border-[#1a4d2e]/10 rounded-sm">
                          <span className="text-[13px] text-[#4a4a4a] italic">Vazio</span>
                        </div>
                      )}
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
