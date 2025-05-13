import { Navigate, Route, Routes } from "react-router-dom";

import Layout from "./layouts/Layout";
import HomePage from "./pages/HomePage";
import AuthCallbackPage from "./pages/AuthCallbackPage";
import LandingPage from "./pages/LandingPage";
import InsightConfigurePage from "./pages/InsightConfigurePage";
import ProtectedRoute from "./auth/ProtectedRoute";
import { siteContents } from "./lib/siteContents";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout showFooter={true} showHero> <HomePage /> </Layout>} />
      <Route path={siteContents.pages.authCallback} element={<AuthCallbackPage />} />
      <Route element={<ProtectedRoute />}>
        <Route path={siteContents.pages.apiInsight} element={ <Layout> <LandingPage /> </Layout> } />
        <Route path={siteContents.pages.insightConfigure} element={ <Layout> <InsightConfigurePage /> </Layout> } />
      </Route>
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default AppRoutes;