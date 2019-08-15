import React from "react";
import "components/Appointment/styles.scss";
import Header from "components/Appointment/header";
import Empty from "components/Appointment/Empty";
import Show from "components/Appointment/Show";
import Confirm from "components/Appointment/Confirm";
import Status from "components/Appointment/Status";
import Error from "components/Appointment/Error";
import Form from "components/Appointment/Form";
import useVisualMode from "../../hooks/useVisualMode";

//////////////////////////////////////////////////////

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";

///////////////////////////////////////////////////////

export default function Appointment(props) {
  const modeTracker = useVisualMode(props.interview ? SHOW : EMPTY);

  const save = function(name, interviewer, time) {
    if (name === "" || !interviewer) {
      return;
    }
    const interview = { student: name, interviewer: interviewer };
    const interviewInfo = {
      id: props.id,
      time: time,
      interview: interview
    };
    modeTracker.transition(SAVING);
    props
      .bookInterview(props.id, interviewInfo)
      .then(res => {
        modeTracker.transition(SHOW);
      })
      .catch(err => {
        modeTracker.transition(ERROR_SAVE);
      });
  };

  const deleteInterview = function() {
    modeTracker.transition(DELETING);
    props
      .cancelInterview(props.id, props.time)
      .then(res => {
        modeTracker.transition(EMPTY);
      })
      .catch(err => {
        modeTracker.transition(ERROR_DELETE);
      });
  };

  if (props.interview && modeTracker.mode === EMPTY) {
    modeTracker.transition(SHOW);
  }
  if (!props.interview && modeTracker.mode === SHOW) {
    modeTracker.transition(EMPTY);
  }

  return (
    <div>
      <Header time={props.time} />
      {modeTracker.mode === EMPTY && (
        <Empty
          time={props.time}
          onAdd={() => {
            modeTracker.transition("CREATE");
          }}
        />
      )}
      {modeTracker.mode === SHOW && props.interview && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onEdit={() => {
            modeTracker.transition(CREATE);
          }}
          onDelete={() => {
            modeTracker.transition(CONFIRM);
          }}
        />
      )}
      {modeTracker.mode === CREATE && (
        <Form
          name={props.interview ? props.interview.student : ""}
          interviewerId={
            props.interview ? props.interview.interviewer.id : null
          }
          interviewers={props.interviewers}
          onSave={(name, interviewer) => {
            save(name, interviewer, props.time);
          }}
          onCancel={() => {
            modeTracker.back();
          }}
        />
      )}
      {modeTracker.mode === SAVING && <Status message={"SAVING"} />}
      {modeTracker.mode === DELETING && <Status message={"DELETING"} />}
      {modeTracker.mode === CONFIRM && (
        <Confirm
          onConfirm={() => {
            deleteInterview();
          }}
          onCancel={() => {
            modeTracker.transition(SHOW);
          }}
          message={"Are you sure you would like to delete?"}
        />
      )}
      {modeTracker.mode === ERROR_SAVE && (
        <Error
          message={"Could not save appointment"}
          onClose={() => {
            modeTracker.back();
          }}
        />
      )}
      {modeTracker.mode === ERROR_DELETE && (
        <Error
          message={"Could not cancel appointment."}
          onClose={() => {
            modeTracker.back();
          }}
        />
      )}
    </div>
  );
}
