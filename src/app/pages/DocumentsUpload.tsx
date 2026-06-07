import { Header } from "../components/Header";
import { StatusBadge } from "../components/StatusBadge";
import { PrototypeNote } from "../components/PrototypeNote";
import { Upload, FileText, CheckCircle, XCircle, Clock, History } from "lucide-react";

const documents = [
  { name: "CNPJ", status: "enviado", date: "20/05/2026", version: 1 },
  { name: "CPF dos sócios", status: "enviado", date: "20/05/2026", version: 1 },
  { name: "Certidão negativa federal", status: "enviado", date: "18/05/2026", version: 1 },
  { name: "Certidão negativa estadual", status: "enviado", date: "18/05/2026", version: 1 },
  { name: "Certidão negativa municipal", status: "rejeitado", date: "15/05/2026", version: 1, comment: "Documento vencido. Enviar versão atualizada." },
  { name: "Currículo dos sócios", status: "enviado", date: "20/05/2026", version: 1 },
  { name: "Plano de negócio (PDF)", status: "pendente", date: "-", version: 0 },
  { name: "Projeto de pesquisa (se aplicável)", status: "pendente", date: "-", version: 0 },
];

export function DocumentsUpload() {
  return (
    <div className="min-h-screen bg-[#fafafa]">
      <Header />
      
      <main className="mx-auto max-w-[1080px] px-6 py-8">
        <div className="mb-8">
          <h1 className="text-[#1a4d2e] mb-2">Documentação</h1>
          <p className="text-[#4f6f52]">AgroSense Pampa • Protocolo PSL-2026-047</p>
        </div>

        <div className="grid grid-cols-3 gap-6">
          {/* Documents List */}
          <div className="col-span-2">
            <div className="bg-white border border-[#1a4d2e]/10 p-6 mb-6">
              <h2 className="text-[#4a4a4a] mb-6">Lista de documentos</h2>
              
              <div className="space-y-3">
                {documents.map((doc, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 border border-[#1a4d2e]/10 hover:bg-[#e8dcc4]/20 transition-colors"
                  >
                    <div className="flex items-start gap-3 flex-1">
                      <FileText className="h-5 w-5 text-[#4f6f52] mt-0.5" />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-[#4a4a4a]">{doc.name}</h3>
                          {doc.status === "enviado" && (
                            <StatusBadge status="Enviado" variant="success" />
                          )}
                          {doc.status === "pendente" && (
                            <StatusBadge status="Pendente" variant="warning" />
                          )}
                          {doc.status === "rejeitado" && (
                            <StatusBadge status="Precisa revisão" variant="danger" />
                          )}
                        </div>
                        <div className="flex items-center gap-4 text-xs text-[#4f6f52]">
                          {doc.date !== "-" && <span>Enviado em {doc.date}</span>}
                          {doc.version > 0 && <span>Versão {doc.version}</span>}
                        </div>
                        {doc.comment && (
                          <div className="mt-2 text-sm text-red-700 bg-red-50 px-3 py-2 border-l-2 border-red-500">
                            {doc.comment}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      {doc.status === "pendente" || doc.status === "rejeitado" ? (
                        <button className="px-4 py-2 bg-[#1a4d2e] text-white text-sm hover:bg-[#4f6f52]">
                          Enviar
                        </button>
                      ) : (
                        <>
                          <button className="px-4 py-2 border border-[#4f6f52]/30 text-[#4a4a4a] text-sm hover:bg-[#e8dcc4]">
                            Ver
                          </button>
                          <button className="px-4 py-2 border border-[#4f6f52]/30 text-[#4a4a4a] text-sm hover:bg-[#e8dcc4]">
                            Substituir
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Upload Area */}
            <div className="bg-white border border-[#1a4d2e]/10 p-6">
              <h3 className="text-[#4a4a4a] mb-4">Upload de documentos</h3>
              <div className="border-2 border-dashed border-[#4f6f52]/30 p-12 text-center hover:border-[#1a4d2e] hover:bg-[#e8dcc4]/10 transition-colors cursor-pointer">
                <Upload className="h-12 w-12 text-[#4f6f52] mx-auto mb-4" />
                <p className="text-[#4a4a4a] mb-2">Arraste arquivos aqui ou clique para selecionar</p>
                <p className="text-sm text-[#4f6f52]">PDF, DOC, DOCX, JPG ou PNG • Máx. 10MB por arquivo</p>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="col-span-1 space-y-6">
            {/* Status Summary */}
            <div className="bg-white border border-[#1a4d2e]/10 p-6">
              <h3 className="text-[#4a4a4a] mb-4">Resumo</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-[#8fbc8f]" />
                    <span className="text-[#4a4a4a]">Enviados</span>
                  </div>
                  <span className="font-medium text-[#1a4d2e]">5</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <XCircle className="h-4 w-4 text-red-500" />
                    <span className="text-[#4a4a4a]">Precisa revisão</span>
                  </div>
                  <span className="font-medium text-red-700">1</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-amber-500" />
                    <span className="text-[#4a4a4a]">Pendentes</span>
                  </div>
                  <span className="font-medium text-amber-700">2</span>
                </div>
              </div>
            </div>

            {/* Version History */}
            <div className="bg-white border border-[#1a4d2e]/10 p-6">
              <div className="flex items-center gap-2 mb-4">
                <History className="h-5 w-5 text-[#4f6f52]" />
                <h3 className="text-[#4a4a4a]">Histórico de versões</h3>
              </div>
              <div className="space-y-3 text-sm">
                <div className="border-l-2 border-[#1a4d2e] pl-3 py-1">
                  <div className="text-[#4a4a4a]">Certidão federal</div>
                  <div className="text-xs text-[#4f6f52]">v1 • 18/05/2026</div>
                </div>
                <div className="border-l-2 border-[#4f6f52]/30 pl-3 py-1">
                  <div className="text-[#4a4a4a]">CNPJ</div>
                  <div className="text-xs text-[#4f6f52]">v1 • 20/05/2026</div>
                </div>
                <div className="border-l-2 border-[#4f6f52]/30 pl-3 py-1">
                  <div className="text-[#4a4a4a]">CPF dos sócios</div>
                  <div className="text-xs text-[#4f6f52]">v1 • 20/05/2026</div>
                </div>
              </div>
            </div>

            {/* Info Note */}
            <div className="bg-white border border-[#1a4d2e]/10 p-6">
              <PrototypeNote>
                Documentos serão versionados e auditáveis. Sistema deve registrar: quem enviou, quando,
                observações da comissão e histórico de substituições.
              </PrototypeNote>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
