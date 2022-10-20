import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import GuestRoute from "./components/Helpers/GuestRoute";
import UserRoute from "./components/Helpers/UserRoute";
import Layout from "./components/Layout/Layout";
import Home from "./pages/Home";
import NewEvent from "./pages/NewEvent";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import { dark, light } from "./themes/mainTheme";

const App = () => {
  const [lightTheme, setLightTheme] = useState(true);

  return (
    <div>
      <ThemeProvider theme={lightTheme ? light : dark}>
        <Layout setLightTheme={setLightTheme}>
          <Routes>
            <Route
              path="/"
              element={
                <UserRoute>
                  <Home />
                </UserRoute>
              }
            />

            <Route
              path="/signin"
              element={
                <GuestRoute>
                  <SignIn />
                </GuestRoute>
              }
            />
            <Route
              path="/signup"
              element={
                <GuestRoute>
                  <SignUp />
                </GuestRoute>
              }
            />
            <Route path="/newEvent" element={<NewEvent />} />
          </Routes>
        </Layout>
      </ThemeProvider>
    </div>
  );
};

export default App;
