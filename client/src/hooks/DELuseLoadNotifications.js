import { useEffect } from "react";
import useAuth from "./useAuth";
import useAxiosPrivate from "./useAxiosPrivate";


const useLoadNotifications = () => {
  const { auth } = useAuth();
  const axiosPrivate = useAxiosPrivate();

  useEffect(()=> {
    axiosPrivate.get(`/api/notifications/user/${loginResponse.data.user._id}`) // TODO switch back to axiosPrivate (will need to await setAuth first)
    .then(notificationsResponse => {
      // console.log("notificationsResponse")
      // console.log(notificationsResponse)
      setNotifications(notificationsResponse.data)
      navigate(from, { replace: true }); // The idea here is that are we go to the location requested but cut off by the RequireAuth.jsx page before user was redirected to Login
    })
    .catch()
  },[ auth ])

  return axiosPrivate;
}

export default useLoadNotifications;
