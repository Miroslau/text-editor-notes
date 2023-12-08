import React, { FC } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import routes from "../../routes";

const AppRouter: FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/notes" replace />} />
      {routes.map(({ path, Component }) => (
        <Route key={path} path={path} element={<Component />} />
      ))}
    </Routes>
  );
};

export default AppRouter;
