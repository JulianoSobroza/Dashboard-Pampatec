import { useState } from "react";
import { Link } from "react-router";
import { Header } from "../components/Header";
import { PrototypeNote } from "../components/PrototypeNote";
import { StatusBadge } from "../components/StatusBadge";
import { Search, BookOpen, MapPin, Lightbulb, ChevronRight, CheckCircle2 } from "lucide-react";

// Mock Data isolado para esta view
const rdProposals = [
  {
    id: "PROP-2024-041",
    title: "Sistema de Irrigação Inteligente com IoT",
    abstract: "Plataforma que utiliza sensores IoT para otimização do uso de água em pequenas propriedades rurais da fronteira oeste, integrando previsão climática local.",
    campus: "Alegrete",
    knowledgeArea: "Engenharias / Agrárias",
    innovationType: "Produto",
    status: "Em Avaliação",
    rdPotential: "high",
  },
  {
    id: "PROP-2024-045",
    title: "Algoritmo de Triagem de Doenças em Rebanhos",
    abstract: "Software baseado em visão computacional e IA para identificação precoce de anomalias na marcha de ovinos, visando saúde animal preventiva.",
    campus: "Uruguaiana",
    knowledgeArea: "Computação / Veterinária",
    innovationType: "Software/IA",
    status: "Aprovada",
    rdPotential: "high",
  },
  {
    id: "PROP-2024-061",
    title: "Bioplástico a partir de Casca de Arroz",
    abstract: "Desenvolvimento de novos materiais biodegradáveis utilizando resíduos da agroindústria arrozeira, reduzindo impacto ambiental.",
    campus: "Alegrete",
    knowledgeArea: "Química / Engenharias",
    innovationType: "Produto/Processo",
    status: "Em Avaliação",
    rdPotential: "high",
  },
  {
    id: "PROP-2024-052",
    title: "Plataforma de Ecoturismo Pampa Experiences",
    abstract: "Marketplace que conecta guias locais e propriedades rurais a turistas buscando experiências autênticas e sustentáveis no bioma Pampa.",
    campus: "Livramento",
    knowledgeArea: "Turismo / Sociais Aplicadas",
    innovationType: "Serviço",
    status: "Triagem",
    rdPotential: "medium",
  },
];

