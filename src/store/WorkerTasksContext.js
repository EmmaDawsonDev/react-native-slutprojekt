import React, { useState, useEffect } from "react";
import { getTasks } from "../api";

const WorkerTasksContext = React.createContext({
  tasks: [],
  setTasks: () => {},
});

export const TasksContextProvider = (props) => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    (async () => {
      const response = await getTasks();
      setTasks(response.tasks);
    })();
  }, []);

  const taskContext = {
    tasks,
    setTasks,
  };

  return (
    <WorkerTasksContext.Provider value={taskContext}>
      {props.children}
    </WorkerTasksContext.Provider>
  );
};

export default WorkerTasksContext;
