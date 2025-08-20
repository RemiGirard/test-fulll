import type UserInterface from "./UserInterface.ts";
import {UserImplementation} from "../../Infrastructure/local/UserImplementation.ts";

export default new UserImplementation() as UserInterface;
