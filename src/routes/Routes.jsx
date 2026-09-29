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
import TopAchieversPage from "../pages/TopAchieversPage";
import BoardingPolicyPage from "../pages/BoardingPolicyPage";
import HolidayCalendarPage from "../pages/HolidayCalendarPage";
import ExamRoutinePage from "../pages/ExamRoutinePage";
import ClassRoutinePage from "../pages/ClassRoutinePage";
import CoCurricularPage from "../pages/CoCurricularPage";
import MealMenuPage from "../pages/MealMenuPage";

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
        path: "/top-achievers",
        element: <TopAchieversPage />,
      },
      {
        path: "/best-students",
        element: <TopAchieversPage />,
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
        path: "/boarding-rules",
        element: <BoardingPolicyPage />,
      },
      {
        path: "/hostel-policy",
        element: <BoardingPolicyPage />,
      },
      {
        path: "/holiday-calendar",
        element: <HolidayCalendarPage />,
      },
      {
        path: "/holiday calendar",
        element: <HolidayCalendarPage />,
      },
      {
        path: "/holidays",
        element: <HolidayCalendarPage />,
      },
      {
        path: "/exam-routine",
        element: <ExamRoutinePage />,
      },
      {
        path: "/exam routine",
        element: <ExamRoutinePage />,
      },
      {
        path: "/exam-schedule",
        element: <ExamRoutinePage />,
      },
      {
        path: "/class-routine",
        element: <ClassRoutinePage />,
      },
      {
        path: "/class routine",
        element: <ClassRoutinePage />,
      },
      {
        path: "/class-schedule",
        element: <ClassRoutinePage />,
      },
      {
        path: "/co-curricular",
        element: <CoCurricularPage />,
      },
      {
        path: "/co-curricular-activities",
        element: <CoCurricularPage />,
      },
      {
        path: "/meal-menu",
        element: <MealMenuPage />,
      },
      {
        path: "/residential-food-menu",
        element: <MealMenuPage />,
      },
      {
        path: "/boarding-meal-routine",
        element: <MealMenuPage />,
      },
      {
        path: "*",
        element: <NotFoundPage />,
      },
    ],
  },
]);

export default Routes;
