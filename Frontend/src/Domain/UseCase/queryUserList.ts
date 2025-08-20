import UserProvider from "./UserProvider.ts";
import type {Query} from "../Entity/Query.ts";

export default async (query: Query) => {
  return await UserProvider.getUserList(query);
}
