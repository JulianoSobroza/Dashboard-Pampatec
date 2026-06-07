import { Link } from "react-router";
import { Header } from "../components/Header";
import { StatusBadge } from "../components/StatusBadge";
import { PrototypeNote } from "../components/PrototypeNote";
import { AlertTriangle, Clock, CheckCircle, Users } from "lucide-react";

const proposals = {
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
  publicado: [
    { id: 8, name: "DroneMap Sul", segment: "Geotecnologia", days: 0 },
  ],
  recurso: [],
  homologado: [],
};

export function ManagerDashboard() {
  return (
    <div className="min-h-screen bg-[#fafafa]">
      <Header />
      
      <main className="mx-auto max-w-[1080px] px-6 py-8">
        <div className="mb-8">
          <h1 className="text-[#1a4d2e] mb-2">Dashboard do Gestor</h1>
          <p className="text-[#4f6f52]">Visão geral do processo seletivo PampaTec 2026/1</p>
        </div>

        {/* Indicators */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          <div className="bg-white border border-[#1a4d2e]/10 p-5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-[#4f6f52]">Propostas recebidas</span>
              <Users className="h-5 w-5 text-[#4f6f52]" />
            </div>
            <div className="text-3xl text-[#1a4d2e]">23</div>
          </div>
          <div className="bg-white border border-[#1a4d2e]/10 p-5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-[#4f6f52]">Pendências documentais</span>
              <AlertTriangle className="h-5 w-5 text-amber-500" />
            </div>
            <div className="text-3xl text-amber-700">2</div>
          </div>
          <div className="bg-white border border-[#1a4d2e]/10 p-5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-[#4f6f52]">Avaliações em atraso</span>
              <Clock className="h-5 w-5 text-red-500" />
            </div>
            <div className="text-3xl text-red-700">1</div>
          </div>
          <div className="bg-white border border-[#1a4d2e]/10 p-5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-[#4f6f52]">Recursos abertos</span>
              <CheckCircle className="h-5 w-5 text-[#8fbc8f]" />
            </div>
            <div className="text-3xl text-[#1a4d2e]">0</div>
          </div>
        </div>

        <div className="mb-6">
          <PrototypeNote>
            Regras do edital a parametrizar: prazos de cada etapa, critérios de triagem automática,
            número de avaliadores necessários, sistema de notificações, alertas de conformidade.
          </PrototypeNote>
        </div>

        {/* Kanban Board */}
        <div className="bg-white border border-[#1a4d2e]/10 p-6">
          <h2 className="text-[#4a4a4a] mb-6">Funil de propostas</h2>
          
          <div className="grid grid-cols-4 gap-4">
            {/* Column 1 */}
            <div>
              <div className="bg-[#e8dcc4] px-3 py-2 mb-3">
                <h3 className="text-sm text-[#4a4a4a]">Interesse recebido</h3>
                <span className="text-xs text-[#4f6f52]">{proposals.interesse.length}</span>
              </div>
              <div className="space-y-2">
                {proposals.interesse.map(p => (
                  <Link
                    key={p.id}
                    to={`/proposta/${p.id}`}
                    className="block border border-[#1a4d2e]/10 p-3 bg-white hover:shadow-md transition-shadow"
                  >
                    <h4 className="text-sm text-[#4a4a4a] mb-1">{p.name}</h4>
                    <p className="text-xs text-[#4f6f52] mb-2">{p.segment}</p>
                    <div className="flex items-center gap-1 text-xs text-[#4f6f52]">
                      <Clock className="h-3 w-3" />
                      <span>{p.days}d</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Column 2 */}
            <div>
              <div className="bg-[#e8dcc4] px-3 py-2 mb-3">
                <h3 className="text-sm text-[#4a4a4a]">Triagem preliminar</h3>
                <span className="text-xs text-[#4f6f52]">{proposals.triagem.length}</span>
              </div>
              <div className="space-y-2">
                {proposals.triagem.map(p => (
                  <Link
                    key={p.id}
                    to={`/proposta/${p.id}`}
                    className="block border border-[#1a4d2e]/10 p-3 bg-white hover:shadow-md transition-shadow"
                  >
                    <h4 className="text-sm text-[#4a4a4a] mb-1">{p.name}</h4>
                    <p className="text-xs text-[#4f6f52] mb-2">{p.segment}</p>
                    <div className="text-xs text-[#4f6f52]">Resp: {p.responsible}</div>
                    <div className="flex items-center gap-1 text-xs text-[#4f6f52] mt-1">
                      <Clock className="h-3 w-3" />
                      <span>{p.days}d</span>
                    </div>
                  </Link>
                ))}
              </div>

              <div className="bg-[#e8dcc4] px-3 py-2 mb-3 mt-6">
                <h3 className="text-sm text-[#4a4a4a]">Aguardando documentação</h3>
                <span className="text-xs text-[#4f6f52]">{proposals.documentacao.length}</span>
              </div>
              <div className="space-y-2">
                {proposals.documentacao.map(p => (
                  <Link
                    key={p.id}
                    to={`/proposta/${p.id}`}
                    className="block border border-amber-300 p-3 bg-amber-50 hover:shadow-md transition-shadow"
                  >
                    <h4 className="text-sm text-[#4a4a4a] mb-1">{p.name}</h4>
                    <p className="text-xs text-[#4f6f52] mb-2">{p.segment}</p>
                    <StatusBadge status={p.pendency || ""} variant="warning" />
                    <div className="flex items-center gap-1 text-xs text-amber-700 mt-2">
                      <AlertTriangle className="h-3 w-3" />
                      <span>{p.days}d aguardando</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Column 3 */}
            <div>
              <div className="bg-[#e8dcc4] px-3 py-2 mb-3">
                <h3 className="text-sm text-[#4a4a4a]">Em avaliação técnica</h3>
                <span className="text-xs text-[#4f6f52]">{proposals.avaliacao.length}</span>
              </div>
              <div className="space-y-2">
                {proposals.avaliacao.map(p => (
                  <Link
                    key={p.id}
                    to={`/proposta/${p.id}`}
                    className="block border border-[#1a4d2e]/10 p-3 bg-white hover:shadow-md transition-shadow"
                  >
                    <h4 className="text-sm text-[#4a4a4a] mb-1">{p.name}</h4>
                    <p className="text-xs text-[#4f6f52] mb-2">{p.segment}</p>
                    <div className="text-xs text-[#4f6f52]">Avaliadores: {p.evaluators}</div>
                    <div className="flex items-center gap-1 text-xs text-[#4f6f52] mt-1">
                      <Clock className="h-3 w-3" />
                      <span>{p.days}d</span>
                    </div>
                  </Link>
                ))}
              </div>

              <div className="bg-[#e8dcc4] px-3 py-2 mb-3 mt-6">
                <h3 className="text-sm text-[#4a4a4a]">Pitch agendado</h3>
                <span className="text-xs text-[#4f6f52]">{proposals.pitch.length}</span>
              </div>
              <div className="text-xs text-[#4f6f52] text-center py-4">
                Nenhuma proposta
              </div>
            </div>

            {/* Column 4 */}
            <div>
              <div className="bg-[#e8dcc4] px-3 py-2 mb-3">
                <h3 className="text-sm text-[#4a4a4a]">Deliberação</h3>
                <span className="text-xs text-[#4f6f52]">{proposals.deliberacao.length}</span>
              </div>
              <div className="space-y-2">
                {proposals.deliberacao.map(p => (
                  <Link
                    key={p.id}
                    to={`/proposta/${p.id}`}
                    className="block border border-[#1a4d2e]/10 p-3 bg-white hover:shadow-md transition-shadow"
                  >
                    <h4 className="text-sm text-[#4a4a4a] mb-1">{p.name}</h4>
                    <p className="text-xs text-[#4f6f52] mb-2">{p.segment}</p>
                    <div className="flex items-center gap-1 text-xs text-[#4f6f52]">
                      <Clock className="h-3 w-3" />
                      <span>{p.days}d</span>
                    </div>
                  </Link>
                ))}
              </div>

              <div className="bg-[#8fbc8f] px-3 py-2 mb-3 mt-6">
                <h3 className="text-sm text-white">Resultado publicado</h3>
                <span className="text-xs text-white/80">{proposals.publicado.length}</span>
              </div>
              <div className="space-y-2">
                {proposals.publicado.map(p => (
                  <Link
                    key={p.id}
                    to={`/proposta/${p.id}`}
                    className="block border border-[#8fbc8f] p-3 bg-[#8fbc8f]/10 hover:shadow-md transition-shadow"
                  >
                    <h4 className="text-sm text-[#4a4a4a] mb-1">{p.name}</h4>
                    <p className="text-xs text-[#4f6f52]">{p.segment}</p>
                  </Link>
                ))}
              </div>

              <div className="bg-[#e8dcc4] px-3 py-2 mb-3 mt-6">
                <h3 className="text-sm text-[#4a4a4a]">Recurso</h3>
                <span className="text-xs text-[#4f6f52]">{proposals.recurso.length}</span>
              </div>

              <div className="bg-[#1a4d2e] px-3 py-2 mb-3 mt-6">
                <h3 className="text-sm text-white">Homologado</h3>
                <span className="text-xs text-white/80">{proposals.homologado.length}</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
