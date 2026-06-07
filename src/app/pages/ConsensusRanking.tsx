import { Header } from "../components/Header";
import { StatusBadge } from "../components/StatusBadge";
import { PrototypeNote } from "../components/PrototypeNote";
import { TrendingUp, MessageCircle, ArrowUpDown } from "lucide-react";

const proposals = [
  {
    id: 1,
    name: "AgroSense Pampa",
    avgScore: 8.4,
    divergence: 1.2,
    evaluators: 5,
    recommendation: "Classificar",
  },
  {
    id: 2,
    name: "BioSolo Analytics",
    avgScore: 8.1,
    divergence: 0.8,
    evaluators: 5,
    recommendation: "Classificar",
  },
  {
    id: 3,
    name: "MediSync",
    avgScore: 7.8,
    divergence: 2.3,
    evaluators: 5,
    recommendation: "Discussão",
  },
  {
    id: 4,
    name: "CodeCamp RS",
    avgScore: 7.2,
    divergence: 1.1,
    evaluators: 4,
    recommendation: "Aguardando",
  },
  {
    id: 5,
    name: "AquaTrack IoT",
    avgScore: 6.9,
    divergence: 0.9,
    evaluators: 5,
    recommendation: "Limítrofe",
  },
  {
    id: 6,
    name: "EcoPlast Pampa",
    avgScore: 5.8,
    divergence: 1.5,
    evaluators: 5,
    recommendation: "Não classificar",
  },
];

