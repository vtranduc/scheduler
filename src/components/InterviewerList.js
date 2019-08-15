import React from "react";
import InterviewerListItem from "./InterviewerListItem";
import "components/InterviewerList.scss";
// import PropTypes from "prop-types";

export default function InterviewerList(props) {
  const list = props.interviewers.map(interviewer => {
    return (
      <InterviewerListItem
        key={interviewer.id}
        selected={interviewer.id === props.currentInterviewer}
        avatar={interviewer.avatar}
        name={interviewer.name}
        setInterviewerFun={props.setInterviewerFun}
        setInterviewer={() => {
          props.setInterviewerFun(interviewer.id);
        }}
      />
    );
  });
  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{list}</ul>
    </section>
  );
}

// InterviewerList.propTypes = {
//   value: PropTypes.number,
//   onChange: PropTypes.func.isRequired
// };
