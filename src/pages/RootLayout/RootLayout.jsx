import { Link, Outlet } from "react-router-dom";
import styles from "./styles.module.scss";

export default function RootLayout() {
  return (
    <>
      <header className={styles.header}>
        <Link to="/" className={styles.logo}>
          REACT STOCK
        </Link>
        <nav className={styles.nav}>
          <Link to="/">Início</Link>
          <Link to="/items">Items</Link>
        </nav>
      </header>
      <div>
        <Outlet />
      </div>
      <footer>
        <p>©Criado por Matheus Sousa</p>
      </footer>
    </>
  );
}
