import Header from "./Header";

import styles from "./App.module.css";
import UserSearchList from "./UserSearchList";

export default function App() {
  return (<>
    <Header>Github Search</Header>
    <main className={`${styles.main}`}>
      <section className={`${styles.section}`}>
        <UserSearchList/>
      </section>
    </main>
  </>);
}
