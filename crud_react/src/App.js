import './App.css';
import { Component } from "react";
import StudentList from './component/StudentList';
import { Routes, Route, Link } from "react-router-dom";
import StudentCreate from './component/StudentCreate';
import StudentDelete from './component/StudentDelete';
import StudentUpdate from './component/StudentUpdate';
function App() {
  return (
    <div className="App">
    <Routes>
    <Route path='/' element={<StudentList />}></Route>
      <Route path='student/create' element={<StudentCreate />}></Route>
      <Route path='student/delete/:id' element={<StudentDelete />}></Route>
      <Route path='student/update/:id' element={<StudentUpdate />}></Route>
    </Routes>
    </div>
  );
}

export default App;
