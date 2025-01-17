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
  //for saved package
  const [savedNoti, setSavedNoti] = useState(() => {
    const savedItemsCount = localStorage.getItem("savedNoti");
    return savedItemsCount ? savedItemsCount : 0;
  });

  //for favorite destination
  const [savedDestinationNoti, setSavedDestinationNoti] = useState(() => {
    const favoriteDestinationCount = localStorage.getItem("favoriteDestinationNoti");
    return favoriteDestinationCount ? favoriteDestinationCount : 0;
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
    localStorage.setItem("savedNoti", newCount);
  };

  const updateFavoriteDestinationNoti = (newCount) => {
    setSavedDestinationNoti(newCount);
    localStorage.setItem("favoriteDestinationNoti", newCount);
  };

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(JSON.parse(storedToken));
    }

    const savedItemsCount = localStorage.getItem("savedNoti");
    if (savedItemsCount) {
      setSavedNoti(savedItemsCount); // Initialize saved items count
    }

    const favoriteDestinationCount = localStorage.getItem("favoriteDestinationNoti");
    if (favoriteDestinationCount) {
      setSavedDestinationNoti(favoriteDestinationCount); // Initialize favorite items count
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
        savedDestinationNoti,
        updateFavoriteDestinationNoti,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
