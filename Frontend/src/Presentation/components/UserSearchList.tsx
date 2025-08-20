import {type ChangeEventHandler, useEffect, useRef, useState} from "react";
import getUserList from "../../Domain/UseCase/queryUserList";
import styles from "./UserSearchList.module.css";
import UserTable from "./UserTable";
import UserPreview from "./UserPreview";
import useUserListReducer from "../hooks/useUserListReducer";
import TextInputDebounced from "./TextInputDebounced";
import Copy from "../assets/icons/Copy";
import Trash from "../assets/icons/Trash";
import StyledCheckbox from "./StyledCheckbox";
import Cross from "../assets/icons/Cross";
import Pencil from "../assets/icons/Pencil";

export default function UserSearchList() {
  const [userListIsLoading, setUserListIsLoading] = useState(true);
  const [filterText, setFilterText] = useState("");
  const selectAllRef = useRef<HTMLInputElement>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [status, setStatus] = useState<string>("ok");

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
    getUserList({text: filterText}).then(({status, result: newUserList}) => {
      dispatchUserList({type: "set", userList: newUserList});
      setStatus(status);
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
      status={status}
    />
  </div>);
}
