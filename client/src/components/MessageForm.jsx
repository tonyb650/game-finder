import { useState } from 'react';
import useAuth from '../hooks/useAuth';
import useAxiosPrivate from '../hooks/useAxiosPrivate';

function MessageForm(props) {
  const {id, messages, setMessages, event} = props;
  const { auth } = useAuth();
  const axiosPrivate = useAxiosPrivate();
  // const [errors, setErrors] = useState([]); -> removing because validation error message is not really necessary
  const [ message, setMessage ] = useState({
    messageContent : "",
    author : auth.user._id,
    event : id
  })

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      // DOING IN BACK END -> add all players for this event to notification (except for current user )
      const res = await axiosPrivate.post("/api/messages", message)
      setMessages([...messages, {...res.data, author : auth.user}])
      setMessage({...message, messageContent : ""}) // Clear messageContent field on form
    } catch (err){
      console.error(err);
    }
    }

  return (
    <div className=''>
      <div className=''>
        <form className="flex flex-row mt-4 justify-between"onSubmit={handleSubmit}>
          
          <input className="text-white bg-gray-500 w-10/12 rounded-lg h-10"type="text" name="messageContent" placeholder='type your message here' value={message.messageContent} onChange={(e) => setMessage({...message, [e.target.name] : e.target.value})}/>

          <button className='border border-gray-500 rounded-lg w-36' type="submit">Send</button>
        </form>
      </div>
    </div>
  )
}

export default MessageForm