export function ResearcherDashboard() {
  const [searchTerm, setSearchTerm] = useState("");
  const [campusFilter, setCampusFilter] = useState("all");
  const [areaFilter, setAreaFilter] = useState("all");

  // Lógica de filtro combinada
  const filteredProposals = rdProposals.filter((prop) => {
    const matchSearch = prop.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                        prop.abstract.toLowerCase().includes(searchTerm.toLowerCase());
    const matchCampus = campusFilter === "all" || prop.campus === campusFilter;
    const matchArea = areaFilter === "all" || prop.knowledgeArea.includes(areaFilter);
    return matchSearch && matchCampus && matchArea;
  });

  return (
    <div className="min-h-screen bg-[#fafafa]">
      <Header />
      
      <main className="mx-auto max-w-[1080px] px-6 py-12">
        
        <div className="mb-8">
          <PrototypeNote>
            <strong>Painel do Pesquisador:</strong> Este painel visa conectar as dores e projetos das startups com as linhas de pesquisa da universidade. O algoritmo de "Potencial P&D" cruza as tags tecnológicas das propostas com o currículo Lattes dos docentes cadastrados.
          </PrototypeNote>
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl text-[#1a4d2e] font-semibold mb-2">Projetos para Parceria P&D</h1>
            <p className="text-[#4f6f52] max-w-2xl">
              Explore propostas submetidas à incubadora com potencial para desenvolvimento tecnológico conjunto, captação de editais (FAPERGS, CNPq) e oferta de bolsas aos discentes.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white border border-[#1a4d2e]/20 p-6 shadow-sm">
            <div className="text-4xl text-[#1a4d2e] font-light mb-2">14</div>
            <div className="text-sm text-[#4f6f52] uppercase tracking-wider font-medium">Projetos Mapeados</div>
          </div>
          <div className="bg-white border border-[#8fbc8f]/50 p-6 border-l-4 border-l-[#1a4d2e] shadow-sm">
            <div className="text-4xl text-[#1a4d2e] font-light mb-2">8</div>
            <div className="text-sm text-[#4f6f52] uppercase tracking-wider font-medium">Alta Sinergia Tecnológica</div>
          </div>
          <div className="bg-white border border-[#1a4d2e]/20 p-6 shadow-sm">
            <div className="text-4xl text-[#1a4d2e] font-light mb-2">2</div>
            <div className="text-sm text-[#4f6f52] uppercase tracking-wider font-medium">Manifestações Abertas</div>
          </div>
        </div>

        {/* Barra de Filtros */}
        <div className="bg-white border border-[#1a4d2e]/10 p-4 flex flex-col md:flex-row gap-4 mb-8 shadow-sm">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-[#4f6f52]" />
            <input 
              type="text" 
              placeholder="Buscar por palavras-chave, título ou resumo..."
              className="w-full pl-9 pr-4 py-2 border border-[#4f6f52]/30 text-sm focus:outline-none focus:border-[#1a4d2e]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="w-full md:w-48">
            <select 
              className="w-full px-3 py-2 border border-[#4f6f52]/30 text-sm text-[#4a4a4a] focus:outline-none focus:border-[#1a4d2e] bg-white"
              value={campusFilter}
              onChange={(e) => setCampusFilter(e.target.value)}
            >
              <option value="all">Todos os Campi</option>
              <option value="Alegrete">Alegrete</option>
              <option value="Uruguaiana">Uruguaiana</option>
              <option value="Livramento">Sant'Ana do Livramento</option>
            </select>
          </div>
          <div className="w-full md:w-56">
            <select 
              className="w-full px-3 py-2 border border-[#4f6f52]/30 text-sm text-[#4a4a4a] focus:outline-none focus:border-[#1a4d2e] bg-white"
              value={areaFilter}
              onChange={(e) => setAreaFilter(e.target.value)}
            >
              <option value="all">Todas as Áreas</option>
              <option value="Engenharias">Engenharias</option>
              <option value="Computação">Ciência da Computação</option>
              <option value="Agrárias">Ciências Agrárias</option>
              <option value="Química">Química</option>
              <option value="Turismo">Turismo</option>
            </select>
          </div>
        </div>

        {/* Lista de Propostas */}
        <div className="space-y-4">
          {filteredProposals.map(prop => (
            <div key={prop.id} className="bg-white border border-[#1a4d2e]/20 p-6 flex flex-col md:flex-row gap-6 hover:shadow-md transition-all group">
              
              {/* Esquerda: Info Principal */}
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-3 mb-3">
                  <span className="text-xs font-mono text-[#4f6f52] bg-[#e8dcc4]/50 px-2 py-1">{prop.id}</span>
                  <StatusBadge status={prop.status} variant={prop.status === "Aprovada" ? "success" : "default"} />
                  
                  {prop.rdPotential === "high" && (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium bg-green-50 text-green-800 border border-green-200">
                      <CheckCircle2 className="h-3.5 w-3.5 text-green-600" /> Alta Sinergia P&D
                    </span>
                  )}
                  {prop.rdPotential === "medium" && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium bg-amber-50 text-amber-800 border border-amber-200">
                      Sinergia Moderada
                    </span>
                  )}
                </div>
                
                <h3 className="text-xl text-[#1a4d2e] font-semibold mb-3">{prop.title}</h3>
                <p className="text-sm text-[#4a4a4a] leading-relaxed mb-5">{prop.abstract}</p>
                
                <div className="flex flex-wrap gap-5 text-xs text-[#4f6f52]">
                  <div className="flex items-center gap-1.5">
                    <MapPin className="h-4 w-4" /> Campus {prop.campus}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <BookOpen className="h-4 w-4" /> {prop.knowledgeArea}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Lightbulb className="h-4 w-4" /> Inovação em {prop.innovationType}
                  </div>
                </div>
              </div>
              
              {/* Direita: Ações */}
              <div className="md:w-56 flex flex-col justify-center border-t md:border-t-0 md:border-l border-[#1a4d2e]/10 pt-5 md:pt-0 md:pl-6 shrink-0">
                <button className="w-full bg-[#1a4d2e] text-white px-4 py-2.5 text-sm font-medium hover:bg-[#4f6f52] transition-colors mb-3">
                  Manifestar Interesse
                </button>
                <Link to={`/proposta/${prop.id}`} className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm text-[#1a4d2e] font-medium border border-[#1a4d2e]/30 hover:bg-[#1a4d2e]/5 transition-colors">
                  Ver Detalhes <ChevronRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          ))}
          
          {filteredProposals.length === 0 && (
            <div className="text-center py-16 bg-white border border-[#1a4d2e]/20 border-dashed">
              <div className="text-[#4f6f52] mb-3 text-lg">Nenhuma proposta encontrada com estes filtros.</div>
              <button 
                onClick={() => { setSearchTerm(""); setCampusFilter("all"); setAreaFilter("all"); }}
                className="text-[#1a4d2e] font-medium hover:underline text-sm"
              >
                Limpar filtros de busca
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