export function ConsensusRanking() {
  return (
    <div className="min-h-screen bg-[#fafafa]">
      <Header />
      
      <main className="mx-auto max-w-[1080px] px-6 py-8">
        <div className="mb-8">
          <h1 className="text-[#1a4d2e] mb-2">Consenso e ranqueamento</h1>
          <p className="text-[#4f6f52]">Consolidação das avaliações da comissão técnica</p>
        </div>

        <div className="mb-6">
          <PrototypeNote>
            Regra de desempate a definir: em caso de empate na nota final, priorizar critérios como "Interação
            com UNIPAMPA", "Impacto ambiental" ou "Geração de emprego". Definir threshold de divergência que
            aciona discussão obrigatória.
          </PrototypeNote>
        </div>

        <div className="grid grid-cols-3 gap-6">
          {/* Main Table */}
          <div className="col-span-2">
            <div className="bg-white border border-[#1a4d2e]/10">
              <div className="p-6 border-b border-[#1a4d2e]/10">
                <h2 className="text-[#4a4a4a]">Propostas avaliadas</h2>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-[#e8dcc4]/30">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm text-[#4a4a4a]">
                        <button className="flex items-center gap-1 hover:text-[#1a4d2e]">
                          Proposta <ArrowUpDown className="h-4 w-4" />
                        </button>
                      </th>
                      <th className="px-4 py-3 text-center text-sm text-[#4a4a4a]">
                        <button className="flex items-center gap-1 hover:text-[#1a4d2e] mx-auto">
                          Média <ArrowUpDown className="h-4 w-4" />
                        </button>
                      </th>
                      <th className="px-4 py-3 text-center text-sm text-[#4a4a4a]">Divergência</th>
                      <th className="px-4 py-3 text-center text-sm text-[#4a4a4a]">Avaliadores</th>
                      <th className="px-4 py-3 text-left text-sm text-[#4a4a4a]">Recomendação</th>
                      <th className="px-4 py-3 text-right text-sm text-[#4a4a4a]">Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {proposals.map((proposal, index) => (
                      <tr
                        key={proposal.id}
                        className={`border-t border-[#1a4d2e]/10 hover:bg-[#e8dcc4]/10 ${
                          proposal.divergence > 2 ? "bg-amber-50/50" : ""
                        }`}
                      >
                        <td className="px-4 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-6 h-6 rounded-full bg-[#1a4d2e] text-white flex items-center justify-center text-xs">
                              {index + 1}
                            </div>
                            <span className="text-sm text-[#4a4a4a]">{proposal.name}</span>
                          </div>
                        </td>
                        <td className="px-4 py-4 text-center">
                          <span className="text-lg text-[#1a4d2e]">{proposal.avgScore.toFixed(1)}</span>
                        </td>
                        <td className="px-4 py-4 text-center">
                          <span
                            className={`text-sm ${
                              proposal.divergence > 2
                                ? "text-amber-700 font-medium"
                                : "text-[#4f6f52]"
                            }`}
                          >
                            ±{proposal.divergence.toFixed(1)}
                          </span>
                        </td>
                        <td className="px-4 py-4 text-center">
                          <span className="text-sm text-[#4f6f52]">{proposal.evaluators}/5</span>
                        </td>
                        <td className="px-4 py-4">
                          {proposal.recommendation === "Classificar" && (
                            <StatusBadge status="Classificar" variant="success" />
                          )}
                          {proposal.recommendation === "Discussão" && (
                            <StatusBadge status="Discussão" variant="warning" />
                          )}
                          {proposal.recommendation === "Aguardando" && (
                            <StatusBadge status="Aguardando" variant="info" />
                          )}
                          {proposal.recommendation === "Limítrofe" && (
                            <StatusBadge status="Limítrofe" variant="warning" />
                          )}
                          {proposal.recommendation === "Não classificar" && (
                            <StatusBadge status="Não classificar" variant="default" />
                          )}
                        </td>
                        <td className="px-4 py-4 text-right">
                          <button className="text-sm text-[#1a4d2e] hover:underline">
                            Detalhes
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="p-6 border-t border-[#1a4d2e]/10">
                <div className="flex gap-3">
                  <button className="px-6 py-2 border border-[#4f6f52]/30 text-[#4a4a4a] hover:bg-[#e8dcc4]">
                    Solicitar adequação
                  </button>
                  <button className="px-6 py-2 bg-[#8fbc8f] text-white hover:bg-[#1a4d2e]">
                    Classificar para pitch
                  </button>
                  <button className="px-6 py-2 border border-[#4f6f52]/30 text-[#4a4a4a] hover:bg-[#e8dcc4]">
                    Não classificar
                  </button>
                  <button className="px-6 py-2 bg-[#1a4d2e] text-white hover:bg-[#4f6f52]">
                    Enviar para deliberação final
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="col-span-1 space-y-6">
            {/* Score Chart */}
            <div className="bg-white border border-[#1a4d2e]/10 p-6">
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="h-5 w-5 text-[#4f6f52]" />
                <h3 className="text-[#4a4a4a]">Distribuição de notas</h3>
              </div>
              
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-[#4f6f52]">8.0 - 10.0</span>
                    <span className="text-[#4a4a4a]">3</span>
                  </div>
                  <div className="h-2 bg-[#e8dcc4]">
                    <div className="h-full bg-[#8fbc8f]" style={{ width: "50%" }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-[#4f6f52]">6.0 - 7.9</span>
                    <span className="text-[#4a4a4a]">2</span>
                  </div>
                  <div className="h-2 bg-[#e8dcc4]">
                    <div className="h-full bg-amber-400" style={{ width: "33%" }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-[#4f6f52]">0.0 - 5.9</span>
                    <span className="text-[#4a4a4a]">1</span>
                  </div>
                  <div className="h-2 bg-[#e8dcc4]">
                    <div className="h-full bg-red-400" style={{ width: "17%" }}></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Discussion Panel */}
            <div className="bg-white border border-[#1a4d2e]/10 p-6">
              <div className="flex items-center gap-2 mb-4">
                <MessageCircle className="h-5 w-5 text-[#4f6f52]" />
                <h3 className="text-[#4a4a4a]">Discussão da comissão</h3>
              </div>
              
              <div className="space-y-3 mb-4">
                <div className="text-sm border-l-2 border-[#1a4d2e] pl-3 py-2">
                  <div className="text-[#4a4a4a] mb-1">Prof. João Silva</div>
                  <p className="text-[#4f6f52]">
                    MediSync tem divergência alta. Sugiro discussão sobre viabilidade técnica.
                  </p>
                  <span className="text-xs text-[#4f6f52]">Hoje, 14:30</span>
                </div>
                <div className="text-sm border-l-2 border-[#1a4d2e] pl-3 py-2">
                  <div className="text-[#4a4a4a] mb-1">Dra. Ana Costa</div>
                  <p className="text-[#4f6f52]">
                    AgroSense e BioSolo são consenso. Recomendo classificação direta.
                  </p>
                  <span className="text-xs text-[#4f6f52]">Hoje, 10:15</span>
                </div>
              </div>

              <textarea
                rows={2}
                placeholder="Adicionar comentário..."
                className="w-full px-3 py-2 border border-[#4f6f52]/30 bg-white text-sm mb-2"
              />
              <button className="w-full px-4 py-2 bg-[#1a4d2e] text-white text-sm hover:bg-[#4f6f52]">
                Enviar
              </button>
            </div>

            {/* Criteria Breakdown */}
            <div className="bg-white border border-[#1a4d2e]/10 p-6">
              <h3 className="text-[#4a4a4a] mb-4">Pontuação por critério</h3>
              <p className="text-xs text-[#4f6f52] mb-3">Média: AgroSense Pampa</p>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-[#4f6f52]">Inovação tecnológica</span>
                  <span className="text-[#4a4a4a]">9.2</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#4f6f52]">Viab. mercadológica</span>
                  <span className="text-[#4a4a4a]">8.0</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#4f6f52]">Viab. técnica</span>
                  <span className="text-[#4a4a4a]">8.4</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#4f6f52]">Interação UNIPAMPA</span>
                  <span className="text-[#4a4a4a]">9.0</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#4f6f52]">Impacto ambiental</span>
                  <span className="text-[#4a4a4a]">8.6</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
