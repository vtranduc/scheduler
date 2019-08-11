import React, { useState, useEffect } from "react";
import "components/Appointment/styles.scss";
import Header from "components/Appointment/header";
import Empty from "components/Appointment/Empty";
import Show from "components/Appointment/Show";
import Confirm from "components/Appointment/Confirm";
import Status from "components/Appointment/Status";
import Error from "components/Appointment/Error";
import Form from "components/Appointment/Form";
import useVisualMode from "../../hooks/useVisualMode";
// const {
//   getAppointmentsForDay,
//   getInterview,
//   getInterviewersForDay
// } = require("../../helpers/selectors");

// const interviewers = [
//   { id: 1, name: "Sylvia Palmer", avatar: "https://i.imgur.com/LpaY82x.png" },
//   { id: 2, name: "Tori Malcolm", avatar: "https://i.imgur.com/Nmx0Qxo.png" },
//   { id: 3, name: "Mildred Nazir", avatar: "https://i.imgur.com/T2WwVfS.png" },
//   { id: 4, name: "Cohana Roy", avatar: "https://i.imgur.com/FK8V841.jpg" },
//   { id: 5, name: "Sven Jones", avatar: "https://i.imgur.com/twYrpay.jpg" }
// ];

//////////////////////////////////////////////////////

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";

///////////////////////////////////////////////////////

export default function Appointment(props) {
  const modeTracker = useVisualMode(props.interview ? SHOW : EMPTY);

  const save = function(bookInterview, name, interviewer, time) {
    if (name === "" || !interviewer) {
      console.log("INVALID INPUT", name, interviewer);
      return;
    }
    console.log("ALADEEN");
    const interview = { student: name, interviewer: interviewer };
    console.log("new id is ", props.getNextId());

    let nextId = props.getNextId();

    const interviewInfo = {
      id: props.id, //FIIIIIIIIIIIIIIXXXXXX
      time: time,
      interview: interview
    };

    // console.log(interviewInfo);
    // console.log(interviewInfo.interview);
    // useEffect(() => {
    //   bookInterview(props.getNextId(), interviewInfo);
    //   modeTracker.transition(EMPTY);
    // });

    bookInterview(props.id, interviewInfo)
      .then(() => {
        console.log("GOOD STYFF");
      })
      .catch(err => {
        console.log("FAILED HERE");
      });

    console.log("WHAT HAPPENED????");

    modeTracker.transition(SAVING);

    setTimeout(() => {
      console.log("ONIZUKA", props.state);
      console.log("I actually have an id???", props.id);

      modeTracker.transition(SHOW);
    }, 3000);

    // return;
  };

  return (
    <div>
      <Header time={props.time} />
      {modeTracker.mode === EMPTY && (
        <Empty
          time={props.time}
          onAdd={() => {
            modeTracker.transition("CREATE");
            console.log("direct user to add something here");
          }}
        />
      )}
      {modeTracker.mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onEdit={() => {
            console.log("Edit something here");
          }}
          onDelete={() => {
            console.log("Delete this part");
          }}
        />
      )}
      {modeTracker.mode === CREATE && (
        <Form
          name={""}
          interviewers={props.interviewers}
          interviewer={null}
          onSave={(name, interviewer) => {
            console.log("saving");
            console.log(name);
            console.log(interviewer);
            console.log(props.time);

            // save = function(bookInterview, name, interviewer, time
            console.log("ENTERING SAVE FUNCTION");
            save(props.bookInterview, name, interviewer, props.time);
          }}
          onCancel={() => {
            // console.log("cancel");
            modeTracker.back();
          }}
          // modeTracker={modeTracker}
        />
      )}
      {modeTracker.mode === SAVING && <Status message={"SAVING"} />}
    </div>
  );

  // useEffect(() => {

  //   switch(modeTracker.mode) {
  //     case SHOW:
  //       console.log('akatsuki');
  //     case EMPTY:
  //         return (
  //                 <Empty
  //                   time={props.time}
  //                   onAdd={() => {
  //                     console.log('direct user to add something here')
  //                   }}
  //                 />
  //               )

  //   }

  //   // if (props.interview) {
  //   //   something = useVisualMode(SHOW);
  //   // }

  //   // switch(something.mode) {
  //   //   case SHOW:
  //   //     return <div>Rin chan</div>;
  //   //   case EMPTY:
  //   //     return (
  //   //       <Empty
  //   //         time={props.time}
  //   //         onAdd={() => {
  //   //           console.log('direct user to add something here')
  //   //         }}
  //   //       />
  //   //     )
  //   // }
  // }, [])

  return <div>Rin chan brainstorm</div>;
  //-------------------
  // return (
  //   <Header
  //     time={props.time}
  //   />
  // );
  // ----------------
  // return (
  //   <Empty
  //     time={props.time}
  //     onAdd={() => {
  //       console.log('direct user to add something here')
  //     }}
  //   />
  // );
  //----------------------
  // return (
  //   <Show
  //     student={"Lydia Miller-Jones"}
  //     interviewer={{ id: 1, name: "Sylvia Palmer", avatar: "https://i.imgur.com/LpaY82x.png" }}
  //     onEdit={() => {
  //       console.log('Edit something here');
  //     }}
  //     onDelete={() => {
  //       console.log('Delete this part')
  //     }}
  //   />
  // );
  //----------------------
  // return (
  //   <Confirm
  //     message={'Ask whether the canceler is sure about canceling'}
  //     onConfirm={() => {
  //       console.log("confirm here");
  //     }}
  //     onCancel={() => {
  //       console.log('Canceling event')
  //     }}
  //   />
  // );
  //----------------------
  // return (
  //   <Status
  //     message={"Deleting message HERE"}
  //   />
  // );
  //----------------------
  // return (
  //   <Error
  //     message={"Reol deletes appointment"}
  //     onClose={() => {
  //       console.log('closing something')
  //     }}
  //   />
  // );
  //----------------------
  // return (
  //   <Form
  //     // interviewers={interviewers}
  //     // interviewer={0}
  //     // name="Angelina Jolie"
  //     // setName={() => {
  //     //   console.log('setting name')
  //     // }}
  //     // setInterviewer={() => {
  //     //   console.log('settingInterviewer')
  //     // }}

  //     name={"Angel"}
  //     interviewers={interviewers}
  //     interviewer={5}
  //     onSave={(name, interviewer) => {
  //       console.log('saving')
  //       console.log(name)
  //       console.log(interviewer)
  //     }}
  //     onCancel={() => {
  //       console.log('cancel')
  //     }}
  //   />
  // );
  //----------------------

  // return (
  //   <>
  //     <Header
  //       time={props.time}
  //     />
  //     {props.interview ?
  //       <Show
  //         student={props.interview.student}
  //         interviewer={props.interview.interviewer}
  //         onEdit={() => {
  //           console.log('Edit something here');
  //         }}
  //         onDelete={() => {
  //           console.log('Delete this part')
  //         }}
  //       />
  //       :
  //       <Empty
  //         onAdd={() => {
  //           console.log('direct user to add something here')
  //         }}
  //       />

  //       // <Empty
  //       //   onAdd={() => {
  //       //           console.log('direct user to add something here')
  //       //         }
  //       // />

  //       // <Show
  //       //   student={props.interview.student}
  //       //   interviewer={props.interview.interviewer}
  //       //   onEdit={() => {
  //       //     console.log('Edit something here');
  //       //   }}
  //       //   onDelete={() => {
  //       //     console.log('Delete this part')
  //       //   }}
  //       // />
  //     }
  //   </>
  // );
  //----------------------
}
