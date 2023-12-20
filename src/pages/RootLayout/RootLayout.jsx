import { Link, Outlet } from "react-router-dom";
import styles from "./styles.module.scss";

export default function RootLayout() {
  return (
    <>
      <header className={styles.header}>
        <h3>REACT STOCK</h3>
        <nav>
          <ul className={styles.menu}>
            <li>
              <Link to="/">
                <a>Início</a>
              </Link>
            </li>
            <li>
              <a>Itens</a>
              <ul className={styles.submenu}>
                <li>
                  <Link to="/items/new">
                    <a>Criar Item</a>
                  </Link>
                </li>
                <li>
                  <Link to="/items">
                    <a>Ver Itens</a>
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
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
