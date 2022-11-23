import React from 'react';
import './App.css';

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Post from './component/pages/Post';
import Login from './component/pages/Login';
import Reports from './component/pages/Reports';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Routes>
          <Route>
            <Route path="/" element={<Login/>} />
            <Route path="/post" element={<Post/>} />
            <Route path="/reports" element={<Reports/>} />
          </Route>
        </Routes>
      </BrowserRouter>
    );
  }
}

export default App;
