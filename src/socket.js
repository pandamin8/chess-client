import { Manager } from 'socket.io-client'

const url = process.env.REACT_APP_SOCKET_SERVER_URL

export const manager = new Manager(url)