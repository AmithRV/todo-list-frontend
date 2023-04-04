const getDataFromLocalStorage = ()=>{
  // Retrieve the object from LocalStorage
  const storedObj = JSON.parse(localStorage.getItem('todo-list'));
  return storedObj
}

const getToken = ()=>{
    // Retrieve the object from LocalStorage
    const storedObj = JSON.parse(localStorage.getItem('todo-list'));
    return storedObj
}

const removeDataFromLocalStorage =()=>{
    // To remove a specific item from local storage
    localStorage.removeItem('todo-list');

    // To clear all items from local storage
    localStorage.clear();
}
  
export {getDataFromLocalStorage, getToken,removeDataFromLocalStorage}