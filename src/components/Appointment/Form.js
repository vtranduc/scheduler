import React, {useState} from "react";
import Button from "../../components/Button";
import InterviewerList from "../../components/InterviewerList";

export default function Form(props) {
  const arr = [1, 2, 3, 4, 5];

  const [name, setName] = useState(props.name || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);

  return (

    // <div>{props.interviewers[0].id}Namae</div>

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

            // value={"I would"}

          />
        </form>

        {/* {x && <div></div>} */}
        {/* {x ? <div></div> : <div></div>} */}
        {/* {arr.map(num => <div>{num}</div>)} */}
        <InterviewerList
          interviewers={props.interviewers}
          interviewer={interviewer}
          // setNameFun={setName}
          setInterviewerFun={setInterviewer}
          currentInterviewer={interviewer}
          // value
          // onChange
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger
            onClick={() => {
              setInterviewer(null);
              props.onCancel();
              setName("")
            }
              // props.onCancel()
              // setInterviewer(null);
            }
            // {this.nameInput.value=""}
          >
            Cancel
          </Button>
          <Button
            onClick={() => {
              props.onSave(name, interviewer);
              setName("");
              setInterviewer(null)
            }}
            
          >
            Save
          </Button>
        </section>
      </section>
    </main>

  );
}