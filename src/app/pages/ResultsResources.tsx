import { useState } from "react";
import { Header } from "../components/Header";
import { StatusBadge } from "../components/StatusBadge";
import { PrototypeNote } from "../components/PrototypeNote";
import { FileText, Upload } from "lucide-react";

const results = [
  { id: 1, name: "AgroSense Pampa", status: "Classificada", score: 8.4, feedback: "Proposta aprovada. Pitch agendado para 10/06/2026." },
  { id: 2, name: "BioSolo Analytics", status: "Classificada", score: 8.1, feedback: "Proposta aprovada. Pitch agendado para 10/06/2026." },
  { id: 3, name: "MediSync", status: "Classificada", score: 7.8, feedback: "Classificada após consenso da comissão." },
  { id: 4, name: "CodeCamp RS", status: "Não classificada", score: 7.2, feedback: "Proposta não atingiu nota de corte (7.5). Possibilidade de recurso." },
  { id: 5, name: "AquaTrack IoT", status: "Não classificada", score: 6.9, feedback: "Viabilidade técnica insuficiente segundo parecer da comissão." },
  { id: 6, name: "EcoPlast Pampa", status: "Não classificada", score: 5.8, feedback: "Proposta não atendeu critérios mínimos de inovação." },
];

export function ResultsResources() {
  const [showResourceModal, setShowResourceModal] = useState(false);

  return (
    <div className="min-h-screen bg-[#fafafa]">
      <Header />
      
      <main className="mx-auto max-w-[1080px] px-6 py-8">
        <div className="bg-gradient-to-br from-[#1a4d2e] to-[#4f6f52] text-white p-8 mb-8">
          <h1 className="text-3xl mb-2">Resultados do Processo Seletivo</h1>
          <p className="text-[#e8dcc4]">
            Incubadora Tecnológica PampaTec Alegrete • UNIPAMPA • Edital 2026/1
          </p>
          <p className="text-sm text-white/80 mt-4">
            Publicado em: 25/05/2026 • Prazo para recursos: até 05/06/2026
          </p>
        </div>

        <div className="mb-6">
          <PrototypeNote>
            Prazos e textos legais devem ser revisados pelo grupo e pela assessoria jurídica. Verificar:
            conformidade com edital, prazo de recurso, forma de interposição, instâncias de revisão.
          </PrototypeNote>
        </div>

        <div className="bg-white border border-[#1a4d2e]/10 p-6 mb-8">
          <h2 className="text-[#4a4a4a] mb-6">Lista de propostas avaliadas</h2>
          
          <div className="space-y-4">
            {results.map((result) => (
              <div
                key={result.id}
                className={`border p-6 ${
                  result.status === "Classificada"
                    ? "border-[#8fbc8f] bg-[#8fbc8f]/5"
                    : "border-[#1a4d2e]/10 bg-white"
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="text-[#4a4a4a] mb-1">{result.name}</h3>
                    <div className="flex items-center gap-3">
                      {result.status === "Classificada" ? (
                        <StatusBadge status="Classificada" variant="success" />
                      ) : (
                        <StatusBadge status="Não classificada" variant="default" />
                      )}
                      <span className="text-sm text-[#4f6f52]">Nota final: {result.score.toFixed(1)}</span>
                    </div>
                  </div>
                  {result.status === "Não classificada" && (
                    <button
                      onClick={() => setShowResourceModal(true)}
                      className="px-4 py-2 border border-[#1a4d2e] text-[#1a4d2e] hover:bg-[#1a4d2e] hover:text-white transition-colors"
                    >
                      Interpor recurso
                    </button>
                  )}
                </div>
                
                <div className="bg-white border-l-2 border-[#4f6f52] pl-4 py-2">
                  <h4 className="text-sm text-[#4a4a4a] mb-1">Parecer resumido</h4>
                  <p className="text-sm text-[#4f6f52]">{result.feedback}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white border border-[#1a4d2e]/10 p-6">
          <h3 className="text-[#4a4a4a] mb-4">Informações sobre recursos</h3>
          <div className="space-y-3 text-sm text-[#4f6f52]">
            <p>
              <strong className="text-[#4a4a4a]">Prazo:</strong> Recursos podem ser interpostos até 05/06/2026, às 23h59.
            </p>
            <p>
              <strong className="text-[#4a4a4a]">Forma:</strong> Através deste sistema, com justificativa fundamentada e documentos de suporte.
            </p>
            <p>
              <strong className="text-[#4a4a4a]">Análise:</strong> Recursos serão analisados por comissão recursal em até 7 dias úteis.
            </p>
            <p>
              <strong className="text-[#4a4a4a]">Resultado final:</strong> Será publicado em 15/06/2026.
            </p>
          </div>
        </div>

        {/* Resource Modal */}
        {showResourceModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-6 z-50">
            <div className="bg-white max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="border-b border-[#1a4d2e]/10 p-6">
                <h2 className="text-[#1a4d2e]">Interposição de recurso</h2>
                <p className="text-sm text-[#4f6f52] mt-1">CodeCamp RS • Protocolo PSL-2026-004</p>
              </div>
              
              <div className="p-6 space-y-6">
                <div>
                  <label className="block text-sm text-[#4a4a4a] mb-2">
                    Motivo do recurso *
                  </label>
                  <select className="w-full px-3 py-2 border border-[#4f6f52]/30 bg-white">
                    <option>Selecione...</option>
                    <option>Erro material na avaliação</option>
                    <option>Desconsideração de documentos</option>
                    <option>Divergência significativa entre avaliadores</option>
                    <option>Outros</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm text-[#4a4a4a] mb-2">
                    Justificativa detalhada *
                  </label>
                  <textarea
                    rows={6}
                    placeholder="Fundamente seu recurso com argumentos técnicos e referências ao edital..."
                    className="w-full px-3 py-2 border border-[#4f6f52]/30 bg-white"
                  />
                  <p className="text-xs text-[#4f6f52] mt-1">Mínimo de 200 caracteres</p>
                </div>

                <div>
                  <label className="block text-sm text-[#4a4a4a] mb-2">
                    Documentos de suporte (opcional)
                  </label>
                  <div className="border-2 border-dashed border-[#4f6f52]/30 p-8 text-center hover:border-[#1a4d2e] cursor-pointer">
                    <Upload className="h-8 w-8 text-[#4f6f52] mx-auto mb-2" />
                    <p className="text-sm text-[#4a4a4a]">Clique para anexar documentos</p>
                    <p className="text-xs text-[#4f6f52]">PDF • Máx. 5MB</p>
                  </div>
                </div>

                <div className="bg-amber-50 border-l-2 border-amber-500 p-4">
                  <p className="text-sm text-amber-800">
                    <strong>Atenção:</strong> A interposição de recurso não garante alteração do resultado.
                    A comissão recursal analisará exclusivamente os pontos apresentados na justificativa.
                  </p>
                </div>
              </div>

              <div className="border-t border-[#1a4d2e]/10 p-6 flex justify-end gap-3">
                <button
                  onClick={() => setShowResourceModal(false)}
                  className="px-6 py-2 border border-[#4f6f52]/30 text-[#4a4a4a] hover:bg-[#e8dcc4]"
                >
                  Cancelar
                </button>
                <button className="px-6 py-2 bg-[#1a4d2e] text-white hover:bg-[#4f6f52]">
                  Protocolar recurso
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
