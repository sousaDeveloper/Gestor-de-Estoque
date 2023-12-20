import { Link, Outlet, useLocation } from "react-router-dom";
import styles from "./styles.module.scss";

export default function ItemsLayout() {
  const { pathname } = useLocation();

  return (
    <main>
      <h1>Stock Items</h1>
      <div className={styles.tabs}>
        <Link to="/items" className={`${styles.tab} ${pathname === "/items" ? styles.active : ""}`}>
          Todos os Itens
        </Link>
        <Link to="/items/new" className={`${styles.tab}  ${pathname === "/items/new" ? styles.active : ""}`}>
          Criar Item
        </Link>
      </div>
      <Outlet />
    </main>
  );
}
