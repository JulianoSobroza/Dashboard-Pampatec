import { Link } from "react-router";
import { Header } from "../components/Header";
import { StatusBadge } from "../components/StatusBadge";
import { PrototypeNote } from "../components/PrototypeNote";
import { CheckCircle2, Circle, Clock, FileText, Upload, Send, Eye } from "lucide-react";

export function EntrepreneurDashboard() {
  return (
    <div className="min-h-screen bg-[#fafafa]">
      <Header />
      
      <main className="mx-auto max-w-[1080px] px-6 py-8">
        <div className="mb-8">
          <h1 className="text-[#1a4d2e] mb-2">Olá, empreendedor</h1>
          <p className="text-[#4f6f52]">Acompanhe o status da sua proposta e complete as etapas necessárias</p>
        </div>

        <div className="grid grid-cols-3 gap-6 mb-8">
          {/* Status Card */}
          <div className="col-span-2 border border-[#1a4d2e]/10 p-6 bg-white">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h2 className="text-[#4a4a4a] mb-2">AgroSense Pampa</h2>
                <p className="text-sm text-[#4f6f52]">Protocolo: PSL-2026-047</p>
              </div>
              <StatusBadge status="Documentação pendente" variant="warning" />
            </div>
            
            <div className="border-t border-[#1a4d2e]/10 pt-4">
              <div className="flex items-center gap-2 text-sm mb-3">
                <Clock className="h-4 w-4 text-[#4f6f52]" />
                <span className="text-[#4a4a4a]">Prazo para complementação: 15/06/2026</span>
              </div>
              
              <div className="bg-[#e8dcc4]/30 p-4 border-l-2 border-[#4f6f52]">
                <h4 className="text-sm text-[#4a4a4a] mb-2">Próximos passos:</h4>
                <ul className="text-sm text-[#4f6f52] space-y-1">
                  <li>• Enviar certidão negativa municipal atualizada</li>
                  <li>• Revisar seção "Plano Financeiro" (campo incompleto)</li>
                  <li>• Confirmar dados dos sócios</li>
                </ul>
              </div>
            </div>

            <div className="mt-6">
              <Link
                to="/submissao"
                className="inline-flex items-center gap-2 bg-[#1a4d2e] text-white px-6 py-3 hover:bg-[#4f6f52] transition-colors"
              >
                Continuar preenchimento
              </Link>
            </div>
          </div>

          {/* Messages Card */}
          <div className="border border-[#1a4d2e]/10 p-6 bg-white">
            <h3 className="text-[#4a4a4a] mb-4">Mensagens da comissão</h3>
            <div className="space-y-3">
              <div className="text-sm border-l-2 border-amber-500 pl-3 py-2">
                <div className="text-[#4a4a4a] mb-1">21/05/2026</div>
                <p className="text-[#4f6f52]">Documentação fiscal precisa de atualização. Prazo: 7 dias.</p>
              </div>
              <div className="text-sm border-l-2 border-[#8fbc8f] pl-3 py-2">
                <div className="text-[#4a4a4a] mb-1">15/05/2026</div>
                <p className="text-[#4f6f52]">Proposta passou na triagem preliminar!</p>
              </div>
            </div>
          </div>
        </div>

        {/* Checklist */}
        <div className="border border-[#1a4d2e]/10 p-6 bg-white mb-6">
          <h2 className="text-[#4a4a4a] mb-6">Checklist de etapas</h2>
          
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <CheckCircle2 className="h-6 w-6 text-[#8fbc8f] flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="text-[#4a4a4a]">Dados do projeto</h3>
                  <StatusBadge status="Completo" variant="success" />
                </div>
                <p className="text-sm text-[#4f6f52]">Informações básicas, contatos e empreendedores</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <CheckCircle2 className="h-6 w-6 text-[#8fbc8f] flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="text-[#4a4a4a]">Plano de negócio</h3>
                  <StatusBadge status="Completo" variant="success" />
                </div>
                <p className="text-sm text-[#4f6f52]">Modelo de negócio, mercado, produto e impactos</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Circle className="h-6 w-6 text-amber-500 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="text-[#4a4a4a]">Documentos</h3>
                  <StatusBadge status="Pendente" variant="warning" />
                </div>
                <p className="text-sm text-[#4f6f52]">Certidões, CNPJ/CPF, currículos dos sócios</p>
                <Link to="/documentos" className="text-sm text-[#1a4d2e] hover:underline mt-2 inline-block">
                  Ir para upload →
                </Link>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Circle className="h-6 w-6 text-[#4f6f52]/30 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="text-[#4a4a4a]">Revisão e envio</h3>
                  <StatusBadge status="Aguardando" variant="default" />
                </div>
                <p className="text-sm text-[#4f6f52]">Confirmação final antes da submissão oficial</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Circle className="h-6 w-6 text-[#4f6f52]/30 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="text-[#4a4a4a]">Acompanhamento</h3>
                  <StatusBadge status="Aguardando" variant="default" />
                </div>
                <p className="text-sm text-[#4f6f52]">Status de avaliação, pitch e resultados</p>
              </div>
            </div>
          </div>
        </div>

        {/* Mentorship Placeholder */}
        <div className="border border-[#1a4d2e]/10 p-6 bg-white">
          <h3 className="text-[#4a4a4a] mb-3">Orientações e mentoria</h3>
          <PrototypeNote>
            Orientações de mentoria e exemplos de preenchimento serão adicionados pelo grupo.
            Considerar: vídeos tutoriais, exemplos de propostas bem-sucedidas, FAQ, contato com mentores.
          </PrototypeNote>
        </div>
      </main>
    </div>
  );
}
