import React from 'react';

const Message = ({ currentUserId, messageUserId, message, date  }) => (
  <div className={currentUserId === messageUserId ? 'currentUser' : 'anotherUser'} style>
    <p>{date}</p>
    <p>{message}</p>
  </div>
);

export default Message;
