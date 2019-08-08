import React from "react";
import classnames from "classnames";
import "components/InterviewerListItem.scss";

export default function InterviewerListItem(props) {

  const classNameInterviewer = classnames('interviewers__item', {
    'interviewers__item--selected': props.selected
  });

  const classNameImage = classnames('interviewers__item-image', {
    'interviewers__item--selected-image': props.selected && props.image
  });

  if (props.selected) {

    return (
      <li
        class={classNameInterviewer}
        onClick={() => {
          // console.log(props)
          props.setInterviewer();
          // console.log('')
          // console.log('yaminoma')
          
        }}
      >
      <img
        className={classNameImage}
        src={props.avatar}
        alt={props.name}
      />
        {props.name}
      </li>
    );

  } else {
    return (
      <li
        class={classNameInterviewer}
        onClick={() => {
          // console.log(props)
          props.setInterviewer();
          // console.log('')
          // console.log('yaminoma')
        }}
      >
      <img
        className={classNameImage}
        src={props.avatar}
        alt={props.name}
      />
        {/* {props.name} */}
      </li>
    );
  }
}

