import { useState } from "react";
import { useParams } from "react-router";
import { Header } from "../components/Header";
import { StatusBadge } from "../components/StatusBadge";
import { PrototypeNote } from "../components/PrototypeNote";
import { FileText, MessageSquare, History, Send } from "lucide-react";

export function ProposalDetail() {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("resumo");

  return (
    <div className="min-h-screen bg-[#fafafa]">
      <Header />
      
      <main className="mx-auto max-w-[1080px] px-6 py-8">
        {/* Header */}
        <div className="bg-white border border-[#1a4d2e]/10 p-6 mb-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h1 className="text-[#1a4d2e] mb-2">AgroSense Pampa</h1>
              <p className="text-sm text-[#4f6f52]">Protocolo: PSL-2026-047</p>
            </div>
            <StatusBadge status="Documentação pendente" variant="warning" />
          </div>
          
          <div className="grid grid-cols-3 gap-4 pt-4 border-t border-[#1a4d2e]/10">
            <div>
              <span className="text-xs text-[#4f6f52]">Segmento</span>
              <p className="text-sm text-[#4a4a4a]">AgTech / IoT</p>
            </div>
            <div>
              <span className="text-xs text-[#4f6f52]">Submissão</span>
              <p className="text-sm text-[#4a4a4a]">10/05/2026</p>
            </div>
            <div>
              <span className="text-xs text-[#4f6f52]">Responsável</span>
              <p className="text-sm text-[#4a4a4a]">Dra. Maria Santos</p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white border border-[#1a4d2e]/10 mb-6">
          <div className="flex border-b border-[#1a4d2e]/10">
            <button
              onClick={() => setActiveTab("resumo")}
              className={`px-6 py-3 text-sm ${
                activeTab === "resumo"
                  ? "border-b-2 border-[#1a4d2e] text-[#1a4d2e]"
                  : "text-[#4f6f52] hover:text-[#4a4a4a]"
              }`}
            >
              Resumo
            </button>
            <button
              onClick={() => setActiveTab("documentos")}
              className={`px-6 py-3 text-sm ${
                activeTab === "documentos"
                  ? "border-b-2 border-[#1a4d2e] text-[#1a4d2e]"
                  : "text-[#4f6f52] hover:text-[#4a4a4a]"
              }`}
            >
              Documentos
            </button>
            <button
              onClick={() => setActiveTab("avaliacoes")}
              className={`px-6 py-3 text-sm ${
                activeTab === "avaliacoes"
                  ? "border-b-2 border-[#1a4d2e] text-[#1a4d2e]"
                  : "text-[#4f6f52] hover:text-[#4a4a4a]"
              }`}
            >
              Avaliações
            </button>
            <button
              onClick={() => setActiveTab("comunicacao")}
              className={`px-6 py-3 text-sm ${
                activeTab === "comunicacao"
                  ? "border-b-2 border-[#1a4d2e] text-[#1a4d2e]"
                  : "text-[#4f6f52] hover:text-[#4a4a4a]"
              }`}
            >
              Comunicação
            </button>
            <button
              onClick={() => setActiveTab("historico")}
              className={`px-6 py-3 text-sm ${
                activeTab === "historico"
                  ? "border-b-2 border-[#1a4d2e] text-[#1a4d2e]"
                  : "text-[#4f6f52] hover:text-[#4a4a4a]"
              }`}
            >
              Histórico
            </button>
          </div>

          <div className="p-6">
            {activeTab === "resumo" && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-[#4a4a4a] mb-2">Proposta de valor</h3>
                  <p className="text-sm text-[#4f6f52]">
                    Sistema IoT para monitoramento em tempo real de variáveis do solo (umidade, pH, nutrientes)
                    para agricultura de precisão no bioma Pampa.
                  </p>
                </div>

                <div>
                  <h3 className="text-[#4a4a4a] mb-2">Potencial de inovação tecnológica</h3>
                  <div className="mb-2">
                    <StatusBadge status="Alto" variant="success" />
                  </div>
                  <p className="text-sm text-[#4f6f52]">
                    Utiliza sensores capacitivos de baixo custo combinados com rede LoRaWAN e algoritmos de
                    machine learning para predição de necessidades de irrigação.
                  </p>
                </div>

                <div>
                  <h3 className="text-[#4a4a4a] mb-2">Interação com UNIPAMPA</h3>
                  <p className="text-sm text-[#4f6f52]">
                    Parceria prevista com o Grupo de Pesquisa em Agricultura de Precisão da UNIPAMPA campus
                    Alegrete para validação técnica dos sensores e desenvolvimento de modelos preditivos. 2 bolsistas
                    de IC previstos.
                  </p>
                </div>

                <div>
                  <h3 className="text-[#4a4a4a] mb-2">Impacto ambiental</h3>
                  <p className="text-sm text-[#4f6f52]">
                    Redução estimada de 30% no consumo de água para irrigação e 25% no uso de fertilizantes através
                    de aplicação localizada baseada em dados.
                  </p>
                </div>

                <div>
                  <h3 className="text-[#4a4a4a] mb-2">Plano financeiro</h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-[#4f6f52]">Investimento necessário:</span>
                      <p className="text-[#4a4a4a]">R$ 120.000</p>
                    </div>
                    <div>
                      <span className="text-[#4f6f52]">Projeção 12 meses:</span>
                      <p className="text-[#4a4a4a]">R$ 280.000 em vendas</p>
                    </div>
                  </div>
                </div>

                <PrototypeNote>
                  Campos jurídicos/compliance a revisar: verificação de propriedade intelectual, licenças necessárias,
                  conformidade com regulamentações do setor agrícola.
                </PrototypeNote>
              </div>
            )}

            {activeTab === "documentos" && (
              <div>
                <p className="text-sm text-[#4f6f52] mb-4">5 documentos enviados • 1 precisa revisão • 2 pendentes</p>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-3 border border-[#1a4d2e]/10">
                    <div className="flex items-center gap-3">
                      <FileText className="h-5 w-5 text-[#4f6f52]" />
                      <span className="text-sm text-[#4a4a4a]">CNPJ</span>
                    </div>
                    <StatusBadge status="Enviado" variant="success" />
                  </div>
                  <div className="flex items-center justify-between p-3 border border-red-300 bg-red-50">
                    <div className="flex items-center gap-3">
                      <FileText className="h-5 w-5 text-red-600" />
                      <div>
                        <span className="text-sm text-[#4a4a4a]">Certidão municipal</span>
                        <p className="text-xs text-red-700">Documento vencido</p>
                      </div>
                    </div>
                    <StatusBadge status="Precisa revisão" variant="danger" />
                  </div>
                </div>
              </div>
            )}

            {activeTab === "avaliacoes" && (
              <div>
                <p className="text-sm text-[#4f6f52]">Nenhuma avaliação registrada ainda.</p>
              </div>
            )}

            {activeTab === "comunicacao" && (
              <div className="space-y-4">
                <div className="border-l-2 border-[#1a4d2e] pl-4 py-2">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-[#4a4a4a]">Dra. Maria Santos</span>
                    <span className="text-xs text-[#4f6f52]">21/05/2026 14:30</span>
                  </div>
                  <p className="text-sm text-[#4f6f52]">
                    Solicitada atualização da certidão municipal. Prazo: 7 dias úteis.
                  </p>
                </div>
                <div className="border-l-2 border-[#8fbc8f] pl-4 py-2">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-[#4a4a4a]">Sistema</span>
                    <span className="text-xs text-[#4f6f52]">15/05/2026 09:15</span>
                  </div>
                  <p className="text-sm text-[#4f6f52]">Proposta passou na triagem preliminar.</p>
                </div>

                <div className="mt-6 pt-6 border-t border-[#1a4d2e]/10">
                  <h4 className="text-sm text-[#4a4a4a] mb-3">Enviar mensagem</h4>
                  <textarea
                    rows={3}
                    placeholder="Digite sua mensagem..."
                    className="w-full px-3 py-2 border border-[#4f6f52]/30 bg-white mb-2"
                  />
                  <button className="inline-flex items-center gap-2 px-4 py-2 bg-[#1a4d2e] text-white hover:bg-[#4f6f52]">
                    <Send className="h-4 w-4" />
                    Enviar
                  </button>
                </div>
              </div>
            )}

            {activeTab === "historico" && (
              <div>
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-24 text-xs text-[#4f6f52]">21/05/2026</div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <div className="h-2 w-2 rounded-full bg-amber-500"></div>
                        <span className="text-sm text-[#4a4a4a]">Documentação solicitada</span>
                      </div>
                      <p className="text-xs text-[#4f6f52]">Certidão municipal precisa atualização</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-24 text-xs text-[#4f6f52]">15/05/2026</div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <div className="h-2 w-2 rounded-full bg-[#8fbc8f]"></div>
                        <span className="text-sm text-[#4a4a4a]">Triagem aprovada</span>
                      </div>
                      <p className="text-xs text-[#4f6f52]">Por Dra. Maria Santos</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-24 text-xs text-[#4f6f52]">10/05/2026</div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <div className="h-2 w-2 rounded-full bg-[#1a4d2e]"></div>
                        <span className="text-sm text-[#4a4a4a]">Proposta submetida</span>
                      </div>
                      <p className="text-xs text-[#4f6f52]">Protocolo PSL-2026-047 gerado</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="bg-white border border-[#1a4d2e]/10 p-6">
          <h3 className="text-[#4a4a4a] mb-4">Ações</h3>
          <div className="flex gap-3">
            <button className="px-6 py-2 border border-[#4f6f52]/30 text-[#4a4a4a] hover:bg-[#e8dcc4]">
              Solicitar ajuste
            </button>
            <button className="px-6 py-2 bg-[#1a4d2e] text-white hover:bg-[#4f6f52]">
              Encaminhar para avaliação
            </button>
            <button className="px-6 py-2 border border-[#4f6f52]/30 text-[#4a4a4a] hover:bg-[#e8dcc4]">
              Agendar pitch
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
