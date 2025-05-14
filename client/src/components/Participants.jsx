import { Link } from "react-router-dom";


function Participants(props) {
  const { event } = props;

  return (
    <div className="flex flex-row flex-wrap justify-evenly mt-5 mb-10">
      <div className=" text-white border border-gray-700 bg-gray-700 rounded-lg w-80 p-5">
        <p>Participants:</p>
        {event?.players?.length > 0 ? (
          event.players.map((player) => (
            <p className="mt-1" key={player._id}> <Link to={`/users/${player._id}`}>{player?.firstName} {player?.lastName}</Link></p>
          ))
        ) : (
          <p className="mt-1">No players yet.</p>
        )}
      </div>
    </div>
  );
}

export default Participants;
