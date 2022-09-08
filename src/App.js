import {BrowserRouter, Routes, Route, NavLink} from 'react-router-dom';
import {ContextProvider} from './context/GlobalContext';
import TasksList from './components/TasksList';
import TaskForm from './components/TaskForm';
import PageNotFound from './components/PageNotFound';

function App() {

  return (
    <div className="mx-auto bg-slate-100 h-screen">
      <ContextProvider>
        <BrowserRouter>
        <nav className='w-full p-4 bg-violet-900 text-white font-bold flex flex-row justify-around'>
            <NavLink to='/'>
              <h2 className='text-3xl'>Task list app</h2>
            </NavLink>
          <div>
            <NavLink to='/new-task' className='bg-rose-700 px-6 py-1 rounded-md break-normal'>Add-Task</NavLink>
          </div>
        </nav>

          <Routes>
            <Route path='/' exact element={ <TasksList /> } />
            <Route path='/new-task' exact element={ <TaskForm /> } />
            <Route path='/edit-task/:id' exact element={ <TaskForm /> } />
            <Route path='*' exact element={ <PageNotFound /> } />
          </Routes>
          
        </BrowserRouter>
      </ContextProvider>
    </div>
  );
}

export default App;
