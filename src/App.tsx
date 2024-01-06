import React from 'react';
import AuthHome from './components/AuthHome/AuthHome';
import HotToast from './components/AuthHome/HotToast/HotToast';

function App() {
  return (
    <div className="App">
      <HotToast/>
      <AuthHome/>
    </div>
  );
}

export default App;
