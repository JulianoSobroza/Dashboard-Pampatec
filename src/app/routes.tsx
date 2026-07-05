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
import { CommitteeDashboard } from "./pages/CommitteeDashboard";
import { AdminDashboard } from "./pages/AdminDashboard";
import { EditalConfig } from "./pages/EditalConfig";
import { AccessDenied } from "./pages/AccessDenied";
import { ResourceJudgment } from "./pages/ResourceJudgment";
import { PitchManagement } from "./pages/PitchManagement";
import { PublicationManagement } from "./pages/PublicationManagement";
import { ResearchLink } from "./pages/ResearchLink";

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
  {
    path: "/comissao",
    Component: CommitteeDashboard,
  },
  {
    path: "/admin",
    Component: AdminDashboard,
  },
  {
    path: "/gestor/editais",
    Component: EditalConfig,
  },
  {
    path: "/acesso-negado",
    Component: AccessDenied,
  },
  {
    path: "/comissao/recursos",
    Component: ResourceJudgment,
  },
  {
    path: "/pitch",
    Component: PitchManagement,
  },
  {
    path: "/gestor/publicacoes",
    Component: PublicationManagement,
  },
  {
    path: "/pesquisador/vinculacao/:id",
    Component: ResearchLink,
  },
]);
