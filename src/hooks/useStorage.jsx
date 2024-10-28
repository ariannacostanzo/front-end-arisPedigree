import { useState } from "react";

const useStorage = (initialValue, itemKey) => {
  let parsedValue;

  try {
    const itemValue = localStorage.getItem(itemKey);
    parsedValue = itemValue ? JSON.parse(itemValue) : initialValue;
  } catch (error) {
    console.error("Error parsing localStorage item:", error);
    parsedValue = initialValue;
  }

  const [state, setState] = useState(parsedValue);

  const changeState = (newState) => {
    setState(newState);
    localStorage.setItem(itemKey, JSON.stringify(newState));
  };

  return [state, changeState];
};
export default useStorage;
