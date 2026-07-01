import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router";
import { Header } from "../components/Header";
import { PrototypeNote } from "../components/PrototypeNote";
import { roleHome, roleLabels, mockUsers, type RoleKey } from "../data/pampatecMock";
import { backendRoleToFrontend, loginWithBackend, saveSession } from "../lib/api";
import { User, Shield, ClipboardList, GraduationCap, UsersRound, Settings, AlertCircle } from "lucide-react";


const demoCredentials: Record<RoleKey, { email: string; password: string }> = {
  empreendedor: { email: "empreendedor@pampatec.com.br", password: "Senha@123" },
  gestor: { email: "gestor@pampatec.com.br", password: "Senha@123" },
  avaliador: { email: "avaliador@pampatec.com.br", password: "Senha@123" },
  comissao: { email: "comissao@pampatec.com.br", password: "Senha@123" },
  pesquisador: { email: "pesquisador@pampatec.com.br", password: "Senha@123" },
  admin: { email: "admin@pampatec.com.br", password: "Senha@123" },
};

function saveDemoSession(role: RoleKey) {
  localStorage.setItem("pampatec.token", "");
  localStorage.setItem("pampatec.session", JSON.stringify({
    access_token: "",
    active_role: role,
    roles: [role],
    demo: true,
    user: {
      email: demoCredentials[role].email,
      full_name: roleLabels[role],
      active_role: role,
      roles: [role],
      is_active: true,
    },
  }));
}

const roleCards: Array<{ role: RoleKey; icon: typeof User; description: string }> = [
  { role: "empreendedor", icon: User, description: "Submeter manifestação, documentos, recursos e acompanhar a própria proposta." },
  { role: "gestor", icon: Shield, description: "Cadastrar editais, realizar triagem, distribuir avaliações e publicar resultados." },
  { role: "avaliador", icon: ClipboardList, description: "Consultar propostas atribuídas e registrar avaliações por rubricas." },
  { role: "comissao", icon: UsersRound, description: "Consolidar avaliações, deliberar, solicitar complementações e julgar recursos." },
  { role: "pesquisador", icon: GraduationCap, description: "Vincular projetos de P&D ou cooperação técnica a propostas autorizadas." },
  { role: "admin", icon: Settings, description: "Gerenciar usuários, perfis, permissões e trilhas de auditoria." },
];

