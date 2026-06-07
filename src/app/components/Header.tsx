import { Link, useLocation } from "react-router";
import { LogOut, User } from "lucide-react";

export function Header() {
  const location = useLocation();
  const isPublicPage = ["/", "/login", "/transparencia", "/fluxo"].includes(location.pathname);
  const isLoggedIn = !isPublicPage;

  return (
    <header className="border-b border-[#1a4d2e]/20 bg-white">
      <div className="mx-auto max-w-[1080px] px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded bg-[#1a4d2e] flex items-center justify-center">
                <span className="text-white font-medium">PT</span>
              </div>
              <div>
                <div className="text-[#1a4d2e] font-semibold leading-tight">PampaTec Hub</div>
                <div className="text-xs text-[#4f6f52]">UNIPAMPA • Incubadora Tecnológica</div>
              </div>
            </div>
          </Link>
          <nav className="flex items-center gap-6 text-sm">
            {!isLoggedIn ? (
              <>
                <Link to="/login" className="text-[#4a4a4a] hover:text-[#1a4d2e] font-medium">
                  Entrar
                </Link>
                <Link to="/transparencia" className="text-[#4a4a4a] hover:text-[#1a4d2e]">
                  Transparência
                </Link>
                <Link to="/fluxo" className="text-[#4a4a4a] hover:text-[#1a4d2e]">
                  Fluxo do Sistema
                </Link>
              </>
            ) : (
              <>
                <Link to="/transparencia" className="text-[#4a4a4a] hover:text-[#1a4d2e]">
                  Transparência
                </Link>
                <Link to="/fluxo" className="text-[#4a4a4a] hover:text-[#1a4d2e]">
                  Fluxo do Sistema
                </Link>
                <div className="w-px h-4 bg-[#4f6f52]/30" />
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
