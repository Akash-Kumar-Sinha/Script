import React from "react";
import AuthHome from "./components/AuthHome/AuthHome";
import HotToast from "./utils/HotToast/HotToast";
import { Route, Routes } from "react-router-dom";
import UsersPage from "./components/UsersPage/UsersPage";
import NoRoute from "./utils/Route/NoRoute";
import { AuthProvider } from "./utils/ProtectAuth";

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
