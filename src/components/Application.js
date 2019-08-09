import React, { useState, useEffect } from "react";

import "components/Application.scss";
import DayList from "components/DayList";

import Appointment from "./Appointment/index";
import Axios from "axios";

const {getAppointmentsForDay, getInterview} = require('../helpers/selectors')

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

const appointments = [
  {
    id: 1,
    time: "12pm",
  },
  {
    id: 2,
    time: "1pm",
    interview: {
      student: "Lydia Miller-Jones",
      interviewer: {
        id: 1,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },
  {
    id: 3,
    time: "3pm",
  },
  {
    id: 4,
    time: "4pm",
  },
  {
    id: 5,
    time: "5pm",
  },
];

export default function Application(props) {

  // const [today, changeDay] = useState('Monday');

  // const [days, setDays] = useState([]);

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDays = function(data) {
    setState({ ...state, days: data})
  }
  const setAppointments = function(data) {
    setState({ ...state, appointments: data})
  }
  const setInterviewers = function(data) {
    setState({ ...state, interviewers: data})
  }

  // const url = `http://localhost:3001/api/days`;
  // Axios.get(url)
  //   .then((res) => {
  //     // console.log('Gonna go in', res)
  //     // console.log('Then do this', res.data)
  //     // console.log('finally', res.data[0])
  //     // console.log('arr', days)
  //     // const initial = [];
  //     // res.data.forEach((item) => {
  //     //   // console.log(item)
      
  //     // })
  //     setDays(res.data);
  //   })

  /////////////////////////////////////////////////////////////////////////////

  const urlDays = `http://localhost:3001/api/days`;
  const urlAppointments = `http://localhost:3001/api/appointments`;
  const urlInterviewers = `http://localhost:3001/api/interviewers`;
  
  // useEffect(() => {
  //   Promise.all([
  //     Axios.get(urlDays),
  //     Axios.get(urlAppointments),
  //     Axios.get(urlInterviewers)
  //   ]).then((allRes) => {
  //     console.log('Successfully loaded all API')

  //     console.log(allRes)
  //     console.log(allRes[0])
  //     console.log(allRes[0].data)
  //     console.log(allRes[0].data[0])

  //     const combinedAPI = {
  //       day: state.day,
  //       days: allRes[0].data,
  //       appointments: allRes[1].data,
  //       interviewers: allRes[2].data
  //     }

  //     // const appointments = getAppointmentsForDay(state, state.day);

  //     setState(combinedAPI);

  //   })
  // });

  // let something

  useEffect(() => {
    
    Promise.all([
      Axios.get(urlDays),
      Axios.get(urlAppointments),
      Axios.get(urlInterviewers)
    ]).then((allRes) => {


      console.log('Successfully loaded all API')

      console.log(allRes)
      console.log(allRes[0])
      console.log(allRes[0].data)
      console.log(allRes[0].data[0])

      const combinedAPI = {
        day: state.day,
        days: allRes[0].data,
        appointments: allRes[1].data,
        interviewers: allRes[2].data
      }
      // const appointments = getAppointmentsForDay(state, state.day);

      setState(combinedAPI)

      return;

      const appointments = getAppointmentsForDay(combinedAPI, state.day);
      const scheduleList = appointments.map((appointment) => {
        const interview = getInterview(combinedAPI, appointment.interview);

        // console.log('sekando')
        // console.log(appointment.interview)
        // console.log(interview)

        console.log('OH MY GOD')
        console.log(appointment)
        console.log(appointment)

        return (
          <Appointment
            key={appointment.id}
            id={appointment.id}
            time={appointment.time}
            interview={interview}
          />
        );
        
      });

      // return <div>JayJay is sick</div>

    // console.log('suuuuuuuuuuuuuuuup');
    // console.log(appointments)

    // setState(combinedAPI)

    })
  }, [])

  const appointments = getAppointmentsForDay(state, state.day);
  const scheduleList = appointments.map((appointment) => {
    const interview = getInterview(state, appointment.interview);


      return (
        <Appointment
          key={appointment.id}
          id={appointment.id}
          time={appointment.time}
          interview={interview}
        />
      );      
  });


  // return <div>{scheduleList}</div>




  //////////////////////////////////////////////////////////////////////////////


  // const scheduleList = appointments.map((appointment) => {
  //   return (
  //     <Appointment key={appointment.id} {...appointment} />
  //   );
  // })

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
            console.log('day is changing?', day)
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

