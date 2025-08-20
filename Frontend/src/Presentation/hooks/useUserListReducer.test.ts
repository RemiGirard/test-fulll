import { renderHook, act } from "@testing-library/react";
import useUserListReducer, {type UserAndIsSelected} from "./useUserListReducer";
import { describe, it, expect } from "vitest";
import type {User} from "../../Domain/Entity/User";

const sampleUsers: User[] = [
  { id: "1", login: "alice", avatarUrl: "https://myimg/alice" },
  { id: "2", login: "bob", avatarUrl: "https://myimg/bob"  },
  { id: "3", login: "charlie", avatarUrl: "https://myimg/charlie" },
];

describe("useUserListReducer", () => {
  it("sets user list with all users unselected", () => {
    const { result } = renderHook(() => useUserListReducer());

    act(() => {
      const [, dispatch] = result.current;
      dispatch({ type: "set", userList: sampleUsers });
    });

    const [state] = result.current;
    expect(state).toHaveLength(3);
    expect(state.every((u) => !u.isSelected)).toBe(true);
  });

  it("filters user list by login", () => {
    const { result } = renderHook(() => useUserListReducer());

    act(() => {
      const [, dispatch] = result.current;
      dispatch({ type: "set", userList: sampleUsers });
      dispatch({ type: "filter", query: "ali" });
    });

    const [state] = result.current;
    expect(state).toEqual([{ id: "1", login: "alice", avatarUrl: "https://myimg/alice", isSelected: false }]);
  });

  it("deletes users from state", () => {
    const { result } = renderHook(() => useUserListReducer());

    let toDelete: UserAndIsSelected[];

    act(() => {
      const [, dispatch] = result.current;
      dispatch({ type: "set", userList: sampleUsers });
    });

    act(() => {
      const [state, dispatch] = result.current;
      toDelete = [state[1]];
      dispatch({ type: "delete", userList: toDelete });
    });

    const [state] = result.current;
    expect(state.map((u) => u.id)).toEqual(["1", "3"]);
  });

  it("duplicates selected users with new IDs", () => {
    const { result } = renderHook(() => useUserListReducer());

    let toDuplicate: UserAndIsSelected[];

    act(() => {
      const [, dispatch] = result.current;
      dispatch({ type: "set", userList: sampleUsers });
    });

    act(() => {
      const [state, dispatch] = result.current;
      toDuplicate = [state[0]];
      dispatch({ type: "duplicate", userList: toDuplicate });
    });

    const [state] = result.current;
    expect(state).toHaveLength(4);
    expect(state[state.length-1].login).toBe("alice");
    expect(state[state.length-1].id).toContain("copy");
  });

  it("toggles selection for a single user", () => {
    const { result } = renderHook(() => useUserListReducer());

    act(() => {
      const [, dispatch] = result.current;
      dispatch({ type: "set", userList: sampleUsers });
      dispatch({ type: "toggleSelect", id: "2" });
    });

    const [state] = result.current;
    expect(state.find((u) => u.id === "2")?.isSelected).toBe(true);

    act(() => {
      const [, dispatch] = result.current;
      dispatch({ type: "toggleSelect", id: "2" });
    });

    const [updatedState] = result.current;
    expect(updatedState.find((u) => u.id === "2")?.isSelected).toBe(false);
  });

  it("toggles select all users", () => {
    const { result } = renderHook(() => useUserListReducer());

    act(() => {
      const [, dispatch] = result.current;
      dispatch({ type: "set", userList: sampleUsers });
      dispatch({ type: "toggleSelectAll", value: true });
    });

    const [state] = result.current;
    expect(state.every((u) => u.isSelected)).toBe(true);
  });
});
