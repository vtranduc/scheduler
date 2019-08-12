import React, { useState } from "react";
import Button from "../../components/Button";
import InterviewerList from "../../components/InterviewerList";

export default function Form(props) {
  const arr = [1, 2, 3, 4, 5];

  const [name, setName] = useState(props.name);
  const [interviewer, setInterviewer] = useState(props.interviewerId);

  console.log("pnada", props.interviewer);

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off">
          <input
            className="appointment__create-input text--semi-bold"
            name={name}
            type="text"
            placeholder="Enter Student Name"
            id="nameInput"
            onChange={event => setName(event.target.value)}
            value={name}
          />
        </form>
        <InterviewerList
          interviewers={props.interviewers}
          interviewer={interviewer}
          setInterviewerFun={setInterviewer}
          currentInterviewer={interviewer}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button
            danger
            onClick={() => {
              setInterviewer(null);
              props.onCancel();
              setName("");
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={() => {
              props.onSave(name, interviewer);
              setName("");
              setInterviewer(null);
            }}
          >
            Save
          </Button>
        </section>
      </section>
    </main>
  );
}
