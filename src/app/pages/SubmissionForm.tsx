import { useState } from "react";
import { Header } from "../components/Header";
import { PrototypeNote } from "../components/PrototypeNote";
import { Check, ChevronRight } from "lucide-react";

const steps = [
  "Contatos",
  "O negócio",
  "Análise de mercado",
  "Produto ou serviço",
  "Impactos esperados",
  "Gestão de pessoas",
  "Plano financeiro",
  "Documentos anexos",
];

export function SubmissionForm() {
  const [currentStep, setCurrentStep] = useState(1);

  return (
    <div className="min-h-screen bg-[#fafafa]">
      <Header />
      
      <main className="mx-auto max-w-[1080px] px-6 py-8">
        <div className="mb-6">
          <h1 className="text-[#1a4d2e] mb-2">Submissão de proposta</h1>
          <p className="text-[#4f6f52]">AgroSense Pampa • Protocolo PSL-2026-047</p>
        </div>

        <div className="grid grid-cols-4 gap-6">
          {/* Sidebar Navigation */}
          <div className="col-span-1">
            <div className="bg-white border border-[#1a4d2e]/10 p-4 sticky top-6">
              <h3 className="text-sm text-[#4a4a4a] mb-4">Etapas do formulário</h3>
              <nav className="space-y-2">
                {steps.map((step, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentStep(index)}
                    className={`w-full text-left text-sm px-3 py-2 flex items-center gap-2 transition-colors ${
                      currentStep === index
                        ? "bg-[#1a4d2e] text-white"
                        : index < 2
                        ? "text-[#4a4a4a] hover:bg-[#e8dcc4]"
                        : "text-[#4f6f52]/50"
                    }`}
                  >
                    {index < 2 ? (
                      <Check className="h-4 w-4" />
                    ) : (
                      <span className="text-xs">{index + 1}</span>
                    )}
                    {step}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Form Content */}
          <div className="col-span-3">
            <div className="bg-white border border-[#1a4d2e]/10 p-8">
              {currentStep === 0 && (
                <div>
                  <h2 className="text-[#1a4d2e] mb-6">Contatos</h2>
                  
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm text-[#4a4a4a] mb-2">
                        Nome da empresa/projeto *
                      </label>
                      <input
                        type="text"
                        defaultValue="AgroSense Pampa"
                        className="w-full px-3 py-2 border border-[#4f6f52]/30 bg-white"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm text-[#4a4a4a] mb-2">
                          CNPJ
                        </label>
                        <input
                          type="text"
                          defaultValue="12.345.678/0001-90"
                          className="w-full px-3 py-2 border border-[#4f6f52]/30 bg-white"
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-[#4a4a4a] mb-2">
                          Data de fundação
                        </label>
                        <input
                          type="date"
                          className="w-full px-3 py-2 border border-[#4f6f52]/30 bg-white"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm text-[#4a4a4a] mb-2">
                        Empreendedores / Sócios *
                      </label>
                      <textarea
                        rows={3}
                        defaultValue="João da Silva (CPF 000.000.000-00)\nMaria Santos (CPF 111.111.111-11)"
                        className="w-full px-3 py-2 border border-[#4f6f52]/30 bg-white"
                      />
                      <p className="text-xs text-[#4f6f52] mt-1">
                        Liste nome completo e CPF de cada sócio
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm text-[#4a4a4a] mb-2">
                          E-mail de contato *
                        </label>
                        <input
                          type="email"
                          defaultValue="contato@agrosense.com.br"
                          className="w-full px-3 py-2 border border-[#4f6f52]/30 bg-white"
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-[#4a4a4a] mb-2">
                          Telefone
                        </label>
                        <input
                          type="tel"
                          defaultValue="(55) 99999-9999"
                          className="w-full px-3 py-2 border border-[#4f6f52]/30 bg-white"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 1 && (
                <div>
                  <h2 className="text-[#1a4d2e] mb-6">O negócio</h2>
                  
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm text-[#4a4a4a] mb-2">
                        Proposta de valor *
                      </label>
                      <textarea
                        rows={4}
                        defaultValue="Sistema IoT para monitoramento em tempo real de variáveis do solo (umidade, pH, nutrientes) para agricultura de precisão no bioma Pampa."
                        className="w-full px-3 py-2 border border-[#4f6f52]/30 bg-white"
                      />
                      <p className="text-xs text-[#4f6f52] mt-1">
                        Descreva de forma clara o que sua solução oferece
                      </p>
                    </div>

                    <div>
                      <label className="block text-sm text-[#4a4a4a] mb-2">
                        Segmento de clientes *
                      </label>
                      <textarea
                        rows={3}
                        defaultValue="Produtores rurais de médio e grande porte, cooperativas agrícolas e empresas de consultoria agronômica na região da Campanha Gaúcha."
                        className="w-full px-3 py-2 border border-[#4f6f52]/30 bg-white"
                      />
                    </div>

                    <div>
                      <label className="block text-sm text-[#4a4a4a] mb-2">
                        Atividades-chave
                      </label>
                      <textarea
                        rows={3}
                        placeholder="Ex: Desenvolvimento de hardware, desenvolvimento de software, instalação e manutenção..."
                        className="w-full px-3 py-2 border border-[#4f6f52]/30 bg-white"
                      />
                      <div className="mt-2">
                        <PrototypeNote>
                          Campo a validar: verificar se este nível de detalhamento é adequado ou se deve ser mais estruturado (ex: checklist).
                        </PrototypeNote>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm text-[#4a4a4a] mb-2">
                        Estágio de evolução *
                      </label>
                      <select className="w-full px-3 py-2 border border-[#4f6f52]/30 bg-white">
                        <option>Selecione...</option>
                        <option selected>Ideia / Conceito</option>
                        <option>Protótipo</option>
                        <option>MVP (Produto Mínimo Viável)</option>
                        <option>Produto em operação</option>
                        <option>Empresa estabelecida</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 2 && (
                <div>
                  <h2 className="text-[#1a4d2e] mb-6">Análise de mercado</h2>
                  <PrototypeNote>
                    Seção a ser detalhada pelo grupo. Sugestões de campos:
                    <ul className="list-disc list-inside mt-2 space-y-1">
                      <li>Tamanho estimado do mercado</li>
                      <li>Principais concorrentes</li>
                      <li>Diferencial competitivo</li>
                      <li>Estratégia de entrada no mercado</li>
                      <li>Parcerias estratégicas</li>
                    </ul>
                  </PrototypeNote>
                </div>
              )}

              {currentStep === 3 && (
                <div>
                  <h2 className="text-[#1a4d2e] mb-6">Produto ou serviço</h2>
                  
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm text-[#4a4a4a] mb-2">
                        Descrição da solução proposta *
                      </label>
                      <textarea
                        rows={5}
                        className="w-full px-3 py-2 border border-[#4f6f52]/30 bg-white"
                        placeholder="Descreva em detalhes a solução tecnológica..."
                      />
                    </div>

                    <div>
                      <label className="block text-sm text-[#4a4a4a] mb-2">
                        Tecnologias utilizadas
                      </label>
                      <input
                        type="text"
                        placeholder="Ex: IoT, Sensores capacitivos, LoRaWAN, Machine Learning..."
                        className="w-full px-3 py-2 border border-[#4f6f52]/30 bg-white"
                      />
                    </div>

                    <div>
                      <label className="block text-sm text-[#4a4a4a] mb-2">
                        Potencial de inovação tecnológica *
                      </label>
                      <select className="w-full px-3 py-2 border border-[#4f6f52]/30 bg-white mb-2">
                        <option>Selecione o nível...</option>
                        <option>Incremental</option>
                        <option>Moderado</option>
                        <option selected>Alto</option>
                        <option>Disruptivo</option>
                      </select>
                      <textarea
                        rows={3}
                        placeholder="Justifique a classificação..."
                        className="w-full px-3 py-2 border border-[#4f6f52]/30 bg-white"
                      />
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 4 && (
                <div>
                  <h2 className="text-[#1a4d2e] mb-6">Impactos esperados</h2>
                  
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm text-[#4a4a4a] mb-2">
                        Impacto ambiental *
                      </label>
                      <textarea
                        rows={4}
                        placeholder="Descreva os impactos ambientais positivos da solução..."
                        className="w-full px-3 py-2 border border-[#4f6f52]/30 bg-white"
                      />
                      <p className="text-xs text-[#4f6f52] mt-1">
                        Considere: redução de insumos, preservação de recursos, sustentabilidade
                      </p>
                    </div>

                    <div>
                      <label className="block text-sm text-[#4a4a4a] mb-2">
                        Interação empresa-universidade *
                      </label>
                      <textarea
                        rows={4}
                        defaultValue="Parceria prevista com o Grupo de Pesquisa em Agricultura de Precisão da UNIPAMPA campus Alegrete para validação técnica dos sensores e desenvolvimento de modelos preditivos."
                        className="w-full px-3 py-2 border border-[#4f6f52]/30 bg-white"
                      />
                      <p className="text-xs text-[#4f6f52] mt-1">
                        Descreva parcerias de P&D, TCC, estágios, uso de laboratórios, etc.
                      </p>
                    </div>

                    <div>
                      <label className="block text-sm text-[#4a4a4a] mb-2">
                        Potencial de geração de emprego e renda
                      </label>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <input
                            type="number"
                            placeholder="Empregos diretos (12 meses)"
                            className="w-full px-3 py-2 border border-[#4f6f52]/30 bg-white"
                          />
                        </div>
                        <div>
                          <input
                            type="number"
                            placeholder="Empregos indiretos estimados"
                            className="w-full px-3 py-2 border border-[#4f6f52]/30 bg-white"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 5 && (
                <div>
                  <h2 className="text-[#1a4d2e] mb-6">Gestão de pessoas</h2>
                  <PrototypeNote>
                    A definir pelo grupo: estrutura da equipe, competências necessárias, plano de contratação.
                  </PrototypeNote>
                </div>
              )}

              {currentStep === 6 && (
                <div>
                  <h2 className="text-[#1a4d2e] mb-6">Plano financeiro</h2>
                  
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm text-[#4a4a4a] mb-2">
                        Fontes de receita *
                      </label>
                      <textarea
                        rows={3}
                        placeholder="Ex: Venda de equipamentos, assinatura mensal do software, consultoria..."
                        className="w-full px-3 py-2 border border-[#4f6f52]/30 bg-white"
                      />
                    </div>

                    <div>
                      <label className="block text-sm text-[#4a4a4a] mb-2">
                        Estrutura de custos
                      </label>
                      <textarea
                        rows={3}
                        placeholder="Principais custos operacionais e investimentos necessários..."
                        className="w-full px-3 py-2 border border-[#4f6f52]/30 bg-white"
                      />
                    </div>

                    <div>
                      <label className="block text-sm text-[#4a4a4a] mb-2">
                        Investimento necessário
                      </label>
                      <div className="grid grid-cols-2 gap-4">
                        <input
                          type="text"
                          placeholder="Valor (R$)"
                          className="w-full px-3 py-2 border border-[#4f6f52]/30 bg-white"
                        />
                        <select className="w-full px-3 py-2 border border-[#4f6f52]/30 bg-white">
                          <option>Estágio de investimento</option>
                          <option>Pré-seed</option>
                          <option>Seed</option>
                          <option>Série A</option>
                        </select>
                      </div>
                      <PrototypeNote>
                        Critério precisa de validação: definir se campos financeiros detalhados são necessários nesta fase.
                      </PrototypeNote>
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 7 && (
                <div>
                  <h2 className="text-[#1a4d2e] mb-6">Documentos anexos</h2>
                  <p className="text-[#4f6f52] mb-4">
                    Os documentos podem ser enviados na seção específica de upload.
                  </p>
                  <a
                    href="/documentos"
                    className="text-[#1a4d2e] hover:underline flex items-center gap-2"
                  >
                    Ir para upload de documentos <ChevronRight className="h-4 w-4" />
                  </a>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-8 pt-6 border-t border-[#1a4d2e]/10">
                <button
                  onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
                  disabled={currentStep === 0}
                  className="px-6 py-2 border border-[#4f6f52]/30 text-[#4a4a4a] hover:bg-[#e8dcc4] disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  Anterior
                </button>
                <div className="flex gap-3">
                  <button className="px-6 py-2 border border-[#4f6f52]/30 text-[#4a4a4a] hover:bg-[#e8dcc4]">
                    Salvar rascunho
                  </button>
                  {currentStep < steps.length - 1 ? (
                    <button
                      onClick={() => setCurrentStep(Math.min(steps.length - 1, currentStep + 1))}
                      className="px-6 py-2 bg-[#1a4d2e] text-white hover:bg-[#4f6f52]"
                    >
                      Próxima etapa
                    </button>
                  ) : (
                    <button className="px-6 py-2 bg-[#1a4d2e] text-white hover:bg-[#4f6f52]">
                      Finalizar e enviar
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
