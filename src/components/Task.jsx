import { MdDelete, MdEdit } from "react-icons/md";
import { MdOutlineDone } from "react-icons/md";
import { useContext, useState } from "react";
import { TodoContext } from "../context/TodoContext";

const Task = ({ setOpen, setGetId }) => {

    const { dispatch, state: { todos } } = useContext(TodoContext);

    const [filterStatus, setFilterStatus] = useState("all")

    const handleToggle = (e,id) => {
        e.preventDefault();

        dispatch({
            type: "TOGGLE_TODO",
            payload: id,
        });
    }

    const handleDelete = (e,id) => {
        e.preventDefault();
        dispatch({
            type: "DELETE_TO_TODO",
            payload: id
        })
    }

    const filter = () => {
        let filterTodo = todos;
        if (filterStatus === "completed") {
            filterTodo = todos.filter((todo) => todo.complete === true);
        }

        if (filterStatus === "incompleted") {
            filterTodo = todos.filter((todo) => todo.complete === false);
        }

        filterTodo.sort((a, b) => new Date(b.date) - new Date(a.date));
        return filterTodo
    }

    return (
        <div className="todo">
            <h1 className="title">TODO LIST</h1>
            <div className="todo-top">
                <button className="add" onClick={() => setOpen(true)}>Add</button>
                <select onChange={(e) => setFilterStatus(e.target.value)}>
                    <option value="all">All</option>
                    <option value="completed">Completed</option>
                    <option value="incompleted">Incompleted</option>
                </select>
            </div>
            <div className="todo-bottom">
                {
                    todos.length === 0 ? <h3>No Todos</h3> : (
                        filter().map((todo) => (
                            <div className="task" key={todo.id}>
                                <div className="left" onClick={(e) => handleToggle(e,todo.id)}>
                                    <div className="icon" style={todo.complete ? { backgroundColor: "#646ff0", color: "#fff" } : {}}>
                                        {
                                            todo.complete && (
                                                <MdOutlineDone />
                                            )
                                        }
                                    </div>
                                    <div className="task-text-container">
                                        <p style={{ textDecoration: todo.complete ? "line-through" : "none" }}>{todo.title}</p>
                                        <p className="date">{new Date(todo.date).toLocaleString()}</p>
                                    </div>
                                </div>
                                <div className="right">
                                    <div className="icon">
                                        <MdEdit
                                            onClick={() => {
                                                setGetId(todo.id)
                                                setOpen(true)
                                            }} />
                                    </div>
                                    <div className="icon" onClick={(e) => handleDelete(e,todo.id) }>
                                        <MdDelete />
                                    </div>
                                </div>
                            </div>
                        ))
                    )
                }
            </div>

        </div>
    )
}
export default Task;