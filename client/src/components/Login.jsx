import { useContext, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from '../api/axios';
import useAuth from '../hooks/useAuth';
// import Notification from '../context/NotificationContext';
// import useAxiosPrivate from '../hooks/useAxiosPrivate';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/"; // So here we are defining where we will 'navigate to' after a successful login. If the user was redirected here from 'RequireAuth' there should be a path saved in state that we can use. Otherwise, we navigate to '/' (which is the dashboard)
  const [errorMessage, setErrorMessage] = useState("");
  const [email,setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { auth, setAuth } = useAuth();

  const handleLogin = async (e) =>  {
    e.preventDefault();
    try {
      const loginResponse = await axios.post("/api/login", { email, password} , { withCredentials : true })  //  withCredentials is needed here. I think because we are getting a cookie returned from the back end
      console.log(loginResponse)
      setAuth( {user: loginResponse.data.user, accessToken: loginResponse.data.accessToken}) 
      navigate(from, { replace: true }); // The idea here is that save the location that was requested but cut off by the RequireAuth.jsx page before user was redirected to Login
    } catch (err) {
      console.error(err)
      if (!err?.response) {
        setErrorMessage('No Server Response')
      } else if ( err.response?.status === 401){
        setErrorMessage('Unauthorized')
      } else {
        setErrorMessage(err.response.data.message)
      }
    }
}

  return (
    <section className="bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <div className="w-full bg-gray-800 rounded-lg shadow  md:mt-0 sm:max-w-md xl:p-0">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 className="text-xl font-bold leading-tight tracking-tight text-white md:text-2xl">
                    Sign in to your Pickup Sportz account
                </h1>
                <form className="space-y-4 md:space-y-6" onSubmit={handleLogin}>
                    <div>
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-white ">Your email</label>
                        <input type="email" name="email" id="email" className=" border   sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500" placeholder="name@email.com" required="" value={email} onChange={(e) => setEmail(e.target.value)}/>
                    </div>
                    <div>
                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-white" >Password</label>
                        <input type="password" name="password" id="password" placeholder="••••••••" className=" border sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500" required="" value={password} onChange={(e) => setPassword(e.target.value)}/>
                    </div>
                    {errorMessage ? <p className='text-red-500'>{errorMessage}</p> : null}
                    <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center hover:bg-primary-700 focus:ring-primary-800">Sign in</button>
                    <p className="text-sm font-light text-gray-400">
                        Don’t have an account yet? <Link to="/register" className="font-medium text-primary-500 hover:underline ">Sign up</Link>
                    </p>
                </form>
            </div>
    </div>
</div>
</section>
  )
}

export default Login