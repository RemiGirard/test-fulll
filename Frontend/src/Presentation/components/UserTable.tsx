import type {User} from "../../Domain/Entity/User.ts";
import styles from "./UserTable.module.css";

type Props = {
  userList: User[];
  RenderUser: React.FC<{ user: User }>;
  isLoading: boolean;
}

export default function UserTable({userList, RenderUser, isLoading}: Props) {
  return (<div className={`${styles.main}`}>
    {isLoading
      ? <div className={`${styles.loading}`}><p>Loading...</p></div>
      : userList.map((user) => <RenderUser key={user.id} user={user}/>)
    }
  </div>);
}
