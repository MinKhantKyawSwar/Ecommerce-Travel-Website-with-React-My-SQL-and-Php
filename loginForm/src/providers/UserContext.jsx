import { createContext, useEffect, useState } from "react";

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [token, setToken] = useState(() => {
    const storedToken = localStorage.getItem("token");
    return storedToken ? JSON.parse(storedToken) : null;
  });
  const [destinationId, setDestinationId] = useState(null);

  const [userInfo, setUserInfo] = useState({});

  const updateToken = (JWTtoken) => {
    const token = JSON.stringify(JWTtoken);
    localStorage.setItem("token", token);
    setToken(JWTtoken);
  };

  const deleteToken = () => {
    setToken(null);
    localStorage.removeItem("token");
    setUserInfo(null)
  };

  useEffect((_) => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(JSON.parse(storedToken));
    }
  }, []);

  return (
    <UserContext.Provider value={{ token, updateToken, userInfo, setUserInfo, deleteToken, destinationId, setDestinationId }}>
      {children}
    </UserContext.Provider>
  );
};