import styles from "./UserTable.module.css";
import type {UserAndIsSelected} from "../hooks/useUserListReducer.tsx";

type Props = {
  userList: UserAndIsSelected[];
  RenderUser: React.FC<{ user: UserAndIsSelected; onToggleSelect: () => void, isEditMode: boolean }>;
  isLoading: boolean;
  onToggleSelect: (id: string) => void;
  isEditMode: boolean;
}

export default function UserTable({userList, RenderUser, isLoading, onToggleSelect, isEditMode}: Props) {
  return (<div className={`${styles.main}`}>
    {isLoading
      ? <div className={`${styles.loading}`}><p>Loading...</p></div>
      : userList.map((user) => <RenderUser
        key={user.id} user={user}
        onToggleSelect={() => onToggleSelect(user.id)}
        isEditMode={isEditMode}
      />)
    }
  </div>);
}
