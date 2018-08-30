export class New {

  id: number;
  title: string;
  description: string;
  profile_image: string;

  deserialize(object : New){
    Object.assign(this, object);
    return this;
  }

}
