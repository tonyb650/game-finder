import axios from '../api/axios';
import useAuth from './useAuth'

/* useRefreshToken hook has the purpose of attempting to refreshing the access token
  when it expires. It is used by useAxiosPrivate (which handles every protected axios request)
  and PersistLogin.jsx (through which rendering of any protected components must pass).

  So, we get here either by an request to the back end returning an
  error (403/forbidden for example), or, when the user initiates any attempt to view a component
  that is wrapped in PersistAuth.jsx at a time when there is no 'user' object in 'auth' context.
*/
const useRefreshToken = () => {
  const { setAuth } = useAuth();

  const refresh = async () => {
    const response = await axios.get("/api/refresh", {withCredentials: true})
    console.log("Access token expired, refresh request sent.")
    setAuth(prev => {                                                                       // Here we are taking the existing/previous ('prev') contents of 'auth' and adding or replacing 
      return { ...prev, user: response.data.user, accessToken: response.data.accessToken}   // the 'accessToken' property and the 'user' property to 'auth'
    })
    return response.data;                                                                   // We return the response (including user and new access token) from useEffect...
  }
  return refresh;                                                                           // ...and then we return the response from the component
}
export default useRefreshToken;