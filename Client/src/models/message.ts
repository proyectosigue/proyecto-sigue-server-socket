
export interface IMessage {
  body: string,
  thread_id: number,
  user_id_replier: number,
  status: boolean,
  created_at: Date,
  updated_at: Date,
  deserialize(object:  IMessage);
}

export class Message {

  body: string;
  thread_id: number;
  user_id_replier: number;
  status: boolean;
  created_at: Date;
  updated_at: Date;

  deserialize(object : IMessage){
    Object.assign(this, object);
    return this;
  }


}
