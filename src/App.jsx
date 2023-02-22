import React from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import AgentPage from "./pages/admin/Agent/AgentPage";
import AddBusPage from "./pages/admin/Bus/AddBusPage";
import HomePage from "./pages/admin/Home/HomePage";
import AdminLogin from "./pages/admin/Login/AdminLogin";
import AgentBookingPage from "./pages/agnet/AgentBooking/AgentBookingPage";
import AgentBookingView from "./pages/agnet/AgentBookingView.jsx/AgentBookingView";
import AgentHomePage from "./pages/agnet/AgentHome/AgentHomePage";
import { AgentSignin } from "./pages/agnet/AgentSignin/AgentSignin";
import AgentSignup from "./pages/agnet/AgentSignup/AgentSignup";
import ErrorPage from "./pages/Error";

const App = () => {
  const isAdmin = Boolean(useSelector((state) => state.admin.token));
  const isAgent = Boolean(useSelector((state) => state.agent.token));

  return (
    <>
      <BrowserRouter>
        <Routes>
          //* ADMIN //*
          <Route path="/admin/signin" element={<AdminLogin />} />
          <Route path="/404" element={<ErrorPage />} />
          <Route path="/" element={isAdmin ? <HomePage /> : <Navigate to="/admin/signin" />} />
          <Route path="/admin/agent" element={isAdmin ? <AgentPage /> : <Navigate to="/admin/signin" />} />
          <Route path="/admin/add-bus" element={isAdmin ? <AddBusPage /> : <Navigate to="/admin/signin" />} />
          //* AGENT *//
          <Route path="/register" element={<AgentSignup />} />
          <Route path="/login" element={<AgentSignin />} />
          <Route path="/agent/home" element={isAgent ? <AgentHomePage /> : <Navigate to="/login" />} />
          <Route path="/agent/booking" element={isAgent ? <AgentBookingPage /> : <Navigate to="/login" />} />
          <Route path="/agent/booking/view" element={isAgent ? <AgentBookingView /> : <Navigate to="/login" />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
