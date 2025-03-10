import { createBrowserRouter } from "react-router-dom";
import Main from "../layouts/Main";
import About from "../pages/About";
import AcademicDetail from "../pages/academicDetails";
import Academics from "../pages/Academics";
import Admission from "../pages/Admission";
import ContactUs from "../pages/ContactUs";
import Home from "../pages/Home";
import Notice from "../pages/Notice";
import NoticeDetail from "../pages/noticeDetails";
import Teachers from "../pages/Teachers";

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
        path: "/academics",
        element: <Academics />,
      },
      {
        path: "/academics/:id",
        element: <AcademicDetail />,
      },
      {
        path: "/teacher",
        element: <Teachers />,
      },
      {
        path: "/admissions",
        element: <Admission />,
      },
      {
        path: "/notices",
        element: <Notice />,
      },
      {
        path: "/notices/:id",
        element: <NoticeDetail />,
      },
    ],
  },
]);

export default Routes;