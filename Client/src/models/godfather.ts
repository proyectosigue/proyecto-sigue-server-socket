
interface IGodfather {

  id: number;
  first_name: string;
  last_name: string;
  full_name: string;
  email: string;
  interests: string;
  profile_image: string;

}

export class Godfather {

  id: number;
  first_name: string;
  last_name: string;
  full_name: string;
  email: string;
  interests: string;
  profile_image: string;

  constructor(data?: IGodfather) {
    this.id = data.id;
    this.first_name = data.first_name;
    this.last_name = data.full_name;
    this.email = data.email;
    this.interests = data.interests;
    this.profile_image = data.profile_image;
  }

}




