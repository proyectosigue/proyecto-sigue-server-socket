import { Message } from "./message";

export interface IThread {
  id: number;
  subject: string;
  user_id_issuing: number;
  user_id_receiver: number;
  status: boolean;
  messages: Message[];
  deserialize(object: IThread);
}

export class Thread {

  id?: number;
  subject: string;
  user_id_issuing: number;
  user_id_receiver: number;
  status: boolean;

  messages: Message[] = [];

  deserialize(object : IThread){
    Object.assign(this, object);
    return this;
  }

}
