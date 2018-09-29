import { NEW_MESSAGE } from '../constants/index';

export const messagesReducer = (state = [], action) => {
  switch (action.type) {
    case NEW_MESSAGE:
      return [...state, action.message]
    default:
      return state;
  }
}

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