import { Link, Routes, Route, Navigate } from "react-router-dom";
import routes from "routes";
import FixedPlugin from "components/fixedPlugin/FixedPlugin";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

export default function Auth() {
  const getRoutes = (routes: RoutesType[]): any => {
    return routes.map((prop, key) => {
      if (prop.layout === "/auth") {
        return (
          <Route path={`/${prop.path}`} element={prop.component} key={key} />
        );
      } else {
        return null;
      }
    });
  };
  document.documentElement.dir = "ltr";
  return (
    <div>
      <div className="relative float-right h-full min-h-screen w-full !bg-white dark:!bg-navy-900">
        <FixedPlugin />
        <main className={`mx-auto min-h-screen`}>
          <div className="relative flex">
            <div className="ml-auto min-h-full w-full pt-12 md:max-w-[75%] lg:h-screen lg:max-w-[1013px] lg:px-8 lg:pt-0 xl:h-[100vh] xl:max-w-[1383px] xl:px-0 xl:pl-[70px]">
              <div className="mb-auto flex flex-col pl-5 pr-5 md:pl-12 md:pr-0 lg:max-w-[48%] lg:pl-0 xl:max-w-full">
                <Link to="/basic" className="mt-0 w-max lg:pt-10">
                  <div className="mx-auto flex h-fit w-fit items-center hover:cursor-pointer">
                    <ArrowBackIosNewIcon className="h-7 w-7" />
                    <p className="ml-3 text-sm text-gray-600">
                      Back to Dashboard
                    </p>
                  </div>
                </Link>
                <Routes>
                  {getRoutes(routes)}
                  <Route
                    path="/"
                    element={<Navigate to="/auth/signin" replace />}
                  />
                </Routes>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
