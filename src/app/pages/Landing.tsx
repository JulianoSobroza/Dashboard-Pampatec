import { Link } from "react-router";
import { Header } from "../components/Header";
import { PrototypeNote } from "../components/PrototypeNote";
import { FileText, Users, ClipboardCheck, Award, Settings2, Gavel } from "lucide-react";
import logo from "../../assets/pampatec-logo.png";

export function Landing() {
  return (
    <div className="min-h-screen bg-[#fafafa]">
      <Header />
      
      <main className="mx-auto max-w-[1080px] px-6 py-12">
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-[#1a4d2e] to-[#4f6f52] text-white p-12 mb-8">
          <div className="grid md:grid-cols-[1fr_280px] gap-8 items-center">
          <div className="max-w-2xl">
            <h1 className="text-4xl mb-4">
              Plataforma de Gestão do Processo Seletivo PampaTec
            </h1>
            <p className="text-[#e8dcc4] mb-8">
              Demonstração navegável da plataforma de gestão do processo seletivo de startups da Incubadora Tecnológica PampaTec • UNIPAMPA.
            </p>
            <div className="flex gap-4">
              <Link
                to="/login"
                className="bg-white text-[#1a4d2e] px-6 py-3 hover:bg-[#e8dcc4] transition-colors"
              >
                Entrar
              </Link>
              <Link
                to="/gestor/editais"
                className="border border-white text-white px-6 py-3 hover:bg-white/10 transition-colors"
              >
                Configurar edital
              </Link>
              <Link
                to="/comissao"
                className="border border-white text-white px-6 py-3 hover:bg-white/10 transition-colors"
              >
                Ver comissão
              </Link>
            </div>
          </div>
          <div className="hidden md:flex bg-white/95 p-6 items-center justify-center">
            <img src={logo} alt="PampaTec — Parque Tecnológico do Pampa" className="max-h-40 object-contain" />
          </div>
          </div>
        </div>


        {/* Process Flow */}
        <div className="bg-white border border-[#1a4d2e]/10 p-8 mb-8">
          <h2 className="text-[#1a4d2e] mb-6">Fluxo do processo seletivo</h2>
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#1a4d2e] text-white flex items-center justify-center text-sm">
                1
              </div>
              <div>
                <h3 className="text-[#4a4a4a]">Manifestação de interesse</h3>
                <p className="text-sm text-[#4f6f52]">Empreendedor expressa interesse em participar</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#1a4d2e] text-white flex items-center justify-center text-sm">
                2
              </div>
              <div>
                <h3 className="text-[#4a4a4a]">Triagem preliminar</h3>
                <p className="text-sm text-[#4f6f52]">Gestor PampaTec verifica aderência inicial</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#1a4d2e] text-white flex items-center justify-center text-sm">
                3
              </div>
              <div>
                <h3 className="text-[#4a4a4a]">Documentação formal</h3>
                <p className="text-sm text-[#4f6f52]">Checklist documental, upload, validação, justificativa e versionamento</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#1a4d2e] text-white flex items-center justify-center text-sm">
                4
              </div>
              <div>
                <h3 className="text-[#4a4a4a]">Avaliação técnica</h3>
                <p className="text-sm text-[#4f6f52]">Comissão avaliadora analisa propostas com rubricas</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#1a4d2e] text-white flex items-center justify-center text-sm">
                5
              </div>
              <div>
                <h3 className="text-[#4a4a4a]">Pitch</h3>
                <p className="text-sm text-[#4f6f52]">Apresentação presencial ou virtual para a banca</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#1a4d2e] text-white flex items-center justify-center text-sm">
                6
              </div>
              <div>
                <h3 className="text-[#4a4a4a]">Resultado preliminar</h3>
                <p className="text-sm text-[#4f6f52]">Publicação inicial e abertura do prazo de recurso</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#1a4d2e] text-white flex items-center justify-center text-sm">
                7
              </div>
              <div>
                <h3 className="text-[#4a4a4a]">Recurso (se aplicável)</h3>
                <p className="text-sm text-[#4f6f52]">Prazo para interposição de recursos</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#8fbc8f] text-white flex items-center justify-center text-sm">
                8
              </div>
              <div>
                <h3 className="text-[#4a4a4a]">Resultado final e convocação</h3>
                <p className="text-sm text-[#4f6f52]">Homologação, comunicação oficial e convocação dos aprovados</p>
              </div>
            </div>
          </div>
        </div>

        {/* Key Features */}
        <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-6">
          <div className="border border-[#1a4d2e]/10 p-6 bg-white">
            <FileText className="h-8 w-8 text-[#1a4d2e] mb-3" />
            <h3 className="text-[#4a4a4a] mb-2">Submissão guiada</h3>
            <p className="text-sm text-[#4f6f52]">Formulário por etapas para facilitar o preenchimento do plano de negócio</p>
          </div>
          <div className="border border-[#1a4d2e]/10 p-6 bg-white">
            <Users className="h-8 w-8 text-[#1a4d2e] mb-3" />
            <h3 className="text-[#4a4a4a] mb-2">Múltiplos perfis</h3>
            <p className="text-sm text-[#4f6f52]">Empreendedores, gestores, avaliadores e pesquisadores</p>
          </div>
          <div className="border border-[#1a4d2e]/10 p-6 bg-white">
            <ClipboardCheck className="h-8 w-8 text-[#1a4d2e] mb-3" />
            <h3 className="text-[#4a4a4a] mb-2">Avaliação assíncrona</h3>
            <p className="text-sm text-[#4f6f52]">Sistema de rubricas e consenso para comissão técnica</p>
          </div>
          <div className="border border-[#1a4d2e]/10 p-6 bg-white">
            <Award className="h-8 w-8 text-[#1a4d2e] mb-3" />
            <h3 className="text-[#4a4a4a] mb-2">Transparência</h3>
            <p className="text-sm text-[#4f6f52]">Indicadores anonimizados e resultados agregados</p>
          </div>
          <Link to="/gestor/editais" className="border border-[#1a4d2e]/10 p-6 bg-white hover:border-[#1a4d2e]">
            <Settings2 className="h-8 w-8 text-[#1a4d2e] mb-3" />
            <h3 className="text-[#4a4a4a] mb-2">Editais configuráveis</h3>
            <p className="text-sm text-[#4f6f52]">Etapas, prazos, documentos e rubricas por processo seletivo</p>
          </Link>
          <Link to="/comissao" className="border border-[#1a4d2e]/10 p-6 bg-white hover:border-[#1a4d2e]">
            <Gavel className="h-8 w-8 text-[#1a4d2e] mb-3" />
            <h3 className="text-[#4a4a4a] mb-2">Deliberação</h3>
            <p className="text-sm text-[#4f6f52]">Consolidação, divergências, recursos e justificativa obrigatória</p>
          </Link>
        </div>

        {/* Footer Note */}
        <div className="mt-12 text-center text-sm text-[#4f6f52]">
          <p>Sistema desenvolvido como protótipo acadêmico para apoiar o processo seletivo da</p>
          <p className="font-medium text-[#1a4d2e]">Incubadora Tecnológica PampaTec Alegrete • UNIPAMPA</p>
        </div>
      </main>
    </div>
  );
}
