import { Link } from "react-router";
import { Header } from "../components/Header";
import { StatusBadge } from "../components/StatusBadge";
import { Lock } from "lucide-react";

export function AccessDenied() {
  return (
    <div className="min-h-screen bg-[#fafafa]">
      <Header />
      <main className="mx-auto max-w-[760px] px-6 py-16">
        <div className="bg-white border border-red-200 p-8 text-center">
          <Lock className="h-12 w-12 text-red-700 mx-auto mb-4" />
          <h1 className="text-[#1a4d2e] mb-3">Acesso não autorizado</h1>
          <StatusBadge status="Bloqueado" variant="danger" />
          <p className="text-[#4f6f52] mt-5 mb-6">
            Esta área é restrita ao perfil autorizado. A demonstração registra a tentativa e orienta o usuário em vez de apenas desabilitar a ação.
          </p>
          <Link to="/login" className="inline-flex bg-[#1a4d2e] text-white px-5 py-3 hover:bg-[#4f6f52]">Voltar ao acesso</Link>
        </div>
      </main>
    </div>
  );
}
