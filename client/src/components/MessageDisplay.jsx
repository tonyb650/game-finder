

function MessageDisplay(props) {
  const { messages } = props;

  return (
    <div>
      <h2 className="text-4xl">Chat:</h2>
      <div>
        <div>
        { messages.length > 0 ? messages.map(message => <p className="mt-1" key={message._id}>{message?.author?.firstName}: {message.messageContent}</p>) : <p className="mt-1" >Get the conversation started!</p> }
        </div>
      </div>
    </div>
  )
}

export default MessageDisplay