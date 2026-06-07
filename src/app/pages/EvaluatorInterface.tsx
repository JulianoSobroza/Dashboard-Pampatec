import { useState } from "react";
import { Header } from "../components/Header";
import { PrototypeNote } from "../components/PrototypeNote";
import { FileText, Save } from "lucide-react";

const criteria = [
  { id: 1, name: "Potencial de inovação tecnológica", weight: 20 },
  { id: 2, name: "Viabilidade mercadológica", weight: 15 },
  { id: 3, name: "Viabilidade técnica", weight: 15 },
  { id: 4, name: "Interação com áreas de pesquisa da UNIPAMPA", weight: 15 },
  { id: 5, name: "Impacto ambiental", weight: 10 },
  { id: 6, name: "Experiência da equipe", weight: 10 },
  { id: 7, name: "Geração de emprego e renda", weight: 10 },
  { id: 8, name: "Defesa verbal/pitch", weight: 5 },
];

export function EvaluatorInterface() {
  const [scores, setScores] = useState<Record<number, number>>({});
  const [justifications, setJustifications] = useState<Record<number, string>>({});

  return (
    <div className="min-h-screen bg-[#fafafa]">
      <Header />
      
      <main className="mx-auto max-w-[1080px] px-6 py-8">
        <div className="mb-6">
          <h1 className="text-[#1a4d2e] mb-2">Avaliação de proposta</h1>
          <p className="text-[#4f6f52]">AgroSense Pampa • Protocolo PSL-2026-047</p>
        </div>

        <div className="mb-6">
          <PrototypeNote>
            Avaliação assíncrona — Cada avaliador preenche independentemente. O consenso será consolidado
            pela comissão em reunião posterior. Divergências acima de 2 pontos serão sinalizadas.
          </PrototypeNote>
        </div>

        <div className="grid grid-cols-2 gap-6">
          {/* Left: Proposal Summary */}
          <div className="space-y-6">
            <div className="bg-white border border-[#1a4d2e]/10 p-6">
              <h2 className="text-[#4a4a4a] mb-4">Resumo executivo</h2>
              
              <div className="space-y-4 text-sm">
                <div>
                  <h3 className="text-[#4a4a4a] mb-1">Proposta de valor</h3>
                  <p className="text-[#4f6f52]">
                    Sistema IoT para monitoramento em tempo real de variáveis do solo (umidade, pH, nutrientes)
                    para agricultura de precisão no bioma Pampa.
                  </p>
                </div>

                <div>
                  <h3 className="text-[#4a4a4a] mb-1">Segmento</h3>
                  <p className="text-[#4f6f52]">AgTech / IoT • Agricultura de Precisão</p>
                </div>

                <div>
                  <h3 className="text-[#4a4a4a] mb-1">Tecnologias</h3>
                  <p className="text-[#4f6f52]">Sensores capacitivos, LoRaWAN, Machine Learning</p>
                </div>

                <div>
                  <h3 className="text-[#4a4a4a] mb-1">Estágio</h3>
                  <p className="text-[#4f6f52]">Protótipo funcional</p>
                </div>

                <div>
                  <h3 className="text-[#4a4a4a] mb-1">Interação UNIPAMPA</h3>
                  <p className="text-[#4f6f52]">
                    Parceria com Grupo de Pesquisa em Agricultura de Precisão. 2 bolsistas IC previstos.
                  </p>
                </div>

                <div>
                  <h3 className="text-[#4a4a4a] mb-1">Impacto ambiental declarado</h3>
                  <p className="text-[#4f6f52]">Redução de 30% no consumo de água e 25% em fertilizantes</p>
                </div>
              </div>
            </div>

            <div className="bg-white border border-[#1a4d2e]/10 p-6">
              <h3 className="text-[#4a4a4a] mb-3">Documentos anexos</h3>
              <div className="space-y-2">
                <button className="w-full flex items-center gap-3 p-3 border border-[#1a4d2e]/10 hover:bg-[#e8dcc4] text-left">
                  <FileText className="h-5 w-5 text-[#4f6f52]" />
                  <span className="text-sm text-[#4a4a4a]">Plano de Negócio Completo.pdf</span>
                </button>
                <button className="w-full flex items-center gap-3 p-3 border border-[#1a4d2e]/10 hover:bg-[#e8dcc4] text-left">
                  <FileText className="h-5 w-5 text-[#4f6f52]" />
                  <span className="text-sm text-[#4a4a4a]">Projeto de Pesquisa UNIPAMPA.pdf</span>
                </button>
                <button className="w-full flex items-center gap-3 p-3 border border-[#1a4d2e]/10 hover:bg-[#e8dcc4] text-left">
                  <FileText className="h-5 w-5 text-[#4f6f52]" />
                  <span className="text-sm text-[#4a4a4a]">Currículo dos Sócios.pdf</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right: Evaluation Rubric */}
          <div className="bg-white border border-[#1a4d2e]/10 p-6">
            <h2 className="text-[#4a4a4a] mb-6">Rubrica de avaliação</h2>
            
            <div className="space-y-6">
              {criteria.map((criterion) => (
                <div key={criterion.id} className="border-b border-[#1a4d2e]/10 pb-6 last:border-0">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-[#4a4a4a] flex-1">{criterion.name}</h3>
                    <span className="text-xs text-[#4f6f52] bg-[#e8dcc4] px-2 py-1 ml-2">
                      Peso: {criterion.weight}%
                    </span>
                  </div>

                  <div className="mb-3">
                    <label className="block text-sm text-[#4a4a4a] mb-2">
                      Nota (0-10)
                    </label>
                    <div className="flex gap-2">
                      {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((score) => (
                        <button
                          key={score}
                          onClick={() => setScores({ ...scores, [criterion.id]: score })}
                          className={`w-10 h-10 border ${
                            scores[criterion.id] === score
                              ? "bg-[#1a4d2e] text-white border-[#1a4d2e]"
                              : "border-[#4f6f52]/30 text-[#4a4a4a] hover:bg-[#e8dcc4]"
                          }`}
                        >
                          {score}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="mb-3">
                    <label className="block text-sm text-[#4a4a4a] mb-2">
                      Justificativa qualitativa
                    </label>
                    <textarea
                      rows={2}
                      value={justifications[criterion.id] || ""}
                      onChange={(e) =>
                        setJustifications({ ...justifications, [criterion.id]: e.target.value })
                      }
                      placeholder="Justifique a nota atribuída..."
                      className="w-full px-3 py-2 border border-[#4f6f52]/30 bg-white text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-[#4a4a4a] mb-2">
                      Dúvida para a banca (opcional)
                    </label>
                    <input
                      type="text"
                      placeholder="Ponto a ser esclarecido em reunião..."
                      className="w-full px-3 py-2 border border-[#4f6f52]/30 bg-white text-sm"
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-6 border-t border-[#1a4d2e]/10">
              <div className="bg-[#e8dcc4]/30 p-4 mb-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-[#4a4a4a]">Nota final ponderada</span>
                  <span className="text-2xl text-[#1a4d2e]">
                    {Object.keys(scores).length === 0
                      ? "—"
                      : (
                          criteria.reduce(
                            (acc, c) => acc + (scores[c.id] || 0) * (c.weight / 100),
                            0
                          )
                        ).toFixed(1)}
                  </span>
                </div>
              </div>

              <div className="flex gap-3">
                <button className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 border border-[#4f6f52]/30 text-[#4a4a4a] hover:bg-[#e8dcc4]">
                  <Save className="h-4 w-4" />
                  Salvar rascunho
                </button>
                <button className="flex-1 px-6 py-3 bg-[#1a4d2e] text-white hover:bg-[#4f6f52]">
                  Enviar avaliação
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
