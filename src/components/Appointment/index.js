import React, {useState} from "react";
import "components/Appointment/styles.scss";
import Header from "components/Appointment/header";
import Empty from "components/Appointment/Empty";
import Show from "components/Appointment/Show";
import Confirm from "components/Appointment/Confirm";
import Status from "components/Appointment/Status";
import Error from "components/Appointment/Error";
import Form from "components/Appointment/Form";

const interviewers = [
  { id: 1, name: "Sylvia Palmer", avatar: "https://i.imgur.com/LpaY82x.png" },
  { id: 2, name: "Tori Malcolm", avatar: "https://i.imgur.com/Nmx0Qxo.png" },
  { id: 3, name: "Mildred Nazir", avatar: "https://i.imgur.com/T2WwVfS.png" },
  { id: 4, name: "Cohana Roy", avatar: "https://i.imgur.com/FK8V841.jpg" },
  { id: 5, name: "Sven Jones", avatar: "https://i.imgur.com/twYrpay.jpg" }
];



export default function Appointment(props) {


  

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
  
  return (
    <>
      <Header
        time={props.time}
      />
      {props.interview ?
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onEdit={() => {
            console.log('Edit something here');
          }}
          onDelete={() => {
            console.log('Delete this part')
          }}
        />
        :
        <Empty
          onAdd={() => {
            console.log('direct user to add something here')
          }}
        />

        // <Empty
        //   onAdd={() => {
        //           console.log('direct user to add something here')
        //         }
        // />
          
        

        // <Show
        //   student={props.interview.student}
        //   interviewer={props.interview.interviewer}
        //   onEdit={() => {
        //     console.log('Edit something here');
        //   }}
        //   onDelete={() => {
        //     console.log('Delete this part')
        //   }}
        // />
      }
    </>
  );
  //----------------------
}