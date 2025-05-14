import { useState } from "react";
import toISODateString from "../utils/toISOdateString";

function SearchForm(props) {
  const { eventsList, setFilteredEvents } = props;
  const [searchBy, setSearchBy] = useState("eventTitle");
  const [searchValue, setSearchValue] = useState("");

  function handleChangeSearchBy(e) {
    if (e.target.value != searchBy) {                   // If switching to a new 'searchBy'
      setSearchValue("");                               // Clear the search term
    }
    setSearchBy(e.target.value);                        // Then update 'searchBy' state
  }

  function handleSearch(e) {
    e.preventDefault();
    switch (searchBy) {
      case "eventTitle":
        setFilteredEvents(
          eventsList.filter((event) =>
            event.eventTitle.toLowerCase().includes(searchValue.toLowerCase())
          )
        );
        break;
      case "locationName":
        setFilteredEvents(
          eventsList.filter((event) =>
            event.location.locationName
              .toLowerCase()
              .includes(searchValue.toLowerCase())
          )
        );
        break;
      case "eventDate":
        setFilteredEvents(
          eventsList.filter(
            (event) => toISODateString(event.eventDate) == searchValue
          )
        );
        break;
      case "notFull":
        setFilteredEvents(
          eventsList.filter((event) => event.maxPlayers > event.players.length && new Date(event.eventDate) > new Date())
        );
        break;
      case "creatorName":
        setFilteredEvents(
          eventsList.filter((event) =>
            (
              event.creator.firstName.toLowerCase() +
              " " +
              event.creator.lastName.toLowerCase()
            ).includes(searchValue.toLowerCase())
          )
        );
        break;
      default:
        console.error("Unexpected value on 'switch' for 'searchBy' in SearchForm.jsx");
        break;
    }
  }

  return (
    <div className="m-5">
      <form onSubmit={handleSearch}>
        <div className="flex justify-center">
          <label className="mb-2 text-sm font-medium sr-only text-white">
            Search:
          </label>
          {searchBy == "eventDate" ? (
            <input
              type="date"
              className="block w-1/2 p-4 ps-10 text-sm border rounded-lg bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
          ) : searchBy == "notFull" ? (
            <input
              type="search"
              className="block w-1/2 p-4 ps-10 text-sm border rounded-lg bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
              disabled
              placeholder="Search for all events that still need additional players"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
          ) : (
            <input
              type="search"
              className="block w-1/2 p-4 ps-10 text-sm border rounded-lg bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
              placeholder="Search by any category"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
          )}
          <label className="mb-2 text-sm font-medium sr-only text-white">
            Search By:
          </label>
          <select
            className="ml-1 border text-sm rounded-lg block w-36 p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 cursor-pointer"
            value={searchBy}
            onChange={handleChangeSearchBy}
          >
            <option value="eventTitle">Event Name</option>
            <option value="locationName">Location</option>
            <option value="eventDate">Date</option>
            <option value="notFull">Players needed</option>
            <option value="creatorName">Creator</option>
          </select>
          <button
            className="ml-1 border text-sm rounded-lg block w-28 p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500"
            type="submit"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default SearchForm;
