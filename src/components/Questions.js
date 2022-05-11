import React from "react";

export default function Questions(props){
    
    // rendering questions
    const questions = props.data.map( (data) =>{
                return (
                    <>
                     <h2>
                        {data.question}
                    </h2>
                    
                    <div className="options flex">
                        <Options
                        incorrectOptions = {data.incorrect_answers} 
                        correctOption = {data.correct_answer}
                        allOptions={[...data.incorrect_answers,data.correct_answer]}
                        />
                    </div>
                    <hr></hr>
                    </>
                )
        }
    )
    // options
function Options(props){
    console.log(props)
    return props.allOptions.map(option => <button className="options">{option}</button>)
}
    
    return(
        <div className="quiz-questions">
            {questions}
        </div>
    )
}