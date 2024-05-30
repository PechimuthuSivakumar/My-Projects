import React, {
  useLayoutEffect,
} from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { ConfigProvider } from "antd";
import { Custom } from "../Helpers/ThemeCustomization";
import {AuthRouter, Redirect} from "./AuthRouter";
import DashboardLayout from "../Layout/DashboardLayout";
import { authRoutes } from "./Route";
import NoPage from "../Component/NoPage/NoPage";
import Login from "../Component/Login/Login";
const Wrapper = ({ children }) => {
  const location = useLocation();
  useLayoutEffect(() => {
    document.documentElement.scrollTo(500, 0);
  }, [location.pathname]);
  return children;
};
const index = () => {
  return (
    <ConfigProvider
      theme={{
        token: Custom,
      }}
    >
      <Router>
        <Wrapper>
          <Routes>
              <Route path="/login" element={<Redirect><Login /></Redirect>} />
              <Route
                path="/"
                element={
                  <AuthRouter>
                    <DashboardLayout />
                  </AuthRouter>
                }
              >
                {authRoutes !== null && authRoutes?.map((item, index) => {
                  return (
                    <Route
                      key={index}
                      path={item?.path}
                      element={<AuthRouter>{item?.element}</AuthRouter>}
                    />
                  );
                })}
                <Route path="*" element={<NoPage />} />
              </Route>
              <Route path="*" element={<NoPage />} />
            </Routes> 
        </Wrapper>
      </Router>
    </ConfigProvider>
  );
};

export default index;
