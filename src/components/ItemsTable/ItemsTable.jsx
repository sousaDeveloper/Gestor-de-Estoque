import { Link } from "react-router-dom";
import useStock from "../../hooks/useStock";
import styles from "./styles.module.scss";

export default function ItemsTable() {
  const { items } = useStock();

  return (
    <table>
      <thead>
        <th>ID</th>
        <th>Nome</th>
        <th>Em Estoque</th>
        <th>Categoria</th>
        <th>Ações</th>
      </thead>
      <tbody>
        {items.map((item) => (
          <tr key={item.id}>
            <td>{item.id}</td>
            <td>{item.name}</td>
            <td>{item.quantity}</td>
            <td>{item.category}</td>
            <td>
              <Link to={`/items/${item.id}`} className={styles.buttonShow}>
                Ver
              </Link>
              <Link to={`/items/${item.id}/update`} className={styles.buttonUpdate}>
                Atualizar
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
