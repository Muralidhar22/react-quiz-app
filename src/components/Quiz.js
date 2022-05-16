import React from "react";
import Questions from "./Questions";
import { nanoid } from "nanoid";
import shuffleArray from "../util";
import Options from "./Options";
import { Link } from "react-router-dom";
import "../css/quiz.css"
/***************************************
 *Quiz Component
 **************************************/
export default function Quiz(){
    const [quizData, setQuizData] = React.useState([]);
    const [quizQuestions, setQuizQuestions] = React.useState([]);
    const [checkedAnswers, setCheckedAnswers] = React.useState(false);
    const [score,setScore] = React.useState(0);
    let allQuestions = null;

//**component render check**//
console.log(`component render`)
//***********************// 


/*******************
 * generate options
 *******************/
    function generateOptions(allOptions,crctAns){
        const shuffledArray = shuffleArray(allOptions);
        const newOptionsArray = []
        shuffledArray.forEach(option => {
            newOptionsArray.push(                               //setting up each option with data
                {
                    num: shuffledArray.indexOf(option)+1,
                    id: nanoid(),
                    value: option,
                    isSelected: false,
                    correct: option === crctAns ? true : false,  //passing correct option in the option object
                }
            )
        })
        return newOptionsArray
    }


    /*************************************************
     *  use effect to run once first time page render 
     *************************************************/
         React.useEffect(
             async () =>{
             const quizDataReceived = await getQuestions()
            setQuizData(quizDataReceived.results)
        },[])

        React.useEffect(()=>{
            const allQuestions = [] 
            quizData.forEach(data => {
                allQuestions.push(
                    {
                        quesNum: quizData.indexOf(data)+1,
                        question: data.question,
                        options: generateOptions([data.correct_answer,...data.incorrect_answers],data.correct_answer),
                    }
                )
            })
            
            setQuizQuestions(allQuestions)  //setting up all quesions in state variable
        },[quizData])
        
    /*********************
     * fetch API call
     ********************/
        async function getQuestions(){
            const res = await fetch("https://opentdb.com/api.php?amount=5&category=9&difficulty=medium&type=multiple")
            const data = await res.json()
            return data
        } 

    /*****************************************
     * function runs after playagain is clicked
     *****************************************/
        async function playAgain(){
            console.log(`play again`)
            const quizDataReceived = await getQuestions()
            setQuizData(quizDataReceived.results)
        }

    /***************************************
    * function to select the option on click
    ***************************************/
   function selectOption(id,quesNum){
        setQuizQuestions((prevQuestions)=>{
            return prevQuestions.map(each => {
                return (each.quesNum === quesNum ?
                   {
                    ...each,
                    options: each.options.map(option => {
                            return option.id === id ? {...option, isSelected: true} : {...option,isSelected: false}
                   }) 
                }
                : each)
            })
        })
    }  

      /********************************
     * Check answer and display score
     ********************************/

       function checkAnswer(){
           let count = 0
            quizQuestions.forEach(each => {
               each.options.forEach(option =>{
                   if(option.isSelected && option.correct){
                        count++
                   }
               })
           })
           setScore(count)
        }
       /***************************************************************
         * Quiz question that needs to be render is saved in the variable
         **************************************************************/
        allQuestions =  quizQuestions.map(each => {
            return(
                <>
                <Questions 
                num = {each.quesNum}
                question={each.question}
                />
                <div className="options">
                <Options
                    key = {nanoid()}
                    pair = {each.quesNum}
                    allOptions = {each.options}
                    selectOption = {selectOption}
                    disabled = {checkedAnswers}
                />
                </div>
                <hr></hr>
                </>
            )
        })
     
    /****************************************************
             Returning the quiz questions
    **************************************************/
    return(
        <div className="quiz-container">
          <Link to="/" className="heading">Quizzical</Link>
           {allQuestions}
           {!checkedAnswers && <button className="btn_check-answers" onClick={() => {
               checkAnswer()
                setCheckedAnswers(true)}
               }> Check answers </button>}   
                {checkedAnswers && 
                <>
                <span>You Scored {score}/5 correct answers </span>
                <button className="btn_play-again" onClick={() => {
                    playAgain()
                    setCheckedAnswers(false)
                    setScore(0)
                }}>Play Again</button>
                </>
                }
        </div>
    )
}
