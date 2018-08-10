import { Message } from "./message";

export class Thread {

  id?: number;
  subject: string;
  user_id_issuing: number;
  user_id_receiver: number;
  status: boolean;

  messages: Message[] = [];

  deserialize(object : Thread){
    Object.assign(this, object);
    return this;
  }

}
