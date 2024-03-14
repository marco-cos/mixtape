import { createContext, useState, useContext, useEffect } from "react";




export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true'; // Ensure comparison to string 'true'
    setIsLoggedIn(loggedIn);
  }, []);
  
  const login = (id) => {
    localStorage.setItem('isLoggedIn', true);
    setIsLoggedIn(true);
    localStorage.setItem('userId', `${id}`);
    setUserId(id);
  };
  
  const logout = () => {
    localStorage.removeItem('userId');
    localStorage.setItem('isLoggedIn', false);
    setIsLoggedIn(false);
    setUserId(null);
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

