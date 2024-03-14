import {useContext}from "react";
import AuthContext from "../context/AuthContext";

/* 
This little custom hook simplifies the setup of AuthContext in components.

To use AuthContext now requires only 2 lines:
  import { useAuth } from 'hooks/useAuth';
          - and -  
  const { auth, setAuth } = useAuth();

This really only saves one line of code, but is a good example of a custom hook.
*/

const useAuth = () => {
  return useContext(AuthContext);
}

export default useAuth;