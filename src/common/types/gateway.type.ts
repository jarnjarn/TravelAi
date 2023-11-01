import { Socket } from "socket.io";

export type SocketConnect<T> = {
	socket: Socket;
	data?: T;
}