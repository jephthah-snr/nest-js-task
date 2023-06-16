export class CreateUserType{
    email: string;
    fullName: string;
    city: string;
    phoneNumber: string;
    password: string;
    address: string;
}


export interface User {
    id: string;
    username: string;
  }