import React, { useState } from 'react'
import { useContext } from 'react'
import {BsReverseLayoutTextSidebarReverse} from 'react-icons/bs'
import withReactContent from 'sweetalert2-react-content'
import Swal from 'sweetalert2'
import { GlobalContext } from '../context/GlobalContext';
import {MdDone} from 'react-icons/md'
import { NavLink } from 'react-router-dom';


export default function TasksList(id) {
    const {tasks, deleteTask, toggleTaskDone} = useContext(GlobalContext);
    const MySwal = withReactContent(Swal)
    const handleDelete = (id) => {
        MySwal.fire({
            title: 'Are you sure?',
            text: "You won't be able to recover this task after deleting it!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.isConfirmed) {
              Swal.fire(
                'Deleted!',
                'The task has been deleted.',
                'success'
              )
              deleteTask(id);
            }
          })
    }

  return (
    <div className='flex  mt-10 flex-wrap px-2 md:px-2'>

            {!tasks.length > 0 ? (<h2 className='text-2xl font-bold text-gray-500 text-center w-full'>No tasks yet</h2>) : 
                tasks.map(task => (
                <div key={task.id} className='bg-white px-2 py-4 rounded mt-8 w-full m-1 md:m-10  lg:w-3/12 flex flex-row justify-around shadow-md hover:shadow-lg'>
                    <div className='w-7/12'>
                        <h2 className={`font-bold text-slate-500 break-all ${task.done && 'line-through'}`}> {task.title} </h2>
                        <p className={`text-slate-600 break-all ${task.done && 'line-through'}`}>{task.description}</p>
                        <br />
                            {task.type === "Urgent" ? (<h2 className='text-rose-500 font-bold py-1 px-2'>{task.type}</h2>) 
                            : 
                            (<h2 className='font-bold text-violet-500'>{task.type}</h2>)}
                    </div>
                    <div>
                        <div className='flex justify-around mb-10'>
                            <button className={`flex ${task.done ? 'bg-green-500': 'bg-slate-400'} text-white py-1 px-4 rounded-sm`} onClick={() => toggleTaskDone(task.id)}>
                                {task.done ? 'Done' : 'Undone'}
                                {task.done &&
                                    (<div className='bg-green-500 text-white text-xl rounded-lg  font-bold ml-2'>
                                         <MdDone className=''/>
                                    </div>)}
                            </button>
                        </div>
                        <div className='flex flex-row justify-around'>
                            <div>
                                <button onClick={() => handleDelete(task.id)} className='bg-rose-700 px-4 py-0.5 rounded-md text-white hover:bg-rose-600'>
                                    Delete
                                </button>
                            </div>
                            <div>
                                <NavLink to={`/edit-task/${task.id}`} className='bg-violet-600 px-4 py-1 rounded-md text-white hover:bg-violet-500'>Edit</NavLink>
                            </div>
                        </div>
                    </div>
                </div>)) }
            

        </div>
  )
}
