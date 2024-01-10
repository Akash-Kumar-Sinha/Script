import React from "react";
import AuthHome from "./components/AuthHome/AuthHome";
import HotToast from "./components/AuthHome/HotToast/HotToast";
import { Route, Routes } from "react-router-dom";
import UsersPage from "./components/UsersPage/UsersPage";
import NoRoute from "./components/Route/NoRoute";

function App() {
  return (
    <div className="App">
      <HotToast />
      <Routes>
        <Route path="/" element={<AuthHome />}/>
        <Route path="/userspage" element={<UsersPage />}/>
        <Route path="*" element={<NoRoute/>}/>
      </Routes>
    </div>
  );
}

export default App;
