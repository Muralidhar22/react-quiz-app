import React from "react";
import { Link } from "react-router-dom";

export default function Start(){
    return(
    <main>
        <h1 className="title">Quizzical</h1>
        <p>Test your computer science knowledge, the questions will be of intermediate level</p>
        <Link to="/quiz">Start Quiz</Link>
    </main>
    )
}