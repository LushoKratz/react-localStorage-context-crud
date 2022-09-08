import { createContext, useEffect, useReducer } from "react"
import {appReducer} from './AppReducer';
import {v4} from 'uuid';

//const initialState = {
//  tasks: [
//    {id: 1, title: "task 1", description: "Task 1 description", done: false, type: "Normal"},
//    {id: 2, title: "task 2", description: "Task 2 description", done: false},
//  ]
//}

const initialState = {tasks: JSON.parse(localStorage.getItem('tasks'))};
//if(cartItemsData.length > 0){ state.tasks = cartItemsData; console.log(initialState) }

export const GlobalContext = createContext(initialState);

export const ContextProvider = ({children}) => {

  const [state, dispatch] = useReducer(appReducer, initialState);

  const addTask = (task) => {
    dispatch({type: 'ADD_TASK', payload: {...task ,id: v4(), done: false }})
    
  }
  
  const updateTask = (task) => {
    dispatch({type: 'UPDATE_TASK', payload: task})
  }

  const deleteTask = (id) => {
    dispatch({type: 'DELETE_TASK', payload: id})
  }

  const toggleTaskDone = (task) => {
    dispatch({type: "TOGGLE_TASK_DONE", payload: task})
  }

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(state.tasks));
  }, [state])
  
  return <GlobalContext.Provider value={{...state, addTask,updateTask, deleteTask, toggleTaskDone}}>
    {children}
  </GlobalContext.Provider>
}
