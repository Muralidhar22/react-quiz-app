import React from "react";

export default function Options(props){
  return props.allOptions.map(option => {
    let styles = {}

    props.disabled ? styles = {
        backgroundColor: (option.isSelected && option.correct) || option.correct ? "#94D7A2" : (!option.correct && option.isSelected ? "#F8BCBC" : "transparent"),
        border: option.isSelected || option.correct ? "none" : "1px solid #4D5B9E",
        color: option.correct && "#293264",
        opacity: option.correct && "1",
    } :    styles = {
      backgroundColor: option.isSelected ? "#D6DBF5" : "transparent",
      border: option.isSelected ? "none" : "1px solid #4D5B9E",
      color: "#293264" 
    } 
 
    return(
      <button className="option" data-pair={props.pair}
        tabIndex={option.num}
        style={styles}
        onClick={()=>props.selectOption(option.id,props.pair)}
        disabled={props.disabled}
        >{option.value}</button>
    )
  })
}