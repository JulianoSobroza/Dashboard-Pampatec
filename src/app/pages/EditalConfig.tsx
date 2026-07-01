import { useState } from "react";
import { Link } from "react-router";
import { CalendarClock, CheckCircle2, FileText, Save, Send, Settings2, AlertCircle } from "lucide-react";
import { Header } from "../components/Header";
import { StatusBadge } from "../components/StatusBadge";
import { PrototypeNote } from "../components/PrototypeNote";
import { editalDraft, officialStages } from "../data/pampatecMock";
import { apiFetch } from "../lib/api";

export function EditalConfig() {
  const [title, setTitle] = useState(editalDraft.title);
  const [mode, setMode] = useState(editalDraft.mode);
  const [start, setStart] = useState("2026-08-01");
  const [end, setEnd] = useState("2026-11-30");
  const [published, setPublished] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [savedEditalId, setSavedEditalId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  function buildPayload() {
    return {
      titulo: title,
      modalidade: mode === "Em lote" ? "lote" : "fluxo_continuo",
      abertura: start ? `${start}T00:00:00` : null,
      encerramento: end ? `${end}T23:59:00` : null,
      prazo_recurso_dias: 5,
      documentos_exigidos: editalDraft.requiredDocuments.map((nome) => ({ nome, obrigatorio: true })),
      criterios: editalDraft.criteria.map((nome, index) => ({
        nome,
        descricao: `Critério ${index + 1} configurado para a demonstração do edital.`,
        escala_min: 0,
        escala_max: 10,
        peso: index === 0 ? 3 : 2,
        justificativa_obrigatoria: true,
        eliminatorio: false,
      })),
    };
  }

  async function saveDraft() {
    setError("");
    setSuccess("");
    if (!title.trim()) {
      setError("O título do edital é obrigatório.");
      return null;
    }
    if (mode === "Em lote" && (!start || !end || end < start)) {
      setError("Para edital em lote, informe datas consistentes de início e fim.");
      return null;
    }
    setLoading(true);
    try {
      const edital = await apiFetch<{ id: string; titulo: string }>("/editais", {
        method: "POST",
        body: JSON.stringify(buildPayload()),
      });
      setSavedEditalId(edital.id);
      setSuccess(`Rascunho salvo no backend: ${edital.titulo}`);
      return edital.id;
    } catch (apiError) {
      setError(apiError instanceof Error ? apiError.message : "Não foi possível salvar o edital no backend.");
      return null;
    } finally {
      setLoading(false);
    }
  }

  async function publish() {
    setError("");
    setSuccess("");
    const id = savedEditalId ?? await saveDraft();
    if (!id) return;
    setLoading(true);
    try {
      const edital = await apiFetch<{ id: string; titulo: string }>(`/editais/${id}/publish`, { method: "POST" });
      setPublished(true);
      setSuccess(`Edital publicado no backend: ${edital.titulo}`);
    } catch (apiError) {
      setError(apiError instanceof Error ? apiError.message : "Não foi possível publicar o edital.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#fafafa]">
      <Header />
      <main className="mx-auto max-w-[1200px] px-6 py-8">
        <div className="flex items-start justify-between mb-8">
          <div>
            <h1 className="text-[#1a4d2e] mb-2">Cadastrar e configurar edital</h1>
            <p className="text-[#4f6f52]">Configure modalidade, etapas, documentos, critérios de avaliação e prazos do edital.</p>
          </div>
          <div className="flex gap-3">
            <Link to="/gestor" className="border border-[#1a4d2e]/20 px-4 py-2 text-[#1a4d2e] hover:bg-[#f4f1e8]">Voltar ao painel</Link>
            <StatusBadge status={published ? "Publicado" : "Rascunho"} variant={published ? "success" : "warning"} />
          </div>
        </div>

        <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-6">
          <section className="bg-white border border-[#1a4d2e]/10 p-6 shadow-sm">
            {error && (
              <div className="mb-5 flex items-start gap-2 border border-red-200 bg-red-50 p-3 text-sm text-red-800" role="alert">
                <AlertCircle className="h-4 w-4 mt-0.5" />
                <span>{error}</span>
              </div>
            )}
            {success && (
              <div className="mb-5 flex items-start gap-2 border border-green-200 bg-green-50 p-3 text-sm text-green-800" role="status">
                <CheckCircle2 className="h-4 w-4 mt-0.5" />
                <span>{success}</span>
              </div>
            )}

            <h2 className="text-[#1a4d2e] mb-5 flex items-center gap-2"><Settings2 className="h-5 w-5" /> Dados gerais</h2>
            <div className="grid md:grid-cols-2 gap-5 mb-8">
              <div className="md:col-span-2">
                <label className="block text-sm text-[#4a4a4a] mb-2">Título do edital <span className="text-red-700">*</span> <span className="text-xs text-[#4f6f52]">campo obrigatório</span></label>
                <input value={title} onChange={(event) => setTitle(event.target.value)} className="w-full border border-[#4f6f52]/30 px-3 py-2 focus:outline-none focus:border-[#1a4d2e]" />
              </div>
              <div>
                <label className="block text-sm text-[#4a4a4a] mb-2">Modalidade <span className="text-red-700">*</span></label>
                <select value={mode} onChange={(event) => setMode(event.target.value)} className="w-full border border-[#4f6f52]/30 px-3 py-2 bg-white focus:outline-none focus:border-[#1a4d2e]">
                  <option>Fluxo contínuo</option>
                  <option>Em lote</option>
                </select>
              </div>
              <div>
                <label className="block text-sm text-[#4a4a4a] mb-2">Prazo de recurso</label>
                <input value={editalDraft.appealDeadline} readOnly className="w-full border border-[#4f6f52]/30 px-3 py-2 bg-[#fafafa]" />
              </div>
              <div>
                <label className="block text-sm text-[#4a4a4a] mb-2">Início</label>
                <input type="date" value={start} onChange={(event) => setStart(event.target.value)} className="w-full border border-[#4f6f52]/30 px-3 py-2" />
              </div>
              <div>
                <label className="block text-sm text-[#4a4a4a] mb-2">Encerramento</label>
                <input type="date" value={end} onChange={(event) => setEnd(event.target.value)} className="w-full border border-[#4f6f52]/30 px-3 py-2" />
              </div>
            </div>

            <h2 className="text-[#1a4d2e] mb-4 flex items-center gap-2"><CalendarClock className="h-5 w-5" /> Etapas do processo</h2>
            <div className="grid md:grid-cols-2 gap-3 mb-8">
              {officialStages.map((stage, index) => (
                <label key={stage} className="flex items-center gap-3 border border-[#1a4d2e]/10 p-3 bg-[#fafafa]">
                  <input type="checkbox" defaultChecked={index < 10} />
                  <span className="text-sm text-[#4a4a4a]">{stage}</span>
                </label>
              ))}
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div>
                <h2 className="text-[#1a4d2e] mb-4 flex items-center gap-2"><FileText className="h-5 w-5" /> Documentos obrigatórios</h2>
                <div className="space-y-2">
                  {editalDraft.requiredDocuments.map((doc) => (
                    <label key={doc} className="flex items-center gap-3 border border-[#1a4d2e]/10 p-3">
                      <input type="checkbox" defaultChecked />
                      <span className="text-sm text-[#4a4a4a]">{doc}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <h2 className="text-[#1a4d2e] mb-4 flex items-center gap-2"><CheckCircle2 className="h-5 w-5" /> Rubricas</h2>
                <div className="space-y-2">
                  {editalDraft.criteria.map((criterion) => (
                    <div key={criterion} className="grid grid-cols-[1fr_80px] gap-3 border border-[#1a4d2e]/10 p-3 items-center">
                      <span className="text-sm text-[#4a4a4a]">{criterion}</span>
                      <input type="number" defaultValue="20" className="border border-[#4f6f52]/30 px-2 py-1 text-sm" aria-label={`Peso de ${criterion}`} />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <button onClick={saveDraft} disabled={loading} className="inline-flex items-center gap-2 border border-[#1a4d2e]/20 text-[#1a4d2e] px-5 py-3 hover:bg-[#f4f1e8] disabled:opacity-60">
                <Save className="h-4 w-4" /> {loading ? "Salvando..." : "Salvar rascunho"}
              </button>
              <button onClick={publish} disabled={loading} className="inline-flex items-center gap-2 bg-[#1a4d2e] text-white px-5 py-3 hover:bg-[#4f6f52] disabled:opacity-60">
                <Send className="h-4 w-4" /> {loading ? "Processando..." : "Publicar edital"}
              </button>
            </div>
          </section>

          <aside className="space-y-6">
            <div className="bg-white border border-[#1a4d2e]/10 p-6">
              <h2 className="text-[#1a4d2e] mb-4">Validações demonstradas</h2>
              <ul className="text-sm text-[#4f6f52] space-y-2">
                <li>• Campos obrigatórios com indicação textual.</li>
                <li>• Salvar como rascunho antes da publicação.</li>
                <li>• Modalidade de fluxo contínuo ou em lote.</li>
                <li>• Etapas configuráveis por edital.</li>
                <li>• Documentos e rubricas configuráveis.</li>
                <li>• Erros sem limpar os dados preenchidos.</li>
              </ul>
            </div>
            <PrototypeNote>
              Esta tela agora salva e publica editais no backend FastAPI quando o usuário está autenticado como gestor. Os controles visuais permanecem preservados para a demonstração.
            </PrototypeNote>
          </aside>
        </div>
      </main>
    </div>
  );
}
