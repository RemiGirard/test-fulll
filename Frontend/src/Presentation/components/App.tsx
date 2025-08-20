import Header from "./Header.tsx";

import styles from "./App.module.css";
import UserSearchList from "./UserSearchList.tsx";

export default function App() {
  return (<>
    <Header>Github Search</Header>
    <main className={`${styles.main}`}>
        <section className={`${styles.section}`}>
            <UserSearchList />
        </section>
    </main>
  </>);
}
