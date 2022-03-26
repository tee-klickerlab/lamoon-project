import { lazy } from "react";

// layout
import { DefaultLayout } from "layouts";
import { LoadableComponent as Loadable } from "components";

// pages
const PageStatistic = Loadable(lazy(() => import("pages/statistic")));
const PageCalculate = Loadable(lazy(() => import("pages/calculate")));
const PageManagement = Loadable(lazy(() => import("pages/management")));
const PageCRUDMenu = Loadable(lazy(() => import("pages/crudmenu")));
const PageNotfound = Loadable(lazy(() => import("pages/notfound")));

const Routes = {
  path: "/",
  element: <DefaultLayout />,
  children: [
    {
      path: "/",
      element: <PageCalculate />,
    },
    {
      path: "/calculate",
      element: <PageCalculate />,
    },
    {
      path: "/statistic",
      element: <PageStatistic />,
    },
    {
      path: "/management",
      element: <PageManagement />,
    },
    {
      path: "/management/:action/:menu",
      element: <PageCRUDMenu />,
    },
    {
      path: "/*",
      element: <PageNotfound />,
    },
  ],
};

export default Routes;
