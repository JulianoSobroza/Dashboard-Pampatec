import { useState } from "react";
import { useParams } from "react-router";
import { Header } from "../components/Header";
import { StatusBadge } from "../components/StatusBadge";
import { PrototypeNote } from "../components/PrototypeNote";
import { FileText, Send, AlertTriangle, Clock, Lock, CheckCircle2, UserCircle, RefreshCcw } from "lucide-react";

export function ProposalDetail() {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("resumo");

  return (
    <div className="min-h-screen bg-[#fafafa]">
      <Header />
      
      <main className="mx-auto max-w-[1280px] px-6 py-8">
        
        {/* Top Header / Executive Summary Panel */}
        <div className="bg-white border-t-4 border-t-[#1a4d2e] border-x border-b border-[#1a4d2e]/10 p-6 mb-6 shadow-sm">
          <div className="flex items-start justify-between mb-6 border-b border-[#1a4d2e]/10 pb-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-2xl font-bold text-[#1a4d2e]">AgroSense Pampa</h1>
                <span className="bg-amber-100 text-amber-800 text-xs px-2.5 py-1 rounded-sm font-semibold border border-amber-200 flex items-center gap-1">
                  <AlertTriangle className="h-3 w-3" />
                  Documentação pendente
                </span>
              </div>
              <div className="flex items-center gap-4 text-sm">
                <p className="text-[#4f6f52]"><span className="font-medium text-[#4a4a4a]">ID da proposta:</span> PROP-2024-061</p>
                <span className="text-[#4f6f52]">•</span>
                <p className="text-[#4f6f52]"><span className="font-medium text-[#4a4a4a]">Protocolo interno:</span> PSL-2026-047</p>
              </div>
            </div>
            
            <div className="text-right">
              <div className="text-sm font-medium text-[#4a4a4a] mb-1">Responsável</div>
              <div className="flex items-center gap-2 justify-end text-[#1a4d2e] font-semibold bg-[#fafafa] px-3 py-1.5 rounded-sm border border-[#1a4d2e]/10">
                <UserCircle className="h-5 w-5" />
                Dra. Maria Santos
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-4 gap-6">
            <div>
              <span className="text-xs uppercase tracking-wider font-semibold text-[#4f6f52] block mb-1">Segmento</span>
              <p className="text-[#1a4d2e] font-medium">AgTech / IoT</p>
            </div>
            <div>
              <span className="text-xs uppercase tracking-wider font-semibold text-[#4f6f52] block mb-1">Submissão</span>
              <p className="text-[#1a4d2e] font-medium">10/05/2026</p>
            </div>
            <div>
              <span className="text-xs uppercase tracking-wider font-semibold text-[#4f6f52] block mb-1">Valor Solicitado</span>
              <p className="text-[#1a4d2e] font-medium">R$ 120.000,00</p>
            </div>
            <div>
              <span className="text-xs uppercase tracking-wider font-semibold text-[#4f6f52] block mb-1">Potencial / Inovação</span>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-[#1a4d2e]"></div>
                <p className="text-[#1a4d2e] font-medium">Alto Impacto</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-start gap-6">
          {/* Main Content Area */}
          <div className="flex-1">
            
            {/* Tabs */}
            <div className="bg-white border border-[#1a4d2e]/10 shadow-sm mb-6 rounded-sm">
              <div className="flex border-b border-[#1a4d2e]/10 overflow-x-auto">
                <button
                  onClick={() => setActiveTab("resumo")}
                  className={`px-6 py-4 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                    activeTab === "resumo"
                      ? "border-[#1a4d2e] text-[#1a4d2e] bg-[#fafafa]"
                      : "border-transparent text-[#4f6f52] hover:text-[#1a4d2e] hover:bg-[#fafafa]"
                  }`}
                >
                  Resumo Executivo
                </button>
                <button
                  onClick={() => setActiveTab("documentos")}
                  className={`px-6 py-4 text-sm font-medium whitespace-nowrap border-b-2 transition-colors flex items-center gap-2 ${
                    activeTab === "documentos"
                      ? "border-amber-500 text-amber-700 bg-amber-50/30"
                      : "border-transparent text-[#4f6f52] hover:text-[#1a4d2e] hover:bg-[#fafafa]"
                  }`}
                >
                  Documentos
                  <span className={`text-[10px] px-1.5 py-0.5 rounded-sm font-bold ${activeTab === 'documentos' ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700'}`}>2 pendentes</span>
                </button>
                <button
                  onClick={() => setActiveTab("avaliacoes")}
                  className={`px-6 py-4 text-sm font-medium whitespace-nowrap border-b-2 transition-colors flex items-center gap-2 ${
                    activeTab === "avaliacoes"
                      ? "border-[#1a4d2e] text-[#1a4d2e] bg-[#fafafa]"
                      : "border-transparent text-[#4f6f52] hover:text-[#1a4d2e] hover:bg-[#fafafa]"
                  }`}
                >
                  Avaliações
                  <span className="text-[10px] bg-[#f0f0f0] text-[#4f6f52] px-1.5 py-0.5 rounded-sm font-bold border border-[#ddd]">0/3</span>
                </button>
                <button
                  onClick={() => setActiveTab("comunicacao")}
                  className={`px-6 py-4 text-sm font-medium whitespace-nowrap border-b-2 transition-colors flex items-center gap-2 ${
                    activeTab === "comunicacao"
                      ? "border-[#1a4d2e] text-[#1a4d2e] bg-[#fafafa]"
                      : "border-transparent text-[#4f6f52] hover:text-[#1a4d2e] hover:bg-[#fafafa]"
                  }`}
                >
                  Comunicação
                  <span className="text-[10px] bg-[#1a4d2e] text-white px-1.5 py-0.5 rounded-sm font-bold">1 nova</span>
                </button>
                <button
                  onClick={() => setActiveTab("historico")}
                  className={`px-6 py-4 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                    activeTab === "historico"
                      ? "border-[#1a4d2e] text-[#1a4d2e] bg-[#fafafa]"
                      : "border-transparent text-[#4f6f52] hover:text-[#1a4d2e] hover:bg-[#fafafa]"
                  }`}
                >
                  Histórico
                </button>
              </div>

              <div className="p-8">
                {activeTab === "resumo" && (
                  <div className="space-y-8">
                    
                    {/* Block 1 */}
                    <div>
                      <h3 className="text-lg font-bold text-[#1a4d2e] mb-3">Proposta de Valor</h3>
                      <div className="bg-[#fafafa] p-5 border border-[#1a4d2e]/10 rounded-sm">
                        <p className="text-[15px] leading-relaxed text-[#4a4a4a]">
                          Sistema IoT para monitoramento em tempo real de variáveis do solo (umidade, pH, nutrientes) 
                          para agricultura de precisão no bioma Pampa. Foco em redução de custos para o pequeno e 
                          médio produtor rural.
                        </p>
                      </div>
                    </div>

                    {/* Block 2 */}
                    <div>
                      <h3 className="text-lg font-bold text-[#1a4d2e] mb-3">Potencial de Inovação Tecnológica</h3>
                      <div className="border-l-4 border-l-[#8fbc8f] pl-5 py-2">
                        <p className="text-[15px] leading-relaxed text-[#4a4a4a]">
                          Utiliza sensores capacitivos de baixo custo combinados com rede LoRaWAN e algoritmos de 
                          machine learning para predição de necessidades de irrigação. A arquitetura descentralizada 
                          e off-grid é inédita para o escopo regional.
                        </p>
                      </div>
                    </div>

                    {/* Block 3 */}
                    <div>
                      <h3 className="text-lg font-bold text-[#1a4d2e] mb-3">Vínculo com a UNIPAMPA</h3>
                      <div className="bg-[#e8dcc4]/20 border border-[#e8dcc4]/50 p-5 rounded-sm flex items-start gap-4">
                        <CheckCircle2 className="h-6 w-6 text-[#1a4d2e] flex-shrink-0 mt-0.5" />
                        <p className="text-[15px] leading-relaxed text-[#4a4a4a]">
                          Parceria prevista com o Grupo de Pesquisa em Agricultura de Precisão da UNIPAMPA campus 
                          Alegrete para validação técnica dos sensores e desenvolvimento de modelos preditivos. 
                          <strong> 2 bolsistas de Iniciação Científica previstos no projeto.</strong>
                        </p>
                      </div>
                    </div>

                    {/* Block 4 */}
                    <div>
                      <h3 className="text-lg font-bold text-[#1a4d2e] mb-3">Impacto Ambiental e Social</h3>
                      <div className="border border-[#1a4d2e]/10 p-5 rounded-sm bg-white relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-1 h-full bg-[#4f6f52]"></div>
                        <p className="text-[15px] leading-relaxed text-[#4a4a4a]">
                          Redução estimada de <strong>30% no consumo de água</strong> para irrigação e <strong>25% no uso de fertilizantes</strong> através 
                          de aplicação localizada baseada em dados, prevenindo a contaminação de lençóis freáticos.
                        </p>
                      </div>
                    </div>

                    {/* Block 5 - Financials */}
                    <div>
                      <h3 className="text-lg font-bold text-[#1a4d2e] mb-4">Plano Financeiro</h3>
                      <div className="grid grid-cols-3 gap-4">
                        <div className="bg-[#fafafa] border border-[#1a4d2e]/10 p-4 rounded-sm flex flex-col justify-center items-center text-center">
                          <span className="text-xs uppercase tracking-wider font-semibold text-[#4f6f52] mb-2">Investimento Necessário</span>
                          <span className="text-2xl font-bold text-[#1a4d2e]">R$ 120.000</span>
                        </div>
                        <div className="bg-[#fafafa] border border-[#1a4d2e]/10 p-4 rounded-sm flex flex-col justify-center items-center text-center">
                          <span className="text-xs uppercase tracking-wider font-semibold text-[#4f6f52] mb-2">Projeção 12 meses</span>
                          <span className="text-2xl font-bold text-[#1a4d2e]">R$ 280.000</span>
                        </div>
                        <div className="bg-[#e8dcc4]/30 border border-[#e8dcc4] p-4 rounded-sm flex flex-col justify-center items-center text-center">
                          <span className="text-xs uppercase tracking-wider font-semibold text-[#4f6f52] mb-2">Retorno / Investimento</span>
                          <span className="text-2xl font-bold text-[#1a4d2e]">2,3x</span>
                        </div>
                      </div>
                    </div>

                    <PrototypeNote>
                      Campos de Risco e Compliance: Verificação de PI, licenças ambientais, LGPD e 
                      conformidade com o estatuto da UNIPAMPA devem ser preenchidos na aba de Avaliações.
                    </PrototypeNote>
                  </div>
                )}

                {activeTab === "documentos" && (
                  <div>
                    <div className="flex items-center justify-between mb-6 bg-amber-50 p-4 border border-amber-200 rounded-sm">
                      <div className="flex items-center gap-3 text-amber-800">
                        <AlertTriangle className="h-5 w-5" />
                        <span className="font-semibold text-[15px]">O processo está travado aguardando o empreendedor resolver pendências documentais.</span>
                      </div>
                    </div>
                    
                    <p className="text-sm font-medium text-[#4f6f52] mb-4 uppercase tracking-wide">Documentos Submetidos</p>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-4 border border-red-300 bg-red-50 rounded-sm shadow-sm relative overflow-hidden">
                        <div className="absolute left-0 top-0 w-1 h-full bg-red-500"></div>
                        <div className="flex items-center gap-4">
                          <div className="bg-red-100 p-2 rounded-full">
                            <FileText className="h-5 w-5 text-red-600" />
                          </div>
                          <div>
                            <span className="font-semibold text-red-900 block mb-0.5">Certidão Negativa Municipal</span>
                            <p className="text-xs text-red-700 font-medium">Documento enviado está vencido desde 01/05/2026</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="bg-red-100 text-red-800 px-3 py-1 text-xs font-bold rounded-sm border border-red-200">
                            PENDÊNCIA
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between p-4 border border-red-300 bg-red-50 rounded-sm shadow-sm relative overflow-hidden">
                        <div className="absolute left-0 top-0 w-1 h-full bg-red-500"></div>
                        <div className="flex items-center gap-4">
                          <div className="bg-red-100 p-2 rounded-full">
                            <FileText className="h-5 w-5 text-red-600" />
                          </div>
                          <div>
                            <span className="font-semibold text-red-900 block mb-0.5">Plano de Negócios (PDF)</span>
                            <p className="text-xs text-red-700 font-medium">Falta assinar a página 12 (Termo de Compromisso)</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="bg-red-100 text-red-800 px-3 py-1 text-xs font-bold rounded-sm border border-red-200">
                            PENDÊNCIA
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between p-4 border border-[#1a4d2e]/10 bg-white rounded-sm">
                        <div className="flex items-center gap-4">
                          <div className="bg-[#fafafa] border border-[#1a4d2e]/10 p-2 rounded-full">
                            <FileText className="h-5 w-5 text-[#4f6f52]" />
                          </div>
                          <span className="font-medium text-[#4a4a4a]">Cartão CNPJ</span>
                        </div>
                        <StatusBadge status="Aprovado" variant="success" />
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "avaliacoes" && (
                  <div className="flex flex-col items-center justify-center py-16 text-center">
                    <div className="bg-[#fafafa] p-4 rounded-full mb-4">
                      <Lock className="h-8 w-8 text-[#4f6f52]/50" />
                    </div>
                    <h3 className="text-lg font-bold text-[#4a4a4a] mb-2">Avaliações não liberadas</h3>
                    <p className="text-[#4f6f52] max-w-md">
                      A proposta não pode ser encaminhada para os avaliadores técnicos enquanto houver pendências na documentação (Fase de Triagem).
                    </p>
                  </div>
                )}

                {activeTab === "comunicacao" && (
                  <div className="space-y-6">
                    <div className="border-l-4 border-[#1a4d2e] pl-5 py-1">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-semibold text-[#1a4d2e]">Dra. Maria Santos (Gestor)</span>
                        <span className="text-xs font-medium text-[#4f6f52] bg-[#fafafa] px-2 py-1 border border-[#1a4d2e]/5">Hoje, 14:30</span>
                      </div>
                      <p className="text-[14px] text-[#4a4a4a] leading-relaxed">
                        Prezado empreendedor, identificamos que a Certidão Municipal enviada está vencida e o Plano de Negócios carece de assinatura na página 12. 
                        Solicitamos que providencie o reenvio até sexta-feira.
                      </p>
                    </div>
                    <div className="border-l-4 border-[#8fbc8f] pl-5 py-1">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-semibold text-[#4f6f52]">Sistema</span>
                        <span className="text-xs font-medium text-[#4f6f52] bg-[#fafafa] px-2 py-1 border border-[#1a4d2e]/5">15/05/2026, 09:15</span>
                      </div>
                      <p className="text-[14px] text-[#4a4a4a] leading-relaxed">Proposta passou na triagem preliminar de aderência ao edital.</p>
                    </div>

                    <div className="mt-8 p-5 bg-[#fafafa] border border-[#1a4d2e]/10 rounded-sm">
                      <h4 className="font-bold text-[#1a4d2e] mb-3 flex items-center gap-2">
                        <Send className="h-4 w-4" />
                        Nova Mensagem / Notificação
                      </h4>
                      <textarea
                        rows={3}
                        placeholder="Digite sua mensagem para o empreendedor..."
                        className="w-full p-3 border border-[#1a4d2e]/20 bg-white mb-3 rounded-sm focus:outline-none focus:border-[#1a4d2e]"
                      />
                      <div className="flex justify-end">
                        <button className="px-5 py-2.5 bg-[#1a4d2e] text-white hover:bg-[#0a2012] font-semibold text-sm rounded-sm transition-colors">
                          Enviar Notificação
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "historico" && (
                  <div>
                    <div className="relative border-l-2 border-[#1a4d2e]/20 ml-3 space-y-8 py-4">
                      
                      <div className="relative pl-8">
                        <div className="absolute left-[-9px] top-1 h-4 w-4 rounded-full bg-amber-500 border-2 border-white shadow-sm"></div>
                        <div className="flex justify-between items-start mb-1">
                          <span className="font-bold text-amber-700">Documentação recusada</span>
                          <span className="text-xs font-medium text-[#4f6f52]">Hoje, 14:30</span>
                        </div>
                        <p className="text-[14px] text-[#4a4a4a]">Dra. Maria Santos marcou 2 documentos como inválidos.</p>
                      </div>

                      <div className="relative pl-8">
                        <div className="absolute left-[-9px] top-1 h-4 w-4 rounded-full bg-[#8fbc8f] border-2 border-white shadow-sm"></div>
                        <div className="flex justify-between items-start mb-1">
                          <span className="font-bold text-[#4f6f52]">Triagem aprovada</span>
                          <span className="text-xs font-medium text-[#4f6f52]">15/05/2026</span>
                        </div>
                        <p className="text-[14px] text-[#4a4a4a]">Aderência verificada por Dra. Maria Santos.</p>
                      </div>

                      <div className="relative pl-8">
                        <div className="absolute left-[-9px] top-1 h-4 w-4 rounded-full bg-[#1a4d2e] border-2 border-white shadow-sm"></div>
                        <div className="flex justify-between items-start mb-1">
                          <span className="font-bold text-[#1a4d2e]">Proposta submetida</span>
                          <span className="text-xs font-medium text-[#4f6f52]">10/05/2026</span>
                        </div>
                        <p className="text-[14px] text-[#4a4a4a]">O empreendedor submeteu o formulário. Protocolo PSL-2026-047 gerado.</p>
                      </div>

                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Sidebar - Decision Panel */}
          <div className="w-[340px] flex-shrink-0">
            <div className="bg-white border border-[#1a4d2e]/20 p-5 shadow-sm rounded-sm mb-6 sticky top-6 text-[13px]">
              
              <div className="mb-6">
                <h2 className="font-semibold text-[#1a4d2e] border-b border-[#1a4d2e]/10 pb-2 mb-4">Pendência atual</h2>
                
                <div className="space-y-3 text-[#4a4a4a]">
                  <div className="grid grid-cols-[110px_1fr] gap-2 items-start">
                    <span className="font-medium text-[#4f6f52]">Status:</span>
                    <span>Aguardando correção de documentos</span>
                  </div>
                  <div className="grid grid-cols-[110px_1fr] gap-2 items-start">
                    <span className="font-medium text-[#4f6f52]">Responsável:</span>
                    <span>Empreendedor</span>
                  </div>
                  <div className="grid grid-cols-[110px_1fr] gap-2 items-start">
                    <span className="font-medium text-[#4f6f52]">Tempo na etapa:</span>
                    <span>3 dias</span>
                  </div>
                  <div className="grid grid-cols-[110px_1fr] gap-2 items-start">
                    <span className="font-medium text-[#4f6f52]">Pendência:</span>
                    <span className="text-red-700 font-medium">Certidão municipal vencida</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div>
                <h2 className="font-semibold text-[#1a4d2e] border-b border-[#1a4d2e]/10 pb-2 mb-4">Ações</h2>
                
                <div className="space-y-2.5">
                  <button className="w-full text-center px-4 py-2 bg-[#1a4d2e] text-white hover:bg-[#0a2012] font-medium rounded-sm transition-colors text-[13px]">
                    Cobrar atualização
                  </button>
                  
                  <button className="w-full text-center px-4 py-2 bg-white border border-[#4f6f52]/30 text-[#4a4a4a] hover:bg-[#fafafa] font-medium rounded-sm transition-colors text-[13px]">
                    Registrar observação
                  </button>

                  <div className="pt-2">
                    <button disabled className="w-full text-center px-4 py-2 bg-[#f5f5f5] border border-[#e0e0e0] text-[#a0a0a0] font-medium rounded-sm cursor-not-allowed text-[13px]">
                      Encaminhar para avaliação
                    </button>
                  </div>
                </div>
              </div>

            </div>
          </div>
          
        </div>
      </main>
    </div>
  );
}
