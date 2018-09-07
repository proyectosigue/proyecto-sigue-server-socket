export class New {

  id: number;
  title: string;
  description: string;
  image: string;
  created_by: number;

  deserialize(object : New){
    Object.assign(this, object);
    return this;
  }

}
