import { useEffect, useReducer } from "react";
import Axios from "axios";

// The state object will maintain the same structure.
// The setDay action can be used to set the current day.
// The bookInterview action makes an HTTP request and updates the local state.
// The cancelInterview action makes an HTTP request and updates the local state.

const useApplicationData = function() {
  /////////////////////////////////////////////////////////////////////
  const defaultState = {
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  };
  /////////////////////////////////////////////////////////////////////

  const SET_DAY = "SET_DAY";
  const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
  const SET_INTERVIEW = "SET_INTERVIEW";
  const SET_SPOTS = "SET_SPOTS";

  function reducer(state, action) {
    switch (action.type) {
      case SET_DAY:
        return { ...state, day: action.day };
      case SET_APPLICATION_DATA:
        return {
          ...state,
          appointments: action.appointments,
          interviewers: action.interviewers,
          days: action.days
        };
      case SET_INTERVIEW: {
        return {
          ...state,
          appointments: action.appointments
        };
      }
      case SET_SPOTS: {
        console.log("Setting spots");
        console.log(action.remainingSpots);
        return { ...state };
      }
      default:
        throw new Error(
          `Tried to reduce with unsupported action type: ${action.type}`
        );
    }
  }

  const [state, dispatch] = useReducer(reducer, defaultState);

  /////////////////////////////////////////////////////////////////////

  useEffect(() => {
    Promise.all([
      Axios.get(`http://localhost:3001/api/days`),
      Axios.get(`http://localhost:3001/api/appointments`),
      Axios.get(`http://localhost:3001/api/interviewers`)
    ]).then(allRes => {
      dispatch({
        type: SET_APPLICATION_DATA,
        days: allRes[0].data,
        appointments: allRes[1].data,
        interviewers: allRes[2].data
      });
    });
  }, [state]);

  ////////////////////////////////////////////////////////////////////
  const bookInterview = function(id, interview) {
    const appointments = { ...state.appointments, [id]: interview };

    return Axios.put(`http://localhost:3001/api/appointments/${id}`, interview)
      .then(res => {
        dispatch({ type: SET_INTERVIEW, appointments: appointments });
        return res;
      })
      .then(res => {
        return res;
      });
  };

  ////////////////////////////////////////////////////////////////////
  const cancelInterview = function(id, time) {
    const emptyAppointment = {
      id: id,
      time: time,
      interview: null
    };
    return Axios.delete(`http://localhost:3001/api/appointments/${id}`)
      .then(res => {
        dispatch({
          type: SET_INTERVIEW,
          appointments: { ...state.appointments, [id]: emptyAppointment }
        });
        return res;
      })
      .then(res => {
        return res;
      });
  };

  ////////////////////////////////////////////////////////////////////

  const setDay = function(day) {
    dispatch({ type: SET_DAY, day: day });
  };
  ////////////////////////////////////////////////////////////////////

  ////////////////////////////////////////////////////////////////////

  return { state, setDay, bookInterview, cancelInterview };
};

export default useApplicationData;
