import UserProvider from "./UserProvider";
import type {Query} from "../Entity/Query";

export default async (query: Query) => {
  return await UserProvider.getUserList(query);
}
