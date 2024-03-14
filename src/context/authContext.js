import { createContext, useState, useContext, useEffect } from "react";




export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const storedId = localStorage.getItem('userId');
    if(storedId === userId) {
        localStorage.setItem('isLoggedIn', true);
    }
  }, [userId]);


  const login = (id) => {
    // console.log("login id: ", userId);
    // console.log("set is logged in");
    localStorage.setItem('isLoggedIn', true);
    setIsLoggedIn(true);
    // console.log("set local storage");
    localStorage.setItem('userId', `${id}`);
    // console.log(localStorage.getItem('userId'));
    setUserId(id);
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUserId(null);
    localStorage.removeItem('userId');
    localStorage.setItem('isLoggedIn', false);
  };


  return (
    <AuthContext.Provider
      value={{
        isLoggedIn, 
        login,
        logout,
        userId
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

