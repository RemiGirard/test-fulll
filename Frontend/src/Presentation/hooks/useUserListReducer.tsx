import {useReducer} from "react";
import type {User} from "../../Domain/Entity/User.ts";

type UserAndIsSelected = User & { isSelected: boolean };
type State = UserAndIsSelected[];

type Action =
  | { type: "set"; userList: User[] }
  | { type: "filter"; query: string }
  | { type: "delete"; id: string }
  | { type: "duplicate"; id: string }
  ;

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "set":
      return action.userList.map((user) => ({...user, isSelected: false}));
    case "filter":
      return state.filter((user) => user.login.includes(action.query));
    case "delete":
      return state.filter((user) => user.id !== action.id);
    case "duplicate": {
      const indexOfUser = state.findIndex((user) => user.id === action.id);
      if (indexOfUser === -1) return state;
      const user = state[indexOfUser];
      const newUser: UserAndIsSelected = {...user, id: `${user.id} - copy`, isSelected: false};
      return [...state.slice(0, indexOfUser), newUser, ...state.slice(indexOfUser + 1)];
    }
  }
}

export default function useUserListReducer() {
  return useReducer(reducer, []);
}