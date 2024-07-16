/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import { useState } from "react";

const API_KEY = React.createContext({
  apiKey: "No key provided yet",
  setApiKey: (key: string) => {},
});

function ContextProvider({ children }) {
  const [apiKey, setApiKey] = useState("No key provided yet");

  return (
    <API_KEY.Provider value={{ apiKey, setApiKey }}>
      {children}
    </API_KEY.Provider>
  );
}

export default ContextProvider;
