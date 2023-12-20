import { Link } from "react-router-dom";
import useStock from "../../hooks/useStock";
import styles from "./styles.module.scss";
import ModalDelete from "../DeleteModalButton/ModalDelete";

export default function ItemsTable() {
  const { items } = useStock();

  return (
    <table>
      <thead>
        <tr>
          <th>Nº Produto </th>
          <th>Nome</th>
          <th>Em Estoque</th>
          <th>Categoria</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        {items.map((item) => (
          <tr key={item.id}>
            <td>{item.id}</td>
            <td>{item.name}</td>
            <td>{item.quantity} unid.</td>
            <td>{item.category}</td>
            <td className="buttons">
              <Link to={`/items/${item.id}`} className={styles.buttonShow}>
                Ver
              </Link>
              <Link to={`/items/${item.id}/update`} className={styles.buttonUpdate}>
                Atualizar
              </Link>
              <ModalDelete itemId={item.id} itemName={item.name} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
