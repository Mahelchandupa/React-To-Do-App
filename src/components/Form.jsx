import { motion } from "framer-motion";
import { useContext, useEffect, useState } from "react";
import { TodoContext } from "../context/TodoContext";

const Form = ({ open, setOpen, getId, setGetId }) => {

    const { dispatch, state: { todos } } = useContext(TodoContext);
    const [title, setTitle] = useState("");
    const [status, setStatus] = useState("INCOMPLETE");

    useEffect(() => {
        if (getId !== null) {
            const todoTOEdit = todos.find((todo) => todo.id === getId)
            if (todoTOEdit) {
                setTitle(todoTOEdit.title)
                setStatus(todoTOEdit.complete ? "COMPLETED" : "INCOMPLETE");
            }
        } else {
            setTitle("")
            setStatus(false)
        }
    }, [getId, todos])


    const handleAdd = (e) => {
        e.preventDefault();

        if (getId !== null) {
            dispatch({
                type: "UPDATE_TO_TODO",
                payload: { title, status, id: getId },
            });

            setGetId(null)
        }
        else {
            dispatch({
                type: "ADD_TO_TODO",
                payload: { title, status },
            });

        }

        setTitle("");
        setStatus("INCOMPLETE");
        setOpen(false)
    };

    useEffect(() => {
        localStorage.setItem("todos", JSON.stringify(todos));
    })

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: open ? 1 : 0 }}
            transition={{ duration: 0.3 }}
        >
            {
                open && (
                    <div className="form-main-container">
                        <div className="overlay"></div>
                        <motion.div
                            className="form-container"
                            initial={{ y: "-100%" }}
                            animate={{ y: open ? "0" : "-100%" }}
                            transition={{ duration: 0.3 }}>
                            <h3>{getId !== null ? "Edit Task" : "Add Task"}</h3>
                            <form onSubmit={handleAdd}>
                                <label htmlFor="title">Title</label>
                                <input value={title} onChange={(e) => setTitle(e.target.value)} name="title" type="text" placeholder="Add task . . ." />
                                <label htmlFor="status">Status</label>
                                <select
                                    value={status}
                                    onChange={(e) => setStatus(e.target.value)}
                                    name="status"
                                >
                                    <option value="INCOMPLETE">Incomplete</option>
                                    <option value="COMPLETED">Completed</option>
                                </select>
                                <div className="buttonContainer">
                                    <button type="submit" className="add">
                                        {getId !== null ? "Update" : "Add"}
                                    </button>
                                    <button
                                        className="cansel"
                                        onClick={() => {
                                            setTitle("");
                                            setStatus("INCOMPLETE");
                                            setOpen(false);
                                        }}>
                                        Cansel
                                    </button>
                                </div>
                                <motion.button
                                    className="close"
                                    initial={{ y: "-60px" }}
                                    animate={{ y: "0" }}
                                    onClick={() => setOpen(false)}>X
                                </motion.button>
                            </form>
                        </motion.div>
                    </div>
                )
            }
        </motion.div>
    )
}
export default Form