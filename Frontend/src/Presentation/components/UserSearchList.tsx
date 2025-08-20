import {type ChangeEventHandler, useEffect, useRef, useState} from "react";
import getUserList from "../../Domain/UseCase/queryUserList.ts";
import styles from "./UserSearchList.module.css";
import UserTable from "./UserTable.tsx";
import UserPreview from "./UserPreview.tsx";
import useUserListReducer from "../hooks/useUserListReducer.tsx";
import TextInputDebounced from "./TextInputDebounced.tsx";
import Copy from "../assets/icons/Copy.tsx";
import Trash from "../assets/icons/Trash.tsx";
import StyledCheckbox from "./StyledCheckbox.tsx";
import Cross from "../assets/icons/Cross.tsx";
import Pencil from "../assets/icons/Pencil.tsx";

export default function UserSearchList() {
  const [userListIsLoading, setUserListIsLoading] = useState(true);
  const [filterText, setFilterText] = useState("");
  const selectAllRef = useRef<HTMLInputElement>(null);
  const [isEditMode, setIsEditMode] = useState(false);

  const [userList, dispatchUserList] = useUserListReducer();
  const userListIsSelected = userList.filter((user) => user.isSelected);
  const userListLength = userList.length;
  const userListIsSelectedLength = userListIsSelected.length;
  const selectAllIsIndeterminate = userListIsSelectedLength > 0 && userListIsSelectedLength < userListLength;

  const handleToggleSelectAll: ChangeEventHandler<HTMLInputElement> = (e) => {
    dispatchUserList({type: "toggleSelectAll", value: e.target.checked});
  };

  const handleDuplicate = () => {
    dispatchUserList({type: "duplicate", userList: userListIsSelected});
  };

  const handleDelete = () => {
    dispatchUserList({type: "delete", userList: userListIsSelected});
  }

  const handleToggleEditMode = () => {
    setIsEditMode(!isEditMode);
  }

  useEffect(() => {
    setUserListIsLoading(true);
    console.debug("filterText", filterText);
    getUserList({text: filterText}).then((newUserList) => {
      dispatchUserList({type: "set", userList: newUserList});
      setUserListIsLoading(false);
    });
  }, [filterText]);

  useEffect(() => {
    if (selectAllRef.current) {
      selectAllRef.current.indeterminate = selectAllIsIndeterminate;
    }
  }, [selectAllIsIndeterminate])

  return (<div className={`${styles.main}`}>
    <TextInputDebounced
      onDebounce={setFilterText}
      className={`${styles.filter}`}
      placeholder="Search input"
    />
    <div className={`${styles.actions}`}>
      <div className={`${styles.selectElementsInfo}`}>
        <StyledCheckbox
          ref={selectAllRef}
          className={`${styles.checkbox} ${isEditMode ? "" : styles.hidden}`}
          onChange={handleToggleSelectAll}
          checked={userListIsSelectedLength === userListLength}
        />
        {userListIsSelectedLength} elements selected
      </div>
      <div className={`${styles.actionButtons}`}>
        {isEditMode && (<>
          <button
            className={`${styles.button}`}
            disabled={userListLength === 0}
            onClick={handleDuplicate}
          ><Copy/></button>
          <button
            className={`${  styles.button}`}
            disabled={userListLength === 0}
            onClick={handleDelete}
          ><Trash/></button>
        </>)}
        <button className={`${styles.button}`} onClick={handleToggleEditMode}>{isEditMode ? <Cross /> : <Pencil />}</button>
      </div>
    </div>
    <UserTable
      userList={userList}
      RenderUser={UserPreview}
      isLoading={userListIsLoading}
      onToggleSelect={(id) => dispatchUserList({type: "toggleSelect", id})}
      isEditMode={isEditMode}
    />
  </div>);
}
