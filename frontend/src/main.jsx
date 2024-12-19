import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

// import { Provider } from "react-redux";
// import store from "./store/store.js";
// import { PersistGate } from "redux-persist/integration/react";
// import { persistStore } from "redux-persist";
import { UserContextProvider } from "./providers/UserContext.jsx";

// const persistor = persistStore(store);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <UserContextProvider>
      <App />
    </UserContextProvider>
  </StrictMode>
);
