export function appReducer(state, action){
    switch(action.type){

        case "ADD_TASK":
            return{
                tasks: [ action.payload, ...state.tasks]
            }
        case "UPDATE_TASK":
            const recivedTask = action.payload;

            const updatedTask = state.tasks.map(task => {
                if(task.id === recivedTask.id){
                    task.title= recivedTask.title;
                    task.description = recivedTask.description;
                    task.type = recivedTask.type;
                }
                return task;
            })
            return {
                tasks: updatedTask
            }

        case "DELETE_TASK":
            return{
                tasks: state.tasks.filter(task => task.id !== action.payload)
            }
        case "TOGGLE_TASK_DONE":
            return{
                tasks: state.tasks.map((task) => 
                    task.id === action.payload ? {...task, done: !task.done} : task)
            }

        default:
            return state;
    }

}