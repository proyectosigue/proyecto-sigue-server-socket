import {Message} from "./message";

export interface IThread {
  id: number;
  subject: string;
  user_id_issuing: number;
  user_id_receiver: number;
  status: boolean;

  messages: Message[];
}

export class Thread {

  id?: number;
  subject: string;
  user_id_issuing: number;
  user_id_receiver: number;
  status: boolean;

  messages: Message[] = [];

  constructor(data: IThread){
    this.id = data.id? data.id : null;
    this.subject = data.subject;
    this.user_id_receiver = data.user_id_receiver;
    this.user_id_issuing = data.user_id_issuing;
    this.messages = data.messages;
  }

}
