import {createContext} from "react";

const AuthContext = createContext({ user : {}, setUser : (()=>{})});    // Here we define AuthContext and create a 'template' of sorts for the getter and setter

export default AuthContext;