import React from 'react';

const Message = ({ currentUserId, messageUserId, message, date  }) => (
  <div 
    className={currentUserId === messageUserId ? 'currentUser' : 'anotherUser'} 
    style={currentUserId === messageUserId ? {justifySelf: 'left'} : {justifySelf: 'right'}}
  >
    <p>{date}</p>
    <p>{message}</p>
  </div>
);

export default Message;
