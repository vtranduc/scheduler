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
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";

///////////////////////////////////////////////////////

export default function Appointment(props) {
  const modeTracker = useVisualMode(props.interview ? SHOW : EMPTY);
  const save = function(name, interviewer, time) {
    if (name === "" || !interviewer) {
      console.log("invalid input");
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
        console.log("GOOD STYFF");
        modeTracker.transition(SHOW);
      })
      .catch(err => {
        console.log("Failed to modify api: ", err);
        modeTracker.transition(ERROR_SAVE);
      });
  };

  const deleteInterview = function() {
    modeTracker.transition(DELETING);
    props
      .deleteInterview(props.id, props.time)
      .then(res => {
        modeTracker.transition(EMPTY);
      })
      .catch(err => {
        modeTracker.transition(ERROR_DELETE);
      });
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
            modeTracker.transition(CREATE);
          }}
          onDelete={() => {
            console.log("Delete this part");
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
            console.log("Current united state: ", props.state);
            modeTracker.back();
          }}
        />
      )}
      {modeTracker.mode === SAVING && <Status message={"SAVING"} />}
      {modeTracker.mode === DELETING && <Status message={"DELETING"} />}
      {modeTracker.mode === CONFIRM && (
        <Confirm
          onConfirm={() => {
            console.log("Confirm button has been clicked!");
            deleteInterview();
          }}
          onCancel={() => {
            console.log("CANCEL ANCHEN");
            modeTracker.transition(SHOW);
          }}
          message={"Are you sure you would like to delete?"}
        />
      )}
      {modeTracker.mode === ERROR_SAVE && (
        <Error
          message={"Could not save appointment"}
          onClose={() => {
            console.log("closing something");
            modeTracker.back();
          }}
        />
      )}
      {modeTracker.mode === ERROR_DELETE && (
        <Error
          message={"Could not cancel appointment."}
          onClose={() => {
            console.log("supposed to go back at Error_delete");
            modeTracker.back();
          }}
        />
      )}
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
