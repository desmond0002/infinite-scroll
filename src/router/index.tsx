import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { MainPage } from "../pages/MainPage";
import { ListPage } from "../pages/List-page/List-page";
import { Layout } from "../layout";

const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<MainPage />} />
          <Route path="/:id" element={<ListPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
export { Router };
