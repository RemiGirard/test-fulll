import type UserInterface from "./UserInterface.ts";
import {UserImplementation} from "../../Infrastructure/Github/UserImplementation.ts";

export default new UserImplementation() as UserInterface;
