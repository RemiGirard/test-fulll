import type UserInterface from "./UserInterface";
import {UserImplementation} from "../../Infrastructure/Github/UserImplementation";

export default new UserImplementation() as UserInterface;
