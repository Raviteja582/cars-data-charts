import React, { useEffect } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Navbar from "components/navbar";
import Sidebar from "components/sidebar";
// import Footer from "components/footer/Footer";
import routes from "routes";
import PrivateRoutes from "layouts/auth/privateRouter";

export default function Admin(props: { [x: string]: any }) {
  const { ...rest } = props;
  const location = useLocation();
  const [open, setOpen] = React.useState(true);
  const [currentRoute, setCurrentRoute] = React.useState("Main Dashboard");

  useEffect(() => {
    window.addEventListener("resize", () =>
      window.innerWidth < 1200 ? setOpen(false) : setOpen(true)
    );
  }, []);

  useEffect(() => {
    getActiveRoute(routes);
  }, [location.pathname]);

  const getActiveRoute = (routes: RoutesType[]): string | boolean => {
    let activeRoute = "Main Dashboard";
    for (let i = 0; i < routes.length; i++) {
      if (
        window.location.href.indexOf(
          routes[i].layout + "/" + routes[i].path
        ) !== -1
      ) {
        setCurrentRoute(routes[i].name);
      }
    }
    return activeRoute;
  };
  const getActiveNavbar = (routes: RoutesType[]): string | boolean => {
    let activeNavbar = false;
    for (let i = 0; i < routes.length; i++) {
      if (
        window.location.href.indexOf(routes[i].layout + routes[i].path) !== -1
      ) {
        return routes[i].secondary;
      }
    }
    return activeNavbar;
  };
  const getRoutes = (routes: RoutesType[]): any => {
    return routes.map((prop, key) => {
      if (prop.layout === "/user") {
        if (prop.children?.length) {
          return prop.children?.map((route, index) => {
            return (
              <Route
                path={`/${route.path}`}
                element={route.component}
                key={index}
              />
            );
          });
        } else {
          return (
            <Route path={`/${prop.path}`} element={prop.component} key={key} />
          );
        }
      } else {
        return null;
      }
    });
  };

  document.documentElement.dir = "ltr";
  return (
    <div className="flex h-full w-full">
      <Sidebar open={open} onClose={() => setOpen((prev) => !prev)} />
      {/* Navbar & Main Content */}
      <div className="min-h-full w-full bg-lightPrimary dark:!bg-navy-900">
        {/* Main Content */}
        <main
          className={`mx-[12px] h-full flex-none transition-all md:pr-2 ${
            open ? "xl:ml-[300px]" : "xl-ml-[21px]"
          }`}
        >
          {/* Routes */}
          <div className="h-full">
            <Navbar
              brandText={currentRoute}
              secondary={getActiveNavbar(routes)}
              {...rest}
            />
            <div className="pt-5s mx-auto mb-auto h-full min-h-[70vh] p-2 md:pr-2">
              <Routes>
                <Route element={<PrivateRoutes />}>
                  {getRoutes(routes)}

                  <Route
                    path="/"
                    element={<Navigate to="/user/default" replace />}
                  />
                </Route>
              </Routes>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
