import React, { useState, useEffect } from "react";
import { getTasks } from "../api";

const WorkerTasksContext = React.createContext({
  tasks: [],
  setTasks: () => {},
  loadingTasks: true,
});

export const TasksContextProvider = (props) => {
  const [tasks, setTasks] = useState([]);
  const [loadingTasks, setLoadingTasks] = useState(true);

  useEffect(() => {
    (async () => {
      const response = await getTasks();
      setTasks(response.tasks);
      setLoadingTasks(false);
    })();
  }, []);

  const taskContext = {
    tasks,
    setTasks,
    loadingTasks,
  };

  return (
    <WorkerTasksContext.Provider value={taskContext}>
      {props.children}
    </WorkerTasksContext.Provider>
  );
};

export default WorkerTasksContext;
