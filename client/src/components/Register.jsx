import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toISODateString from "../utils/toISOdateString";
import useAuth from "../hooks/useAuth";
import axios from "../api/axios";

const Register = () => {
  const {setAuth} = useAuth();
  const navigate = useNavigate();
  const [errors, setErrors] = useState([]);
  const defaultBirthday = toISODateString(new Date())
  const [user, setUser] = useState({
      firstName:'',
      lastName:'',
      email:'',
      birthday: defaultBirthday,
      password:'',
      confirmPassword:''
      // checkedMessagesDate: new Date()
  });

  const handleChange = (e) => {
      setUser({...user, [e.target.name]:e.target.value})
  }

  const handleRegister = (e) => {
    e.preventDefault();
      axios.post("/api/register", user, {withCredentials:true})
      .then((res) => {
        setAuth( {user: res.data.user, accessToken: res.data.accessToken}) 
        navigate("/");
      })
      .catch(err => {
        if (!err?.response) {
          setErrors({ server : {message: 'No server response'}})
        } else if ( err.response?.status === 401){
          setErrors({ server : {message: 'Unauthorized'}})
        } else {
        setErrors(err.response.data.errors)
        }
      })
  }

  return (
    <section className="min-h-screen bg-gray-900">
    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-white">
        </a>
    <div className="w-full  rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 bg-gray-800 border-gray-700">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
        <h1 className="text-xl font-bold leading-tight tracking-tight  md:text-2xl text-white">
            Register for your Pickup Sportz account
        </h1>
        <form className="space-y-4 md:space-y-6" onSubmit={handleRegister}>
            <div>
                <label htmlFor="firstName" className="block mb-2 text-sm font-medium text-white">First Name</label>
                <input  name="firstName" id="firstName" className=" sm:text-sm rounded-lg focus:ring-primary-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500" placeholder="John" required="" value={user.firstName} onChange={handleChange}/>
                {errors.firstName ? <p className="text-red-500">{errors.firstName.message}</p> : null}
            </div>
            <div>
                <label htmlFor="lastName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Last Name</label>
                <input  name="lastName" id="lastName" className="sm:text-sm rounded-lg focus:ring-primary-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500" placeholder="Doe" required="" value={user.lastName} onChange={handleChange}/>
                {errors.lastName ? <p className="text-red-500">{errors.lastName.message}</p> : null}
            </div>
            <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                <input type="email" name="email" id="email" className="sm:text-sm rounded-lg focus:ring-primary-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500" placeholder="name@email.com" required="" value={user.email} onChange={handleChange}/>
                {errors.email ? <p className="text-red-500">{errors.email.message}</p> : null}
            </div>
            <div>
                <label htmlFor="birthday" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your birthday</label>
                <input type="date" name="birthday" id="birthday" className="sm:text-sm rounded-lg focus:ring-primary-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500" placeholder="name@birthday.com" required="" value={user.birthday} onChange={handleChange}/>
                {errors.birthday ? <p className="text-red-500">{errors.birthday.message}</p> : null}
            </div>
            <div>
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                <input type="password" name="password" id="password" placeholder="••••••••" className="sm:text-sm rounded-lg focus:ring-primary-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500" required="" value={user.password} onChange={handleChange}/>
                {errors.password ? <p className="text-red-500">{errors.password.message}</p> : null}
            </div>
            <div>
                <label htmlFor="confirmPassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"> Confirm Password</label>
                <input type="password" name="confirmPassword" id="confirmPassword" placeholder="••••••••" className="sm:text-sm rounded-lg focus:ring-primary-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500" required="" value={user.confirmPassword} onChange={handleChange}/>
                {errors.confirmPassword ? <p className="text-red-500">{errors.confirmPassword.message}</p> : null}
            </div>
            {errors.server ? <p className="text-red-500">{errors.server.message}</p> : null}
            <button type="submit" className="w-full text-white focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-primary-600 hover:bg-primary-700 focus:ring-primary-800">Sign up!</button>
            <p className="text-sm font-light text-gray-400">
                Already have an account? <Link to="/login" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign in</Link>
            </p>
        </form>
    </div>
</div>
</div>
</section>
  )
}

export default Register