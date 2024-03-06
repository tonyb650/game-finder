import { useState, useEffect, useContext } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Navbar from "./Navbar";
import MessageDisplay from "./MessageDisplay";
import MessageForm from "./MessageForm";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import Weather from "./Weather";
import axios from 'axios'; // vanilla axios here for weather API
import useAuth from "../hooks/useAuth";
import Notification from "../context/NotificationContext";
import Participants from "./Participants";

const ViewEvent = () => {
  const { id } = useParams();
  const axiosPrivate = useAxiosPrivate();
  const pathLocation = useLocation();
  const navigate = useNavigate();
  const [event, setEvent] = useState({});
  const [messages, setMessages] = useState([]);
  const [weatherData, setWeatherData] = useState([]);
  const { auth } = useAuth();
  const { notifications, setNotifications } = useContext(Notification);
  const units = "imperial"; // for weather API call
  
  useEffect(() => {
    // Making 3 nested axios requests here. First from our backend, to get the target event,
    // Then to OpenWeather's geocoding API, where you give a city, state and country code and it returns longitude and latitude
    // Then finally to OpenWeather's "One Call API 3.0" which gives 8 days forecast.
    // OpenWeather gives 1000 calls for free every day.

    // TODO clean this up in an async function
    // For some reason, the following block is executed twice upon component load, I'm thinking maybe it is because state is changed when when we load messages below. I'll look into this more later...
    axiosPrivate
      .get(`/api/events/${id}`)
      .then((resEvent) => {
        setEvent({ ...resEvent.data });
        // API CALLS IN HERE FOR LOCATION & WEATHER
          axios
            .get(`http://api.openweathermap.org/geo/1.0/direct?q=${resEvent.data.location.city},${resEvent.data.location.state},us&limit=1&appid=${import.meta.env.VITE_REACT_APP_API_KEY}`)
            .then((resMap) => {
              // console.log(resMap)
              axios
                .get(`https://api.openweathermap.org/data/3.0/onecall?lat=${resMap.data[0].lat}&lon=${resMap.data[0].lon}&units=${units}&appid=${import.meta.env.VITE_REACT_APP_API_KEY}`)
                .then((resWeather) => {
                  // console.log(resWeather);
                  setWeatherData(resWeather.data.daily);
                })
                .catch((err) => console.error(err)); // I'm not sure if these nested .catch functions will work as expected ... I'd like to test that out to see...
            })
            .catch((err) => {console.error(err)}); // I'm not sure if these nested .catch functions will work as expected ... I'd like to test that out to see...
      })
      .catch((err) => console.error(err)); // I'm not sure if these nested .catch functions will work as expected ... I'd like to test that out to see...

    // get messages for this event and set in state
    axiosPrivate
      .get(`/api/messages/events/${id}`)
      .then((res) => {
        setMessages(res.data);
        /* Now, user has seen the messages, so we remove them from notification list in
           in the DB *and* in notification context.
        */
        let i = 0;
        let notificationsList = [...notifications]
        while( i < notificationsList.length ){
          if (notificationsList[i].event == id){
            axiosPrivate
              .delete(`/api/notifications/${notificationsList[i]._id}`)
              .then()
              .catch(err => console.error(err))
              notificationsList.splice(i,1);
          } else {
            i++;
          }
        }
        setNotifications(notificationsList) //update context with the culled list
      })
      .catch((err) => {
        console.error(err);
        navigate('/login', { state: {from: pathLocation}, replace: true });
      });
  }, []);

  return (
    <div className="">
      {/* nav */}
      <div>
        <Navbar />
      </div>
      {/* everything wrapper - gonna flex info and messages so they are side by side */}
      <div className="flex flex-row flex-wrap justify-center mt-9 mb-10">
        {/* wrapper for card */}
        <div className=" text-white border border-gray-700 bg-gray-700 rounded-lg w-80 p-5 mr-52">
          {/* title */}
          <div>
            <h2>{event.eventTitle}</h2>
            <h2>
              {new Date(event.eventDate).toLocaleDateString() + " "}
              {new Date(event.eventDate).toLocaleTimeString([], {
                timeStyle: "short",
              })}
            </h2>
            <h2>{event.location?.locationName} </h2>
            <hr className="w-48 h-1 mx-auto my-4 bg-gray-400 border-0 rounded md:my-10" />
          </div>
          {/* details */}
          <div>
            <p>{event.eventDetails}</p>
          </div>
        </div>
        <div className="ml-5">
          <Weather weatherData={weatherData} event={event}/>

        </div>
        <div className="ml-5">
          <Participants event={event}/>

        </div>
      </div>
      <div className="flex justify-center">
        <div className=" text-white border w-1/2 h-96 border-gray-700 rounded-lg p-5 flex flex-col bg-gray-700">
          <div className="overflow-auto h-72">
            <MessageDisplay messages={messages} setMessages={setMessages} />
          </div>
          <div>
            <MessageForm
              id={id}
              messages={messages}
              setMessages={setMessages}
              event={event}
            />
          </div>
        </div>
      </div>
      {/* Messages div - keeping separate in case we want to scape api and use these in that window instead.*/}
    </div>
  );
};

export default ViewEvent;
