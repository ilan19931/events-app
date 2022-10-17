import React from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Home from "./pages/Home";
import NewEvent from "./pages/NewEvent";

const App = () => {
  return (
    <div>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/newEvent" element={<NewEvent />} />
        </Routes>
      </Layout>
    </div>
  );
};

export default App;
