import React, { useEffect, useState } from "react";
import axios from "axios";
import Create from "./Create";
import { BsCircleFill, BsFillTrashFill, BsFillCheckCircleFill } from "react-icons/bs";

const Home = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/get")
      .then((result) => setTasks(result.data))
      .catch((err) => console.log(err));
  }, []);

  const handleEdit = (id) => {
    axios
      .put("http://localhost:5000/update/" + id)
      .then((result) => {
        location.reload()
      })
      .catch((err) => console.log(err));
  };

  const handleDelete = (id) => {
    axios
    .delete("http://localhost:5000/delete/" + id)
    .then((result) => {
      location.reload()
    })
    .catch((err) => console.log(err));
  }

  return (
    <div className="home">
      <h2>Task Management</h2>
      <div className="container">
        <Create />
        {tasks.length === 0 ? (
          <p>No Tasks Yet! Add one to get started</p>
        ) : (
          tasks.map((task) => (
            <div className="task">
              <div className="checkbox" onClick={() => handleEdit(task._id)}>
                {task.done
                ? <BsFillCheckCircleFill className="icon" />
                : <BsCircleFill className="icon" />
                }
                <p className={task.done ? "strike" : ""}>{task.task}</p>
              </div>
              <div className="trash">
                <span>
                  <BsFillTrashFill className="icon" onClick={() => handleDelete(task._id)}/>
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Home;
