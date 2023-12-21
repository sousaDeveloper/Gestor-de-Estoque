import { Link, useParams } from "react-router-dom";
import useStock from "../../../hooks/useStock";
import styles from "./styles.module.scss";
import ModalDelete from "../../../components/DeleteModalButton/ModalDelete";

export default function ShowItem() {
  const { getItem } = useStock();
  const { id } = useParams();

  const item = getItem(id);

  return (
    <div className={styles.item}>
      <h2>{item.name}</h2>
      <div className={styles.row}>
        <span>Categoria: {item.category}</span>
        <span>Em Estoque: {item.quantity}</span>
        <span>Preço: R${item.price}</span>
      </div>
      <div className={styles.row}>
        <span>Cadastrado em: {item.createdAt.toLocaleString()}</span>
        <span>Atualizado em: {item.updatedAt.toLocaleString()}</span>
      </div>
      <p className={styles.description}>Descrição: {item.description}</p>
      <div className={styles.buttons}>
        <Link to={`/items/${item.id}/update`} className={styles.buttonUpdate}>
          Atualizar
        </Link>
        <ModalDelete itemId={item.id} itemName={item.name} />
        <Link to="/items">
          <button className={styles.buttonBack}>
            <span>Voltar</span>
          </button>
        </Link>
      </div>
    </div>
  );
}
