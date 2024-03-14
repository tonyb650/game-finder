import { useState, useEffect } from "react";
import Navbar from "./Navbar";
import { Link, useLocation, useNavigate } from "react-router-dom";
import toISODateString from "../utils/toISOdateString";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import useAuth from "../hooks/useAuth";

const CreateEvent = () => {
  const navigate = useNavigate();
  const pathLocation = useLocation();
  const { auth } = useAuth();
  const axiosPrivate = useAxiosPrivate();
  const [errors, setErrors] = useState({});
  const [locations, setLocations] = useState([]);
  const [datePicker, setDatePicker] = useState(toISODateString(new Date()));  // Set default date to today. HTML date form is formatted as "YYYY-MM-DD"
  const [timePicker, setTimePicker] = useState("12:00");                      // Set default time to noon. HTML time form is formatted "18:00" for 6:00pm
    const userId = auth.user._id;
  
    /* This is a little helper function that takes the date string and time string and combines
      them into a JS date object. Notice that month is 0 indexed so we subtract 1 for the month.
   */ 
  function dateObjectMaker(ISOdateString, timeString) {
    const dateParts = ISOdateString.split("-");
    const timeParts = timeString.split(":");
    return new Date(dateParts[0], dateParts[1]-1, dateParts[2],timeParts[0],timeParts[1]);
  }

  const [event, setEvent] = useState({
    eventTitle: "",
    eventDate: dateObjectMaker(toISODateString(new Date()), "12:00"),
    eventDetails: "",
    maxPlayers: 0,
    location: null,
    creator: userId
  });

  // pulling locations from database
  useEffect(() => {
    axiosPrivate
      .get("/api/locations")
      .then((res) => {
        if(res.data.length > 0){                                        // In case there are no locations in DB
          setEvent({...event, location : res.data[0]._id})              // The idea is that the location is prefilled with the first _id in the location collection
        }
        setLocations(res.data);
      })
      .catch(err => {
        console.error(err)
        navigate('/login', { state: {from: pathLocation}, replace: true })
      })
  }, []);

  /* Handle change in all form fields here */
  function handleChange(e) {
    if (e.target.name === "datePicker"){                                // Special handling of change in 'datePicker'
      setDatePicker(e.target.value);
      const combinedDateObject = dateObjectMaker(e.target.value, timePicker)
      setEvent({...event, eventDate : combinedDateObject})
    } else if (e.target.name == "timePicker") {                         // Special handling of change in 'timePicker'
      setTimePicker(e.target.value);
      const combinedDateObject = dateObjectMaker(datePicker,e.target.value)
      setEvent({...event, eventDate : combinedDateObject})
    } else {                                                            // General handling for change in all other form fields
      setEvent({...event, [e.target.name] : e.target.value})
    }
  }

  /* Handle form submission here */
  function handleSubmit(e){
    e.preventDefault();
    axiosPrivate.post("/api/events", event)//, {withCredentials:true})
    .then(res => {
      navigate('/search')
    })
    .catch(err => {
      console.error(err.response.data.errors);
      setErrors(err.response.data.errors)
    })
  }
  return (
    <div>
      {/* nav bar */}
      <div>{<Navbar />}</div>
      <div className="flex flex-col items-center justify-center mx-auto md:h-screen">
        <div className="w-full rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 bg-gray-900 border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight md:text-2xl text-white">
              Create an Event
            </h1>
            <form className="space-y-4" onSubmit={handleSubmit}>
              {/* title */}
              <div>
                <label
                  htmlFor="eventTitle"
                  className="block mb-2 text-sm font-medium text-white"
                >
                  Event Title
                </label>
                <input
                  type="text"
                  name="eventTitle"
                  id="eventTitle"
                  className="border sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-900 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Event Title"
                  required="" value={event.eventTitle} onChange={handleChange}
                />
                {errors.eventTitle ? (
                  <p className="text-red-600">{errors.eventTitle.message}</p>
                ) : null}
              </div>
              {/* event date */}
              <div>
                <label className="block mb-2 text-sm font-medium text-white">
                  Event Date
                </label>
                <input
                  type="date"
                  name="datePicker"
                  className=" border sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-900 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"  value={datePicker} onChange={handleChange}
                />
              </div>
              {/* event time */}
              <div>
                <label className="block mb-2 text-sm font-medium text-white">
                  Event Time
                </label>
                <input
                  type="time"
                  name="timePicker"
                  className=" border sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-900 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"  value={timePicker} onChange={handleChange}
                />
              </div>
              {/* event details */}
              <div>
                <label
                  htmlFor="eventDetails"
                  className="block mb-2 text-sm font-medium text-white"
                >
                  Event Details
                </label>
                <textarea
                  name="eventDetails"
                  rows="4"
                  className="block p-2.5 w-full text-sm rounded-lg border  focus:ring-blue-500 focus:border-blue-500 bg-gray-700 border-gray-600 placeholder-gray-400 text-white"
                  placeholder="Write the details of the event here..." value={event.eventDetails} onChange={handleChange}
                ></textarea>
              </div>
              {/* maxPlayers */}
              <div>
                <label
                  htmlFor="maxPlayers"
                  className="block mb-2 text-sm font-medium text-white"
                >
                  Maximum Participants
                </label>
                <input
                  type="number"
                  name="maxPlayers"
                  id="maxPlayers"
                  className="border sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-900 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Maximum Participants"
                  required="" value={event.maxPlayers} onChange={handleChange}
                />
                {errors.maxPlayers ? (
                  <p className="text-red-600">{errors.maxPlayers.message}</p>
                ) : null}
              </div>
              {/* event location */}
              <div>
                <label
                  htmlFor="location"
                  className="block mb-2 text-sm font-medium text-white"
                >
                  Location
                </label>
                <select name="location"
                  className=" border border-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-700 text-white"
                  onChange={handleChange}
                >
                  {locations.map((location) => (
                    <option key={location._id} value={location._id}>
                      {location.locationName}
                    </option>
                  ))}
                </select>
                {errors.location ? (
                  <p className="text-red-600">{errors.location.message}</p>
                ) : null}
              </div>
              {/* submit form (button)*/}
              <div className="py-1">
                <button
                  type="submit"
                  className="border border-gray-700 text-sm rounded-lg hover:bg-blue-500 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-700 text-white"
                >
                  Create Event
                </button>
              </div>
            </form>
            {/* link to location form */}
            <div>
              <Link to="/newlocation" className="text-white">
                Can't find your location?
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateEvent;
