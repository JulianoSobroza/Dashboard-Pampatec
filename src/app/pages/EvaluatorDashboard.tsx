import { Link } from "react-router";
import { Header } from "../components/Header";
import { PrototypeNote } from "../components/PrototypeNote";
import { ClipboardList, Clock, CheckCircle, Search, ChevronRight } from "lucide-react";

export function EvaluatorDashboard() {
  const assignedProposals = [
    {
      id: "PSL-2026-047",
      title: "AgroSense Pampa",
      area: "AgTech / IoT",
      status: "pending",
      deadline: "15 Jun 2026",
    },
    {
      id: "PSL-2026-058",
      title: "Pampa Tracking",
      area: "Logística",
      status: "pending",
      deadline: "18 Jun 2026",
    },
    {
      id: "PSL-2026-052",
      title: "BioFert",
      area: "Biotecnologia",
      status: "completed",
      score: 8.5,
      deadline: "10 Jun 2026",
    }
  ];

  return (
    <div className="min-h-screen bg-[#fafafa]">
      <Header />
      
      <main className="mx-auto max-w-[1080px] px-6 py-8">
        <div className="mb-8">
          <h1 className="text-[#1a4d2e] mb-2">Painel do Avaliador</h1>
          <p className="text-[#4f6f52]">
            Acompanhe as propostas atribuídas a você e seus prazos de avaliação
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white border border-[#1a4d2e]/10 p-6 flex items-center gap-4">
            <div className="h-12 w-12 bg-[#e8dcc4]/50 flex items-center justify-center rounded-full">
              <ClipboardList className="h-6 w-6 text-[#1a4d2e]" />
            </div>
            <div>
              <p className="text-sm text-[#4a4a4a]">Total atribuídas</p>
              <p className="text-2xl text-[#1a4d2e] font-semibold">3</p>
            </div>
          </div>
          
          <div className="bg-white border border-[#1a4d2e]/10 p-6 flex items-center gap-4">
            <div className="h-12 w-12 bg-[#e8dcc4]/50 flex items-center justify-center rounded-full">
              <Clock className="h-6 w-6 text-[#1a4d2e]" />
            </div>
            <div>
              <p className="text-sm text-[#4a4a4a]">Pendentes</p>
              <p className="text-2xl text-[#1a4d2e] font-semibold">2</p>
            </div>
          </div>

          <div className="bg-white border border-[#1a4d2e]/10 p-6 flex items-center gap-4">
            <div className="h-12 w-12 bg-[#1a4d2e]/10 flex items-center justify-center rounded-full">
              <CheckCircle className="h-6 w-6 text-[#1a4d2e]" />
            </div>
            <div>
              <p className="text-sm text-[#4a4a4a]">Concluídas</p>
              <p className="text-2xl text-[#1a4d2e] font-semibold">1</p>
            </div>
          </div>
        </div>

        <div className="bg-white border border-[#1a4d2e]/10">
          <div className="p-6 border-b border-[#1a4d2e]/10 flex flex-col md:flex-row justify-between items-center gap-4">
            <h2 className="text-[#4a4a4a] text-lg">Propostas para avaliação</h2>
            <div className="relative w-full md:w-64">
              <input
                type="text"
                placeholder="Buscar por protocolo..."
                className="w-full pl-9 pr-4 py-2 border border-[#4f6f52]/30 text-sm focus:outline-none focus:border-[#1a4d2e]"
              />
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-[#4f6f52]" />
            </div>
          </div>
          
          <div className="divide-y divide-[#1a4d2e]/10">
            {assignedProposals.map((proposal) => (
              <div key={proposal.id} className="p-6 hover:bg-[#fafafa] transition-colors flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-[#1a4d2e] font-medium">{proposal.id}</span>
                    <span className={`px-2 py-1 text-xs ${
                      proposal.status === 'completed' 
                        ? 'bg-[#e8dcc4] text-[#1a4d2e]' 
                        : 'bg-[#1a4d2e]/10 text-[#1a4d2e]'
                    }`}>
                      {proposal.status === 'completed' ? 'Concluída' : 'Pendente'}
                    </span>
                  </div>
                  <h3 className="text-lg text-[#4a4a4a] mb-1">{proposal.title}</h3>
                  <div className="flex items-center gap-4 text-sm text-[#4f6f52]">
                    <span>Área: {proposal.area}</span>
                    {proposal.status === 'pending' ? (
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" /> Prazo: {proposal.deadline}
                      </span>
                    ) : (
                      <span className="flex items-center gap-1">
                        <CheckCircle className="h-3 w-3" /> Nota final: {proposal.score?.toFixed(1)}
                      </span>
                    )}
                  </div>
                </div>
                
                <Link
                  to={`/avaliador/avaliacao/${proposal.id}`}
                  className={`flex items-center gap-2 px-4 py-2 border transition-colors ${
                    proposal.status === 'completed'
                      ? 'border-[#4f6f52]/30 text-[#4a4a4a] hover:bg-[#e8dcc4]'
                      : 'border-[#1a4d2e] text-[#1a4d2e] hover:bg-[#1a4d2e] hover:text-white'
                  }`}
                >
                  {proposal.status === 'completed' ? 'Ver Avaliação' : 'Avaliar'}
                  <ChevronRight className="h-4 w-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}