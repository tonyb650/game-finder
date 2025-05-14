import { useEffect, useState} from "react";
import NotificationContext from "./NotificationContext";
import useAuth from "../hooks/useAuth";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

const NotificationProvider = (props) => {
  const [notifications, setNotifications] = useState([]); 
  const { auth } = useAuth();
  const axiosPrivate = useAxiosPrivate();
  
  /* I'm not sure if this is a good idea, but it seems to be working as I hoped.
    The Notifications are retrieved from the database when auth is changed (and 
    present). Auth should be change upon Login/Registration and upon PersistLogin.
  */
  useEffect(()=> {
    if (auth.user) {
      console.log("Attempting to reload Notifications in NotificationProvider.jsx useEffect()")
      console.log(`auth.user.id = ${auth.user._id}`)
      axiosPrivate
        .get(`/api/notifications/user/${auth.user._id}`)
        .then(notificationsResponse => {
          console.log(notificationsResponse.data)
          setNotifications(notificationsResponse.data)
        })
        .catch(err=>console.error(err))
    }
  },[auth])

  return (
    <NotificationContext.Provider value= {{ notifications, setNotifications}}>
      {props.children}
    </NotificationContext.Provider>
  )
}

export default NotificationProvider;