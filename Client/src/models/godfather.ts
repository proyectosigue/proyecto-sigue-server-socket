
export interface IGodfather {
  id: number;
  first_name: string;
  last_name: string;
  full_name: string;
  email: string;
  interests: string;
  profile_image: string;
  deserialize(object: IGodfather);
}

export class Godfather {

  id: number;
  first_name: string;
  last_name: string;
  full_name: string;
  email: string;
  interests: string;
  profile_image: string;

  deserialize(object : IGodfather){
    Object.assign(this, object);
    return this;
  }

}




