import { useRef, useState } from "react";
import PropTypes from "prop-types";
import styles from "./styles.module.scss";
import StockItem, { CATEGORIES } from "../../entities/StockItem";
import useStock from "../../hooks/useStock";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

ItemForm.propTypes = {
  itemToUpdate: PropTypes.object,
};

export default function ItemForm({ itemToUpdate }) {
  const defaultItem = {
    name: "",
    description: "",
    quantity: 0,
    price: 0,
    category: "",
  };

  const [item, setItem] = useState(itemToUpdate ? itemToUpdate : defaultItem);
  const { addItems } = useStock();
  const inputRef = useRef(null);

  const handleChange = (ev) => {
    setItem((currentState) => {
      return {
        ...currentState,
        [ev.target.name]: ev.target.value,
      };
    });
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();

    try {
      const validItem = new StockItem(item);
      addItems(validItem);
      setItem(defaultItem);
      inputRef.current.focus();

      toast.success("Produto adicionado à lista", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        theme: "dark",
      });
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className={styles.row}>
        <fieldset>
          <legend>
            <h1>Criar Produto</h1>
          </legend>
          <div className={styles.gridForm}>
            <div>
              <label htmlFor="name">Nome</label>
              <input
                type="text"
                name="name"
                id="name"
                required
                value={item.name}
                onChange={handleChange}
                ref={inputRef}
                maxLength={20}
                autoComplete="off"
              />
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
                maxLength={1000}
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
                maxLength={100000}
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
            <div className={styles.formControl}>
              <label htmlFor="description">Descrição</label>
              <input
                name="description"
                id="description"
                className={styles.description}
                required
                value={item.description}
                onChange={handleChange}
                maxLength={40}
              />
              <button className={styles.buttonSave}>Salvar</button>
            </div>
          </div>
        </fieldset>
      </div>
      <ToastContainer />
    </form>
  );
}
