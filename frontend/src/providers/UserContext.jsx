import { createContext, useEffect, useState } from "react";

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [token, setToken] = useState(() => {
    const storedToken = localStorage.getItem("token");
    return storedToken ? JSON.parse(storedToken) : null;
  });
  const [destinationId, setDestinationId] = useState(null);
  const [userInfo, setUserInfo] = useState({});
  const [isEmail, setIsEmail] = useState("");
  const [savedNoti, setSavedNoti] = useState(() => {
    const savedItemsCount = localStorage.getItem("savedNoti");
    return savedItemsCount ? JSON.parse(savedItemsCount) : 0;
  });

  const updateToken = (JWTtoken) => {
    const token = JSON.stringify(JWTtoken);
    localStorage.setItem("token", token);
    setToken(JWTtoken);
  };

  const deleteToken = () => {
    setToken(null);
    localStorage.removeItem("token");
    setUserInfo(null);
  };

  const updateSavedNoti = (newCount) => {
    setSavedNoti(newCount);
    localStorage.setItem("savedNoti", JSON.stringify(newCount));
  };

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(JSON.parse(storedToken));
    }

    const savedItemsCount = localStorage.getItem("savedNoti");
    if (savedItemsCount) {
      setSavedNoti(JSON.parse(savedItemsCount)); // Initialize saved items count
    }
  }, []);

  return (
    <UserContext.Provider
      value={{
        token,
        updateToken,
        userInfo,
        setUserInfo,
        deleteToken,
        destinationId,
        setDestinationId,
        isEmail,
        setIsEmail,
        savedNoti, // Exposing savedNoti
        updateSavedNoti, // Exposing function to update savedNoti
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
