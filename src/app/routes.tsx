import { createBrowserRouter } from "react-router";
import { Landing } from "./pages/Landing";
import { Login } from "./pages/Login";
import { EntrepreneurDashboard } from "./pages/EntrepreneurDashboard";
import { SubmissionForm } from "./pages/SubmissionForm";
import { DocumentsUpload } from "./pages/DocumentsUpload";
import { ManagerDashboard } from "./pages/ManagerDashboard";
import { ProposalDetail } from "./pages/ProposalDetail";
import { EvaluatorInterface } from "./pages/EvaluatorInterface";
import { EvaluatorDashboard } from "./pages/EvaluatorDashboard";
import { ConsensusRanking } from "./pages/ConsensusRanking";
import { ResultsResources } from "./pages/ResultsResources";
import { TransparencyDashboard } from "./pages/TransparencyDashboard";
import { FlowMap } from "./pages/FlowMap";
import { ResearcherDashboard } from "./pages/ResearcherDashboard";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Landing,
  },
  {
    path: "/login",
    Component: Login,
  },
  {
    path: "/empreendedor",
    Component: EntrepreneurDashboard,
  },
  {
    path: "/submissao",
    Component: SubmissionForm,
  },
  {
    path: "/documentos",
    Component: DocumentsUpload,
  },
  {
    path: "/gestor",
    Component: ManagerDashboard,
  },
  {
    path: "/proposta/:id",
    Component: ProposalDetail,
  },
  {
    path: "/avaliador",
    Component: EvaluatorDashboard,
  },
  {
    path: "/avaliador/avaliacao/:id",
    Component: EvaluatorInterface,
  },
  {
    path: "/consenso",
    Component: ConsensusRanking,
  },
  {
    path: "/resultados",
    Component: ResultsResources,
  },
  {
    path: "/transparencia",
    Component: TransparencyDashboard,
  },
  {
    path: "/fluxo",
    Component: FlowMap,
  },
  {
    path: "/pesquisador",
    Component: ResearcherDashboard,
  },
]);
