import type {User} from "../Entity/User.ts";
import type {Query} from "../Entity/Query.ts";

export default interface UserInterface {
  getUserList: (query: Query) => Promise<User[]>;
}