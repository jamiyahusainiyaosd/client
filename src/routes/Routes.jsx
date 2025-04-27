import { createBrowserRouter } from "react-router-dom";
import Main from "../layouts/Main";
import About from "../pages/About";
import AcademicDetailPage from "../pages/AcademicDetailsPage";
import AcademicsPage from "../pages/AcademicsPage";
import AdmissionPage from "../pages/AdmissionPage";
import BookIntroductionPage from "../pages/BookIntroductionPage";
import ContactUs from "../pages/ContactUs";
import FinancialReportPage from "../pages/FinancialReportPage";
import Home from "../pages/Home";
import NoticeDetailsPage from "../pages/NoticeDetailsPage";
import NoticePage from "../pages/NoticePage";
import PhotoGalleryPage from "../pages/photoGalleryPage";
import ResultsDetailsPage from '../pages/ResultsDetailsPage';
import ResultsPage from "../pages/ResultsPage";
import TeachersPage from "../pages/TeachersPage";
import VideoGalleryPage from "../pages/VideoGalleryPage";
import VisitorCounterPage from "../pages/VisitorCounterPage";

const Routes = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/contact",
        element: <ContactUs />,
      },
      {
        path: "/academic",
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
        path: "/notice",
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
        path: "/book-introduction",
        element: <BookIntroductionPage />,
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
        path: "/visitor-counter/123456789",
        element: <VisitorCounterPage />,
      },
    ],
  },
]);

export default Routes;