import React from "react";
import AuthHome from "./components/AuthHome/AuthHome";
import HotToast from "./components/AuthHome/HotToast/HotToast";
import { Route, Routes } from "react-router-dom";
import UsersPage from "./components/UsersPage/UsersPage";
import NoRoute from "./components/Route/NoRoute";
import { AuthProvider } from "./components/utils/ProtectAuth";

const App = () => {
  return (
    <AuthProvider>
      <HotToast />
      <Routes>
        <Route path="/" element={<AuthHome />}/>
        <Route path="/userspage" element={<UsersPage />}/>
        <Route path="*" element={<NoRoute/>}/>
      </Routes>
    </AuthProvider>
  );
}

export default App;
