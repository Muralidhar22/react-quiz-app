/*********************
 *Question Component
 ********************/
export default function Questions(props){
  return(
      <h2 className="question">
          <span>{props.num}. </span>
          {props.question}
      </h2>
  )
}