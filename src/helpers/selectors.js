function getAppointmentsForDay(state, day) {
  let dayData = null;
  for (let e of state.days) {
    if (e.name === day) {
      dayData = e;
      break;
    }
  }
  if (!dayData) {
    return [];
  }
  let output = [];
  for (let appointment of dayData.appointments) {
    output.push(state.appointments[String(appointment)]);
  }
  return output;
}

function getInterview(state, interview) {
  if (!interview) {
    return null;
  }
  return {
    student: interview.student,
    interviewer: state.interviewers[String(interview.interviewer)]
  };
}

////////////////////////////////////////////////////////////

function getInterviewersForDay(state, day) {
  const dayData = state.days.find(e => e.name === day);
  if (!dayData) {
    return [];
  }
  let output = [];
  for (let appointment of dayData.interviewers) {
    output.push(state.interviewers[String(appointment)]);
  }
  return output;
}

module.exports = { getAppointmentsForDay, getInterview, getInterviewersForDay };

//`````````````````````````````````````````````````````````

// const state = {
//   days: [
//     {
//       id: 1,
//       name: "Monday",
//       appointments: [1, 2, 3],
//       interviewers: [1, 3],
//       spots: 1
//     },
//     {
//       id: 2,
//       name: "Tuesday",
//       appointments: [4, 5],
//       interviewers: [2, 3],
//       spots: 4
//     }
//   ],
//   appointments: {
//     "1": { id: 1, time: "12pm", interview: null },
//     "2": { id: 2, time: "1pm", interview: null },
//     "3": {
//       id: 3,
//       time: "2pm",
//       interview: { student: "Archie Cohen", interviewer: 2 }
//     },
//     "4": { id: 4, time: "3pm", interview: null },
//     "5": {
//       id: 5,
//       time: "4pm",
//       interview: { student: "Chad Takahashi", interviewer: 2 }
//     }
//   },
//   interviewers: {
//     1: {
//       id: 1,
//       name: "Sylvia Palmer",
//       avatar: "https://i.imgur.com/LpaY82x.png"
//     },
//     2: {
//       id: 2,
//       name: "Tori Malcolm",
//       avatar: "https://i.imgur.com/Nmx0Qxo.png"
//     },
//     3: {
//       id: 3,
//       name: "Mildred Nazir",
//       avatar: "https://i.imgur.com/T2WwVfS.png"
//     }
//   }
// };

// console.log("maki chan");

// console.log(getInterviewersForDay(state, "Tuesday"));

// const original = { one: 1 };
// const bad = original;
// const good = { ...original };

// console.log(original === original); // true
// console.log(original === bad); // true
// console.log(original === good); // false

// console.log(original);
// console.log(bad);
// console.log(good);

// console.log("adding change");

// good.one = 2;

// const aaa = { ...original, one: 2, two: 2, three: 3 };

// console.log(original);
// console.log(bad);
// console.log(good);
// console.log(aaa);
