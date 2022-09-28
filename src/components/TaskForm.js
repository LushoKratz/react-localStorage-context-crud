import {useState, useContext, useEffect} from 'react'
import {BsReverseLayoutTextSidebarReverse} from 'react-icons/bs'
import { useNavigate, useParams } from 'react-router-dom';
import { GlobalContext } from '../context/GlobalContext';

export default function TaskForm() {
    const [task, setTask] = useState({});
    const {addTask, tasks, updateTask} = useContext(GlobalContext);
    const navigate = useNavigate();
    const params = useParams();

    const handleChange = (e) => {
        setTask({...task, [e.target.name]: e.target.value})
        console.log(task)
        
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if(task.id){
            updateTask(task)
        }else{
            if(task.type === undefined) {setTask({...task, type: 'Normal'})}
            console.log(task.type)
            console.log(task)
            addTask(task);
        }
        console.log(tasks)
        navigate('/');
    }

    useEffect(() => {
        if(tasks.length > 0){
            const foundTask = tasks.find(task => (task.id.toString()) === params.id);
            if(foundTask){
                setTask(foundTask);
            }else{
                setTask('');
                setTask({...task, type: 'Normal'})
            }
    }
    }, [params.id])
    
  return (
    <div className='flex flex-row justify-around mt-10'>
        <div className='w-full m-4 md:w-3/6 bg-white px-3 py-4 rounded-lg'>
            <div className='flex flex-row'>
                <BsReverseLayoutTextSidebarReverse className='text-2xl'/><h2 className='font-bold text-slate-600 text-2xl ml-2'>{!task.id ? 'Add new task' : 'Edit task'}</h2>
            </div>
            <form className='mt-10' onSubmit={handleSubmit}>
                <label htmlFor="title" className='text-slate-500 font-bold text-md'>Title:</label>
                <input onChange={handleChange} value={task.title || ''} type="text" name="title" max={20} className='w-full block text-gray-600 py-2 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-violet-800' placeholder='Task title...'/>
                <br />
                <label htmlFor="description" className='text-slate-500 font-bold text-md mt-10'>Description:</label><br />
                <textarea onChange={handleChange} value={task.description || ''} name="description" className='w-full text-gray-600 py-2 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-violet-800' placeholder='Task description...'></textarea>
                <br /><br />
                <label htmlFor="category" className='text-slate-500 font-bold text-md'>Type of task:</label>
                <select name="type" value={task.type || ''} onChange={handleChange} className='bg-gray-50 border border-gray-300 text-gray-500 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'>
                    <option value="Normal">Normal</option>
                    <option value="Optional">Optional</option>
                    <option value="Urgent">Urgent</option>
                </select>     
                <br /><br />
                <button className='bg-violet-600 text-white font-bold px-4 py-2 rounded-md m-auto hover:bg-violet-700 '>Add task</button>           
            </form>
        </div>
    </div>
  )
}
