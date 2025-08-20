import type UserInterface from "../../Domain/UseCase/UserInterface.ts";
import type {User} from "../../Domain/Entity/User.ts";

// Fake user list for testing purposes
export class UserImplementation implements UserInterface {
  getUserList = async () => {
    // add a delay to simulate a network request
    await new Promise((resolve) => setTimeout(resolve, 3000));
    return {
      status: "ok",
      result: [
        {id: "1", login: "Marie Curie", avatarUrl: "https://picsum.photos/200/300?random=1"},
        {id: "2", login: "Albert Einstein", avatarUrl: "https://picsum.photos/200/300?random=2"},
        {id: "3", login: "Isaac Newton", avatarUrl: "https://picsum.photos/200/300?random=3"},
        {id: "4", login: "Nikola Tesla", avatarUrl: "https://picsum.photos/200/300?random=4"},
        {id: "5", login: "Galileo Galilei", avatarUrl: "https://picsum.photos/200/300?random=5"},
        {id: "6", login: "Max Planck", avatarUrl: "https://picsum.photos/200/300?random=6"},
        {id: "7", login: "Johannes Kepler", avatarUrl: "https://picsum.photos/200/300?random=7"},
        {id: "8", login: "Valerie Masson-Delmotte", avatarUrl: "https://picsum.photos/200/300?random=8"},
        {id: "9", login: "Alain Aspect", avatarUrl: "https://picsum.photos/200/300?random=9"},
      ] as User[],
    };
  }
}
