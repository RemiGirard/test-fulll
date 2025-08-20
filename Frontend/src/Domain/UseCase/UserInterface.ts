import type {User} from "../Entity/User";
import type {Query} from "../Entity/Query";

export default interface UserInterface {
  getUserList: (query: Query) => Promise<{ status: string, result: User[] }>;
}