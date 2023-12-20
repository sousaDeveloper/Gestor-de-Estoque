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

  const addItems = (item) => {
    setItems((currentState) => {
      const updatedItems = [item, ...currentState];
      localStorage.setItem("react-stock", JSON.stringify(updatedItems));
      return updatedItems;
    });
  };

  const deleteItems = (itemId) => {
    setItems((currentState) => {
      const updatedItems = currentState.filter((item) => item.id !== itemId);
      localStorage.setItem("react-stock", JSON.stringify(updatedItems));
      return updatedItems;
    });
  };

  const stock = {
    items,
    addItems,
    deleteItems,
  };

  return <StockContext.Provider value={stock}>{children}</StockContext.Provider>;
}
