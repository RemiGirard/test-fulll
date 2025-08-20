import styles from "./UserTable.module.css";
import type {UserAndIsSelected} from "../hooks/useUserListReducer";

type Props = {
  userList: UserAndIsSelected[];
  RenderUser: React.FC<{ user: UserAndIsSelected; onToggleSelect: () => void, isEditMode: boolean }>;
  isLoading: boolean;
  onToggleSelect: (id: string) => void;
  isEditMode: boolean;
  status: string;
}

export default function UserTable({userList, RenderUser, isLoading, onToggleSelect, isEditMode, status}: Props) {
  let message = '';

  if (isLoading) {
    message = "Loading...";
  } else if (status === "ok" && userList.length === 0) {
    message = "No users found";
  } else if (status !== "ok") {
    message = status;
  }

  return (<div className={`${styles.main}`}>
    <div className={`${styles.secondary}`}>
      {message
        ? <div className={`${styles.loading}`}><p>{message}</p></div>
        : userList.map((user) => <RenderUser
          key={user.id} user={user}
          onToggleSelect={() => onToggleSelect(user.id)}
          isEditMode={isEditMode}
        />)
      }
    </div>
  </div>);
}
