export const setItem = (key, value) => {
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem(key, JSON.stringify(value)); 
      } catch (error) {
        console.error("Error saving to localStorage:", error);
      }
    }
  };
  
  export const getItem = (key) => {
    if (typeof window !== "undefined") {
      try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : null; 
      } catch (error) {
        console.error("Error retrieving from localStorage:", error);
        return null;
      }
    }
    return null;
  };

  export const removeItem = (key) => {
    if (typeof window !== "undefined") {
      try {
        localStorage.removeItem(key);
      } catch (error) {
        console.error("Error removing from localStorage:", error);
      }
    }
  };
  
  