export function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("empreendedor@pampatec.com.br");
  const [password, setPassword] = useState("Senha@123");
  const [error, setError] = useState("");
  const [availableRoles, setAvailableRoles] = useState<RoleKey[]>([]);
  const [backendRoles, setBackendRoles] = useState<RoleKey[]>([]);
  const [loading, setLoading] = useState(false);
  const [backendAvailable, setBackendAvailable] = useState<boolean | null>(null);
  const selectedUser = useMemo(() => mockUsers.find((user) => user.email === email), [email]);

  async function handleLogin() {
    setError("");
    setAvailableRoles([]);
    setBackendRoles([]);
    setLoading(true);
    try {
      const payload = await loginWithBackend(email, password);
      setBackendAvailable(true);
      const roles = (payload.roles || []).map((role: string) => backendRoleToFrontend[role]).filter(Boolean);
      if (roles.length > 1) {
        setBackendRoles(roles);
        return;
      }
      saveSession(payload);
      navigate(roleHome[roles[0]]);
    } catch (backendError) {
      setBackendAvailable(false);
      const message = backendError instanceof Error ? backendError.message : "Falha ao autenticar no backend.";
      if (!message.toLowerCase().includes("failed to fetch") && !message.toLowerCase().includes("networkerror")) {
        setError(`${message}. Os dados preenchidos foram preservados.`);
        return;
      }

      // Fallback para demo visual quando o backend não estiver iniciado.
      const user = mockUsers.find((item) => item.email === email && item.password === password);
      if (!user) {
        setError("Backend indisponível e credenciais inválidas no modo demo. Revise e-mail e senha.");
        return;
      }
      if (!user.active) {
        setError("Usuário inativo. Procure o administrador do sistema para regularizar o acesso.");
        return;
      }
      if (user.roles.length > 1) {
        setAvailableRoles(user.roles);
        return;
      }
      navigate(roleHome[user.roles[0]]);
    } finally {
      setLoading(false);
    }
  }

  async function accessAs(role: RoleKey) {
    setError("");
    setLoading(true);
    try {
      if (backendRoles.length > 0) {
        const payload = await loginWithBackend(email, password, role);
        saveSession(payload);
      } else {
        const credentials = demoCredentials[role];
        const payload = await loginWithBackend(credentials.email, credentials.password, role);
        saveSession(payload);
      }
      setBackendAvailable(true);
      navigate(roleHome[role]);
    } catch (error) {
      // Se o backend não estiver rodando, o botão ainda abre a navegação visual.
      // Quando o backend estiver ativo, ele autentica automaticamente com o usuário correto.
      const message = error instanceof Error ? error.message : "Não foi possível acessar este perfil.";
      if (message.toLowerCase().includes("failed to fetch") || message.toLowerCase().includes("networkerror")) {
        saveDemoSession(role);
        setBackendAvailable(false);
        navigate(roleHome[role]);
        return;
      }
      setError(`${message}. Tente entrar pelo formulário com e-mail e senha do perfil.`);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#fafafa]">
      <Header />
      
      <main className="mx-auto max-w-[1080px] px-6 py-12">
        <div className="grid lg:grid-cols-[420px_1fr] gap-10 items-start">
          <section>
            <h1 className="text-[#1a4d2e] mb-3">Acesso ao sistema</h1>
            <p className="text-sm text-[#4f6f52] mb-6">
              Use o formulário ou clique diretamente em um perfil para abrir a demonstração. Quando o backend estiver rodando, o acesso é autenticado automaticamente.
            </p>
            
            <div className="bg-white border border-[#1a4d2e]/10 p-6 mb-6 shadow-sm">
              {error && (
                <div className="mb-4 flex items-start gap-2 border border-red-200 bg-red-50 p-3 text-sm text-red-800" role="alert">
                  <AlertCircle className="h-4 w-4 mt-0.5" />
                  <span>{error}</span>
                </div>
              )}
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm text-[#4a4a4a] mb-2">
                  E-mail institucional <span className="text-red-700">*</span> <span className="text-xs text-[#4f6f52]">campo obrigatório</span>
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className="w-full px-3 py-2 border border-[#4f6f52]/30 bg-white text-[#4a4a4a] focus:outline-none focus:border-[#1a4d2e] focus:ring-2 focus:ring-[#1a4d2e]/10"
                  placeholder="usuario@pampatec.com.br"
                />
              </div>
              <div className="mb-6">
                <label htmlFor="password" className="block text-sm text-[#4a4a4a] mb-2">
                  Senha <span className="text-red-700">*</span> <span className="text-xs text-[#4f6f52]">campo obrigatório</span>
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  className="w-full px-3 py-2 border border-[#4f6f52]/30 bg-white text-[#4a4a4a] focus:outline-none focus:border-[#1a4d2e] focus:ring-2 focus:ring-[#1a4d2e]/10"
                />
              </div>
              <button onClick={handleLogin} disabled={loading} className="w-full bg-[#1a4d2e] text-white py-3 hover:bg-[#4f6f52] transition-colors disabled:opacity-60">
                {loading ? "Validando acesso..." : "Entrar"}
              </button>
              <div className="mt-4 text-center text-sm text-[#4f6f52]">
                <a href="#" className="hover:text-[#1a4d2e]">Esqueci minha senha</a>
              </div>
            </div>

            {backendAvailable !== null && (
              <div className={`mb-4 border p-3 text-sm ${backendAvailable ? "border-green-200 bg-green-50 text-green-800" : "border-amber-200 bg-amber-50 text-amber-800"}`}>
                {backendAvailable ? "Backend conectado: operações principais salvas no banco local." : "Backend não conectado: demonstração visual aberta, sem gravação no banco."}
              </div>
            )}

            {(availableRoles.length > 0 || backendRoles.length > 0) && (
              <div className="bg-white border border-amber-200 p-5 mb-6">
                <h2 className="text-[#1a4d2e] mb-2">Selecione o perfil ativo</h2>
                <p className="text-sm text-[#4f6f52] mb-4">Este usuário possui múltiplos perfis. A sessão carregará apenas as permissões do perfil escolhido.</p>
                <div className="grid gap-3">
                  {(backendRoles.length > 0 ? backendRoles : availableRoles).map((role) => (
                    <button key={role} onClick={() => accessAs(role)} className="text-left border border-[#1a4d2e]/20 p-3 hover:border-[#1a4d2e] hover:bg-[#f4f1e8]">
                      {roleLabels[role]}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <PrototypeNote>
              Usuários da demonstração: empreendedor, gestor, avaliador, comissao, pesquisador, admin ou multi @pampatec.com.br. Senha: Senha@123.
            </PrototypeNote>
          </section>

          <section>
            <h2 className="text-[#1a4d2e] mb-6">Perfis disponíveis para demonstração</h2>
            <div className="grid md:grid-cols-2 gap-5">
              {roleCards.map(({ role, icon: Icon, description }) => (
                <button
                  key={role}
                  onClick={() => accessAs(role)}
                  className="border border-[#1a4d2e]/20 p-6 bg-white hover:border-[#1a4d2e] hover:shadow-md transition-all group text-left"
                >
                  <Icon className="h-10 w-10 text-[#1a4d2e] mb-4 group-hover:scale-110 transition-transform" />
                  <h3 className="text-[#4a4a4a] mb-2">{roleLabels[role]}</h3>
                  <p className="text-sm text-[#4f6f52]">{description}</p>
                </button>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
