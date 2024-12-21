import { useState, useEffect } from 'react';

const useToggleClass = (
  initialState = false, 
  targetClass = '', 
  useLocalStorage = false, 
  storageKey = '', 
  closeOnClickOutside = true
) => {
  const [isActive, setIsActive] = useState(
    useLocalStorage && storageKey ? localStorage.getItem(storageKey) === "true" : initialState
  );

  const toggleClass = () => {
    setIsActive((prevState) => {
      const newState = !prevState;
      if (useLocalStorage && storageKey) {
        localStorage.setItem(storageKey, newState.toString());
      }
      updateClass(newState); // Dynamically add/remove the class
      return newState;
    });
  };

  const open = () => {
    setIsActive(true);
    if (useLocalStorage && storageKey) {
      localStorage.setItem(storageKey, "true");
    }
    updateClass(true); // Add the class on open
  };

  const close = () => {
    setIsActive(false);
    if (useLocalStorage && storageKey) {
      localStorage.setItem(storageKey, "false");
    }
    updateClass(false); // Remove the class on close
  };

  // Add a type annotation for isActive here
  const updateClass = (isActive: boolean) => { // Specify that isActive is a boolean
    const element = document.querySelector(`.${targetClass}`);
    if (element) {
      if (isActive) {
        element.classList.add(targetClass); // Add the class if active
      } else {
        element.classList.remove(targetClass); // Remove the class if not active
      }
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isActive && closeOnClickOutside) {
        const element = document.querySelector(`.${targetClass}`);
        if (element && !element.contains(event.target as Node)) {
          close();
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isActive, closeOnClickOutside]);

  return { isActive, toggleClass, open, close };
};

export default useToggleClass;
