import React from "react";
import AuthHome from "./components/AuthHome/AuthHome";
import HotToast from "./utils/HotToast/HotToast";
import { Route, Routes } from "react-router-dom";
import NoRoute from "./utils/Route/NoRoute";
import { AuthProvider } from "./utils/ProtectAuth";
import UserLayout from "./components/UsersPage/List/UserLayout";
import ConversationsHome from "./components/Conversations/ConversationsHome";
import ConversationId from "./components/Conversations/Message/ConversationId";
import ActiveStatus from "./components/UsersPage/Users/ActiveStatus";

const App = () => {
  
  return (
    <AuthProvider>
      <HotToast />
      {/* <ActiveStatus/> */}
      <Routes>
        <Route path="/" element={<AuthHome />}/>
        <Route path="/users" element={<UserLayout />}/>
        <Route path="/conversations" element={<ConversationsHome />}/>
        <Route path="/conversations/:id" element={<ConversationId/>}/>

        <Route path="*" element={<NoRoute/>}/>
      </Routes>
    </AuthProvider>
  );
}

export default App;
