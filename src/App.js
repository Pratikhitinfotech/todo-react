import React, { useState, useEffect } from "react";

function App() {
  const [newtask, setNewtask] = useState("");
  const [tasks, setTasks] = useState([]);

  const [editid, setEditid] = useState(null);
  const [toggle, setToggle] = useState(true);

  useEffect(() => {
    const storegetask = localStorage.getItem("tasks");
    if (storegetask) {
      setTasks(JSON.parse(storegetask));
    }
  }, []);
  const addTask = () => {
    if (newtask.trim() === "") {
      alert("please enter your todo");
    } else if (editid !== null) {
      const updatedTasks = tasks.map((task) =>
        task.id === editid ? { id: editid, text: newtask } : task,
      );
      setTasks(updatedTasks);
      setEditid(null);
      setNewtask("");
      setToggle(true);
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    } else {
      setTasks([...tasks, { id: Date.now(), text: newtask }]);
      localStorage.setItem("tasks", JSON.stringify(tasks));
      setNewtask(" ");
    }
  };

  const Editdata = (id, text) => {
    setEditid(id);
    setNewtask(text);
    setToggle(false);
  };

  const Deletedata = (deleteid) => {
    const deletedata = tasks.filter((item) => {
      return item.id !== deleteid;
    });
    setTasks(deletedata);
  };
  return (
    <>
      <div>
        <div>
          <h1>Todo List</h1>
          <ul>
            {tasks.map((task) => (
              <li key={task.id}>
                {task.text}{" "}
                <button onClick={() => Editdata(task.id, task.text)}>
                  edit
                </button>{" "}
                <button onClick={() => Deletedata(task.id)}>Delete</button>{" "}
              </li>
            ))}
          </ul>
        </div>
        <input
          type="text"
          value={newtask}
          onChange={(e) => setNewtask(e.target.value)}
        />
        <button onClick={addTask}> {toggle ? "Add Task" : "edit"} </button>
      </div>
    </>
  );
}
export default App;
