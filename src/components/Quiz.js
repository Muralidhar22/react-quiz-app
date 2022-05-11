import React from "react";
import Questions from "./Questions";
export default function Quiz(){
    const [quizData, setQuizData] = React.useState([])
    const [score,setScore] = React.useState(0);
    const [checkedAnswers, setCheckedAnswers] = React.useState();
    const playAgain = document.querySelector(".play-again")

// use effect for API call  
            React.useEffect(() =>{
                async function getQuestions(){
                    const res = await fetch("https://opentdb.com/api.php?amount=5&category=9&difficulty=medium&type=multiple")
                    const data = await res.json()
                    setQuizData(data.results)
                }
                playAgain.addEventListener('click',getQuestions)

              
                getQuestions()
               return function(){
                    playAgain.removeEventListener('click',getQuestions)
               }
            },[])
            
 // check answers
 function checkAnswer(){
    console.log(`checking answers`)
    setCheckedAnswers(true)
}
    return(
        <div className="quiz-container">
            <h1>Quiz:</h1>
                    <Questions
                        key = 'questions'
                        data = {quizData}
                    />
             {!checkedAnswers && <button onClick={checkAnswer}> Check answers </button>}   
                {checkedAnswers && 
                <>
                <span>You Scored score/5</span>
                <button className="play-again">Play Again</button>
                </>
                
                }
            
        </div>
    )
   
}