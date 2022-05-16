import React from "react";
import { Link } from "react-router-dom";
import "../css/start.css";

export default function Start(){
    return(
    <main className="main">
        <h1 className="title">Quizzical</h1>
        <p>Hey! welcome to <strong>Quizzical</strong></p>
        <Link to="/quiz" className="btn_start-quiz">Start Quiz</Link>
    </main>
    )
}