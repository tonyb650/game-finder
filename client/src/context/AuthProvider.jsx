import { useState} from "react";
import AuthContext from "./AuthContext";

/* 
The AuthProvider function takes the AuthContext that was created in another file 
And returns the 'wrapper' that will be added to 'main.jsx', making the data held 
in state below available to all components within the wrapper.
*/

const AuthProvider = (props) => {
  const [auth, setAuth] = useState({}); // This is where we could provide a default value for 'auth'

  return (
    <AuthContext.Provider value= {{ auth, setAuth}}>
      {props.children}
    </AuthContext.Provider>
  )
}

export default AuthProvider;