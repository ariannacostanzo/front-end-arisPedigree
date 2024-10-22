import { useState } from "react";

const useStorage = (initialValue, itemKey) => {
  const itemValue = localStorage.getItem(itemKey);
  if (itemValue === null) {
    localStorage.setItem(itemKey, JSON.stringify(initialValue));
  }

  const [state, setState] = useState(
    itemValue === null ? initialValue : JSON.parse(itemValue)
  );

  const changeState = (newState) => {
    setState(newState);
    localStorage.setItem(itemKey, JSON.stringify(newState));
  };

  return [state, changeState];
};
export default useStorage;
