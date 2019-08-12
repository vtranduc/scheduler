import { useState } from "react";

function useVisualMode(val) {
  const [mode, setMode] = useState(val);
  const [history, setHistory] = useState([]);
  return {
    mode: mode,
    transition: (newVal, replace) => {
      setMode(newVal);
      if (replace) {
        setHistory([history[history.length - 1]]);
      } else {
        setHistory([mode, ...history]);
      }
    },
    back: () => {
      if (history.length === 0) {
        return;
      }
      const [popped, ...newHistory] = history;
      setHistory(newHistory);
      setMode(popped);
    }
  };
}

export default useVisualMode;
