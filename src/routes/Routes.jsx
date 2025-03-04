import { createBrowserRouter } from "react-router-dom";
import Main from "../layouts/Main";
import Home from "../pages/Home";
import About from "../pages/About";
import ContactUs from "../pages/ContactUs";
import Academics from "../pages/Academics";
import Teachers from "../pages/Teachers";
import Admission from "../pages/Admission";
import Notice from "../pages/Notice";

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
        path: "/teachers",
        element: <Teachers />,
      },
      {
        path: "/admission",
        element: <Admission />,
      },
      {
        path: "/notice",
        element: <Notice />,
      },
    ],
  },
]);

export default Routes;
