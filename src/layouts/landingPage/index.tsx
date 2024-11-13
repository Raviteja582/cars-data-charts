import { Navigate, Route, Routes } from "react-router-dom";
import BasicPageHeader from "./header";
import routes from "routes";
import "assets/css/landingPage.css";
import BasicFooterPage from "./footer";

export default function LandingPage() {
  const getRoutes = (routes: RoutesType[]): any => {
    return routes.map((prop, key) => {
      if (prop.layout === "/basic") {
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
      <BasicPageHeader />
      <Routes>
        {getRoutes(routes)}
        <Route path="/" element={<Navigate to="/basic/default" replace />} />
      </Routes>
      <BasicFooterPage />
    </div>
  );
}
