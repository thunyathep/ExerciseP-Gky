import { useState, useEffect, useRef } from "react";
import "./index.css";

// 🐨
// to optimize the API calls so that the fakeApi function is not called on every keystroke.
// Instead, implement a debounce mechanism to delay the API call until the user has stopped typing for a short period (e.g., 500ms).

function Exercise2() {
  const [query, setQuery] = useState("");
  const [apiLog, setApiLog] = useState([]);
  const [status, setStatus] = useState("");

  useEffect(() => {
    if (!query) return;
    const timer = setTimeout(() => {
      async function callApi() {
        setApiLog((prev) => [...prev, query]);
        setStatus("Saving...");

        const response = await fakeApi(query);

        setStatus("");
      }

      callApi();
    }, 500);

    return () => clearTimeout(timer);
  }, [query]);

  return (
    <div className="exercise2">
      <h1>Exercise 2: Implement Debounce for API Calls</h1>
      <form>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button
          type="button"
          onClick={() => {
            setApiLog([]);
            setQuery("");
          }}
        >
          Clear log
        </button>
        <p>Status: {status}</p>
      </form>
      <ul>
        {apiLog.map((log) => (
          <li key={log}>{log}</li>
        ))}
      </ul>
    </div>
  );
}

async function fakeApi(query) {
  console.log("api called");
  return new Promise((resolve) => setTimeout(() => resolve(query), 1000));
}

export default Exercise2;
