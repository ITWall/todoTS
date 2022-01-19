interface Task {
  id: string;
  title: string;
  content: string;
  createdDate: string;
  finishedDate: string;
  status: "in progress" | "passed" | "failed";
}

export default Task;
