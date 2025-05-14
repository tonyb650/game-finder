import { Navigate, Outlet, useLocation } from "react-router-dom"
import useAuth from "../hooks/useAuth"

/* 
This wraps around all the protected routes in App.jsx and this is the key
file that redirects unauthorized requests back to the login page. 

It does this by checking if there is any user stored in 'auth' (AuthContext)
via the getter in useAuth hook. If there is a user, the requested component is passed
through in place of <Outlet/>.

If there is NO user, then the user is redirected to /login. The requested path
before redirection is saved in state with useLocation hook.
*/

function RequireAuth() {
  const { auth } = useAuth();
  const { location } = useLocation();
  console.log("render RequireAuth")
  console.log(auth)

  return (
    auth?.user
      ? <Outlet />
      : <Navigate to="/login" state={{ from: location }} replace />
    );
}

export default RequireAuth;