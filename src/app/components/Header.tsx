import { Link, useLocation } from "react-router";
import { LogOut, User, ShieldCheck } from "lucide-react";
import logo from "../../assets/pampatec-logo.png";

export function Header() {
  const location = useLocation();
  const isPublicPage = ["/", "/login", "/transparencia", "/fluxo"].includes(location.pathname);
  const isLoggedIn = !isPublicPage;

  return (
    <header className="border-b border-[#1a4d2e]/20 bg-white">
      <div className="mx-auto max-w-[1280px] px-6 py-3">
        <div className="flex items-center justify-between gap-6">
          <Link to="/" className="flex items-center gap-4 min-w-0">
            <img src={logo} alt="PampaTec — Parque Tecnológico do Pampa" className="h-14 w-auto object-contain" />
            <div className="hidden md:block border-l border-[#1a4d2e]/20 pl-4">
              <div className="text-[#1a4d2e] font-semibold leading-tight">Plataforma de Gestão do Processo Seletivo</div>
              <div className="text-xs text-[#4f6f52]">Incubadora Tecnológica PampaTec • UNIPAMPA</div>
            </div>
          </Link>
          <nav className="flex items-center gap-5 text-sm whitespace-nowrap">
            {!isLoggedIn ? (
              <>
                <Link to="/login" className="text-[#4a4a4a] hover:text-[#1a4d2e] font-medium">
                  Entrar
                </Link>
                <Link to="/transparencia" className="text-[#4a4a4a] hover:text-[#1a4d2e]">
                  Transparência
                </Link>
                <Link to="/fluxo" className="text-[#4a4a4a] hover:text-[#1a4d2e]">
                  Fluxo
                </Link>
              </>
            ) : (
              <>
                <Link to="/gestor/editais" className="text-[#4a4a4a] hover:text-[#1a4d2e]">
                  Editais
                </Link>
                <Link to="/transparencia" className="text-[#4a4a4a] hover:text-[#1a4d2e]">
                  Indicadores
                </Link>
                <div className="w-px h-4 bg-[#4f6f52]/30" />
                <div className="hidden md:flex items-center gap-2 text-[#4a4a4a]">
                  <ShieldCheck className="h-4 w-4 text-[#1a4d2e]" />
                  <span>Sessão demo</span>
                </div>
                <div className="flex items-center gap-2 text-[#4a4a4a]">
                  <User className="h-4 w-4" />
                  <span>Minha Conta</span>
                </div>
                <Link to="/" className="text-[#4a4a4a] hover:text-red-700 flex items-center gap-1 font-medium transition-colors">
                  <LogOut className="h-4 w-4" />
                  Sair
                </Link>
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}
