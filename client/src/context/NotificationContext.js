import {createContext} from "react";

const Notification = createContext({ notifications : {}, setNotifications : (()=>{})});

export default Notification;