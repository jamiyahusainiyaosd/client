import { createBrowserRouter } from "react-router-dom";
import Main from "../layouts/Main";
import AboutPage from "../pages/AboutPage";
import AcademicDetailPage from "../pages/AcademicDetailsPage";
import AcademicsPage from "../pages/AcademicsPage";
import AdmissionPage from "../pages/AdmissionPage";
import ContactUs from "../pages/ContactUs";
import FinancialReportPage from "../pages/FinancialReportPage";
import Home from "../pages/Home";
import NoticeDetailsPage from "../pages/NoticeDetailsPage";
import NoticePage from "../pages/NoticePage";
import PhotoGalleryPage from "../pages/photoGalleryPage";
import ResultsDetailsPage from "../pages/ResultsDetailsPage";
import ResultsPage from "../pages/ResultsPage";
import TeachersPage from "../pages/TeachersPage";
import VideoGalleryPage from "../pages/VideoGalleryPage";
import FormerStudentsPage from "../pages/FormerStudentsPage";
import ExpatriateGrantsPage from "../pages/ExpatriateGrantsPage";
import RouteErrorBoundary from "../components/RouteErrorBoundary";
import NotFoundPage from "../pages/NotFoundPage";

const Routes = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    errorElement: <RouteErrorBoundary />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/about",
        element: <AboutPage />,
      },
      {
        path: "/contact",
        element: <ContactUs />,
      },
      {
        path: "/contact-us",
        element: <ContactUs />,
      },
      {
        path: "/academic",
        element: <AcademicsPage />,
      },
      {
        path: "/academics",
        element: <AcademicsPage />,
      },
      {
        path: "/academic/:id",
        element: <AcademicDetailPage />,
      },
      {
        path: "/teachers",
        element: <TeachersPage />,
      },
      {
        path: "/admission",
        element: <AdmissionPage />,
      },
      {
        path: "/admissions",
        element: <AdmissionPage />,
      },
      {
        path: "/notice",
        element: <NoticePage />,
      },
      {
        path: "/notices",
        element: <NoticePage />,
      },
      {
        path: "/notice/:id",
        element: <NoticeDetailsPage />,
      },
      {
        path: "/photo-gallery",
        element: <PhotoGalleryPage />,
      },
      {
        path: "/video-gallery",
        element: <VideoGalleryPage />,
      },
      {
        path: "/results",
        element: <ResultsPage />,
      },
      {
        path: "/results/:id",
        element: <ResultsDetailsPage />,
      },
      {
        path: "/financial-report",
        element: <FinancialReportPage />,
      },
      {
        path: "/financial-reports",
        element: <FinancialReportPage />,
      },
      {
        path: "/former-students",
        element: <FormerStudentsPage />,
      },
      {
        path: "/expatriateGrant",
        element: <ExpatriateGrantsPage />,
      },
      {
        path: "/expatriate-grants",
        element: <ExpatriateGrantsPage />,
      },
      {
        path: "/donations",
        element: <ExpatriateGrantsPage />,
      },
      {
        path: "/donors",
        element: <ExpatriateGrantsPage />,
      },
      {
        path: "*",
        element: <NotFoundPage />,
      },
    ],
  },
]);

export default Routes;
