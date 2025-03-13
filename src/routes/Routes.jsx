import { createBrowserRouter } from "react-router-dom";
import Main from "../layouts/Main";
import About from "../pages/About";
import AcademicDetailPage from "../pages/AcademicDetailsPage";
import Academics from "../pages/Academics";
import ContactUs from "../pages/ContactUs";
import Home from "../pages/Home";
import NoticePage from "../pages/NoticePage";
import NoticeDetailsPage from "../pages/NoticeDetailsPage";
import TeachersPage from "../pages/TeachersPage";
import AdmissionPage from "../pages/AdmissionPage";
import PhotoGallery from "../pages/photoGallery";
import VideoGallery from "../pages/VideoGallery";
import BookIntroduction from "../pages/BookIntroduction";

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
        element: <Academics />,
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
        element: <PhotoGallery />,
      },
      {
        path: "/video-gallery",
        element: <VideoGallery />,
      },
      {
        path: "/book-introduction",
        element: <BookIntroduction />,
      },
    ],
  },
]);

export default Routes;
