import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import "./App.css";
import Task from "./Task";

function App() {
  let id: string = uuidv4();
  const [tasks, setTasks] = useState<Task[]>([]);

  let renderTaskUI = () => {
    let tasksUI: Object[] = [];
    tasks.forEach((task) => {
      tasksUI.push(
        <tr key={task.id}>
          <td className="centerTableData id">{task.id}</td>
          <td className="centerTableData">{task.title}</td>
          <td className="centerTableData">{task.content}</td>
          <td className="centerTableData">{task.createdDate}</td>
          <td className="centerTableData">{task.finishedDate}</td>
          <td className="centerTableData">{task.status}</td>
          <td className="centerTableData">
            <div className="action">
              <span
                onClick={() => {
                  deleteTask(task);
                }}
                className="actionBtn deleteBtn"
              >
                X
              </span>
              <span
                onClick={() => {
                  markTaskFailed(tasks.indexOf(task));
                }}
                className="actionBtn failedBtn"
              >
                Failed
              </span>
              <span
                onClick={() => {
                  markTaskPassed(tasks.indexOf(task));
                }}
                className="actionBtn passedBtn"
              >
                Passed
              </span>
            </div>
          </td>
        </tr>
      );
    });

    return tasksUI;
  };

  let createTask = (event: any) => {
    event.preventDefault();

    let title: string = event.target.titleInput.value;
    let content: string = event.target.contentInput.value;
    console.log(event.target.titleInput.value);

    let newTask: Task = {
      id: id,
      title: title,
      content: content,
      createdDate: new Date().toString(),
      finishedDate: "",
      status: "in progress",
    };
    setTasks((tasks) => [...tasks, newTask]);
  };

  let deleteTask = (task: Task) => {
    let index: number = tasks.indexOf(task);
    tasks.splice(index, 1);
    console.log(index);
    setTasks((tasks) => [...tasks]);
  };
  let markTaskFailed = (index: number) => {
    let task = tasks[index];
    task.status = "failed";
    tasks[index] = task;
    setTasks((tasks) => [...tasks]);
  };
  let markTaskPassed = (index: number) => {
    let task = tasks[index];
    task.status = "passed";
    task.finishedDate = new Date().toString();
    tasks[index] = task;
    setTasks((tasks) => [...tasks]);
  };

  return (
    <div>
      <div id="myDIV" className="header">
        <h2 style={{ margin: "5px" }}>My To Do List</h2>
        <form onSubmit={createTask}>
          <input type="text" name="titleInput" placeholder="Title..." />
          <input type="text" name="contentInput" placeholder="Content..." />
          <input type="submit" value="Add" className="addBtn"></input>
        </form>
      </div>
      <table className="todoTable">
        <thead>
          <tr>
            <th className="id">ID</th>
            <th>Title</th>
            <th>Content</th>
            <th>Created Date</th>
            <th>Finish Date</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>{renderTaskUI()}</tbody>
      </table>
    </div>
  );
}

export default App;
