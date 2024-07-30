/* eslint-disable @typescript-eslint/no-unused-vars */
// import React from "react";
// import { useState } from "react";

import { createContext } from "react";

const APIContext = createContext({})


// function APIContextProvider({ children }) {
//   const [apiKey, setApiKey] = useState<string | null>(null);

//   return (
//     <API_KEY.Provider value={{ apiKey, setApiKey }}>
//       {children}
//     </API_KEY.Provider>
//   );
// }

export { APIContext };
// export { API_KEY, APIContextProvider };
