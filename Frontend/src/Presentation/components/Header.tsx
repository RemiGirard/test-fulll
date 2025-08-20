import styles from "./Header.module.css";

type Props = {
  children?: React.ReactNode;
}

export default function Header({children}: Props) {
  return (<header className={`${styles.main}`}>{children}</header>);
}
