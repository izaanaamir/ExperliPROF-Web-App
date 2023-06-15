import { Role } from './role';

export class User {
  uuid!: string;
  img!: string;
  password!: string;
  firstName!: string;
  lastName!: string;
  role!: Role;
  token!: string;
  username!: string
}
