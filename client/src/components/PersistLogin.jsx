import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import useRefreshToken from '../hooks/useRefreshToken';
import useAuth from '../hooks/useAuth';


/* This component wraps around all the 'protected' components such that any desired rendering of a protected component
   will execute the logic in this component first. If the auth.user value from context is present, then 'isLoading'
   stays false, and all components just pass right through <Outlet/>.

   If, on the other hand, auth.user is not present, then we call the useRefreshToken hook in an attempt to set the user value in useAuth.
   If that throws an error, then we switch back to <Outlet/>. This will cause RequireAuth.jsx to be executed next and will redirect
   away from any protected components to 'login.' This is because RequireAuth.jsx is also checking if auth.user is present and since we
   failed to give a value here in PersistLogin, there will still be no value when we get to RequireAuth.
*/

const PersistLogin = () => {
  const [isLoading, setIsLoading] = useState(true);
  const refresh = useRefreshToken();
  const { auth } = useAuth();

  useEffect(() => {
    const verifyRefreshToken = async () => {
      try {
        await refresh();                              // call useRefreshToken hook to get new access token
      } catch (err) {
        console.error(err)
      } finally {
        setIsLoading(false)                           // This line is where the 'return' below switches back to <Outlet/> after refreshing access token
      }
    }
    /*  Explanation of what is going on in the line below.
        Upon browser refresh, or navigating away and coming back, 'auth' context will be emptied 
        So, when that happens, we run the verifyRefreshToken function that we define just above.
        Otherwise, we set 'isLoading' to false, meaning that any child components will pass through <Outlet/> 
    */
    !auth?.user ? verifyRefreshToken() : setIsLoading(false)
  }, [])

  return (
    <>
    {isLoading
      ? <h1  className="text-gray-400 bg-gray-700">Loading...</h1>
      : <Outlet/>
    }
    </>
  )
}

export default PersistLogin;