import { createContext, useState, useContext, useEffect } from "react";




export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const storedId = localStorage.getItem('userId');
    if(storedId === userId) {
        setIsLoggedIn(true);
    }
  }, [userId]);

  const login = (id) => {
    console.log("login id: ", userId);
    console.log("set is logged in");
    setIsLoggedIn(true);
    // console.log(isLoggedIn);
    console.log("set local storage");
    localStorage.setItem('userId', `${id}`);
    console.log(localStorage.getItem('userId'));
    setUserId(id);
    // const result = localStorage.getItem('userId');
    // console.log('stored id: ', result);
  };

  const logout = () => {
    setIsLoggedIn(false);
    // console.log("setting isLoggedIn:", isLoggedIn);
    setUserId(null);
    localStorage.removeItem('userId');
    // sessionStorage.removeItem('userId');
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

