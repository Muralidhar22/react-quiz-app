import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Start from "./components/Start";
import Quiz from "./components/Quiz";

export default function App(){
    return(
 <Routes>
     <Route path="/" element={<Start />} />
     <Route path="/quiz" element={<Quiz />} />
 </Routes>
    )
}