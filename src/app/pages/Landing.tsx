import { Link } from "react-router";
import { Header } from "../components/Header";
import { PrototypeNote } from "../components/PrototypeNote";
import { ArrowRight, FileText, Users, ClipboardCheck, Award } from "lucide-react";

export function Landing() {
  return (
    <div className="min-h-screen bg-[#fafafa]">
      <Header />
      
      <main className="mx-auto max-w-[1080px] px-6 py-12">
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-[#1a4d2e] to-[#4f6f52] text-white p-12 mb-8">
          <div className="max-w-2xl">
            <h1 className="text-4xl mb-4">
              Submissão e avaliação de projetos para a Incubadora Tecnológica PampaTec
            </h1>
            <p className="text-[#e8dcc4] mb-8">
              Plataforma institucional para gestão do processo seletivo de startups e projetos inovadores
              vinculados à UNIPAMPA e à Incubadora Tecnológica PampaTec Alegrete.
            </p>
            <div className="flex gap-4">
              <Link
                to="/login"
                className="bg-white text-[#1a4d2e] px-6 py-3 hover:bg-[#e8dcc4] transition-colors"
              >
                Entrar
              </Link>
              <Link
                to="/submissao"
                className="border border-white text-white px-6 py-3 hover:bg-white/10 transition-colors"
              >
                Submeter proposta
              </Link>
              <Link
                to="/resultados"
                className="border border-white text-white px-6 py-3 hover:bg-white/10 transition-colors"
              >
                Acompanhar edital
              </Link>
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
                <h3 className="text-[#4a4a4a]">Submissão completa</h3>
                <p className="text-sm text-[#4f6f52]">Preenchimento do plano de negócio e envio de documentos</p>
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
                <h3 className="text-[#4a4a4a]">Resultado</h3>
                <p className="text-sm text-[#4f6f52]">Publicação do parecer e classificação</p>
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
                <h3 className="text-[#4a4a4a]">Homologação</h3>
                <p className="text-sm text-[#4f6f52]">Resultado final publicado e projetos selecionados iniciam incubação</p>
              </div>
            </div>
          </div>
        </div>

        {/* Key Features */}
        <div className="grid grid-cols-4 gap-6">
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
            <p className="text-sm text-[#4f6f52]">Indicadores públicos de impacto e resultados agregados</p>
          </div>
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
