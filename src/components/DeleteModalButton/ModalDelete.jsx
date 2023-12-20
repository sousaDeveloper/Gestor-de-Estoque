import { useState } from "react";
import Modal from "react-modal";
import styles from "./styles.module.scss";
import PropTypes from "prop-types";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useStock from "../../hooks/useStock";

ModalDelete.propTypes = {
  itemName: PropTypes.string,
  itemId: PropTypes.number,
};

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    padding: "0.8rem",
    transform: "translate(-50%, -50%)",
    backgroundColor: "#393939",
  },
};

export default function ModalDelete({ itemName, itemId }) {
  const [modalIsOpen, setIsOpen] = useState(false);
  const { deleteItems } = useStock();

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  const handleDelete = () => {
    toast.info(`Item: "${itemName}" foi excluído.`, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      theme: "dark",
    });
    setIsOpen(false);
    deleteItems(itemId);
  };

  return (
    <>
      <button className={styles.buttonModal} onClick={openModal}>
        Excluir
      </button>
      <Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={customStyles} >
        <h2 className={styles.mainTitle}>Tem certeza que deseja excluir {itemName}?</h2>
        <div className={styles.buttons}>
          <button className={styles.buttonDelete} onClick={handleDelete}>
            <p>Excluir</p>
          </button>
          <button onClick={closeModal} className={styles.buttonBack}>
            Voltar
          </button>
        </div>
        <ToastContainer />
      </Modal>
    </>
  );
}
