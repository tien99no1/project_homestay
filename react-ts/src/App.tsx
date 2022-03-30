import React from "react";
import "./App.css";
import Layout from "./components/layout/";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Guide from "./pages/Guide";
import Host from "./pages/Host";
import SignUp from "./pages/SignUp";
import Location from "./pages/Location";
import Room from "./pages/Room";
import DashBoard from "./pages/DashBoard";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import NotFound from "./pages/NotFound";
import CreateRoom from "./pages/CreateRoom";
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCjAc67c3MTR6D-DCovmpVTvGShbcRBmkk",
  authDomain: "homestay-d9c86.firebaseapp.com",
  projectId: "homestay-d9c86",
  storageBucket: "homestay-d9c86.appspot.com",
  messagingSenderId: "700563205495",
  appId: "1:700563205495:web:13217e829d105cbebac572",
  measurementId: "G-BCY72T1K36",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="/home/*" element={<Layout />}>
          <Route path="" element={<Home />} />
          <Route path="location" element={<Location />} />
          <Route path="room" element={<Room />} />
        </Route>
        <Route path="/guide" element={<Guide />} />
        <Route path="/host" element={<Host />} />
        <Route path="/dashboard" element={<DashBoard />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/create" element={<CreateRoom />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
