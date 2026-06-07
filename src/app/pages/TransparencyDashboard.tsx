import { Header } from "../components/Header";
import { PrototypeNote } from "../components/PrototypeNote";
import { Users, Briefcase, TrendingUp, DollarSign, GraduationCap, BarChart3 } from "lucide-react";

export function TransparencyDashboard() {
  return (
    <div className="min-h-screen bg-[#fafafa]">
      <Header />
      
      <main className="mx-auto max-w-[1080px] px-6 py-8">
        <div className="mb-8">
          <h1 className="text-[#1a4d2e] mb-2">Dashboard de Transparência e Impacto</h1>
          <p className="text-[#4f6f52]">Indicadores públicos agregados • Sem exposição de dados sensíveis</p>
        </div>

        <div className="mb-6">
          <PrototypeNote>
            <strong>Dados ilustrativos para prototipação.</strong> Os valores apresentados são fictícios e servem
            apenas para demonstrar a interface. Dados reais devem ser agregados respeitando LGPD e sigilo dos
            empreendedores.
          </PrototypeNote>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-4 gap-6 mb-8">
          <div className="bg-white border border-[#1a4d2e]/10 p-6">
            <div className="flex items-center justify-between mb-3">
              <Users className="h-8 w-8 text-[#1a4d2e]" />
              <span className="text-3xl text-[#1a4d2e]">47</span>
            </div>
            <h3 className="text-sm text-[#4a4a4a]">Propostas submetidas</h3>
            <p className="text-xs text-[#4f6f52] mt-1">Desde 2024</p>
          </div>

          <div className="bg-white border border-[#1a4d2e]/10 p-6">
            <div className="flex items-center justify-between mb-3">
              <Briefcase className="h-8 w-8 text-[#8fbc8f]" />
              <span className="text-3xl text-[#1a4d2e]">18</span>
            </div>
            <h3 className="text-sm text-[#4a4a4a]">Projetos classificados</h3>
            <p className="text-xs text-[#4f6f52] mt-1">Taxa de aprovação: 38%</p>
          </div>

          <div className="bg-white border border-[#1a4d2e]/10 p-6">
            <div className="flex items-center justify-between mb-3">
              <TrendingUp className="h-8 w-8 text-[#1a4d2e]" />
              <span className="text-3xl text-[#1a4d2e]">142</span>
            </div>
            <h3 className="text-sm text-[#4a4a4a]">Empregos potenciais</h3>
            <p className="text-xs text-[#4f6f52] mt-1">Diretos e indiretos</p>
          </div>

          <div className="bg-white border border-[#1a4d2e]/10 p-6">
            <div className="flex items-center justify-between mb-3">
              <GraduationCap className="h-8 w-8 text-[#4f6f52]" />
              <span className="text-3xl text-[#1a4d2e]">24</span>
            </div>
            <h3 className="text-sm text-[#4a4a4a]">Interações UNIPAMPA</h3>
            <p className="text-xs text-[#4f6f52] mt-1">Projetos de P&D</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6 mb-6">
          {/* Technology Areas */}
          <div className="bg-white border border-[#1a4d2e]/10 p-6">
            <div className="flex items-center gap-2 mb-6">
              <BarChart3 className="h-5 w-5 text-[#4f6f52]" />
              <h2 className="text-[#4a4a4a]">Áreas tecnológicas mais comuns</h2>
            </div>
            
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-[#4a4a4a]">AgTech / Agricultura de Precisão</span>
                  <span className="text-[#4f6f52]">12</span>
                </div>
                <div className="h-3 bg-[#e8dcc4]">
                  <div className="h-full bg-[#1a4d2e]" style={{ width: "60%" }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-[#4a4a4a]">Sustentabilidade / Economia Circular</span>
                  <span className="text-[#4f6f52]">8</span>
                </div>
                <div className="h-3 bg-[#e8dcc4]">
                  <div className="h-full bg-[#4f6f52]" style={{ width: "40%" }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-[#4a4a4a]">IoT / Sistemas Embarcados</span>
                  <span className="text-[#4f6f52]">7</span>
                </div>
                <div className="h-3 bg-[#e8dcc4]">
                  <div className="h-full bg-[#8fbc8f]" style={{ width: "35%" }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-[#4a4a4a]">EdTech</span>
                  <span className="text-[#4f6f52]">6</span>
                </div>
                <div className="h-3 bg-[#e8dcc4]">
                  <div className="h-full bg-[#1a4d2e]" style={{ width: "30%" }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-[#4a4a4a]">HealthTech / Biotecnologia</span>
                  <span className="text-[#4f6f52]">5</span>
                </div>
                <div className="h-3 bg-[#e8dcc4]">
                  <div className="h-full bg-[#4f6f52]" style={{ width: "25%" }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-[#4a4a4a]">Outras áreas</span>
                  <span className="text-[#4f6f52]">9</span>
                </div>
                <div className="h-3 bg-[#e8dcc4]">
                  <div className="h-full bg-[#8fbc8f]" style={{ width: "45%" }}></div>
                </div>
              </div>
            </div>
          </div>

          {/* Economic Impact */}
          <div className="bg-white border border-[#1a4d2e]/10 p-6">
            <div className="flex items-center gap-2 mb-6">
              <DollarSign className="h-5 w-5 text-[#4f6f52]" />
              <h2 className="text-[#4a4a4a]">Impacto econômico potencial</h2>
            </div>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-sm text-[#4a4a4a] mb-2">Recursos captados (projeção)</h3>
                <div className="text-3xl text-[#1a4d2e] mb-1">R$ 3.2M</div>
                <p className="text-xs text-[#4f6f52]">Investimentos + faturamento projetado 12 meses</p>
              </div>

              <div className="border-t border-[#1a4d2e]/10 pt-4">
                <h3 className="text-sm text-[#4a4a4a] mb-3">Distribuição de estágio</h3>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-[#4f6f52]">Ideia / Conceito</span>
                    <span className="text-[#4a4a4a]">34%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-[#4f6f52]">Protótipo</span>
                    <span className="text-[#4a4a4a]">28%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-[#4f6f52]">MVP</span>
                    <span className="text-[#4a4a4a]">23%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-[#4f6f52]">Em operação</span>
                    <span className="text-[#4a4a4a]">15%</span>
                  </div>
                </div>
              </div>

              <div className="border-t border-[#1a4d2e]/10 pt-4">
                <h3 className="text-sm text-[#4a4a4a] mb-3">Geração de emprego</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-2xl text-[#1a4d2e]">78</div>
                    <p className="text-xs text-[#4f6f52]">Empregos diretos</p>
                  </div>
                  <div>
                    <div className="text-2xl text-[#1a4d2e]">64</div>
                    <p className="text-xs text-[#4f6f52]">Empregos indiretos</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* UNIPAMPA Interaction */}
        <div className="bg-white border border-[#1a4d2e]/10 p-6 mb-6">
          <h2 className="text-[#4a4a4a] mb-6">Interação com a UNIPAMPA</h2>
          
          <div className="grid grid-cols-3 gap-6">
            <div className="text-center p-6 border border-[#1a4d2e]/10">
              <div className="text-3xl text-[#1a4d2e] mb-2">24</div>
              <h3 className="text-sm text-[#4a4a4a] mb-1">Projetos de P&D</h3>
              <p className="text-xs text-[#4f6f52]">Com grupos de pesquisa</p>
            </div>
            <div className="text-center p-6 border border-[#1a4d2e]/10">
              <div className="text-3xl text-[#1a4d2e] mb-2">31</div>
              <h3 className="text-sm text-[#4a4a4a] mb-1">Bolsistas envolvidos</h3>
              <p className="text-xs text-[#4f6f52]">IC, TCC e estágios</p>
            </div>
            <div className="text-center p-6 border border-[#1a4d2e]/10">
              <div className="text-3xl text-[#1a4d2e] mb-2">12</div>
              <h3 className="text-sm text-[#4a4a4a] mb-1">Laboratórios utilizados</h3>
              <p className="text-xs text-[#4f6f52]">Parcerias técnicas</p>
            </div>
          </div>
        </div>

        {/* Environmental Impact */}
        <div className="bg-white border border-[#1a4d2e]/10 p-6">
          <h2 className="text-[#4a4a4a] mb-4">Impacto ambiental agregado</h2>
          <div className="grid grid-cols-3 gap-6 text-sm">
            <div>
              <h3 className="text-[#4a4a4a] mb-2">Projetos com foco ambiental</h3>
              <div className="text-2xl text-[#8fbc8f] mb-1">68%</div>
              <p className="text-xs text-[#4f6f52]">32 de 47 propostas</p>
            </div>
            <div>
              <h3 className="text-[#4a4a4a] mb-2">Redução de recursos estimada</h3>
              <div className="text-lg text-[#4a4a4a] mb-1">~25% água/energia</div>
              <p className="text-xs text-[#4f6f52]">Média das propostas AgTech</p>
            </div>
            <div>
              <h3 className="text-[#4a4a4a] mb-2">Economia circular</h3>
              <div className="text-lg text-[#4a4a4a] mb-1">8 projetos</div>
              <p className="text-xs text-[#4f6f52]">Reaproveitamento de resíduos</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
