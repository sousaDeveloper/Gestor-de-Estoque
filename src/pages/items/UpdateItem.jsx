import { useParams } from "react-router-dom";
import ItemForm from "../../components/ItemForm/ItemForm";
import useStock from "../../hooks/useStock";

export default function UpdateItem() {
  const { getItem } = useStock();
  const { id } = useParams();

  const item = getItem(id);

  let newH1 = "Atualizar Produto";
  let buttonContent = "Atualizar";

  return (
    <main>
      <ItemForm itemToUpdate={item} name={newH1} buttonContent={buttonContent} />
    </main>
  );
}
