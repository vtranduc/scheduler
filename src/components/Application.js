import React, { useState } from "react";

import "components/Application.scss";
import DayList from "components/DayList";

import Appointment from "./Appointment/index";
import Axios from "axios";

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

  const [today, changeDay] = useState('Monday');

  const [days, setDays] = useState([]);


  const url = `http://localhost:3001/api/days`;
  Axios.get(url)
    .then((res) => {
      // console.log('Gonna go in', res)
      // console.log('Then do this', res.data)
      // console.log('finally', res.data[0])
      // console.log('arr', days)
      // const initial = [];
      // res.data.forEach((item) => {
      //   // console.log(item)
      
      // })
      setDays(res.data);
    })


  const scheduleList = appointments.map((appointment) => {
    return (
      <Appointment key={appointment.id} {...appointment} />
    );
  })

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
          days={days}
          day={today}
          setDay={day => {
            changeDay(day)}}
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

