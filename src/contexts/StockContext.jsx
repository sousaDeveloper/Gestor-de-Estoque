import { createContext, useState } from "react";
import PropTypes from "prop-types";

StockContextProvider.propTypes = {
  children: PropTypes.node,
};

export const StockContext = createContext({});

export default function StockContextProvider({ children }) {
  const [items, setItems] = useState(() => {
    const storedGames = localStorage.getItem("react-stock");
    if (!storedGames) return [];
    const items = JSON.parse(storedGames);
    items.forEach((item) => {
      item.createdAt = new Date(item.createdAt);
      item.updatedAt = new Date(item.updatedAt);
    });
    return items;
  });

  const addItem = (item) => {
    setItems((currentState) => {
      const updatedItems = [item, ...currentState];
      localStorage.setItem("react-stock", JSON.stringify(updatedItems));
      return updatedItems;
    });
  };

  const getItem = (itemId) => {
    return items.find((item) => item.id === +itemId);
  };

  const updateItem = (itemId, newAttributes) => {
    setItems((currentState) => {
      const findItemIndex = currentState.findIndex((item) => item.id === +itemId);
      const updatedItems = [...currentState];
      Object.assign(updatedItems[findItemIndex], newAttributes, { updatedAt: new Date().toLocaleString() });
      localStorage.setItem("react-stock", JSON.stringify(updatedItems));
      return updatedItems
    });
  };

  const deleteItem = (itemId) => {
    setItems((currentState) => {
      const updatedItems = currentState.filter((item) => item.id !== itemId);
      localStorage.setItem("react-stock", JSON.stringify(updatedItems));
      return updatedItems;
    });
  };

  const stock = {
    items,
    addItem,
    getItem,
    deleteItem,
    updateItem
  };

  return <StockContext.Provider value={stock}>{children}</StockContext.Provider>;
}
