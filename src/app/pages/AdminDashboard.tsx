import { Header } from "../components/Header";
import { StatusBadge } from "../components/StatusBadge";
import { auditEvents, mockUsers, roleLabels, type RoleKey } from "../data/pampatecMock";
import { LockKeyhole, Settings, ShieldCheck, UserCog } from "lucide-react";

export function AdminDashboard() {
  return (
    <div className="min-h-screen bg-[#fafafa]">
      <Header />
      <main className="mx-auto max-w-[1200px] px-6 py-8">
        <div className="mb-8">
          <h1 className="text-[#1a4d2e] mb-2">Administrador do Sistema</h1>
          <p className="text-[#4f6f52]">Usuários, perfis, permissões e registros demonstrativos de acesso.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white border-t-4 border-t-[#1a4d2e] border-x border-b border-[#1a4d2e]/10 p-5">
            <UserCog className="h-6 w-6 text-[#1a4d2e] mb-2" />
            <div className="text-2xl font-semibold text-[#1a4d2e]">{mockUsers.length}</div>
            <div className="text-sm text-[#4f6f52]">usuários simulados</div>
          </div>
          <div className="bg-white border-t-4 border-t-[#4f6f52] border-x border-b border-[#1a4d2e]/10 p-5">
            <ShieldCheck className="h-6 w-6 text-[#1a4d2e] mb-2" />
            <div className="text-2xl font-semibold text-[#1a4d2e]">6</div>
            <div className="text-sm text-[#4f6f52]">perfis oficiais</div>
          </div>
          <div className="bg-white border-t-4 border-t-amber-500 border-x border-b border-[#1a4d2e]/10 p-5">
            <LockKeyhole className="h-6 w-6 text-amber-700 mb-2" />
            <div className="text-2xl font-semibold text-amber-700">4</div>
            <div className="text-sm text-[#4f6f52]">eventos de auditoria</div>
          </div>
        </div>

        <div className="grid lg:grid-cols-[1fr_0.9fr] gap-6">
          <section className="bg-white border border-[#1a4d2e]/10 p-6">
            <h2 className="text-[#1a4d2e] mb-5 flex items-center gap-2"><UserCog className="h-5 w-5" /> Usuários e perfis</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border border-[#1a4d2e]/10">
                <thead className="bg-[#f4f1e8] text-[#1a4d2e]">
                  <tr>
                    <th className="text-left p-3">E-mail</th>
                    <th className="text-left p-3">Perfis</th>
                    <th className="text-left p-3">Situação</th>
                    <th className="text-left p-3">Ação bloqueada</th>
                  </tr>
                </thead>
                <tbody>
                  {mockUsers.map((user) => (
                    <tr key={user.email} className="border-t border-[#1a4d2e]/10">
                      <td className="p-3 text-[#4a4a4a]">{user.email}</td>
                      <td className="p-3 text-[#4f6f52]">{user.roles.map((role: RoleKey) => roleLabels[role]).join("; ")}</td>
                      <td className="p-3"><StatusBadge status={user.active ? "Ativo" : "Inativo"} variant={user.active ? "success" : "danger"} /></td>
                      <td className="p-3 text-xs text-[#4f6f52]">{user.active ? "Sem bloqueio" : "Login impedido com orientação ao usuário"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="bg-white border border-[#1a4d2e]/10 p-6">
            <h2 className="text-[#1a4d2e] mb-5 flex items-center gap-2"><Settings className="h-5 w-5" /> Matriz de permissões demo</h2>
            <div className="space-y-3 text-sm">
              <div className="border border-[#1a4d2e]/10 p-3"><strong>Empreendedor:</strong> próprias propostas, documentos, pendências, recursos e convocação.</div>
              <div className="border border-[#1a4d2e]/10 p-3"><strong>Gestor:</strong> editais, triagem, documentação, distribuição, resultados e indicadores.</div>
              <div className="border border-[#1a4d2e]/10 p-3"><strong>Avaliador:</strong> propostas atribuídas, documentos autorizados e próprias avaliações.</div>
              <div className="border border-[#1a4d2e]/10 p-3"><strong>Comissão:</strong> consolidação, deliberação, complementações e recursos.</div>
              <div className="border border-[#1a4d2e]/10 p-3"><strong>Pesquisador:</strong> propostas autorizadas para vínculo de P&D.</div>
            </div>
          </section>
        </div>

        <section className="bg-white border border-[#1a4d2e]/10 p-6 mt-6">
          <h2 className="text-[#1a4d2e] mb-5">Trilha de auditoria demonstrativa</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border border-[#1a4d2e]/10">
              <thead className="bg-[#f4f1e8] text-[#1a4d2e]">
                <tr><th className="text-left p-3">Data/hora</th><th className="text-left p-3">Usuário</th><th className="text-left p-3">Operação</th><th className="text-left p-3">Objeto</th></tr>
              </thead>
              <tbody>
                {auditEvents.map((event) => (
                  <tr key={`${event.when}-${event.object}`} className="border-t border-[#1a4d2e]/10">
                    <td className="p-3">{event.when}</td><td className="p-3">{event.user}</td><td className="p-3">{event.action}</td><td className="p-3">{event.object}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
}
