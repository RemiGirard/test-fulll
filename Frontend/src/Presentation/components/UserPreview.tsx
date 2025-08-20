import type {User} from "../../Domain/Entity/User.ts";
import styles from "./UserPreview.module.css";

type Props = {
  user: User;
}

export default function UserPreview({user}: Props) {
  return (<div className={`${styles.main}`}>
    <img className={`${styles.avatar}`} src={user.avatarUrl} alt={user.login}/>
    <p className={`${styles.userId}`}>{user.id}</p>
    <p className={`${styles.userName}`}>{user.login}</p>
    <a className={`${styles.link}`} href={`https://github.com/${user.login}`} target="_blank" rel="noreferrer">
      View profile
    </a>
  </div>);
}