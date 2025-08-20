import {useEffect, useState} from "react";
import getUserList from "../../Domain/UseCase/queryUserList.ts";
import styles from "./UserSearchList.module.css";
import UserTable from "./UserTable.tsx";
import UserPreview from "./UserPreview.tsx";
import useUserListReducer from "../hooks/useUserListReducer.tsx";
import TextInputDebounced from "./TextInputDebounced.tsx";

export default function UserSearchList() {
  const [userListIsLoading, setUserListIsLoading] = useState(true);
  const [filterText, setFilterText] = useState("");

  const [userList, dispatchUserList] = useUserListReducer();

  useEffect(() => {
    setUserListIsLoading(true);
    console.debug("filterText", filterText);
    getUserList({text: filterText}).then((newUserList) => {
      dispatchUserList({type: "set", userList: newUserList});
      setUserListIsLoading(false);
    });
  }, [filterText]);

  return (<div className={`${styles.main}`}>
    <TextInputDebounced
      onDebounce={setFilterText}
      className={`${styles.filter}`}
      placeholder="Search input"
    />
    <div className={`${styles.selectionSection}`}>

    </div>
    <UserTable
      userList={userList}
      RenderUser={UserPreview}
      isLoading={userListIsLoading}
      onToggleSelect={(id) => dispatchUserList({ type: "toggleSelect", id })}
    />
  </div>);
}
