import { useState } from "react";
import PropTypes from "prop-types";
import styles from "./styles.module.scss";

ItemForm.propTypes = {
  itemToUpdate: PropTypes.object,
};

const CATEGORIES = ["Jogos", "Livros", "Brinquedos", "Acessórios"];

export default function ItemForm({ itemToUpdate }) {
  const defaultItem = {
    name: "",
    description: "",
    quantity: 0,
    price: 0,
    category: "",
  };

  const [item, setItem] = useState(itemToUpdate ? itemToUpdate : defaultItem);

  const handleChange = (ev) => {
    setItem((currentState) => {
      return {
        ...currentState,
        [ev.target.name]: ev.target.value,
      };
    });
  };

  return (
    <form>
      <div className={styles.row}>
        <div>
          <label htmlFor="name">Nome</label>
          <input type="text" name="name" id="name" required value={item.name} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="quantity">Quantidade</label>
          <input
            type="number"
            name="quantity"
            id="quantity"
            required
            min={0}
            step={1}
            value={item.quantity}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="price">Preço</label>
          <input
            type="number"
            name="price"
            id="price"
            required
            min={0.0}
            step={0.01}
            value={item.price}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="category">Categoria</label>
          <select name="category" id="category" required value={item.category} onChange={handleChange}>
            <option disabled value="">
              Selecione uma categoria...
            </option>
            {CATEGORIES.map((category) => (
              <option key={category} value={category} defaultChecked={item.category === category}>
                {category}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className={styles.formControl}>
          <label htmlFor="description">Descrição</label>
          <input
            name="description"
            id="description"
            className={styles.description}
            required
            value={item.description}
            onChange={handleChange}
          ></input>
          <button className={styles.buttonSave}>Salvar</button>
        </div>
    </form>
  );
}
