import {useReducer} from "react";
import type {User} from "../../Domain/Entity/User.ts";

export type UserAndIsSelected = User & { isSelected: boolean };
type State = UserAndIsSelected[];

type Action =
  | { type: "set"; userList: User[] }
  | { type: "filter"; query: string }
  | { type: "delete"; userList: UserAndIsSelected[] }
  | { type: "duplicate"; userList: UserAndIsSelected[] }
  | { type: "toggleSelect"; id: string; }
  | { type: "toggleSelectAll"; value: boolean }
;

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "set":
      return action.userList.map((user) => ({...user, isSelected: false}));
    case "filter":
      return state.filter((user) => user.login.includes(action.query));
    case "delete": {
      const idList = action.userList.map((user) => user.id);
      return state.filter((user) => !idList.includes(user.id));
    }
    case "duplicate": {
      const duplicateUserList: UserAndIsSelected[] = action.userList
        .map((user) => ({
          ...user,
          id: `${user.id} - copy - ${window.crypto.randomUUID()}`,
          isSelected: false,
        }));
      return [...state, ...duplicateUserList];
    }
    case "toggleSelect": {
      const indexOfUser = state.findIndex((user) => user.id === action.id);
      if (indexOfUser === -1) return state;
      const user = state[indexOfUser];
      const isSelected = !user.isSelected;
      return [
        ...state.slice(0, indexOfUser),
        {...user, isSelected},
        ...state.slice(indexOfUser + 1)
      ];
    }
    case "toggleSelectAll": {
      const isSelected = action.value;
      return state.map((user) => ({...user, isSelected}));
    }
  }
}

export default function useUserListReducer() {
  return useReducer(reducer, []);
}