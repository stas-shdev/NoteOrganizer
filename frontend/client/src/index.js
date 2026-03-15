import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import HomePage from './HomePage'
import AuthProvider from './AuthProvider.js'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import InviteGroup from './InviteGroup.js';
import Group from'./Group.js'
// import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <AuthProvider>
      <Routes>
        <Route path={"/App"} element={<App key="App"/>} />
        <Route path={"/App/Group/:id"} element={<Group key="Group"/>} />
        <Route path={"/"} element={<HomePage key="Home"/>} />
        <Route path={"/InviteGroup/:id"} element={<InviteGroup key="InviteGroup"/>} />
      </Routes>
    </AuthProvider>
  </BrowserRouter>
);

// // If you want to start measuring performance in your app, pass a function
// // to log results (for example: reportWebVitals(console.log))
// // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
