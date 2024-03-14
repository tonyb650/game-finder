import { useEffect, useState } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useParams } from "react-router-dom";
import Navbar from "./Navbar";

function ViewUser() {
  const { id } = useParams();
  const [user, setUser] = useState({});
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    axiosPrivate
      .get(`/api/users/${id}`)
      .then((res) => {
        setUser({...res.data});
      })
      .catch((err) => console.error(err));
  }, []);

  return (

    <div className="">
      <div>
        <Navbar />
      </div>
      <div className="flex flex-row flex-wrap justify-center mt-9 mb-10">
        <div className=" text-white border border-gray-700 bg-gray-700 rounded-lg w-80 p-5 mr-52">
          <div>
            <p>{user.firstName} {user.lastName}</p>
            <p>{user.email}</p>
            <p>{user.birthday}</p>
            __
            <p>Participating in:</p>
            { user.events ? <ul>{user.events.map((event) => <li>{event.eventTitle}</li>)}</ul> : <p>No events yet.</p>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewUser;
