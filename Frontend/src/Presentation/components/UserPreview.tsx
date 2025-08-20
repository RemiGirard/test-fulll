import styles from "./UserPreview.module.css";
import type {UserAndIsSelected} from "../hooks/useUserListReducer";
import StyledCheckbox from "./StyledCheckbox";

type Props = {
  user: UserAndIsSelected;
  onToggleSelect: () => void;
  isEditMode: boolean;
}

export default function UserPreview({user, onToggleSelect, isEditMode}: Props) {
  return (<div className={`${styles.main}`}>
    <StyledCheckbox
      className={`${styles.checkbox} ${isEditMode ? "" : styles.hidden}`}
      checked={user.isSelected}
      onChange={onToggleSelect}
    />
    <img className={`${styles.avatar}`} src={user.avatarUrl} alt={user.login}/>
    <p className={`${styles.userId}`}>{user.id}</p>
    <p className={`${styles.userName}`}>{user.login}</p>
    <a className={`${styles.link}`} href={`https://github.com/${user.login}`} target="_blank" rel="noreferrer">
      View profile
    </a>
  </div>);
}