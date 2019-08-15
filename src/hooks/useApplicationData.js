import { useEffect, useReducer } from "react";
import Axios from "axios";

// The state object will maintain the same structure.
// The setDay action can be used to set the current day.
// The bookInterview action makes an HTTP request and updates the local state.
// The cancelInterview action makes an HTTP request and updates the local state.

const useApplicationData = function() {
  const connection = new WebSocket("ws://localhost:3001");

  connection.onmessage = () => {
    dispatch({ type: RELOAD_API });
  };

  /////////////////////////////////////////////////////////////////////
  const defaultState = {
    trigger: false,
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  };
  /////////////////////////////////////////////////////////////////////

  const SET_DAY = "SET_DAY";
  const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
  const SET_INTERVIEW = "SET_INTERVIEW";
  const RELOAD_API = "RELOAD_API";

  function reducer(state, action) {
    switch (action.type) {
      case SET_DAY:
        return { ...state, day: action.day };
      case SET_APPLICATION_DATA:
        return {
          ...state,
          trigger: false,
          appointments: action.appointments,
          interviewers: action.interviewers,
          days: action.days
        };
      case SET_INTERVIEW: {
        return {
          ...state,
          trigger: true,
          appointments: action.appointments
        };
      }
      case RELOAD_API: {
        return {
          ...state,
          trigger: true
        };
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
    ])
      .then(allRes => {
        dispatch({
          type: SET_APPLICATION_DATA,
          days: allRes[0].data,
          appointments: allRes[1].data,
          interviewers: allRes[2].data
        });
      })
      .then(() => {});
  }, [state.trigger]);

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
