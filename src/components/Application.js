import React, { useState, useEffect, useImperativeHandle } from "react";

import "components/Application.scss";
import DayList from "components/DayList";

import Appointment from "./Appointment/index";
import Axios from "axios";

const {
  getAppointmentsForDay,
  getInterview,
  getInterviewersForDay
} = require("../helpers/selectors");

// const days = [
//   {
//     id: 1,
//     name: "Monday",
//     spots: 2,
//   },
//   {
//     id: 2,
//     name: "Tuesday",
//     spots: 5,
//   },
//   {
//     id: 3,
//     name: "Wednesday",
//     spots: 0,
//   },
// ];

// const appointments = [
//   {
//     id: 1,
//     time: "12pm"
//   },
//   {
//     id: 2,
//     time: "1pm",
//     interview: {
//       student: "Lydia Miller-Jones",
//       interviewer: {
//         id: 1,
//         name: "Sylvia Palmer",
//         avatar: "https://i.imgur.com/LpaY82x.png"
//       }
//     }
//   },
//   {
//     id: 3,
//     time: "3pm"
//   },
//   {
//     id: 4,
//     time: "4pm"
//   },
//   {
//     id: 5,
//     time: "5pm"
//   }
// ];

/////////////////////////////////////////////

// function bookInterview(id, interview) {
//   console.log(id, interview);
// }

////////////////////////////////////////////////

export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  ////////////////////////////////////

  const bookInterview = function(id, interview) {
    const appointments = { ...state.appointments, [id]: interview };

    return Axios.put(`http://localhost:3001/api/appointments/${id}`, interview)
      .then(res => {
        setState({ ...state, appointments: appointments });
        return res;
      })
      .then(res => {
        return res;
      });
  };

  const deleteInterview = function(id, time) {
    const emptyAppointment = {
      id: id,
      time: time,
      interview: null
    };

    // Axios.delete(`http://localhost:3001/api/appointments/${id}`)

    return Axios.delete(`http://localhost:3001/api/appointments/${id}`)
      .then(res => {
        setState({
          ...state,
          appointments: { ...state.appointments, [id]: emptyAppointment }
        });
        return res;
      })
      .then(res => {
        console.log("THIS ONE SHOULD BE UPDATED", state);
        return res;
      });
  };

  /////////////////////////////////////////

  const urlDays = `http://localhost:3001/api/days`;
  const urlAppointments = `http://localhost:3001/api/appointments`;
  const urlInterviewers = `http://localhost:3001/api/interviewers`;

  useEffect(() => {
    Promise.all([
      Axios.get(urlDays),
      Axios.get(urlAppointments),
      Axios.get(urlInterviewers)
    ]).then(allRes => {
      const combinedAPI = {
        day: state.day,
        days: allRes[0].data,
        appointments: allRes[1].data,
        interviewers: allRes[2].data
      };
      setState(combinedAPI);
    });
  }, []);

  const appointments = getAppointmentsForDay(state, state.day);
  const scheduleList = appointments.map(appointment => {
    const interview = getInterview(state, appointment.interview);
    const interviewers = getInterviewersForDay(state, state.day);

    return (
      <Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={interview}
        // state={state}
        interviewers={interviewers}
        bookInterview={bookInterview}
        deleteInterview={deleteInterview}
        state={state}
        // getNextId={() => {
        //   console.log("heelo");
        //   let id = 1;
        //   while (Object.keys(state.appointments).includes(String(id))) {
        //     id++;
        //   }
        //   return id;
        // }}
      />
    );
  });

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <DayList
          days={state.days}
          day={state.day}
          setDay={day => {
            setState({ ...state, day: day });
          }}
        />
        <nav className="sidebar__menu" />
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        <div>{scheduleList}</div>
      </section>
    </main>
  );
}
