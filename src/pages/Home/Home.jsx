import { Link } from "react-router-dom";
import useStock from "../../hooks/useStock";
import styles from "./styles.module.scss";

export default function Home() {
  const { items } = useStock();

  const diversityItems = items.length;
  const totalItems = items.reduce((sum, item) => +sum + +item.quantity, 0);

  const today = new Date();
  const limitDate = new Date();
  limitDate.setDate(limitDate.getDate() - 10);
  const recentItems = items.filter((item) => item.createdAt >= limitDate && item.createdAt <= today);
  const recentTotal = recentItems.length;

  const lowQuantityItems = items.filter((item) => item.quantity < 7);
  const lowQuantityTotal = lowQuantityItems.length;

  return (
    <main>
      <h1>Dashboard</h1>
      <div className={styles.row}>
        <div className={styles.dashboardCard}>
          Itens Diferentes
          <span> {diversityItems}</span>
        </div>
        <div className={styles.dashboardCard}>
          Todos os Itens
          <span> {totalItems}</span>
        </div>
        <div className={styles.dashboardCard}>
          Itens recentes
          <span> {recentTotal}</span>
        </div>
        <div className={styles.dashboardCard}>
          Itens acabando
          <span> {lowQuantityTotal}</span>
        </div>
      </div>
      <div className={styles.table}>
        <div className={styles.recent}>
          <table>
            <thead>
              <tr>
                <th>Itens Recentes</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {recentItems.length === 0 ? (
                <tr>
                  <td>Nenhum item adicionado...</td>
                  <td><Link to="/items/new" className={styles.buttonAdd}>Adicionar</Link></td>
                </tr>
              ) : (
                recentItems.map((item) => (
                  <tr key={item.id}>
                    <td>{item.name}</td>
                    <td>
                      <Link to={`/items/${item.id}`} className={styles.showButton}>
                        Ver
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <div className={styles.low}>
          <table>
            <thead>
              <tr>
                <th>Itens acabando</th>
                <th>Qtd.</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {lowQuantityItems.length === 0 ? (
                <tr>
                  <td>Sem itens acabando...</td>
                  <td>-</td>
                  <td>-</td>
                </tr>
              ) : (
                lowQuantityItems.map((item) => (
                  <tr key={item.id}>
                    <td>{item.name}</td>
                    <td>{item.quantity}</td>
                    <td>
                      <Link to={`/items/${item.id}`} className={styles.showButton}>
                        Ver
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
