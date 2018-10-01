import { NEW_MESSAGE } from '../constants/index';

export const messagesReducer = (state = [], action) => {
  switch (action.type) {
    case NEW_MESSAGE:
      return [
        ...state,
        action.message
      ]
    default:
      return state;
  }
}

// const room = {
//   [room.title]: {
//     title: String,
//     messages: {
//       [message._id]: {
//         _id: Number,
//         user: String,
//         message: String,
//         date: Date,
//       },
//     },
//     users: {
//       [user._id]: {
//         _id: String,
//         name: String,
//       }
//     }
//   }
// }

// const roomsReducer = (state = {}, action) => {
//   switch (action.type) {
//     case 'NEW_ROOM':
//       return {
//         ...state,
//         [action.room.title]: action.room, 
//       }
//     default: 
//       return state
//   }
// }

// export function saveMessage(data) {
//   const payload = { room: data.room, newMessage: { user: data.newMessage.user, content: data.newMessage.message } }

//   return { type: NEW_MESSAGE, payload }
// }

// const newMessage = (message) => {
//   let parsed = JSON.parse(message.newMessage.message)
//   return axios.post('/messages', parsed)
// }

// export function createMessage(data) {
//   return (dispatch) => {
//     return newMessage(data).then((response) => {
//       dispatch(saveMessage({ room: data.room, message: response.data }))
//       return response
//     })
//   }
// }