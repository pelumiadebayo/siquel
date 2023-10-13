import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Preview from "./components/FormBuilder/Pages/Preview";
import Form from "./components/FormBuilder/Pages/Builder";


ReactDOM.render(
  <React.StrictMode>
    <Router>    
        <App />
        <Routes> 
            <Route path="/preview"  caseSensitive={false} element={<Preview />}  /> 
            <Route path="/form"  caseSensitive={false} element={<Form />}  /> 
       </Routes>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);