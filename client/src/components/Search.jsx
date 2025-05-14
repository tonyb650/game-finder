import { useContext, useEffect, useState } from "react"
import Navbar from "./Navbar"
import SearchForm from "./SearchForm"
import { Link, useLocation, useNavigate } from "react-router-dom"
import useAuth from "../hooks/useAuth"
import useAxiosPrivate from "../hooks/useAxiosPrivate"
import newMessageIcon from "../assets/new_message.svg";
import Notification from "../context/NotificationContext"

function Search() {
  const { auth } = useAuth();
  const { notifications, setNotifications } = useContext(Notification);
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const pathLocation = useLocation();
  const [eventsList,setEventsList] = useState([])
  const [filteredEvents, setFilteredEvents] = useState([])
  const userId = auth.user._id

  // This helper function to determines whether or not current user is already a player in a given event
  function userIsPlayer(event){
    for (let i = 0; i < event.players.length; i++){
      if (event.players[i]._id === userId) return true;
    }
    return false;
  }

  /* This block gets all events from the DB. It loops through the entire list to see if any
      events have matching notifications (from Notification context). Any time there is a 
      match, the event object gets a new property 'newMessages' added to it and set to true.
      When this processing of notifications is done, the event list is set in state 'all Events'.
      Finally, the list of all events is sorted by date and then also placed in 'filteredEvents'
      state, which is what is actually rendered in the return.
  */
  useEffect(() => {
    axiosPrivate.get("/api/events")
      .then(res => {
        let allEvents = res.data;
        console.log(allEvents)
        for(let i = 0; i< allEvents.length; i++) {                                                 // Here, we loop through all events and then for each event,
          allEvents[i].newMessages = false;
          for(let j=0; j < notifications.length; j++){                                              // we loop through all notifications
            if(notifications[j].event == allEvents[i]._id){                                         // if there is a match...
              allEvents[i].newMessages = true;                                                      // We create a flag to alert the user of the notification in that event
            }
          }
        }
        setEventsList(allEvents);
        const sortedEvents = allEvents.sort((a,b) => new Date(a.eventDate) > new Date(b.eventDate) ? 1 : -1 )
        setFilteredEvents(sortedEvents);
      })
      .catch(err => {
        console.error(err)
        navigate('/login', { state: {from: pathLocation}, replace: true }) 
    })
  },[notifications])

  /* Here's where we handle a click on a 'join' link */
  function handleJoin(eventId){
    axiosPrivate.patch(`/api/events/join/${eventId}/player/${userId}`,{})// ,{withCredentials : true})
    .then(res => {
      let tempFilterEvents = [...filteredEvents]
      let tempEventsList = [...eventsList]
      for ( let i=0; i < tempFilterEvents.length; i++){
        if (tempFilterEvents[i]._id === eventId){
          tempFilterEvents[i].players.push(auth.user) // TODO: I don't understand why, but this seems to push to tempEventsList.players also... must be pointing to the same thing in memory??
        }
      }
      setFilteredEvents(tempFilterEvents)
      setEventsList(tempEventsList)
    })
    .catch(err=> {
      console.error(err)
    })
  }

  /* Here's where we handle a click on a 'drop' link */
  function handleDrop(eventId){
    axiosPrivate.patch(`/api/events/drop/${eventId}/player/${userId}`,{})// ,{withCredentials : true})
    .then(res => {
      // I feel like there has to be a more elegant way to do the following
      // But I'm running out of energy 
      let tempEventsList = [...eventsList]
      for ( let i=0; i < tempEventsList.length; i++){
        if (tempEventsList[i]._id === eventId){
          for (let j = 0; j < tempEventsList[i].players.length ; j++){
            if (tempEventsList[i].players[j]._id === userId) {
              tempEventsList[i].players.splice(j)
            }
          }
        }
      }
      setEventsList(tempEventsList)

      let tempFilterEvents = [...filteredEvents]
      for ( let i=0; i < tempFilterEvents.length; i++){
        if (tempFilterEvents[i]._id === eventId){
          for (let j = 0; j < tempFilterEvents[i].players.length ; j++){
            if (tempFilterEvents[i].players[j]._id === userId) {
              tempFilterEvents[i].players.splice(j)
            }
          }
        }
      }
      const sortedEvents = tempFilterEvents.sort((a,b) => new Date(a.eventDate) > new Date(b.eventDate) ? 1 : -1 )
      setFilteredEvents(sortedEvents)
    })
    .catch(err=> {
      console.error(err)
    })
  }

  // TODO: Would be cool to add conditional styling for events that are in the past.
  return (
    <div>
      <Navbar/>
      <SearchForm eventsList={eventsList} setFilteredEvents={setFilteredEvents}/>
      <div className="flex mt-20 relative overflow-x-auto shadow-md justify-center sm:rounded-lg">
      <table className="w-1/2 text-sm text-left rtl:text-right border border-separate rounded-lg text-gray-400">
          <thead className="text-xs text-gray-400 uppercase bg-gray-700">
            <tr>
              <th scope="col" className="px-6 py-3">Event Name</th>
              <th scope="col" className="px-6 py-3">Location</th>
              <th scope="col" className="px-6 py-3">Attendees</th>
              <th scope="col" className="px-6 py-3">Date</th>
              <th scope="col" className="px-6 py-3">Creator</th>
              <th scope="col" className="px-6 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
          { filteredEvents ? filteredEvents.map(event => 
              <tr className=" border-b bg-gray-800 border-gray-700 hover:bg-gray-600" key={event._id}>
                <td className="px-6 py-4">
                  <Link to={`/events/${event._id}`}>
                    {event.eventTitle}
                    {event.newMessages ? <img src={newMessageIcon} width="20"/> : null }
                  </Link>
                </td>
                <td className="px-6 py-4">
                  {event.location.locationName}
                </td>
                <td className="px-6 py-4">
                  {event.players.length} / {event.maxPlayers}
                </td>
                <td className="px-6 py-4">
                  {new Date(event.eventDate).toLocaleDateString() + " "}
                  {new Date(event.eventDate).toLocaleTimeString([],{ timeStyle: 'short'})}
                </td>
                <td className="px-6 py-4">
                  {event.creator.firstName} {event.creator.lastName} 
                </td>
                <td className="px-6 py-4">
                  { new Date(event.eventDate) < new Date() ? <span className=" md:p-0 text-white dark:text-white border-gray-700">Past</span> : userIsPlayer(event) ? 
                    <span className="rounded md:p-0 text-white md:hover:text-blue-500 hover:bg-gray-700 hover:text-white md:hover:bg-transparent border-gray-700 cursor-pointer" onClick={() => handleDrop(event._id)}>Drop</span>
                     :
                     event.players.length >= event.maxPlayers ? <span className=" md:p-0 text-white md:hover:text-blue-500 hover:bg-gray-700 dark:text-white md:hover:bg-transparent border-gray-700">Full</span> 
                     : 
                     <span className=" md:p-0 text-white md:hover:text-blue-500 hover:bg-gray-700 dark:text-white md:hover:bg-transparent border-gray-700 cursor-pointer" onClick={() => handleJoin(event._id)}>Join</span> } 
                </td>
              </tr>
            ):null}
          </tbody>
        </table>
        </div>
    </div>
  )
}

export default Search