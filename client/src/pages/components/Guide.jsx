import React from "react";
import { BsPlusLg } from "react-icons/bs";
import { BiMinus } from "react-icons/bi";
import "./Guide.css";

function GuideComponent({ guide, index, toggleAnswerQuestion }) {
  return (
    <div
      className={"guide " + (guide.open ? "open" : "")}
      key={index}
      onClick={() => toggleAnswerQuestion(index)}
    >
      <div className="guide-question" style={{backgroundColor: `${guide.background}`, color: '#fff'}}>
        <span className="guide-question-icon">
          <BsPlusLg />
        </span>
        <span className="guide-question-text">{guide.question}</span>
      </div>
      <div className="guide-answer">
        <span className="guide-answer-icon">
          <BiMinus />
        </span>
        <span className="guide-answer-text">{guide.answer}</span>
      </div>
    </div>
  );
}

export default GuideComponent;
