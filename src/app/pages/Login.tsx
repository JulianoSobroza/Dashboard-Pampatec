import { Link } from "react-router";
import { Header } from "../components/Header";
import { PrototypeNote } from "../components/PrototypeNote";
import { User, Shield, ClipboardList, GraduationCap } from "lucide-react";

export function Login() {
  return (
    <div className="min-h-screen bg-[#fafafa]">
      <Header />
      
      <main className="mx-auto max-w-[1080px] px-6 py-12">
        <div className="max-w-md mx-auto mb-12">
          <h1 className="text-[#1a4d2e] mb-6">Acesso ao sistema</h1>
          
          <div className="bg-white border border-[#1a4d2e]/10 p-6 mb-6">
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm text-[#4a4a4a] mb-2">
                E-mail institucional
              </label>
              <input
                type="email"
                id="email"
                className="w-full px-3 py-2 border border-[#4f6f52]/30 bg-white text-[#4a4a4a] focus:outline-none focus:border-[#1a4d2e]"
                placeholder="usuario@unipampa.edu.br"
              />
            </div>
            <div className="mb-6">
              <label htmlFor="password" className="block text-sm text-[#4a4a4a] mb-2">
                Senha
              </label>
              <input
                type="password"
                id="password"
                className="w-full px-3 py-2 border border-[#4f6f52]/30 bg-white text-[#4a4a4a] focus:outline-none focus:border-[#1a4d2e]"
              />
            </div>
            <button className="w-full bg-[#1a4d2e] text-white py-3 hover:bg-[#4f6f52] transition-colors">
              Entrar
            </button>
            <div className="mt-4 text-center text-sm text-[#4f6f52]">
              <a href="#" className="hover:text-[#1a4d2e]">Esqueci minha senha</a>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto">
          <h2 className="text-[#1a4d2e] mb-6 text-center">Selecione seu perfil de acesso</h2>
          
          <div className="grid grid-cols-2 gap-6">
            <Link
              to="/empreendedor"
              className="border border-[#1a4d2e]/20 p-8 bg-white hover:border-[#1a4d2e] hover:shadow-md transition-all group"
            >
              <User className="h-12 w-12 text-[#1a4d2e] mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-[#4a4a4a] mb-2">Empreendedor</h3>
              <p className="text-sm text-[#4f6f52]">
                Submeta sua proposta, acompanhe o status e gerencie documentação
              </p>
            </Link>

            <Link
              to="/gestor"
              className="border border-[#1a4d2e]/20 p-8 bg-white hover:border-[#1a4d2e] hover:shadow-md transition-all group"
            >
              <Shield className="h-12 w-12 text-[#1a4d2e] mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-[#4a4a4a] mb-2">Gestor PampaTec</h3>
              <p className="text-sm text-[#4f6f52]">
                Gerencie propostas, triagem, pendências e fluxo do processo seletivo
              </p>
            </Link>

            <Link
              to="/avaliador"
              className="border border-[#1a4d2e]/20 p-8 bg-white hover:border-[#1a4d2e] hover:shadow-md transition-all group"
            >
              <ClipboardList className="h-12 w-12 text-[#1a4d2e] mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-[#4a4a4a] mb-2">Avaliador / Comissão</h3>
              <p className="text-sm text-[#4f6f52]">
                Analise propostas, registre pareceres e atribua notas técnicas
              </p>
            </Link>

            <Link
              to="/pesquisador"
              className="border border-[#1a4d2e]/20 p-8 bg-white hover:border-[#1a4d2e] hover:shadow-md transition-all group"
            >
              <GraduationCap className="h-12 w-12 text-[#1a4d2e] mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-[#4a4a4a] mb-2">Professor / Pesquisador</h3>
              <p className="text-sm text-[#4f6f52]">
                Visualize propostas com potencial de vínculo de P&D com UNIPAMPA
              </p>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
