import React, { useState } from "react";

import InterviewerListItem from './InterviewerListItem';
import "components/InterviewerList.scss";


export default function InterviewerList(props) {

  // const [id, setId] = useState(props.interviewer);

  const list = props.interviewers.map(interviewer => {
    return (
      <InterviewerListItem
        selected={interviewer.id === props.currentInterviewer}
        avatar={interviewer.avatar}
        name={interviewer.name}
        // key={interviewer.id}
        // alt={props.name}


        setInterviewerFun={props.setInterviewerFun}


        setInterviewer={() => {
          // console.log('someone has been clicked');
          // console.log(props)
          // console.log(props.value)
          // console.log(selectedId)
          // setId(interviewer.id)
          props.setInterviewerFun(interviewer.id)
          // props.onChange(interviewer.id)
          
        }}
      />
    );
  });

  return (
    <section class="interviewers">
      <h4 class="interviewers__header text--light">Interviewer</h4>
      <ul class="interviewers__list">{list}</ul>
    </section>
  );
}
