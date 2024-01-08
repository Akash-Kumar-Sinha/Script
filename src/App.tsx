import React from "react";
import AuthHome from "./components/AuthHome/AuthHome";
import HotToast from "./components/AuthHome/HotToast/HotToast";
import { Route, Routes } from "react-router-dom";
import UsersPage from "./components/UsersPage/UsersPage";

function App() {
  return (
    <div className="App">
      <HotToast />
      <Routes>
        <Route path="/" element={<AuthHome />}/>
        <Route path="/userspage" element={<UsersPage />}/>

      </Routes>
    </div>
  );
}

export default App;
