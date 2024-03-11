import { createContext, useState, useContext, useEffect } from "react";



export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const storedId = localStorage.getItem('userId');
    if(storedId) {
        setIsLoggedIn(true);
    }
  }, []);

  const login = (id) => {
    // console.log("login id: ", userId);
    console.log("set is logged in");
    setIsLoggedIn(true);
    console.log(isLoggedIn);
    console.log("set local storage");
    localStorage.setItem('userId', `${id}`);
    // const result = localStorage.getItem('userId');
    // console.log('stored id: ', result);
  };

  const logout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('userId');
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn, 
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

