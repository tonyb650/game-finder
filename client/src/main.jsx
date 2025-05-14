import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthProvider from "./context/AuthProvider";
import NotificationProvider from "./context/NotificationProvider.jsx";

/*
I'm interested in testing the way BrowserRouter is interacting with the path="/*" here and why (if?) we need that extra <Route/>
instead of just <App/> (this bit came from Dave Gray video) Might have something to do with
React Router v6 ...would like to look into this...
*/
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <NotificationProvider>
          <Routes>
            <Route path="/*" element={<App />} />{" "} {/* "we are not just going to have the App component here." - dave gray... maybe there's more I haven't gotten to yet... */}
          </Routes>
        </NotificationProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
